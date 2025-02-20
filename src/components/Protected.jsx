import { Navigate, Outlet } from "react-router";

export default function Protected() {
  const user = null;

  return user ? <Outlet /> : <Navigate to="/login" replace={true} />;
}
