import { useContext } from "react";

import Wrapper from "~/components/layout/Wrapper";
import { UserContext } from "~/context/user";
export default function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <Wrapper>
        <h1 className="font-bold text-2xl">Selamat datang {user.role}</h1>
    </Wrapper>
  );
}
