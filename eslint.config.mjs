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
    // React rules
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function"
      }
    ],
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-max-props-per-line": [
      2,
      {
        "maximum": 1,
        "when": "multiline"
      }
    ],

    // Import rules
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        "groups": [["builtin"], ["external"], ["internal"], ["parent"], ["sibling"], ["index"]],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],

    // General rules
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never"
    }],
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "sort-imports": [
      "error",
      {
        "memberSyntaxSortOrder": ["none", "multiple", "single", "all"],
        "allowSeparatedGroups": true
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["@core", "./src/core"],
          ["@shared", "./src/shared"],
          ["@entities", "./src/entities"],
          ["@features", "./src/features"]
        ],
        "extensions": [".js", ".jsx"]
      }
    },
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  }
}];

export default eslintConfig;
