import { AddIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <ButtonGroup gap={4} display={'flex'} flexWrap='wrap' colorScheme={'teal'} marginTop={50}>
      <Button margin={0} rightIcon={<AddIcon />}>
        <Link to={'/outlays'}>Add New Outlay</Link>
      </Button>
      <Button margin={0} rightIcon={<AddIcon />}>
        <Link to={'/users'}>Add New User</Link>
      </Button>
      <Button margin={0} rightIcon={<AddIcon />}>
        <Link to={'/outlay-types'}>Add New Outlay Type</Link>
      </Button>
      <Button margin={0} rightIcon={<AddIcon />}>
        <Link to={'/materials'}>Add New Material</Link>
      </Button>
    </ButtonGroup>
  )
}

export default Home
