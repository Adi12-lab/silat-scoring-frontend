import Wrapper from "~/components/layout/Wrapper";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "~/components/ui/table"
function Kegiatan() {
  return (
    <Wrapper>
      <div>
        <h1 className="font-bold text-xl">Kegiatan</h1>
        <p>Setiap ada kegiatan, maka tambahkan disini. Berguna untuk digunakan event yang lainnya</p>
      </div>

    <Table>
        <TableCaption>Event yang dilaksanakan</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
    </Table>
    </Wrapper>
  );
}

export default Kegiatan;
