const fs = require("fs");
const path = require("path");
const glob = require("glob");
//const workspace = ["emulate", "views"];

const package = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json")).toString("utf8")
);

const workspace = glob.sync(package.workspaces.packages[0]);
workspace.forEach((dir) => {
  const dist = path.resolve(__dirname, dir, "package.json");
  const project = JSON.parse(fs.readFileSync(dist).toString("utf8"));

  fs.writeFileSync(
    dist,
    JSON.stringify({ ...project, version: package.version }, null, 2)
  );
});
