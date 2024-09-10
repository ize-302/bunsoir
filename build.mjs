await Bun.build({
  target: 'node',
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  external: ['shelljs']
})