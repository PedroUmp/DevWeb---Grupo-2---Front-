import { describe, it, expect } from "vitest";
import isErrorResponse from "./isErrorResponse";

describe("isErrorResponse", () => {
  it("deve retornar true quando o objeto tem campo requestUri do tipo string", () => {
    const erro = {
      requestUri: "/api/produtos/99",
      message: "Produto não encontrado",
      status: 404,
    };
    expect(isErrorResponse(erro)).toBe(true);
  });

  it("deve retornar false quando requestUri não existe", () => {
    const erro = { message: "Erro genérico", status: 500 };
    expect(isErrorResponse(erro)).toBe(false);
  });

  it("deve retornar false quando requestUri não é string", () => {
    const erro = { requestUri: 123 };
    expect(isErrorResponse(erro)).toBe(false);
  });

  it("deve retornar false para null", () => {
    expect(isErrorResponse(null)).toBeFalsy();  // ← fica assim
  });

  it("deve retornar false para undefined", () => {
    expect(isErrorResponse(undefined)).toBeFalsy();  // ← fica assim
  });

  it("deve retornar false para string simples", () => {
    expect(isErrorResponse("erro inesperado")).toBe(false);
  });
});
