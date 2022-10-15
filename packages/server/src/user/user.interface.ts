export interface User extends Document {
    _id: any;
    [x: string]: any;
    username: String
    password: String,
    email: String,
    lastUserAgent: String,
    lastIpAddr: String,
    emailVerificationCode: String,
}