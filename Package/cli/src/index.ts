#!/usr/bin/env node

import { program } from "commander";
import * as fs from "fs/promises";
import * as path from "path";
import prompts from "prompts";
import { Hooks } from "./HooksConstant";
import { logger } from "./logger";
import chalk from "chalk";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  program
    .name("useHooks")
    .description("Add Custom Hooks to your project")
    .version("1.0.0", "-v, --version", "display the version number");

  program
    .command("install")
    .description("Install The Hooks With Proper ")
    .action(async () => {
      try {
        const response = await prompts([
          {
            type: "toggle",
            name: "typescript",
            message: `Are you using ${chalk.green("typescript")}?`,
            initial: true,
            active: "yes",
            inactive: "no",
          },
          {
            type: "text",
            name: "path",
            message: `Where You Want to install Hooks? ${chalk.green("path:")}`,
            initial: "./src/hooks",
          },
          {
            type: "autocompleteMultiselect",
            name: "hooks",
            message: "Select The Hooks",
            choices: Hooks,
            min: 1,
            hint: "Space to select. Return to submit",
            instructions: false,
          },
        ]);

        const SelectedHooks = response.hooks as [string];

        for (const hookname of SelectedHooks) {
          const hookurl = getDataUrl(hookname, response.typescript);
          try {
            const data = await FetchFile(hookurl);
            if (!data) {
              logger.error(`Cannot Install ${hookname}`);
              return undefined;
            }

            DownloadFile(
              response.path,
              data,
              `${hookname}.${response.typescript ? "ts" : "js"}`
            );
            logger.info(`Successfully Installed ${hookname}`);
          } catch (error) {
            logger.error(`Error installing ${hookname}: ${error}`);
          }
        }
        console.log(chalk.bold.green("Successfully Installed Hooks "));
      } catch (error: any) {
        logger.error("Error during installation:", error.message);
      }
    });

  program.parse(process.argv);
}

async function DownloadFile(
  destinationpath: string,
  data: string,
  name: string
) {
  const hooksFolderPath = path.join(process.cwd(), destinationpath);
  await fs.mkdir(hooksFolderPath, { recursive: true });

  // Write the fetched data to ./hooks/fn.ts
  const filePath = path.join(hooksFolderPath, name);
  await fs.writeFile(filePath, data);
}

async function FetchFile(url: string) {
  try {
    // Fetch data from GitHub
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch data from GitHub: ${res.statusText}`);
    }

    // Read the fetched data
    const data = await res.text();
    return data;
  } catch (error) {
    logger.error(error);
  }
}

function getDataUrl(name: string, istypescript: boolean) {
  const baseurl = `https://raw.githubusercontent.com/Diwanshumidha/useHooksCli/main/Hooks/${
    istypescript ? "Typescript" : "Javascript"
  }/${name}.${istypescript ? "ts" : "js"}`;
  return baseurl;
}

main();
