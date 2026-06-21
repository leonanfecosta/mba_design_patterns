import Contract from "../src/Contract";
import ContractRepository from "../src/ContractRepository";
import GenerateInvoices from "../src/GenerateInvoices";
import Payment from "../src/Payment";

let generateInvoices: GenerateInvoices;

beforeEach(() => {
  const contractRepository: ContractRepository = {
    async list(): Promise<any[]> {
      const contract = new Contract(
        "1",
        "Contract 1",
        6000,
        12,
        new Date("2022-01-01T00:00:00")
      );
      contract.addPayment(
        new Payment("payment-1", new Date("2022-01-01T00:00:00"), 6000)
      );
      return [contract];
    }
  };
  generateInvoices = new GenerateInvoices(contractRepository);
});

test("Deve gerar as notas fiscais por regime de caixa", async function () {
  const input = {
    month: 1,
    year: 2022,
    type: "cash" as const,
  };
  const output = await generateInvoices.execute(input);
  expect(output[0]?.date).toBe("2022-01-01");
  expect(Number(output[0]?.amount)).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competência", async function () {
  const contractRepository: ContractRepository = {
    async list(): Promise<any[]> {
      const contract = new Contract(
        "1",
        "Contract 1",
        6000,
        12,
        new Date("2022-01-01T00:00:00")
      );
      contract.addPayment(
        new Payment("payment-1", new Date("2022-01-01T00:00:00"), 6000)
      );
      return [contract];
    }
  };
  const generateInvoicesLocal = new GenerateInvoices(contractRepository);
  const input = {
    month: 1,
    year: 2022,
    type: "accrual" as const,
  };
  const output = await generateInvoicesLocal.execute(input);
  expect(output[0]?.date).toBe("2022-01-01");
  expect(Number(output[0]?.amount)).toBe(500);
});
