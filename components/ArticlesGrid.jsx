import { Box, chakra, SimpleGrid } from '@chakra-ui/react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { getStrapiMedia } from '../lib/media'

const ArticlesGrid = ({ articles }) => {
    return (
        <SimpleGrid minChildWidth='440px' spacing='1.5rem'>
            {articles.map(article => (
                <Box
                    key={article.id}
                    d='flex'
                    alignItems='flex-start'
                    gap='1rem'
                    p='1rem'
                    shadow={'lg'}
                    borderRadius={8}
                    bg={'gray.50'}
                >
                    <Link href={`/article/${article.attributes.Slug}`}>
                        <a>
                            <Image
                                src={getStrapiMedia(article.attributes.Image.data.attributes.formats.thumbnail.url)}
                                alt=''
                                width={150}
                                height={150}
                            />
                        </a>
                    </Link>
                    <Box
                        d='flex'
                        flexDirection='column'
                        gap='.5rem'
                    >
                        <Link  href={`/article/${article.attributes.Slug}`}>
                            <a>
                                <chakra.h2
                                    fontSize={18}
                                    fontWeight={700}
                                    lineHeight={1}
                                    _hover={{color: 'whatsapp.600'}}
                                >
                                    {article.attributes.Title}
                                </chakra.h2>
                            </a>
                        </Link>
                        <chakra.span>
                            {   
                                moment().unix() - moment(article.attributes.updatedAt).unix() > 3*24*3600
                                    ? moment(article.attributes.updatedAt).format('MMMM Do YYYY, H:mm:ss')
                                    : moment(article.attributes.updatedAt).fromNow()
                            }
                        </chakra.span>
                    </Box>
                </Box>
            ))}
        </SimpleGrid>
    )
}

export default ArticlesGrid
