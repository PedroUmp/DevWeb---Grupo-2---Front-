import { waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useRecuperarProdutos from "./useRecuperarProdutos";
import { renderHookWithProviders } from "../../test/test-utils";

describe("useRecuperarProdutos", () => {
  it("carrega a lista de produtos da API", async () => {
    const { result } = renderHookWithProviders(() => useRecuperarProdutos());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].nome).toBe("Banana verde");
  });
});