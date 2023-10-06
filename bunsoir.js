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
            { title: '🦊 ElysiaJS', value: 'Elysia' },
            { title: '🔥 Hono', value: 'Hono' },
            { title: '🌐 Express', value: 'Express' },
          ],
          max: 1,
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