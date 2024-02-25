import { Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import ServiceKategori from "~/actions/kategori";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import Wrapper from "~/components/layout/Wrapper";
import { Kategori as KategoriType } from "~/schema";
import AddKategori from "./AddKategori";
import { generateString } from "~/lib/utils";

function Kategori() {
  const { data } = useQuery({
    queryKey: ["kategori"],
    queryFn: ServiceKategori.all,
  });

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Kategori</h1>
        {/* <p>Ada admin d</p> */}
      </div>

      <AddKategori />
      <Table className="mt-10">
        <TableCaption>Kategori peserta</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((kategori: KategoriType) => (
              <TableRow key={generateString(6)}>
                <TableCell>{kategori.nama}</TableCell>
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

export default Kategori;
