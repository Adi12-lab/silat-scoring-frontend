import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Wrapper from "~/components/layout/Wrapper";
import ServicePeserta from "~/actions/peserta";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Peserta as PesertaType } from "~/schema";
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

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Peserta</h1>
      </div>

      <AddPeserta kegiatan_id={kegiatan as string} />
      <Table className="mt-10">
        <TableCaption>Peserta yang mengikuti</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Perguruan</TableHead>
            <TableHead>Daerah</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((peserta: PesertaType) => (
              <TableRow key={peserta.id}>
                <TableCell>{peserta.nama}</TableCell>
                <TableCell>{peserta.perguruan}</TableCell>
                <TableCell>{peserta.daerah}</TableCell>
                <TableCell>{peserta.kelas}</TableCell>
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
