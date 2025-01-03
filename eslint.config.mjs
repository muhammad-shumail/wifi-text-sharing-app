import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "import/prefer-default-export": "off",
      "no-console": "off",
      "no-unused-vars": "off",
    }
  },
];

export default eslintConfig;
