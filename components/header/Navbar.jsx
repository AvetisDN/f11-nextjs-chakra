import { Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Link as ChakraLink, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import { FaKiwiBird } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import MainMenu from "./MainMenu"

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box as='header' bg='whatsapp.500' color='white' p={3} shadow={'base'}>
            <Container maxW='container.xl' display='flex' alignItems={'center'} justifyContent={'space-between'}>
                <Link href='/' passHref>
                    <ChakraLink
                        fontSize={'2rem'}
                        fontWeight={'black'}
                        _hover={{ textDecoration: 'none' }}
                        _focus={{ outline: 'none' }}
                        display={'flex'}
                        gap={2}
                    >
                        <FaKiwiBird size={'3rem'} />
                        <Box as='span' sx={{ transform: 'translateY(10px)' }}>
                            Bird
                        </Box>
                    </ChakraLink>
                </Link>
                <Button 
                    bg='transparent' 
                    fontSize={'1.5rem'} 
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }}
                    _focus={{ border: 0, bg: 'blackAlpha.200'}}
                    display={{base: 'inline-block', lg: 'none'}}
                    onClick={onOpen}
                >
                    <HiMenu />
                </Button>
                <Box display={{base: 'none', lg: 'block'}}>
                    <MainMenu />
                </Box>
            </Container>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>
                        Kiwigation
                    </DrawerHeader>
                    <DrawerBody>
                        <MainMenu onClose={onClose}/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Navbar
