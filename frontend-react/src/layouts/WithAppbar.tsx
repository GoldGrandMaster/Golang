import { Outlet } from "react-router-dom";
import AppAppBar from "../components/AppAppbar";

export default function WithAppbar() {
  return <>
    <AppAppBar />
    <Outlet />
  </>
}