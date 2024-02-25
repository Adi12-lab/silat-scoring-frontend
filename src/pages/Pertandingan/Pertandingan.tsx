import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Wrapper from "~/components/layout/Wrapper";
import ServicePeserta from "~/actions/peserta";
import ServiceKategori from "~/actions/kategori";
import ServiceKelas from "~/actions/kelas";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { PesertaComplete } from "~/schema";
import { Button } from "~/components/ui/button";
import AddPeserta from "./AddPeserta";

function Peserta() {
  const { kegiatan } = useParams();
  const { data } = useQuery({
    queryKey: ["peserta", { kegiatan }],
    queryFn: async () => {
      if (kegiatan) {
        return await ServicePeserta.all(kegiatan);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: kegiatan !== undefined,
  });

  const kategoriData = useQuery({
    queryKey: ["peserta", "kategori"],
    queryFn: ServiceKategori.all,
  });

  const kelasData = useQuery({
    queryKey: ["peserta", "kelas"],
    queryFn: ServiceKelas.all,
  });

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Peserta</h1>
      </div>

      <AddPeserta
        kegiatan_id={kegiatan as string}
        kategoriData={kategoriData.data}
        kelasData={kelasData.data}
      />
      <Table className="mt-10">
        <TableCaption>Peserta yang mengikuti</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Perguruan</TableHead>
            <TableHead>Daerah</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((peserta: PesertaComplete) => (
              <TableRow key={peserta.id}>
                <TableCell>{peserta.nama}</TableCell>
                <TableCell>{peserta.perguruan}</TableCell>
                <TableCell>{peserta.daerah}</TableCell>
                <TableCell>{peserta.kategori.nama}</TableCell>
                <TableCell>{peserta.kelas.nama}</TableCell>
                <TableCell className="space-x-4">
                  <Button variant={"destructive"} size="icon">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
}

export default Peserta;
