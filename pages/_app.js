import { ChakraProvider } from '@chakra-ui/react'
import App from 'next/app'
import theme from '../lib/theme'
import Layout from '../components/Layout'
import { createContext } from 'react'
import { fetchAPI } from '../lib/api'
import { getStrapiMedia } from '../lib/media'
import Head from 'next/head'
import '../styles/app.css'

export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {

  const { global, categories } = pageProps

  return (
    <>
      <Head>
        <link rel='shortcut icon' href={getStrapiMedia(global.favicon.data.attributes.url)} />
      </Head>
      <GlobalContext.Provider value={{global, categories}}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </GlobalContext.Provider>
    </>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx)
  const global = await fetchAPI('/global?populate=*')
  const categories = await fetchAPI('/categories?populate=localizations')
  return {
    ...appProps,
    pageProps: {
      global: global.data.attributes,
      categories: categories.data
    }
  }
}

export default MyApp
