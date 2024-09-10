// import dts from 'bun-plugin-dts'

await Bun.build({
  target: 'bun',
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  // plugins: [dts()]
})