import { useState } from "react"
import { createContainer } from "unstated-next"
import * as userProvider from "@/providers/UserProvider"

// ----------------------------------------------------------------------

const useUser = () => {
  const [user, setUser] = useState(userProvider.getUser())

  return {user, setUser}
}

const Container = createContainer(useUser)
export default Container
