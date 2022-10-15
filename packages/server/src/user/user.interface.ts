export interface User extends Document {
    username: String
    password: String,
    email: String,
    lastUserAgent: String,
    lastIpAddr: String,
    emailVerificationCode: String,
}