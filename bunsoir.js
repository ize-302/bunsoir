const commander = require('commander')
const chalk = require('chalk');
const prompts = require('prompts');

const init = () => {
  try {
    new commander.Command()
      .version('0.0.1')
      .argument('<project-directory>')
      .usage(`${chalk.green('<project-directory>')} [options]`)
      .action(async (name) => {
        // project name
        const projectName = await prompts({
          type: 'text',
          name: 'value',
          initial: name,
          message: 'Project name',
        });
        // TypeScript?
        const has_typescript = await prompts({
          type: 'confirm',
          name: 'value',
          message: 'Include TypeScript?',
          initial: true
        });
        // framework
        const framework = await prompts({
          type: 'select',
          name: 'value',
          message: 'Preferred framework',
          choices: [
            { title: '🦊 ElysiaJS', value: 'elysia' },
            { title: '🔥 Hono', value: 'hono' },
            { title: '🌐 Express', value: 'express' },
          ],
          max: 1,
        });
        // ORM
        const orm = await prompts({
          type: 'select',
          name: 'value',
          message: 'Preferred ORM',
          choices: [
            { title: 'Drizzle ORM', value: 'drizzle' },
            { title: 'Prisma', value: 'prisma' },
            { title: 'None', value: null },
          ],
          max: 1,
        });
        // Docker?
        const has_docker = await prompts({
          type: 'confirm',
          name: 'value',
          message: '🐳 Include Docker?',
          initial: true
        });
        console.log('Begin setup...')
      })
      .option('--framework', 'What framework do you intend using for this project?', ['hono', 'elysia'])
      .on('--help', () => {
        console.log(
          `Only ${chalk.green('<project-directory>')} is required.`
        );
      })
      .parse(process.argv)
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

module.exports = { init }