import { Center } from "@chakra-ui/react"
import { ReactNode } from "react"

const AuthContainer = ({children}:{children: ReactNode}) => {
  return (
    <Center  style={{minHeight: '100vh'}}>
      {children}
    </Center>
  )
}

export default AuthContainer
