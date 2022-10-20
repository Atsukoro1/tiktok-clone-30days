export interface User extends Document {
    id: String;
    username: String
    password: String,
    email: String,
    emailVerified: Boolean,
    emailVerificationCode: String,
    twoFactorEnabled: Boolean,
    twoFactorSecret: String,
    lastUserAgent: String,
    lastIpAddr: String,
}