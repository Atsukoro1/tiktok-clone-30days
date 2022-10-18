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