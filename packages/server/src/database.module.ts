import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const databaseProvider = [{
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => 
        mongoose.connect(process.env.MONGO_URI)
}]

@Module({
    providers: [...databaseProvider],
    exports: [...databaseProvider]
})
export class DatabaseModule {};