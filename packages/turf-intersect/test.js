const path = require("path");
const { glob } = require("glob");
const test = require("tape");
const { loadJsonFileSync } = require("load-json-file");
const { writeJsonFileSync } = require("write-json-file");
const { featureCollection } = require("@turf/helpers");
const intersect = require("./index").default;

const directories = {
  in: path.join(__dirname, "test", "in") + path.sep,
  out: path.join(__dirname, "test", "out") + path.sep,
};

test("turf-intersect", (t) => {
  glob.sync(directories.in + "*.geojson").forEach((filepath) => {
    const { name, base } = path.parse(filepath);
    const [polygon1, polygon2] = loadJsonFileSync(filepath).features;

    if (name.includes("skip")) return t.skip(name);

    // Red Polygon1
    polygon1.properties = Object.assign(polygon1.properties || {}, {
      "fill-opacity": 0.5,
      fill: "#F00",
    });
    // Blue Polygon2
    polygon2.properties = Object.assign(polygon2.properties || {}, {
      "fill-opacity": 0.5,
      fill: "#00F",
    });

    const results = featureCollection([polygon1, polygon2]);
    const result = intersect(results);
    if (result) {
      // Green Polygon
      result.properties = { "fill-opacity": 1, fill: "#0F0" };
      results.features.push(result);
    }

    if (process.env.REGEN) writeJsonFileSync(directories.out + base, results);
    t.deepEqual(results, loadJsonFileSync(directories.out + base), name);
  });
  t.end();
});
