var zoom = new Datamap({
  element: document.getElementById("zoom_map"),
  scope: 'world',
  // Zoom in on Africa
  setProjection: function(element) {
    var projection = d3.geo.equirectangular()
      .center([23, -3])
      .rotate([220.4, 0])
      .scale(250)
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    var path = d3.geo.path()
      .projection(projection);

    return {path: path, projection: projection};
  },
  fills: {
     defaultFill: "gray",
    // gt50: colors(Math.random() * 20),
    // eq50: colors(Math.random() * 20),
    // lt25: colors(Math.random() * 10),
    // gt75: colors(Math.random() * 200),
    // lt50: colors(Math.random() * 20),
    // eq0: colors(Math.random() * 1),
    // pink: '#0fa0fa',
    // gt500: colors(Math.random() * 1)
  },
  data: {
    'ZAF': { fillKey: 'gt50' },
    'ZWE': { fillKey: 'lt25' },
    'NGA': { fillKey: 'lt50' },
    'MOZ': { fillKey: 'eq50' },
    'MDG': { fillKey: 'eq50' },
    'EGY': { fillKey: 'gt75' },
    'TZA': { fillKey: 'gt75' },
    'LBY': { fillKey: 'eq0' },
    'DZA': { fillKey: 'gt500' },
    'SSD': { fillKey: 'pink' },
    'SOM': { fillKey: 'gt50' },
    'GIB': { fillKey: 'eq50' },
    'AGO': { fillKey: 'lt50' }
  }
});
zoom.bubbles([
 {name: 'Bubble 1', latitude: 0.8037, longitude: 11.6094, radius: 8, fillKey: 'gt500'},
 {name: 'Bubble 2', latitude: 35.9078, longitude: 127.7669, radius: 8, fillKey: 'eq0'},
 {name: 'Bubble 3', latitude: 61.5240, longitude: 105.3188, radius: 8, fillKey: 'lt25'},
 {name: 'Bubble 4', latitude: 15.8700, longitude: 100.9925, radius: 8, fillKey: 'eq50'},
 {name: 'Bubble 5', latitude: 38.89511, longitude: -77.03637, radius: 8, fillKey: 'eq50'},
 {name: 'Bubble 6', latitude: 42.3601, longitude: -71.0589, radius: 8, fillKey: 'eq50'},
 {name: 'Bubble 7', latitude: 15.8700, longitude: 100.9925, radius: 8, fillKey: 'eq50'},
 {name: 'Bubble 8', latitude: 34.0522, longitude: -118.2437, radius: 8, fillKey: 'eq50'},
 {name: 'Bubble 8', latitude: 40.116421, longitude:  -88.243385, radius: 8, fillKey: 'eq50'},
], {
 popupTemplate: function(geo, data) {
   return "<div class='hoverinfo'>Bubble for " + data.name + "";
 }
});
