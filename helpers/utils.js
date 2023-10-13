const shell = require('shelljs');

shell.config.silent = true;

const initializeBunSetup = (bunsoirRoot, newProjectPath, projectName) => {
  shell.mkdir('-p', `${newProjectPath}`);
  const templatesPath = `${bunsoirRoot}/boilerplates`
  shell.cp('-r', `${templatesPath}/bun-template/*`, newProjectPath); // copy bun-template content
  shell.cd(projectName)
  shell.exec("git init -b master")
  shell.exec("bun install typescript -D")
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
}

const ormSetup = (bunsoirRoot, orm, database, newProjectPath) => {
  const ormsTemplatePath = `${bunsoirRoot}/boilerplates/orms`
  if (orm === 'drizzle') {
    shell.exec("bun install drizzle-orm")
    shell.exec("bun install drizzle-kit -D")
    shell.mkdir('-p', `db`);
    if (database === 'postgresql') {
      shell.cp('-r', `${ormsTemplatePath}/drizzle/postgresql/*`, `${newProjectPath}/db`);
      shell.exec("bun install pg")
      shell.exec("bun install @types/pg -D")
      shell.exec("npm pkg set scripts.migration:generate='drizzle-kit generate:pg --schema=./db/schema.ts'")
      shell.exec("npm pkg set scripts.migration:push='drizzle-kit push:pg --config=./db/drizzle.config.ts'")
      shell.exec("npm pkg set scripts.migrate='bun migration:generate && bun migration:push'")
    } else if (database === 'mysql') {
      shell.cp('-r', `${ormsTemplatePath}/drizzle/mysql/*`, `${newProjectPath}/db`);
      shell.exec("bun install mysql2")
      shell.exec("npm pkg set scripts.migration:generate='drizzle-kit generate:mysql --schema=./db/schema.ts'")
      shell.exec("npm pkg set scripts.migration:push='drizzle-kit push:mysql --config=./db/drizzle.config.ts'")
      shell.exec("npm pkg set scripts.migrate='bun migration:generate && bun migration:push'")
    } else if (database === "sqlite") {
      shell.cp('-r', `${ormsTemplatePath}/drizzle/sqlite/*`, `${newProjectPath}/db`);
    }
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

module.exports = { initializeBunSetup, frameworkSetup, ormSetup, dockerSetup, gitHandler }