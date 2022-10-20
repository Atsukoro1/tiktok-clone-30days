// Cypher queries to manipulate user nodes
export const createUserQuery = `
    CREATE (u:USER {
        id: $id,

        username: $username, 
        password: $password, 

        email: $email,
        emailVerified: $emailVerified,
        emailVerificationCode: $emailVerificationCode,

        lastUserAgent: $lastUserAgent,
        lastIpAddr: $lastIpAddr,

        twoFactorEnabled: $twoFactorEnabled,
        twoFactorSecret: $twoFactorSecret
    })
    RETURN u
`

export const getUserByEmailQuery = `
    MATCH (u:USER {
        email: $email
    })
    RETURN u
    LIMIT 1;
`;

export const getUserByIdQuery = `
    MATCH (u:USER {
        id: $id
    })
    RETURN u
    LIMIT 1;
`;

export const updateUserSecurityQuery = `
    MATCH (us)
    WHERE us.id = "$id"
    SET us.lastIpAddr = "$lastIpAddr"
    SET us.lastUserAgent = "$lastUserAgent"
    RETURN (us)
`;

export const set2FASecret = `
    MATCH (u:USER {
        id: $id
    })
    SET u.twoFactorSecret = $twoFactorSecret
    RETURN u
`;

export const enable2FAquery = `
    MATCH (u:USER {
        id: $id
    })
    SET u.twoFactorEnabled = true
    RETURN u
`;

export const changePasswordQuery = `
    MATCH (u:USER {
        id: $id
    })
    SET u.password = $password
    SET u.emailVerificationCode = $emailVerificationCode
    RETURN u
`;

export const followQuery = `
    MATCH (u1:USER { id: $user1 }) 
    MATCH (u2:USER { id: $user2 })
    MERGE (u1)-[r:FOLLOW {
        date: date($createdAt)
    }]->(u2)
    RETURN r;
`;

export const unfollowQuery = `
    MATCH (u:USER)-[r:FOLLOW]->(u2:USER)
    WHERE u.id = $user1 AND u2.id = $user2
    DELETE r    
    RETURN r;
`

export const blockQuery = `
    MATCH (u1:USER { id: $user1 }) 
    MATCH (u2:USER { id: $user2 })
    MERGE (u1)-[r:BLOCK {
        date($createdAt)
    }]->(u2)
    RETURN r;
`;

export const unblockQuery = `
    MATCH (u:USER)-[r:BLOCK]->(u2:USER)
    WHERE u.id = $user1 AND u2.id = $user2
    DELETE r    
    RETURN r;
`;

export const getRelationshipsQuery = `
    MATCH 
    (u1:USER { id: $u1 })
    -[r]->
    (u2:USER { id: $u2 })
    RETURN r
`;

export const getFollowingQuery = `
    MATCH 
        (u:USER { id: $id }),
        (u)-[:FOLLOW]->(targ)
    RETURN u
    SKIP $skip
    LIMIT $limit
`;

export const getFollowersQuery = `
    MATCH
        (u:USER { id: $id }),
        (targ)-[:FOLLOW]->(u)
    RETURN u
    SKIP $skip
    LIMIT $limit
`;

export const getBlockedQuery = `
    MATCH
        (u:USER { id: $id }),
        (u)-[:BLOCK]->(targ)
    RETURN u
    SKIP $skip
    LIMIT $limit
`;

