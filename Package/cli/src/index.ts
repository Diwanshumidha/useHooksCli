#!/usr/bin/env node

import { program } from "commander";
import * as fs from "fs/promises";
import * as path from "path";
import prompts from "prompts";
import { Hooks } from "./HooksConstant";

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
          // {
          //   type: "toggle",
          //   name: "typescript",
          //   message: "Are you using typescript?",
          //   initial: true,
          //   active: "yes",
          //   inactive: "no",
          // },
          {
            type: "text",
            name: "path",
            message: `Where You Want to install Hooks?`,
            initial: "./testing/hooks",
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

        // console.log(response);

        const SelectedHooks = response.hooks as [string];

        SelectedHooks.forEach(async (hook) => {
          const [hookname, hookurl] = hook.split("|");
          const data = await FetchFile(hookurl);
          if (!data) {
            console.log(`Cannot Install ${hookname}`);
            return null;
          }

          DownloadFile(response.path, data, `${hookname}.js`);
          console.log(`Succesfully Installed ${hookname}`);
        });
      } catch (error: any) {
        console.error("Error during installation:", error.message);
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
  console.log(hooksFolderPath);
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
    console.log(error);
  }
}
main();
