export interface User extends Document {
    _id: any;
    [x: string]: any;
    username: String
    password: String,
    email: {
        primary: String,
        verified: Boolean,  
        verificationCode: String
    },
    lastUserAgent: String,
    lastIpAddr: String,
    emailVerificationCode: String,
}