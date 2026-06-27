import { setupServer } from "msw/node";
import { handlers, resetMockData } from "./handlers";

export const server = setupServer(...handlers);

export { resetMockData };