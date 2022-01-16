import { Box, Center } from "@chakra-ui/react"

const Footer = () => {
    // let now = new Da
    return (
        <Box as='footer' p={6} color={'white'} bg='gray.800'>
            <Center>
                &copy; Kiwi Bird, {new Date().getFullYear()}
            </Center>
        </Box>
    )
}

export default Footer
