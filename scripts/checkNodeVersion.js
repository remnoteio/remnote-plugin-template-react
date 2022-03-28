const result = process.versions;
if (result && result.node) {
  const node = parseInt(result.node)
  if (node && node >= 14 && node < 15) {
    console.log("\x1b[47m\x1b[32m%s\x1b[0m", "-------******* Good to Go with your Node Version: " + result.node + " *******-------");
  } else {
console.log("\x1b[47m\x1b[31m%s\x1b[0m", "-------******* Package installation(npm install) or Project startup command(npm start) failed due to Node Version, Please install and use Node Version 14 *******-------");
    console.log("\x1b[47m\x1b[33m%s\x1b[0m", "-------******* Your current Node Version is: " + result.node + " *******-------");
    process.exit(1);
  }
} else {
console.log("\x1b[47m\x1b[31m%s\x1b[0m", "-------******* Something went wrong while checking Node version *******-------");
  process.exit(1);
}
