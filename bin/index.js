#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

const { promisify } = require("util");
const { readFile, writeFile } = require("fs");
const path = require("path");

const rf = promisify(readFile);
const wf = promisify(writeFile);

const config = `
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-console": "warn"
  }
}
`;

const successMessage = () =>
  console.log(
    "\n" +
      "\u001b[32m" +
      "Created .eslintrc with recommended config" +
      "\u001b[39m\n"
  );

const dependencyWarning = () =>
  console.log(
    "\u001b[37m" +
      "Please run " +
      "\u001b[36m" +
      "npm install -D eslint" +
      "\u001b[39m" +
      "\u001b[39m"
  );

async function run() {
  try {
    // don't want to overwrite existing config
    const existingConfigFile = await rf(path.join(".eslintrc")).catch(() => {});
    if (existingConfigFile)
      throw new Error("Existing .eslintrc found. Please remove and try again");

    // they need a package.json to install eslint
    const pjString = await rf("package.json", "utf-8").catch(() => {
      throw new Error(
        "\nPlease run \u001b[36m npm init \u001b[39m\u001b[31m to create a package.json"
      );
    });

    // creat the config file
    await wf(path.join(".eslintrc"), config.trim());

    successMessage();

    // check if eslint is a dependency
    const { dependencies = {}, devDependencies = {} } = JSON.parse(pjString);
    const eslintDependency = Object.keys(dependencies).some(
      dep => dep === "eslint"
    );
    const eslintDevDependency = Object.keys(devDependencies).some(
      dep => dep === "eslint"
    );

    // warn them to install eslint
    if (!eslintDependency && !eslintDevDependency) dependencyWarning();
  } catch (error) {
    console.error("\u001b[31m" + error.message + "\u001b[39m");
  }
}

run();
