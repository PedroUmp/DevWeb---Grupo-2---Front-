import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { queryClient } from "../queryClient";
import useTokenStore from "../store/TokenStore";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  it("autentica com sucesso e navega para a home", async () => {
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<h1>Home</h1>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await user.type(screen.getByPlaceholderText(/informe seu email/i), "teste@id.uff.com.br");
    await user.type(screen.getByPlaceholderText(/informe sua senha/i), "123456");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
    });

    expect(useTokenStore.getState().tokenResponse.token).toBe("token-msw-123");
  });
});