import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

export default function PrivateRoutes({ roles }: { roles?: string[] }) {
  const { isLoggedIn, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn || (roles && roles.every((role) => role !== user?.role)))
        navigate("/login");
    }
  }, [isLoggedIn, user, loading]);


  return (
    <>
      <Outlet />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
