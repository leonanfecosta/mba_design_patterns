import moment from "moment";
import ContractRepository from "./ContractRepository";

export default class GenerateInvoices {
  constructor(readonly contractRepository: ContractRepository) { }
  async execute(input: Input): Promise<Output[]> {

    const output: Output[] = [];
    const contracts = await this.contractRepository.list();
    for (const contract of contracts) {
      const invoices = contract.generateInvoices(input.month, input.year, input.type);
      for (const invoice of invoices) {
        output.push({
          date: moment(invoice.date).format("YYYY-MM-DD"),
          amount: invoice.amount,
        });
      }
    }
    return output;
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
