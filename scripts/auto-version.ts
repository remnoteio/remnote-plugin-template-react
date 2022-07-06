import * as nbgv from 'nerdbank-gitversioning'
import { promises as fs } from 'fs';

const MANIFEST_FILE = "public/manifest.json"

async function getVersionInfo() {
  const versionInfo = (await nbgv.getVersion()).simpleVersion;
  const [major, minor, patch] = versionInfo.split('.');
  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
  }
}

function parseJson(str: string) {
  try {
    return JSON.parse(str)
  }
  catch (e) {
    return undefined
  }
}

async function readFile(path: string) {
  try {
    return fs.readFile(path, "utf8")
  }
  catch (e) {
    return undefined
  }
}

async function getManifestObject() {
  const text = await readFile(MANIFEST_FILE);
  if (!text) {
    console.log("Failed to read manifest file.");
    return;
  }
  const obj = parseJson(text);
  if (!obj) {
    console.log("Manifest is not valid json.");
    return;
  }
  return obj
}

async function main() {
  const obj = await getManifestObject();
  if (!obj) {
    return;
  }

  const versionInfo = await getVersionInfo();
  if (!versionInfo) {
    console.log("Failed to get version info");
    return
  }
  const withVersionInfo = {
    ...obj,
    version: {
      ...versionInfo
    },
  }
  console.log(__dirname)
  if (__dirname.includes("remnote-plugin-template-react")) {
    console.log("Skipping updating version info")
    return;
  }
  await fs.writeFile(MANIFEST_FILE, JSON.stringify(withVersionInfo, null, 2), "utf8")
  console.log("Successfully updated version info to ", JSON.stringify(versionInfo));
}

main()
