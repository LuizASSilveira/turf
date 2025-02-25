const fs = require("fs");
const test = require("tape");
const path = require("path");
const { loadJsonFileSync } = require("load-json-file");
const { writeJsonFileSync } = require("write-json-file");
const bboxPoly = require("@turf/bbox-polygon").default;
const truncate = require("@turf/truncate").default;
const rectangleGrid = require("./index").default;

const directories = {
  in: path.join(__dirname, "test", "in") + path.sep,
  out: path.join(__dirname, "test", "out") + path.sep,
};

let fixtures = fs.readdirSync(directories.in).map((filename) => {
  return {
    filename,
    name: path.parse(filename).name,
    json: loadJsonFileSync(directories.in + filename),
  };
});

test("rectangle-grid", (t) => {
  for (const { name, json } of fixtures) {
    const { bbox, cellWidth, cellHeight, units, properties, mask } = json;
    const options = {
      mask,
      units,
      properties,
    };
    const result = truncate(
      rectangleGrid(bbox, cellWidth, cellHeight, options)
    );

    // Add styled GeoJSON to the result
    const poly = bboxPoly(bbox);
    poly.properties = {
      stroke: "#F00",
      "stroke-width": 6,
      "fill-opacity": 0,
    };
    result.features.push(poly);
    if (options.mask) {
      options.mask.properties = {
        stroke: "#00F",
        "stroke-width": 6,
        "fill-opacity": 0,
      };
      result.features.push(options.mask);
    }

    if (process.env.REGEN)
      writeJsonFileSync(directories.out + name + ".geojson", result);
    t.deepEqual(
      result,
      loadJsonFileSync(directories.out + name + ".geojson"),
      name
    );
  }
  t.end();
});
