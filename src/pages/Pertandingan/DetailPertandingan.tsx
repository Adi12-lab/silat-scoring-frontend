import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ServicePertandingan from "~/actions/pertandingan";

import Wrapper from "~/components/layout/Wrapper";

import Babak from "../Babak/Babak";

function DetailPertandingan() {
  const { pertandingan } = useParams();
  const { data } = useQuery({
    queryKey: ["pertandingan", { id: pertandingan }],
    queryFn: async () => {
      if (pertandingan) {
        return await ServicePertandingan.find(parseInt(pertandingan));
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: pertandingan !== undefined,
  });

  return (
    <Wrapper>
      <h1 className="font-bold text-2xl">Detail Pertandingan</h1>
      {/* <p>{JSON.stringify(data)}</p> */}
      <table>
        <tbody>
          <tr>
            <th className="w-[200px] text-left">Gelanggang</th>
            <td className="w-[30px]">:</td>
            <td>{data.gelanggang}</td>
          </tr>
          <tr>
            <th className="text-left">Sudut Merah</th>
            <td>:</td>
            <td>{data.sudut_merah.nama}</td>
          </tr>
          <tr>
            <th className="text-left">Sudut Biru</th>
            <td>:</td>
            <td>{data.sudut_biru.nama}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-10">
        <Babak pertandingan={parseInt(pertandingan as string)} />
      </div>
    </Wrapper>
  );
}

export default DetailPertandingan;
