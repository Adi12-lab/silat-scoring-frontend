import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Trash2, List } from "lucide-react";
import Wrapper from "~/components/layout/Wrapper";
import ServicePeserta from "~/actions/peserta";
import ServicePertandingan from "~/actions/pertandingan";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { PertandinganComplete } from "~/schema";
import { Button } from "~/components/ui/button";
import { Anchor } from "~/components/ui/anchor";
import AddPertandingan from "./AddPertandingan";

function Pertandingan() {
  const { kegiatan } = useParams();

  const { data } = useQuery({
    queryKey: ["pertandingan", { kegiatan }],
    queryFn: async () => {
      if (kegiatan) {
        return await ServicePertandingan.all(kegiatan);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: kegiatan !== undefined,
  });

  const pesertaData = useQuery({
    queryKey: ["peserta", { kegiatan }],
    queryFn: async () => {
      if (kegiatan) {
        return await ServicePeserta.all(kegiatan);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: kegiatan !== undefined,
  });
  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Pertandingan</h1>
      </div>

      <AddPertandingan
        kegiatan_id={kegiatan as string}
        peserta={pesertaData.data}
      />
      <Table className="mt-10">
        <TableCaption>Pertandingan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sudut merah</TableHead>
            <TableHead>Sudut Biru</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Gelanggang</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((pertandingan: PertandinganComplete) => (
              <TableRow key={pertandingan.id}>
                <TableCell>{pertandingan.sudut_merah.nama}</TableCell>
                <TableCell>{pertandingan.sudut_biru.nama}</TableCell>
                <TableCell>{pertandingan.kategori}</TableCell>
                <TableCell>{pertandingan.kelas}</TableCell>
                <TableCell>{pertandingan.gelanggang}</TableCell>
                <TableCell>
                  <Anchor href={`/pertandingan/${pertandingan.id}`}>
                    <List />
                  </Anchor>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
}

export default Pertandingan;
