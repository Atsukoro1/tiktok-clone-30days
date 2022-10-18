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

export const enable2FAquery = `
    MATCH (u:USER {
        id: $id
    })
    SET u.twoFactorEnabled = true
    SET u.twoFactorSecret = $twoFactorSecret
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
    MERGE (u1)-[r:FOLLOW]->(u2)
    RETURN r;
`;

export const unfollowQuery = `
    MATCH (u:USER)-[r:FOLLOW]->(u2:USER)
    WHERE u.id = $user1 AND u2.id = $user2
    DELETE r    
    RETURN r;
`