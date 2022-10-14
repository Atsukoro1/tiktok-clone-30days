import * as mongoose from 'mongoose';

const randomString = (): String => {
    return [...Array(10)].map(
        _ => (
            ~~(
                Math.random() * 36
            )
        ).toString(36)
    ).join("")
}

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    lastUserAgent: {
        type: String,
        required: true
    },

    lastIpAddr: {
        type: String,
        required: true
    },

    emailVerificationCode: {
        type: String,
        default: randomString()
    }
});