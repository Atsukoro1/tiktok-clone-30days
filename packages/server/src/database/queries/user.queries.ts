// Cypher queries to manipulate user nodes

export const createUserQuery = `
    CREATE (u:USER {
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