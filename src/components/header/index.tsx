import { Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, Hide, Show, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/auth';

const logOut = () => {
  Cookies.remove('FEUToken');
  Cookies.remove('FEUser');
  location.href = '/login';
}

const Header = () => {

  const {isAdmin} = useContext(AuthContext);

  const [drawerOpen,setDrawerOpen] = useState(false);

  return (
    <header>
        <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        paddingTop={6}
        paddingBottom={6}
        bg="teal.500"
        color="white"
      >
        <Container maxW={'6xl'}>
          <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
          >

            <Flex align="center" mr={5}>
              <Link to="/">
                <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                  FamilyExpenses
                </Heading>
              </Link>
            </Flex>

            <Stack
              direction={{ base: "column", md: "row" }}
              display={{ base: true ? "block" : "none", md: "flex" }}
              width={{ base: "full", md: "auto" }}
              alignItems="center"
              flexGrow={1}
              fontWeight='bold'
              mt={{ base: 4, md: 0 }}
            >

              <Show below='md'>
                <Button colorScheme='teal' onClick={() => setDrawerOpen(prev => !prev)}>
                  <HamburgerIcon />
                </Button>
              </Show>
              <Hide below='md'>
                <Link to="/outlays">
                  Outlays
                </Link>
                {
                  isAdmin && 
                  <>
                     <Link to="/users">
                        Users
                      </Link>
                      <Link to="/materials">
                        Materials
                      </Link>
                      <Link to="/outlay-types">
                        Outlay Types
                      </Link>
                      <Link to="/reports">
                        Reports
                      </Link>
                  </>
                }
              </Hide>
            </Stack>
            <Hide below='md'>
              <Box
                display={{ base: true ? "block" : "none", md: "block" }}
                mt={{ base: 4, md: 0 }}
              >
                <Button
                  onClick={logOut}
                  variant="outline"
                  _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                >
                  Log Out
                </Button>
              </Box>
          </Hide>
          </Flex>
        </Container>
      </Flex>

      <Drawer
        isOpen={drawerOpen}
        placement='left'
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Stack
            direction={{ base: "column"}}
            width={{ base: "full", md: "auto" }}
            alignItems="right"
            flexGrow={1}
            fontWeight='bold'
            spacing={5}
            marginTop={10}
          >
            <Link to="/outlays">
              Outlays
            </Link>
            {
              isAdmin && 
              <>
                  <Link to="/users">
                    Users
                  </Link>
                  <Link to="/materials">
                    Materials
                  </Link>
                  <Link to="/outlay-types">
                    Outlay Types
                  </Link>
                  <Link to="/reports">
                    Reports
                  </Link>
              </>
            }
            <Show below='md'>
              <Box
                display={{ base: true ? "block" : "none", md: "block" }}
                mt={{ base: 4, md: 0 }}
              >
                <Button
                  onClick={logOut}
                  variant="outline"
                  _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                >
                  Log Out
                </Button>
              </Box>
            </Show>
          </Stack>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
      
    </header>
  )
}

export default Header
