import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text("BUNSOIR SERVER!!!")
})

export default {
  port: process.env.PORT ?? 3000,
  fetch: app.fetch,
}
