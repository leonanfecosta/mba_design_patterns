import pgPromise from "pg-promise";
import DatabaseConnection from "./DatabaseConnection";

export default class PgPromiseAdapter implements DatabaseConnection {
  connection: any;
  constructor() {
    this.connection = pgPromise()("postgres://postgres:postgres@localhost:5432/app");

  }
  async query(statement: string, params: any): Promise<any[]> {
    return await this.connection.query(statement, params);
  }
  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
