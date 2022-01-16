import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { useContext } from "react"
import { GlobalContext } from "../../pages/_app"
import { useRouter } from "next/router";

export default function Categories() {
    const { categories } = useContext(GlobalContext)
    const router = useRouter()
    return (
        <Menu>
            <MenuButton
                as={Button}
                bg='transparent'
                _hover={{ bg: 'blackAlpha.300' }}
                _active={{ bg: 'transparent' }}
                _focus={{ outline: 'none' }}
                rightIcon={<FaChevronDown />}
            >
                Categories ({categories.length})
            </MenuButton>
            <MenuList>
                {categories.map(cat => (
                    <MenuItem
                        color={'blackAlpha.700'}
                        key={cat.id}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch'
                        }}
                    >
                        <Link
                            href={`/category/${cat.attributes.Slug}`}
                        >
                            <a
                            className={router.pathname === `/category/${cat.attributes.Slug}` ? 'active' : ''}>
                                {cat.attributes.Title}
                            </a>
                        </Link>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}
