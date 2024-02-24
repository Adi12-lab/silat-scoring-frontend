import { Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Wrapper from "~/components/layout/Wrapper";

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
import { UserNoPassword } from "~/schema";

import { Badge } from "~/components/ui/badge";
import ServiceUser from "~/actions/user";
import AddUser from "./AddUser";

function User() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: ServiceUser.all,
  });

  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">User</h1>
        <p>Ada admin dan juri sebagai panitia kegiatan</p>
      </div>

      <AddUser />
      <Table className="mt-10">
        <TableCaption>Panitia Kegiatan</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((user: UserNoPassword) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "ADMIN" ? "destructive" : "default"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
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

export default User;
