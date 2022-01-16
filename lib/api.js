export function getApiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api"}${path}`
}

export async function fetchAPI(path) {
    const requestURL = getApiURL(path)
    const response = await fetch(requestURL)
    const data = await response.json()
    return data
}