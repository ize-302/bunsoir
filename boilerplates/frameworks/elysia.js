import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", () => "BUNSOIR SERVER!!!");

app.listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
