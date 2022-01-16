import { Box, Container } from "@chakra-ui/react"
import Footer from "./Footer"
import Navbar from "./header/Navbar"

const Layout = ({ children }) => (
    <Box bg={'gray.200'} minH={'100vh'} display={'flex'} flexDirection={'column'} gap={{base: 0, xl: 4}}>
        <Navbar />
        <Container 
            as='main' 
            flexGrow={1} 
            maxW={'container.xl'} 
            color={'gray.800'}
            py={4} 
        >
            {children}
        </Container>
        <Footer />
    </Box>
)

export default Layout