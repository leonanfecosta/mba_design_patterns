import pgPromise from "pg-promise";
import ContractRepository from "./ContractRepository";

export default class ContractDatabaseRepository implements ContractRepository {
  async list(): Promise<any[]> {
    const connection = pgPromise()("postgres://postgres:postgres@localhost:5432/app");
    const contracts = await connection.query("SELECT * FROM design_patterns.contract");
    for (const contract of contracts) {
      contract.payments = await connection.query("SELECT * FROM design_patterns.payment WHERE id_contract = $1", [contract.id_contract]);
    }
    await connection.$pool.end();
    return contracts;
  }
}

