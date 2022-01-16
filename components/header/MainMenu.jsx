import { Flex, Button } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import Categories from "./Categories"

const MainMenu = (props) => {
    const router = useRouter()
    return (
        <Flex 
            fontSize={'1.25rem'} 
            fontWeight={'500'} 
            direction={{base: 'column', lg: 'row'}}
            alignItems={{base: 'flex-start', lg: 'center'}}
        >
            <Link passHref href={'/'}>
                <Button as='a'
                    bg='transparent'
                    _hover={{ bg: 'blackAlpha.300' }}
                    _active={{ bg: 'transparent' }}
                    _focus={{ outline: 'none' }}
                    onClick={props.onClose}
                    className={router.pathname === '/' ? 'active' : ''}
                >
                    Home
                </Button>
            </Link>
            <Categories/>
        </Flex>
    )
}

export default MainMenu
