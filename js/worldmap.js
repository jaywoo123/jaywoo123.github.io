var zoom = new Datamap({
  element: document.getElementById("zoom_map"),
  scope: 'world',
  // Zoom in on Africa
  setProjection: function(element) {
    var projection = d3.geo.equirectangular()
      .center([23, -3])
      .rotate([225.4, 0])
      .scale(150)
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
 {name: 'Gabon was the most exotic place I visited.', latitude: 0.8037, longitude: 11.6094, radius: 8, fillKey: 'gt500'},
 {name: 'Although I have been abroad most of my life, my roots originate from South Korea. I love visiting SK frequently to spend time with my family.', latitude: 35.9078, longitude: 127.7669, radius: 8, fillKey: 'eq0'},
 {name: 'Russia was the first country I moved to when I was an adolescent. I spoke Russian fluently until coming of age. I still remember the cold nights of moscow.', latitude: 61.5240, longitude: 105.3188, radius: 8, fillKey: 'lt25'},
 {name: 'I went to garde school in DC. I picked up English as my second language.', latitude: 15.8700, longitude: 100.9925, radius: 8, fillKey: 'eq50'},
 {name: 'I went to garde school in DC. I picked up English as my second language.', latitude: 38.89511, longitude: -77.03637, radius: 8, fillKey: 'eq50'},
 {name: 'I attended the last two years of my highschool in Thailand. Thailand opened my eyes to many different social contexts. I met people of royal blood to those who live in the slums. I decided to persue engineering after enlightening moments in Thailand.', latitude: 15.8700, longitude: 100.9925, radius: 8, fillKey: 'eq50'},
 {name: 'I started highschool in Beverly Hills. Yes, I saw some hollywood movie stars and went over to one of their houses.', latitude: 34.0522, longitude: -118.2437, radius: 8, fillKey: 'eq50'},
 {name: 'I went to middle school in Boston. One of my favorite foods became Boston Clam Chowder. Clam Chowder is better in Boston because there is always piles of snow.', latitude: 40.116421, longitude:  -88.243385, radius: 8, fillKey: 'eq50'},
], {
 popupTemplate: function(geo, data) {
   return "<div class='hoverinfo'>" + data.name + "";
 }
});
