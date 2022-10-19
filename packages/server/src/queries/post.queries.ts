export const createPostQuery = `
    CREATE (p:POST {
        id: $id,
        url: $url,
        cover: $cover,
        caption: $caption,
        tags: $tags
    })
`;