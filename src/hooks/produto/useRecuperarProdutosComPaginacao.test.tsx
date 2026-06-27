import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderHookWithProviders } from "../../test/test-utils";
import useRecuperarProdutosComPaginacao from "./useRecuperarProdutosComPaginacao";

describe("useRecuperarProdutosComPaginacao", () => {
  it("consulta a rota paginada com os parâmetros informados", async () => {
    const { result } = renderHookWithProviders(
      () => useRecuperarProdutosComPaginacao({ pagina: "0", tamanho: "1", nome: "banana" }),
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.totalDeItens).toBe(1);
    expect(result.current.data?.itens).toHaveLength(1);
    expect(result.current.data?.itens[0].nome).toBe("Banana verde");
  });
});