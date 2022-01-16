import Head from "next/head"
import { useContext } from "react"
import { GlobalContext } from "../pages/_app"
import {getStrapiMedia} from '../lib/media'


const Seo = ({ seo }) => {
    const {global} = useContext(GlobalContext)
    const seoWithDefault = {
        ...global,
        ...seo,
    }
    console.log(seoWithDefault);
    const seoFull = {
        ...seoWithDefault,
        MetaTitle: `${seoWithDefault.MetaTitle} | ${seoWithDefault.SiteName}`,
        ShareImage: getStrapiMedia(seoWithDefault.ShareImage.data.attributes.url)
    }
    return (
        <Head>
            {seoFull.MetaTitle && (
                <>
                    <title>{seoFull.MetaTitle}</title>
                    <meta property="og:title" content={seoFull.MetaTitle} />
                    <meta name="twitter:title" content={seoFull.MetaTitle} />
                </>
            )}
            {seoFull.MetaDescription && (
                <>
                    <meta name="description" content={seoFull.MetaDescription} />
                    <meta property="og:description" content={seoFull.MetaDescription} />
                    <meta name="twitter:description" content={seoFull.MetaDescription} />
                </>
            )}
            {seoFull.ShareImage && (
                <>
                    <meta name="image" content={seoFull.ShareImage} />
                    <meta property="og:image" content={seoFull.ShareImage} />
                    <meta name="twitter:image" content={seoFull.ShareImage} />
                    <meta name="twitter:card" content="summary_large_image" />
                </>
            )}
        </Head>
    )
}

export default Seo
