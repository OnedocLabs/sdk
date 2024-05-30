import { parse, stringify } from "yaml";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const document = parse(
  readFileSync(join(__dirname, "../fern/openapi/openapi.yml"), {
    encoding: "utf-8",
  }),
);

document.components.securitySchemes = {
  ...document.components.securitySchemes,
  basicAuth: undefined,
};

writeFileSync(
  join(__dirname, "../fern/openapi/openapi.yml"),
  stringify(document),
);
