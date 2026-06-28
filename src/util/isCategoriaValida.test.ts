import { describe, it, expect } from "vitest";
import isCategoriaValida from "./isCategoriaValida";

describe("isCategoriaValida", () => {
  it("deve retornar false quando categoria for 0 (nenhuma selecionada)", () => {
    expect(isCategoriaValida(0)).toBe(false);
  });

  it("deve retornar true quando categoria for um id válido positivo", () => {
    expect(isCategoriaValida(1)).toBe(true);
    expect(isCategoriaValida(5)).toBe(true);
    expect(isCategoriaValida(100)).toBe(true);
  });

  it("deve retornar true quando categoria for um número negativo", () => {
    // IDs negativos não são esperados na API, mas a função aceita qualquer != 0
    expect(isCategoriaValida(-1)).toBe(true);
  });
});
