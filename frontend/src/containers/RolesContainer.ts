import { useCallback, useState } from "react"
import { createContainer } from "unstated-next"
import * as rolesProvider from "@/providers/RolesProvider"

// ----------------------------------------------------------------------

const useRoles = () => {
  const roles = rolesProvider.getRoles()
  const [currRole, setCurrRole] = useState(roles[0])

  const changeCurrentRole = useCallback((id: number) => {
    setCurrRole(roles[id])
  }, [])

  return {roles, currRole, changeCurrentRole}
}

const Container = createContainer(useRoles)
export default Container
