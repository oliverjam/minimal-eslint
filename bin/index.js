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

async function run() {
  try {
    // don't want to overwrite existing config
    const existingConfigFile = await rf(path.join(".eslintrc")).catch(() => {});
    if (existingConfigFile)
      throw new Error("Existing .eslintrc found. Please remove and try again");

    // create the config file
    await wf(path.join(".eslintrc"), config.trim());
    successMessage();
  } catch (error) {
    console.error("\u001b[31m" + error.message + "\u001b[39m");
  }
}

run();
