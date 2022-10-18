import * as queries from "./queries/user.queries";
import { Injectable } from "@nestjs/common";
import { driver } from "src/main";

@Injectable()
export class DatabaseService {
    private readonly queries = queries;
    private readonly dbDriver = driver;

    constructor() {}

    public async createUser(params: any): Promise<any> {
        let session = this.dbDriver.session();

        session.run(this.queries.createUserQuery, params)
            .then((result) => {
                session.close();
                return result;
            })
            .catch((err) => {
                session.close();
                throw err;
            });
    }

    public async deleteUser() {
        return 'User deleted';
    }
}