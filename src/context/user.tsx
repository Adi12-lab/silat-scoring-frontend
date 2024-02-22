import { createContext, useState } from "react";
import { User, UserContextType } from "~/schema";
export const UserContext = createContext<UserContextType>({
  user: {
    id: "",
    kegiatan_id: "",
    role: "JURI",
    username: "",
  },
  setUser: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    id: "",
    kegiatan_id: "",
    role: "JURI",
    username: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
