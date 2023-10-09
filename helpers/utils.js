const shell = require('shelljs');
// const cliProgress = require('cli-progress');

shell.config.silent = true;
// const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const initializeBunSetup = (bunsoirRoot, newProjectPath, projectName) => {
  shell.mkdir('-p', `${newProjectPath}`);
  const templatesPath = `${bunsoirRoot}/boilerplates`
  shell.cp('-r', `${templatesPath}/bun-template/*`, newProjectPath); // copy bun-template content
  shell.cd(projectName)
  shell.exec("git init -b master")
  shell.cp('-r', `${templatesPath}/git/.gitignore`, newProjectPath); // copy .gitignore
  shell.exec("npm pkg set version='1.0.0'")
  shell.exec("npm pkg set description='A Bunjs app setup with Bunsoir!'")
  shell.exec("npm pkg set main='index.ts'")
  shell.exec("npm pkg set scripts.start='bun run build && bun run dist/index.js'")
  shell.exec("npm pkg set scripts.start:dev='bun --hot index.ts'")
  shell.exec("npm pkg set scripts.build='rm -rf ./dist && bun build --target=bun ./index.ts --outdir ./dist'")
}

const frameworkSetup = (bunsoirRoot, framework, newProjectPath) => {
  const templatesPath = `${bunsoirRoot}/boilerplates/frameworks`
  if (framework === 'elysia') {
    shell.exec(`bun install elysia`)
    shell.rm('index.ts')
    shell.cp('-r', `${templatesPath}/elysia.js`, newProjectPath);
    shell.mv(`${newProjectPath}/elysia.js`, `${newProjectPath}/index.ts`)
  }
  if (framework === 'hono') {
    shell.exec(`bun install hono`)
    shell.rm('index.ts')
    shell.cp('-r', `${templatesPath}/hono.js`, newProjectPath);
    shell.mv(`${newProjectPath}/hono.js`, `${newProjectPath}/index.ts`)
  }
  if (!framework) {
    shell.exec(`bun install hono`)
  }
}

const dockerSetup = (docker, bunsoirRoot, newProjectPath) => {
  if (docker) {
    const dockerFiles = `${bunsoirRoot}/boilerplates/docker/`
    // copy docker files (for some reasom, this doesnt copy .dockerignore)
    shell.cp('-r', dockerFiles + '/*', newProjectPath);
    // copy .dockerignore file
    shell.cp('-r', dockerFiles + '/.dockerignore', newProjectPath)
  }
}

const gitHandler = () => {
  shell.exec("git add .")
  shell.exec("git commit -m '🎉 initial commit'")
}

module.exports = { initializeBunSetup, frameworkSetup, dockerSetup, gitHandler }