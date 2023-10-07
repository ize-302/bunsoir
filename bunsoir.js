const commander = require('commander')
const chalk = require('chalk');
const prompts = require('prompts');
const {
  initializeBunSetup,
  frameworkSetup,
  dockerSetup
} = require('./helpers/utils');
const path = require('path')
const shell = require('shelljs');

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
        // framework
        const framework = await prompts({
          type: 'select',
          name: 'value',
          message: 'Select your preferred framework',
          choices: [
            { title: '🦊 ElysiaJS', value: 'elysia' },
            { title: '🔥 Hono', value: 'hono' },
            { title: '❌ None', value: false },
          ],
          max: 1,
        });
        // Docker?
        const docker = await prompts({
          type: 'confirm',
          name: 'value',
          message: '🐳 Do you want to include Docker?',
          initial: true
        });
        createApp({ projectName: projectName.value, framework: framework.value, docker: docker.value })
      })
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


const createApp = (payload) => {
  const { projectName, framework, docker } = payload
  const newProjectPath = process.cwd() + '/' + projectName
  const bunsoirRoot = path.resolve(__dirname);

  // start
  console.log('Started setup... ⏳ ')

  // setup bun app
  initializeBunSetup(bunsoirRoot, newProjectPath, projectName)

  // Framework setup
  frameworkSetup(bunsoirRoot, framework, newProjectPath)

  // include docker??
  if (docker) {
    dockerSetup(bunsoirRoot, newProjectPath)
  }

  // commit
  shell.exec("git add .")
  shell.exec("git commit -m '🎉 initial commit'")

  // done
  console.log('Setup complete ✅')
}

module.exports = { init }