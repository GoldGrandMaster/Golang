import { Outlet } from "react-router-dom";
import Appbar from "../components/Appbar";

export default function WithAppbar() {
  return <>
    <Appbar />
    <Outlet />
  </>
}