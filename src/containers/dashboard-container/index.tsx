import { Container } from "@chakra-ui/react"
import Header from "../../components/header"

const DashboardContainer = ({children}:{children: JSX.Element}) => {
  return (
      <>
        <Header />
        <Container maxW={'6xl'}>
          {children}
        </Container>
      </>
  )
}

export default DashboardContainer
