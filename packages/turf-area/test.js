const fs = require("fs");
const test = require("tape");
const path = require("path");
const { loadJsonFileSync } = require("load-json-file");
const { writeJsonFileSync } = require("write-json-file");
const area = require("./index").default;

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

test("turf-area", (t) => {
  for (const fixture of fixtures) {
    const name = fixture.name;
    const geojson = fixture.geojson;
    const results = Math.round(area(geojson));
    if (process.env.REGEN)
      writeJsonFileSync(directories.out + name + ".json", results);
    t.equal(results, loadJsonFileSync(directories.out + name + ".json"), name);
  }
  t.end();
});
