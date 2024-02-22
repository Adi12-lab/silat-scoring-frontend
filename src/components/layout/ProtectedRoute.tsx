import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "~/context/user";
import { useQuery } from "@tanstack/react-query";
import ServiceAuth from "../../actions/authentication";
import { Role } from "~/schema";

const ProtectedRoute = ({
  roles,
  children,
}: {
  roles: Role[];
  children?: React.ReactNode;
}) => {
  const { setUser } = useContext(UserContext);
  const { isPending, isError, data } = useQuery({
    queryKey: ["isAuth"],
    queryFn: ServiceAuth.isAuth,
    retry: false,
    staleTime: Infinity,
  });

  
  useEffect(() => { //setelah ter render baru ubah context nya, 
    if (data && roles.includes(data.role)) {
      setUser(data);
    }
  }, [data, roles, setUser]);

  if (isPending) {
    return <span>Loading autentikasi...</span>;
  }

 
  if (isError) {
    return <Navigate to="/login" replace={true} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
