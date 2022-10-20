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

export const likePostQuery = `
    MATCH (u:USER), (p)
    WHERE 
        p.id = $pid AND u.id = $uid
        AND (LABELS(p) = ['POST'] OR LABELS(p) = ['COMMENT'])
    MERGE (u)-
        [r:LIKE {
            createdAt: date($createdAt)
        }]
    ->(p)
    RETURN type(r);
`;

export const getPostByIdQuery = `
    MATCH (p:POST)
    WHERE p.id = $pid
    RETURN p;
`;

export const getPostOrCommentQuery = `
    MATCH (n) 
    WHERE 
        n.id = $pid
        AND (LABELS(n) = ['POST'] OR LABELS(n) = ['COMMENT'])
    RETURN n;
`;

export const getPostOrCommenAuthorQuery = `
    MATCH (n), (u)-[r:CREATED]->(n)
    WHERE 
        n.id = $pid
        AND (LABELS(n) = ['POST'] OR LABELS(n) = ['COMMENT'])
    RETURN n, u;
`;

export const unlikePostQuery = `
    MATCH (u:USER)-[r:LIKE]->(p:POST)
    WHERE p.id = $pid AND u.id = $uid
    DETACH DELETE r;
`;

export const sharePostQuery = `
    MATCH (u:USER), (p:POST)
    WHERE p.id = $pid AND u.id = $uid
    MERGE (u)-
        [r:SHARE {
            createdAt: date($createdAt)
        }]
    ->(p);
`;

export const commentPostQuery = `
    MATCH 
        (us:USER { id: $uid }),
        (po:POST { id: $pid })
    CREATE (c:COMMENT {
        content: $content,
        id: $id
    })
    CREATE (us)-[:CREATED { 
        createdAt: date($createdAt) }
    ]->(c)
    CREATE (c)-[:COMMENT {
        createdAt: date($createdAt) }
    ]->(po);
`;

export const deleteCommentQuery = `
    MATCH (c:COMMENT), ()-[r]-(c)
    WHERE c.id = $cid
    DETACH DELETE r, c;
`;