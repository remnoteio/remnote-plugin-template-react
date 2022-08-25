import * as fs from 'fs';
import {exit} from 'process';
import {parseManifest} from '@remnote/plugin-sdk';

const MANIFEST = "public/manifest.json"
const README = "README.md"

const fileExists = (fp: string): boolean => {
  try {
    if (fs.existsSync(fp)) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

const tryParseJson = (str: string) => {
  try {
    return JSON.parse(str);
  }
  catch {
  }
}

const parseManifestFile = (fp: string) => {
  const fileText = fs.readFileSync(fp, { encoding: "utf-8" })
  const json = tryParseJson(fileText)
  if (!json) {
    return {
      success: false,
      error: ["Failed to parse JSON. Are you sure the manifest.json file contains valid JSON?"],
    }
  }
  else {
    return parseManifest(json)
  }
}

const main = () => {
  if (!fileExists(README)) {
    console.log("You must include a README.md file in the project root directory describing what the plugin does and how to use it.\n");
    exit(1);
  }

  const parsedManifest = parseManifestFile(MANIFEST);
  if (parsedManifest.success == false) {
    console.log("Invalid manifest. Please correct the following errors and rebuild")
    console.log(parsedManifest.error.map(e => '- ' + e).join(""))
    exit(1)
  }
}

main();
