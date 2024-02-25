import { Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
import { Button } from "~/components/ui/button";
import Wrapper from "~/components/layout/Wrapper";
import { Kelas as KelasType } from "~/schema";
import AddKelas from "./AddKelas";

function Kelas() {
  const { data } = useQuery({
    queryKey: ["kelas"],
    queryFn: ServiceKelas.all,
  });

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Kelas</h1>
        {/* <p>Ada admin d</p> */}
      </div>

      <AddKelas />
      <Table className="mt-10">
        <TableCaption>Kelas pencak silat</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Berat Badan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((kelas: KelasType) => (
              <TableRow key={kelas.id}>
                <TableCell>{kelas.nama}</TableCell>
                <TableCell>{kelas.berat_badan}</TableCell>
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

export default Kelas;
