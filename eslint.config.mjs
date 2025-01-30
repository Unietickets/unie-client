import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends(
  "next/core-web-vitals",
  "plugin:react/recommended",
), {
  "rules": {
    "comma-dangle": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function"
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
    // https://github.com/iamturns/eslint-config-airbnb-typescript#why-is-importno-unresolved-disabled
    "import/no-unresolved": "error",
    "react/jsx-first-prop-new-line": [
      2,
      "multiline"
    ],
    "react/jsx-max-props-per-line": [
      2,
      {
        "maximum": 1,
        "when": "multiline"
      }
    ],
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "import/order": [
      "error",
      {
        "groups": [["builtin"], ["external"], ["internal"], ["parent"], ["sibling"], ["index"]],
        "newlines-between": "always"
      }
    ],
    "sort-imports": [
      "error",
      {
        "memberSyntaxSortOrder": ["none", "multiple", "single", "all"],
        "allowSeparatedGroups": true
      }
    ],
    "react/prop-types": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      },
      "alias": {
        "map": [
          ["@shared", "./src/shared"] // Укажите правильный путь к вашим алиасам
        ],
        "extensions": [".js", ".jsx", ".ts", ".tsx"] // Укажите расширения файлов, которые вы используете
      },
      "react": {
        "version": "detect"
      }
    }
  }
}];

export default eslintConfig;
