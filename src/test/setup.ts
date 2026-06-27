import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { queryClient } from "../queryClient";
import useLoginStore from "../store/LoginStore";
import useProdutoStore from "../store/ProdutoStore";
import useTokenStore from "../store/TokenStore";
import { resetMockData, server } from "./msw/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
  resetMockData();

  useTokenStore.setState({
    tokenResponse: { token: "", idUsuario: 0, nome: "", role: "" },
  });

  useLoginStore.setState({
    loginInvalido: false,
    msg: "",
  });

  useProdutoStore.setState({
    pagina: 0,
    tamanho: 5,
    nome: "",
    idRemovendo: null,
    mensagem: "",
    produtoSelecionado: {} as any,
  });
});

afterAll(() => {
  server.close();
});