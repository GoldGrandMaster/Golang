import { useContext } from "react"
import { authContext } from "../providers/AuthProvider"

export default () => (
  useContext(authContext)
)