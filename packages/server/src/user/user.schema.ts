import { randomString } from './user.helpers';
import * as mongoose from 'mongoose';

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
    },

    twoFactorAuth: {
        default: {
            enabled: false,
            secret: null
        },
        type: Object,

        enabled: {
            type: Boolean,
            default: false
        },

        secret: {
            type: String,
            default: null,
            required: false
        }
    }
});