import { Box, chakra } from '@chakra-ui/react';
import Image from 'next/image';
import moment from 'moment'
import { fetchAPI } from '../../lib/api'
import { getStrapiMedia } from '../../lib/media'
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'


export default function Article({article}) {
    const categories = article.categories.data
    return (
        <Box
            bg={'gray.50'}
            p={{base: 3, md: 4, xl: 6}}
            rounded={'xl'}
            shadow={'lg'}
        >
            <Box
                d={'flex'}
                flexDir={{base: 'column', md: 'row'}}
                mb={6}
                gap={{base: 3, md: 4, xl: 6}}
            >
                <Box
                    w={'100%'}
                    maxW={{base: '100%', md: '50%', lg: '35%'}}
                >
                    <Image
                        src={getStrapiMedia(article.Image.data.attributes.url)}
                        alt=''
                        width={1500}
                        height={1500}
                        maxW={'100%'}
                        objectFit='cover'
                    />
                </Box>
                <Box>
                    <chakra.h1
                        fontSize={{base: 20, md:24, xl:32}}
                        fontWeight={900}
                        mb={2}
                    >
                        {article.Title}
                    </chakra.h1>
                    <chakra.div>
                        {   
                            moment().unix() - moment(article.updatedAt).unix() > 3*24*3600
                                ? moment(article.updatedAt).format('MMMM Do YYYY, H:mm:ss')
                                : moment(article.updatedAt).fromNow()
                        }
                    </chakra.div>
                    <Box
                        d={'flex'}
                        gap={2}
                        flexWrap={'wrap'}
                    >
                        {
                            categories.length > 0 &&
                                categories.map( cat => (
                                    <Link href={`/category/${cat.attributes.Slug}`} key={cat.id} passHref>
                                        <chakra.a
                                            color={'blue.600'}
                                            _hover={{color: 'red.500'}}
                                        >
                                            {cat.attributes.Title}
                                        </chakra.a>
                                    </Link>
                                ))
                        }
                    </Box>
                    <Box as={'p'} my={4}>
                        {article.Description}
                    </Box>
                </Box>
            </Box>
            <Box>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {article.Content}
                </ReactMarkdown>
            </Box>
        </Box>
    )
}


export async function getStaticPaths() {
    const articles = await fetchAPI('/articles')

    return {
        paths: articles.data.map(article => ({
            params: {
                slug: article.attributes.Slug
            }
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const article = await fetchAPI(`/articles?filters[Slug][$eq]=${params.slug}&populate=*`)
    return {
        props: {
            article: article.data[0].attributes,
        }
    }
}