import { readFileSync, writeFileSync } from "fs";
import { glob } from "glob";

const addNoCheckToUtilFiles = () => {
  const files = glob.sync(
    __dirname +
      "/../packages/typescript/src/client/codegen/core/schemas/utils/**/*.ts",
  );

  for (const file of files) {
    const content =
      `// @ts-nocheck

    ` + readFileSync(file).toString();

    writeFileSync(file, content);
  }
};

const run = () => {
  addNoCheckToUtilFiles();
};

run();
