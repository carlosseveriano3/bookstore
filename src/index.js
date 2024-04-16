import Fastify from "fastify";
import "dotenv/config.js";

import { UserRoutes } from "./routes/users.js";
import { BooksRouter } from "./routes/books.js";
import { validateJwt } from "./middlewares/validate_admin.js";

const app = Fastify();

app.register(UserRoutes);
app.decorate('verifyJwt', validateJwt);
app.register(BooksRouter);

app.get("/", (request, reply) => {
  reply.send({ hello: "Hello World" });
});

app.listen({ port: 3000 }, () => {
  console.log("Server is litening in port 3000");
});
