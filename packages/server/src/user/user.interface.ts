export interface User extends Document {
    readonly username: String
    readonly password: String,
    readonly email: String,
    readonly lastUserAgent: String,
    readonly lastIpAddr: String,
    readonly emailVerificationCode: String,
}