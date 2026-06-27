import type { ReactElement, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { queryClient } from "../queryClient";

type ProviderProps = {
  children: ReactNode;
  initialEntries?: string[];
};

const TestProviders = ({ children, initialEntries = ["/"] }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (ui: ReactElement, initialEntries?: string[]) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders initialEntries={initialEntries}>{children}</TestProviders>
    ),
  });
};

export const renderHookWithProviders = <Result, Props>(
  callback: (props: Props) => Result,
  initialEntries?: string[],
) => {
  return renderHook(callback, {
    wrapper: ({ children }) => (
      <TestProviders initialEntries={initialEntries}>{children}</TestProviders>
    ),
  });
};