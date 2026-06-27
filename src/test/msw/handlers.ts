import { delay, http, HttpResponse } from "msw";
import { URL_AUTENTICACAO, URL_BASE, URL_PRODUTOS } from "../../util/constantes";

type ProdutoMock = {
  id: number;
  imagem: string;
  categoria: {
    id: number;
    nome: string;
  };
  nome: string;
  descricao: string;
  disponivel: boolean;
  dataCadastro: string;
  qtdEstoque: number;
  preco: number;
};

const produtosSeed: ProdutoMock[] = [
  {
    id: 1,
    imagem: "/banana.png",
    categoria: { id: 1, nome: "Frutas" },
    nome: "Banana verde",
    descricao: "Banana gostosa.",
    disponivel: true,
    dataCadastro: "2026-06-10",
    qtdEstoque: 15,
    preco: 8.9,
  },
  {
    id: 2,
    imagem: "/tomate.png",
    categoria: { id: 2, nome: "Legumes" },
    nome: "Tomate",
    descricao: "Tomate para molho e salada.",
    disponivel: true,
    dataCadastro: "2026-06-12T00:00:00.000Z",
    qtdEstoque: 20,
    preco: 12.45,
  },
];

const cloneProdutos = () => produtosSeed.map((produto) => ({
  ...produto,
  categoria: { ...produto.categoria },
}));

let produtos = cloneProdutos();

const encontrarProdutoPorId = (id: number) => produtos.find((produto) => produto.id === id);

const calcularRespostaPaginada = (pagina: number, tamanho: number, nome: string) => {
  const filtrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(nome.toLowerCase()),
  );

  const totalDeItens = filtrados.length;
  const totalDePaginas = Math.max(1, Math.ceil(totalDeItens / tamanho));
  const itens = filtrados.slice(pagina * tamanho, pagina * tamanho + tamanho);

  return {
    totalDeItens,
    totalDePaginas,
    paginaCorrente: pagina,
    itens,
  };
};

export const resetMockData = () => {
  produtos = cloneProdutos();
};

export const handlers = [
  http.get(`${URL_BASE}${URL_PRODUTOS}`, () => {
    return HttpResponse.json(produtos);
  }),

  http.get(`${URL_BASE}${URL_PRODUTOS}/paginacao`, ({ request }) => {
    const url = new URL(request.url);
    const pagina = Number(url.searchParams.get("pagina") ?? "0");
    const tamanho = Number(url.searchParams.get("tamanho") ?? "5");
    const nome = url.searchParams.get("nome") ?? "";

    return HttpResponse.json(calcularRespostaPaginada(pagina, tamanho, nome));
  }),

  http.get(`${URL_BASE}${URL_PRODUTOS}/:id`, ({ params }) => {
    const id = Number(params.id);
    const produto = encontrarProdutoPorId(id);

    if (!produto) {
      return HttpResponse.json(
        {
          requestUri: `${URL_BASE}${URL_PRODUTOS}/${id}`,
          errorCode: 404,
          error: "Not Found",
          metodo: "GET",
          message: "Produto não encontrado.",
          map: {},
          localDateTime: new Date().toISOString(),
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(produto);
  }),

  http.post(`${URL_BASE}${URL_AUTENTICACAO}/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; senha?: string };

    if (body.email === "testeadm@id.uff.com.br" && body.senha === "123456") {
      return HttpResponse.json({
        token: "token-teste",
        idUsuario: 7,
        nome: "Administrador",
        role: "ADMIN",
      });
    }

    return HttpResponse.json(
      {
        requestUri: `${URL_BASE}${URL_AUTENTICACAO}/login`,
        errorCode: 401,
        error: "Unauthorized",
        metodo: "POST",
        message: "Email ou senha inválidos.",
        map: {},
        localDateTime: new Date().toISOString(),
      },
      { status: 401 },
    );
  }),

  http.post(`${URL_BASE}${URL_PRODUTOS}`, async ({ request }) => {
    const body = (await request.json()) as Omit<ProdutoMock, "id">;
    const novoProduto = {
      ...body,
      id: Math.max(...produtos.map((produto) => produto.id), 0) + 1,
    };

    produtos = [...produtos, novoProduto];

    return HttpResponse.json(novoProduto, { status: 201 });
  }),

  http.put(`${URL_BASE}${URL_PRODUTOS}`, async ({ request }) => {
    const body = (await request.json()) as ProdutoMock;
    produtos = produtos.map((produto) => (produto.id === body.id ? body : produto));

    return HttpResponse.json(body);
  }),

  http.delete(`${URL_BASE}${URL_PRODUTOS}/:id`, async ({ params }) => {
    const id = Number(params.id);
    produtos = produtos.filter((produto) => produto.id !== id);

    await delay(250);

    return new HttpResponse(null, { status: 204 });
  }),
];