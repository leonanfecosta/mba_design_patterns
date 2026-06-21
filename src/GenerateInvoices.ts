import moment from "moment";
import pgp from "pg-promise";

export default class GenerateInvoices {
  async execute(input: Input): Promise<Output[]> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const contracts = await connection.query("SELECT * FROM design_patterns.contract");
    const invoices: Output[] = [];
    for (const contract of contracts) {
      if (input.type === "cash") {
        const payments = await connection.query("SELECT * FROM design_patterns.payment WHERE id_contract = $1", [contract.id_contract]);

        for (const payment of payments) {
          if (payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;
          invoices.push({
            date: moment(payment.date).format("YYYY-MM-DD"),
            amount: parseFloat(payment.amount),
          });
        }
      }
      if (input.type === "accrual") {
        let period = 0;
        while (period <= contract.periods) {
          const date = moment(contract.start_date).add(period++, "months").toDate();
          if (date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue;
          const amount = parseFloat(contract.amount) / contract.periods;
          invoices.push({
            date: moment(date).format("YYYY-MM-DD"),
            amount,
          });
        }
      }

    }
    await connection.$pool.end();
    return invoices;
  }
}

type Input = {
  month: number;
  year: number;
  type: "cash" | "accrual";
};

type Output = {
  date: string;
  amount: number;
};
