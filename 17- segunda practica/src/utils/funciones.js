export function createPaginationLink(req, page) {
    const queryParams = { ...req.query, page };
    const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    return `${req.baseUrl}${req.path}?${queryString}`;
}
