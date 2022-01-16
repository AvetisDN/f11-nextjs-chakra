import ArticlesGrid from '../components/ArticlesGrid'
import Seo from '../components/Seo'
import { fetchAPI } from '../lib/api'

export default function Home({articles, pagination}) {
  return (
    <div>
      <Seo/>
      <ArticlesGrid articles={articles} />
    </div>
  )
}

export async function getStaticProps() {
  const articles = await fetchAPI('/articles?populate=*&sort=updatedAt:desc')
  return {
    props: {
      articles: articles.data,
      pagination: articles.meta.pagination
    }
  }
}