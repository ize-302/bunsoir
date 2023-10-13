const prompts = require('prompts');

const onCancel = prompt => {
  console.log('Exited Bunsoir!');
  process.exit(1)
}

const projectNamePrompt = async (name) => {
  return await prompts({
    type: 'text',
    name: 'value',
    initial: name,
    message: 'Project name',
  }, { onCancel });
}


const frameworkPrompt = async () => {
  return await prompts({
    type: 'select',
    name: 'value',
    message: 'Select your preferred framework',
    choices: [
      { title: '🦊 ElysiaJS', value: 'elysia' },
      { title: '🔥 Hono', value: 'hono' },
      { title: 'No framework', value: false },
    ],
    max: 1,
  }, { onCancel });
}


const ormPrompt = async () => {
  return await prompts({
    type: 'select',
    name: 'value',
    message: 'Select your preferred ORM',
    choices: [
      { title: 'Drizzle', value: 'drizzle' },
      { title: '🚧 Prisma', value: 'prisma', disabled: true },
      { title: 'No ORM', value: false },
    ],
    max: 1,
  }, { onCancel });
}

const databasePrompt = async (orm) => {
  let dbs = []
  const showDbPrompt = async () => await prompts({
    type: 'select',
    name: 'value',
    message: 'Select your preferred database',
    choices: dbs,
    max: 1,
  }, { onCancel })
  if (orm === 'drizzle') {
    dbs = [
      { title: 'PostgreSQL', value: 'postgresql' },
      { title: 'MySQL', value: 'mysql' },
      { title: 'SQLite', value: 'sqlite' },
    ]
    await showDbPrompt()
  } else if (orm === 'prisma') {
    dbs = [
      { title: 'PostgreSQL', value: 'postgresql' },
      { title: 'MySQL', value: 'mysql' },
      { title: 'mongoDB', value: 'mongodb' },
    ]
    await showDbPrompt()
  }
}

const dockerPrompt = async () => {
  return await prompts({
    type: 'confirm',
    name: 'value',
    message: '🐳 Do you want to include Docker?',
    initial: true
  }, { onCancel });
}

module.exports = {
  projectNamePrompt,
  frameworkPrompt,
  ormPrompt,
  databasePrompt,
  dockerPrompt
}