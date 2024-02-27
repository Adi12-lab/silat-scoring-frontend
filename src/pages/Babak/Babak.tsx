import { Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
import { Babak as BabakType } from "~/schema";

import { Badge } from "~/components/ui/badge";
import ServiceBabak from "~/actions/babak";
import AddBabak from "./AddBabak";

function Babak({ pertandingan }: { pertandingan: number }) {
  const { data } = useQuery({
    queryKey: ["babak"],
    queryFn: async () => {
      if (pertandingan) {
        return await ServiceBabak.all(pertandingan.toString());
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: pertandingan !== undefined,
  });

  return (
    <>
      <div>
        <h1 className="font-bold text-xl">Babak</h1>
      </div>

      <AddBabak pertandingan_id={parseInt(pertandingan.toString())} />
      <Table className="mt-10">
        <TableCaption>Panitia Kegiatan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timer</TableHead>
            <TableHead>Waktu Mulai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((babak: BabakType) => (
              <TableRow key={babak.id}>
                <TableCell>{babak.no}</TableCell>
                <TableCell>
                  {/* <Badge
                    variant={babak.status === "ADMIN"}
                  >
                    {user.role}
                  </Badge> */}
                  {babak.status}
                </TableCell>
                <TableCell>{babak.timer} detik</TableCell>
                {/* <TableCell>{new Date(babak.waktu_mulai).toString()}</TableCell> */}
                <TableCell className="space-x-4">
                  <Button variant={"destructive"} size="icon">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Babak;
