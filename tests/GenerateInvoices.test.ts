import GenerateInvoices from "../src/GenerateInvoices";

test("Deve gerar as notas fiscais por regime de caixa", async function () {
  const generateInvoices = new GenerateInvoices();
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
  const generateInvoices = new GenerateInvoices();
  const input = {
    month: 1,
    year: 2022,
    type: "accrual" as const,
  };
  const output = await generateInvoices.execute(input);
  expect(output[0]?.date).toBe("2022-01-01");
  expect(Number(output[0]?.amount)).toBe(500);
  
});
