import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import ContractRepository from "../src/ContractRepository";
import GenerateInvoices from "../src/GenerateInvoices";

let generateInvoices: GenerateInvoices;

beforeEach(() => {
  const contractRepository: ContractRepository = {
    async list(): Promise<any[]> {
      return [
        {
          id_contract: 1,
          description: "Contract 1",
          date: new Date("2022-01-01T00:00:00"),
          amount: 6000,
          periods: 12,
          payments: [
            {
              date: new Date("2022-01-01T00:00:00"),
              amount: 6000,
            },
          ],
        },
      ];
    }
  }
  generateInvoices = new GenerateInvoices(contractRepository);
})

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
      return [
        {
          id_contract: 1,
          description: "Contract 1",
          date: new Date("2022-01-01T00:00:00"),
          amount: 6000,
          periods: 12,
          payments: [
            {
              date: new Date("2022-01-01T00:00:00"),
              amount: 6000,
            }
          ],
        },
      ];
    }
  };
  const input = {
    month: 1,
    year: 2022,
    type: "accrual" as const,
  };
  const output = await generateInvoices.execute(input);
  expect(output[0]?.date).toBe("2022-01-01");
  expect(Number(output[0]?.amount)).toBe(500);

});
