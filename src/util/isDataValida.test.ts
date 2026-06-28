import { describe, it, expect } from "vitest";
import isDataValida from "./isDataValida";

describe("isDataValida", () => {
  it("deve retornar true para uma data válida no formato YYYY-MM-DD", () => {
    expect(isDataValida("2025-01-15")).toBe(true);
    expect(isDataValida("2000-12-31")).toBe(true);
    expect(isDataValida("1999-06-01")).toBe(true);
  });

  it("deve retornar false para formato incorreto (DD/MM/YYYY)", () => {
    expect(isDataValida("15/01/2025")).toBe(false);
  });

  it("deve retornar false para formato incorreto (DD-MM-YYYY)", () => {
    expect(isDataValida("15-01-2025")).toBe(false);
  });

  it("deve retornar false para string vazia", () => {
    expect(isDataValida("")).toBe(false);
  });

  it("deve retornar false para data com mês inválido (mês 13)", () => {
    expect(isDataValida("2025-13-01")).toBe(false);
  });

  it("deve retornar false para data com dia inválido (dia 32)", () => {
    expect(isDataValida("2025-01-32")).toBe(false);
  });

  it("deve retornar false para texto que não é data", () => {
    expect(isDataValida("abcde")).toBe(false);
  });
});
