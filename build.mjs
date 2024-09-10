// import dts from 'bun-plugin-dts'

await Bun.build({
  target: 'node',
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: false,
  // plugins: [dts()]
})