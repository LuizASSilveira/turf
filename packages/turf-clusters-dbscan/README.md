# @turf/clusters-dbscan

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## clustersDbscan

Takes a set of [points][1] and partition them into clusters according to [https://en.wikipedia.org/wiki/DBSCAN][2] data clustering algorithm.

### Parameters

*   `points` **[FeatureCollection][3]<[Point][1]>** to be clustered
*   `maxDistance` **[number][4]** Maximum Distance between any point of the cluster to generate the clusters (kilometers only)
*   `options` **[Object][5]** Optional parameters (optional, default `{}`)

    *   `options.units` **[string][6]** in which `maxDistance` is expressed, can be degrees, radians, miles, or kilometers (optional, default `"kilometers"`)
    *   `options.mutate` **[boolean][7]** Allows GeoJSON input to be mutated (optional, default `false`)
    *   `options.minPoints` **[number][4]** Minimum number of points to generate a single cluster,
        points which do not meet this requirement will be classified as an 'edge' or 'noise'. (optional, default `3`)

### Examples

```javascript
// create random points with random z-values in their properties
var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
var maxDistance = 100;
var clustered = turf.clustersDbscan(points, maxDistance);

//addToMap
var addToMap = [clustered];
```

Returns **[FeatureCollection][3]<[Point][1]>** Clustered Points with an additional two properties associated to each Feature:*   {number} cluster - the associated clusterId
*   {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')

[1]: https://tools.ietf.org/html/rfc7946#section-3.1.2

[2]: DBSCAN's

[3]: https://tools.ietf.org/html/rfc7946#section-3.3

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

<!-- This file is automatically generated. Please don't edit it directly. If you find an error, edit the source file of the module in question (likely index.js or index.ts), and re-run "yarn docs" from the root of the turf project. -->

---

This module is part of the [Turfjs project](https://turfjs.org/), an open source module collection dedicated to geographic algorithms. It is maintained in the [Turfjs/turf](https://github.com/Turfjs/turf) repository, where you can create PRs and issues.

### Installation

Install this single module individually:

```sh
$ npm install @turf/clusters-dbscan
```

Or install the all-encompassing @turf/turf module that includes all modules as functions:

```sh
$ npm install @turf/turf
```
