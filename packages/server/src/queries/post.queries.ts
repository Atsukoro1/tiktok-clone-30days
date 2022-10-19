export const createPostQuery = `
    CREATE (p:POST {
        id: $id,
        caption: $caption,
        tags: $tags
    })
`;

export const connectAuthorToPostQuery = `
    MATCH (u:USER), (p:POST)
    WHERE u.id = $u AND p.id = $p
    MERGE (u)-[r:CREATED { createdAt: date($createdAt) }]->(p)
    RETURN type(r);
`;