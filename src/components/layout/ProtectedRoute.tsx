import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ServiceAuth from "../../actions/authentication";
// import { User } from "@/types";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isPending, isError } = useQuery({
    queryKey: ["isAuth"],
    queryFn: ServiceAuth.isAuth,
    staleTime: Infinity,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
