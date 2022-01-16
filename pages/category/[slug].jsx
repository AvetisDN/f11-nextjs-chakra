import { chakra } from '@chakra-ui/react'
import ArticlesGrid from '../../components/ArticlesGrid'
import Seo from '../../components/Seo'
import { fetchAPI } from '../../lib/api'

export default function Category({ category, articles, pagination }) {
    console.log(category.Image.data);
    const seo = {
        MetaTitle: category.Title,
        MetDescription: category.Description,
        ShareImage: category.Image
    }
    return (
        <div>
            <Seo seo={seo} />
            <chakra.h1
                fontSize={{base: 20, md:24, xl:32}}
                fontWeight={900}
                mb={2}
            >
                {category.Title}
            </chakra.h1>
            <ArticlesGrid articles={articles} />
        </div>
    )
}

export async function getStaticPaths() {
    const categories = await fetchAPI('/categories')

    return {
        paths: categories.data.map(cat => ({
            params: {
                slug: cat.attributes.Slug
            }
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const category = await fetchAPI(`/categories?filters[Slug][$eq]=${params.slug}&populate[articles][populate][0]=Image&populate[Image]=*&sort=updatedAt:desc`)
    return {
        props: {
            category: category.data[0].attributes,
            articles: category.data[0].attributes.articles.data,
            pagination: {
                page: 1,
                pageSize: 25,
                pageCount: Math.ceil(category.data[0].attributes.articles.data / 25),
                total: category.data[0].attributes.articles.data.length
            }
        }
    }
}