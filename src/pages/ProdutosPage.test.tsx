import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProdutosPage from "./ProdutosPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";

describe("ProdutosPage", () => {
  it("remove um produto de forma otimista", async () => {
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProdutosPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.findByRole("heading", { name: /lista de produtos/i });
    expect(screen.getByRole("link", { name: /banana verde/i })).toBeInTheDocument();

    const removerButtons = screen.getAllByRole("button", { name: /remover/i });
    await user.click(removerButtons[0]);

    await waitFor(() => {
      expect(screen.queryByRole("link", { name: /banana verde/i })).not.toBeInTheDocument();
    });

    expect(screen.getByRole("link", { name: /tomate/i })).toBeInTheDocument();
  });
});