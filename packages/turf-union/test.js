const fs = require("fs");
const path = require("path");
const test = require("tape");
const { loadJsonFileSync } = require("load-json-file");
const { writeJsonFileSync } = require("write-json-file");
const union = require("./index").default;

const directories = {
  in: path.join(__dirname, "test", "in") + path.sep,
  out: path.join(__dirname, "test", "out") + path.sep,
};

const fixtures = fs.readdirSync(directories.in).map((filename) => {
  return {
    filename,
    name: path.parse(filename).name,
    geojson: loadJsonFileSync(directories.in + filename),
  };
});

test("union", function (t) {
  for (const { name, geojson, filename } of fixtures) {
    const result = union(geojson);
    if (process.env.REGEN)
      writeJsonFileSync(directories.out + filename, result);
    t.deepEqual(result, loadJsonFileSync(directories.out + filename), name);
  }
  t.end();
});
