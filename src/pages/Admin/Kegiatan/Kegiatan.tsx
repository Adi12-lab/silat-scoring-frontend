import { useQuery } from "@tanstack/react-query";
import { User, Trash2, Swords } from "lucide-react";
import Wrapper from "~/components/layout/Wrapper";
import { z } from "zod";
import ServiceKegiatan from "~/actions/kegiatan";
import { formatTanggal } from "~/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { kegiatanSchema } from "~/schema";
import { Button } from "~/components/ui/button";
import AddKegiatan from "./AddKegiatan";
import { Anchor } from "~/components/ui/anchor";

function Kegiatan() {
  const { data } = useQuery({
    queryKey: ["kegiatan"],
    queryFn: ServiceKegiatan.all,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Kegiatan</h1>
        <p>
          Setiap ada kegiatan, maka tambahkan disini. Berguna untuk digunakan
          event yang lainnya
        </p>
      </div>

      <AddKegiatan />
      <Table className="mt-10">
        <TableCaption>Event yang dilaksanakan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Kegiatan</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((item: z.infer<typeof kegiatanSchema>) => (
              <TableRow key={item.id}>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{formatTanggal(new Date(item.tanggal))}</TableCell>
                <TableCell className="space-x-4">
                  <Anchor
                    variant="outline"
                    size="icon"
                    href={`kegiatan/${item.id}/peserta`}
                  >
                    <User />
                  </Anchor>
                  <Anchor variant={"warning"} size={"icon"} href="#">
                    <Swords />
                  </Anchor>
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

export default Kegiatan;
