import { createContext, useState } from "react";
import { UserNoPassword } from "~/schema";



export const UserContext = createContext<UserContextType>({
  user: {
    id: "",
    role: "JURI",
    username: "",
  },
  setUser: () => {},
});
export type UserContextType = {
  user: UserNoPassword;
  setUser: React.Dispatch<React.SetStateAction<UserNoPassword>>;
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserNoPassword>({
    id: "",
    role: "JURI",
    username: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
