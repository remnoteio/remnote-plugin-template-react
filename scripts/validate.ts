import * as fs from 'fs';
import {exit} from 'process';

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

const main = () => {
  if (!fileExists(README)) {
    console.log("You must include a README.md file in the project root directory describing what the plugin does and how to use it.");
    exit(1);
  }
}

main();
