import Contract from "../src/Contract";
import moment from "moment";

test("Deve gerar faturas de um contrato", async function () {
  const contract = new Contract(
    "1",
    "Contract 1",
    6000,
    12,
    new Date("2022-01-01T00:00:00")
  );
  const invoices = contract.generateInvoices(1, 2022, "accrual");
  expect(moment(invoices[0]?.date).format("YYYY-MM-DD")).toBe("2022-01-01");
  expect(Number(invoices[0]?.amount)).toBe(500);
});
