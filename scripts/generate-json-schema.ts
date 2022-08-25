import { promises as fs } from 'fs';
import { PluginManifestV1Sig } from '@remnote/plugin-sdk';
import { z } from 'zod'
import zodToJsonSchema from "zod-to-json-schema";

const SCHEMA = "schema.json"

const main = () => {
  const jsonSchema = zodToJsonSchema(
    // @ts-ignore
    PluginManifestV1Sig.merge(z.object({ $schema: z.string() }))
  );
  fs.writeFile(SCHEMA, JSON.stringify(jsonSchema, null, 2), "utf-8");
}

main();
