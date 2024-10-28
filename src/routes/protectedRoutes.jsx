import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ allowedRole, element }) {
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to={"/root/nouserfound"} />;
  }
  if (allowedRole && allowedRole !== role) {
    return <Navigate to={"/root/unauthorized"} />;
  }
  return element;
}
