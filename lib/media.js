export function getStrapiMedia(media) {
    return `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:1337"}${media}`
}