Bun.serve({
  fetch() {
    return new Response("BUNSOIR SERVER!!!");
  },
  port: process.env.PORT ?? 3000,
});
