import { Navigate, Outlet, useLoaderData } from "react-router";

export default function Protected() {
  const user = useLoaderData();
  console.log(user);

  return user ? <Outlet /> : <Navigate to="/login" replace={true} />;
}
