# Minimal ESLint Config Generator

Generates the most minimal ESLint config possible. Useful when you just want to catch some errors, but allows you to add rules later.

Run `npx minimal-eslint` in your directory to create an `.eslintrc` file containing:

```json
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
```
