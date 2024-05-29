import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoutes({ roles }: { roles?: string[] }) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || (roles && roles.every((role) => role !== user?.role)))
      navigate("/login");
  }, [isLoggedIn, user]);

  return <Outlet />
}
