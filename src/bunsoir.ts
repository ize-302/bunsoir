import { Command } from "commander";
import chalk from "chalk";
import { readdir } from "fs/promises";
import path from "path";

import {
  initializeBunSetup,
  frameworkSetup,
  dockerSetup,
  ormSetup,
  gitHandler,
} from "./helpers/utils";
import {
  projectNamePrompt,
  frameworkPrompt,
  ormPrompt,
  // databasePrompt,
  dockerPrompt,
} from "./prompts";
import packageJson from "../package.json";

export const init = () => {
  try {
    new Command()
      .version(packageJson.version)
      .argument("<project-directory>")
      .usage(`${chalk.green("<project-directory>")} [options]`)
      .action(async (name: string) => {
        // check if project already exists
        const directories = await readdir(process.cwd());
        const exists = directories.includes(name);
        if (exists) {
          console.log(`Project with name ${chalk.blue(name)} already exists`);
          process.exit(1);
        }
        // project name
        const projectName = await projectNamePrompt(name);
        // framework
        const framework = await frameworkPrompt();
        // orm
        const orm = await ormPrompt();
        // database
        // const database = await databasePrompt(orm.value);
        // Docker?
        const docker = await dockerPrompt();
        createApp({
          projectName: projectName.value,
          framework: framework.value,
          orm: orm.value,
          database: /*database.value*/ "",
          docker: docker.value,
        });
      })
      .on("--help", () => {
        console.log(`Only ${chalk.green("<project-directory>")} is required.`);
      })
      .parse(process.argv);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createApp = (payload: {
  projectName: string;
  framework: string;
  orm: string;
  database: string;
  docker: string;
}) => {
  const { projectName, framework, orm, database, docker } = payload;
  const newProjectPath = process.cwd() + "/" + projectName;
  const bunsoirRoot = path.resolve(__dirname);

  // start
  console.log("Started setup... ⏳ ");

  // setup bun app
  initializeBunSetup(bunsoirRoot, newProjectPath, projectName);

  // Framework setup
  frameworkSetup(bunsoirRoot, framework, newProjectPath);

  // ORM setup
  ormSetup(bunsoirRoot, orm, database, newProjectPath);

  // include docker??
  dockerSetup(docker, bunsoirRoot, newProjectPath);

  // initial commit
  gitHandler();

  // done
  console.log("Finished!!! 🎉🎉 \n");

  console.log(chalk.green("Commands:"));
  console.log(`${chalk.yellow("bun start:dev")} - development mode`);
  console.log(`${chalk.yellow("bun run build")} - build app`);
  console.log(`${chalk.yellow("bun start")} - build and serve build`);
};
