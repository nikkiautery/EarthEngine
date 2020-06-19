var geometry = /* color: #ffffff */ee.Geometry.LinearRing(
        [[-79.53827557268134, 35.366090176598334],
         [-79.53818970487171, 35.34805826515864],
         [-79.49418474777673, 35.34805826333252],
         [-79.49418474109581, 35.36602015572544],
         [-79.53827557268134, 35.366090176598334]]);

var point = /* color: #d63000 */ee.Geometry.Point([-79.49870521875238, 35.37473454620475]);

var collection = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA');
var dates = ee.List(collection.get('date_range'));
var dateRange = ee.DateRange(dates.get(0), dates.get(1));
print(dateRange, 'Date Range');

var fc = ee.FeatureCollection('TIGER/2016/Counties')
          .filter(ee.Filter.eq('NAME', 'Moore'));

Map.setCenter(-79.4988, 35.3305, 10);
// Map.addLayer(fc, {}, "Moore County Boundary");

var bands = collection.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);

var trueRGB = {
  bands: ['B3', 'B2', 'B1'],
  min: 0.0,
  max: 0.6,
  gamma: 1.6
};

var fCIR = {
  bands: ['B4', 'B3', 'B2'],
  min: 0.0,
  max: 0.6,
  gamma: 1.6
};

// -- \\

// Spring: March 1 through May 31
// Summer: June 1 through August 31
// Fall: September 1 through November 30

// 2011 Moore County Growing Season: Spring

var spring2011 = collection
                  .filterDate('2011-03-01', '2011-05-31')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 15));

print(spring2011, '2011 Spring Collection');

var mediansp11 = spring2011.median();

var moorespring2011 = mediansp11.clipToCollection(fc);

// 2011 Moore County Growing Season: Summer

var summer2011 = collection
                  .filterDate('2011-06-01', '2011-08-31')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 10));

print(summer2011, '2011 Summer Collection');

var mediansu11 = summer2011.median();

var mooresummer2011 = mediansu11.clipToCollection(fc);


// 2011 Moore County Growing Season: Fall

var fall2011 = collection
                  .filterDate('2011-09-01', '2011-11-30')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 5));

print(fall2011, '2011 Fall Collection');

var medianfa11 = fall2011.median();

var moorefall2011 = medianfa11.clipToCollection(fc);

// 2015 Moore County Growing Season: Spring

var spring2015 = collection
                  .filterDate('2015-03-01', '2015-05-31')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 25));

print(spring2015, '2015 Spring Collection');

var mediansp15 = spring2015.median();

var moorespring2015 = mediansp15.clipToCollection(fc);

// 2015 Moore County Growing Season: Summer

var summer2015 = collection
                  .filterDate('2015-06-01', '2015-08-31')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 5));

print(summer2015, '2015 Summer Collection');

var mediansu15 = summer2015.median();

var mooresummer2015 = mediansu15.clipToCollection(fc);

// 2015 Moore County Growing Season: Fall

var fall2015 = collection
                  .filterDate('2015-09-01', '2015-11-30')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 1));

print(fall2015, '2015 Fall Collection');

var medianfa15 = fall2015.median();

var moorefall2015 = medianfa15.clipToCollection(fc);

// 2017 Moore County Growing Season: Spring

var spring2017 = collection
                  .filterDate('2017-03-01', '2017-05-31')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 5));

print(spring2017, '2017 Spring Collection');

var mediansp17 = spring2017.median();

var moorespring2017 = mediansp17.clipToCollection(fc);

// 2017 Moore County Growing Season: Summer

var summer2017 = collection
                  .filterDate('2017-06-01', '2017-08-31')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 3));

print(summer2017, '2017 Summer Collection');

var mediansu17 = summer2017.median();

var mooresummer2017 = mediansu17.clipToCollection(fc);

// 2017 Moore County Growing Season: Fall

var fall2017 = collection
                  .filterDate('2017-09-01', '2017-11-30')
                  .filterBounds(point)
                  .filter(ee.Filter.or(
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 35)),
                          ee.Filter.and(ee.Filter.eq('WRS_PATH', 16),
                          ee.Filter.eq('WRS_ROW', 36))))
                  .filter(ee.Filter.lt('CLOUD_COVER', 30));

print(fall2017, '2017 Fall Collection');

var medianfa17 = fall2017.median();

var moorefall2017 = medianfa17.clipToCollection(fc);

// Adding True Color & False Color Layers:

// Map.addLayer(moorespring2011, trueRGB, 'Spring 2011 True Color Composite');
// Map.addLayer(moorespring2011, fCIR, 'Spring 2011 False Color IR Composite');
// Map.addLayer(mooresummer2011, trueRGB, 'Summer 2011 True Color Composite');
// Map.addLayer(mooresummer2011, fCIR, 'Summer 2011 False Color IR Composite');
// Map.addLayer(moorefall2011, trueRGB, 'Fall 2011 True Color Composite');
// Map.addLayer(moorefall2011, fCIR, 'Fall 2011 False Color IR Composite');
// Map.addLayer(moorespring2015, trueRGB, 'Spring 2015 True Color Composite');
// Map.addLayer(moorespring2015, fCIR, 'Spring 2015 False Color IR Composite');
// Map.addLayer(mooresummer2015, trueRGB, 'Summer 2015 True Color Composite');
// Map.addLayer(mooresummer2015, fCIR, 'Summer 2015 False Color IR Composite');
// Map.addLayer(moorefall2015, trueRGB, 'Fall 2015 True Color Composite');
// Map.addLayer(moorefall2015, fCIR, 'Fall 2015 False Color IR Composite');
// Map.addLayer(moorespring2017, trueRGB, 'Spring 2017 True Color Composite');
// Map.addLayer(moorespring2017, fCIR, 'Spring 2017 False Color IR Composite');
// Map.addLayer(mooresummer2017, trueRGB, 'Summer 2017 True Color Composite');
// Map.addLayer(mooresummer2017, fCIR, 'Summer 2017 False Color IR Composite');
// Map.addLayer(moorefall2017, trueRGB, 'Fall 2017 True Color Composite');
// Map.addLayer(moorefall2017, fCIR, 'Fall 2017 False Color IR Composite');

// NDVI

// 2011

var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};

var nirsp11 = moorespring2011.select('B4');
var redsp11 = moorespring2011.select('B3');
var ndvispring11 = nirsp11.subtract(redsp11).divide(nirsp11.add(redsp11)).rename('Spring 2011 NDVI');

var nirsu11 = mooresummer2011.select('B4');
var redsu11 = mooresummer2011.select('B3');
var ndvisummer11 = nirsu11.subtract(redsu11).divide(nirsu11.add(redsu11)).rename('Summer 2011 NDVI');

var nirfa11 = moorefall2011.select('B4');
var redfa11 = moorefall2011.select('B3');
var ndvifall11 = nirfa11.subtract(redfa11).divide(nirfa11.add(redfa11)).rename('Fall 2011 NDVI');

// 2015

var nirsp15 = moorespring2015.select('B4');
var redsp15 = moorespring2015.select('B3');
var ndvispring15 = nirsp15.subtract(redsp15).divide(nirsp15.add(redsp15)).rename('Spring 2015 NDVI');

var nirsu15 = mooresummer2015.select('B4');
var redsu15 = mooresummer2015.select('B3');
var ndvisummer15 = nirsu15.subtract(redsu15).divide(nirsu15.add(redsu15)).rename('Summer 2015 NDVI');

var nirfa15 = moorefall2015.select('B4');
var redfa15 = moorefall2015.select('B3');
var ndvifall15 = nirfa15.subtract(redfa15).divide(nirfa15.add(redfa15)).rename('Fall 2015 NDVI');

// 2017

var nirsp17 = moorespring2017.select('B4');
var redsp17 = moorespring2017.select('B3');
var ndvispring17 = nirsp17.subtract(redsp17).divide(nirsp17.add(redsp17)).rename('Spring 2017 NDVI');

var nirsu17 = mooresummer2017.select('B4');
var redsu17 = mooresummer2017.select('B3');
var ndvisummer17 = nirsu17.subtract(redsu17).divide(nirsu17.add(redsu17)).rename('Summer 2017 NDVI');

var nirfa17 = moorefall2017.select('B4');
var redfa17 = moorefall2017.select('B3');
var ndvifall17 = nirfa17.subtract(redfa17).divide(nirfa17.add(redfa17)).rename('Fall 2017 NDVI');

// Adding NDVI Layers

// Map.addLayer(ndvispring11, ndviParams, 'Moore County Spring 2011 NDVI');
// Map.addLayer(ndvisummer11, ndviParams, 'Moore County Summer 2011 NDVI');
// Map.addLayer(ndvifall11, ndviParams, 'Moore County Fall 2011 NDVI');
// Map.addLayer(ndvispring15, ndviParams, 'Moore County Spring 2015 NDVI');
// Map.addLayer(ndvisummer15, ndviParams, 'Moore County Summer 2015 NDVI');
// Map.addLayer(ndvifall15, ndviParams, 'Moore County Fall 2015 NDVI');
// Map.addLayer(ndvispring17, ndviParams, 'Moore County Spring 2017 NDVI');
// Map.addLayer(ndvisummer17, ndviParams, 'Moore County Summer 2017 NDVI');
// Map.addLayer(ndvifall17, ndviParams, 'Moore County Fall 2017 NDVI');

// Bring in Landsat 7 TOA


// Compute the EVI using an expression:

// 2011

var mcspringevi2011 = moorespring2011.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': moorespring2011.select('B4'),
      'RED': moorespring2011.select('B3'),
      'BLUE': moorespring2011.select('B1')
});

var mcsummerevi2011 = mooresummer2011.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': mooresummer2011.select('B4'),
      'RED': mooresummer2011.select('B3'),
      'BLUE': mooresummer2011.select('B1')
});

var mcfallevi2011 = moorefall2011.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': moorefall2011.select('B4'),
      'RED': moorefall2011.select('B3'),
      'BLUE': moorefall2011.select('B1')
});

// 2015

var mcspringevi2015 = moorespring2015.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': moorespring2015.select('B4'),
      'RED': moorespring2015.select('B3'),
      'BLUE': moorespring2015.select('B1')
});

var mcsummerevi2015 = mooresummer2015.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': mooresummer2015.select('B4'),
      'RED': mooresummer2015.select('B3'),
      'BLUE': mooresummer2015.select('B1')
});

var mcfallevi2015 = moorefall2015.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': moorefall2015.select('B4'),
      'RED': moorefall2015.select('B3'),
      'BLUE': moorefall2015.select('B1')
});

// 2017

var mcspringevi2017 = moorespring2017.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': moorespring2017.select('B4'),
      'RED': moorespring2017.select('B3'),
      'BLUE': moorespring2017.select('B1')
});

var mcsummerevi2017 = mooresummer2017.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': mooresummer2017.select('B4'),
      'RED': mooresummer2017.select('B3'),
      'BLUE': mooresummer2017.select('B1')
});

var mcfallevi2017 = moorefall2017.expression(
    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
      'NIR': moorefall2017.select('B4'),
      'RED': moorefall2017.select('B3'),
      'BLUE': moorefall2017.select('B1')
});

Map.addLayer(mcspringevi2011, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Spring 2011 EVI');
Map.addLayer(mcsummerevi2011, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Summer 2011 EVI');
Map.addLayer(mcfallevi2011, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Fall 2011 EVI');
Map.addLayer(mcspringevi2015, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Spring 2015 EVI');
Map.addLayer(mcsummerevi2015, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Summer 2015 EVI');
Map.addLayer(mcfallevi2015, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Fall 2015 EVI');
Map.addLayer(mcspringevi2017, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Spring 2017 EVI');
Map.addLayer(mcsummerevi2017, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Summer 2017 EVI');
Map.addLayer(mcfallevi2017, {min: -1, max: 1, palette: ['FF0000', '00FF00']}, 'Moore County Fall 2017 EVI');


var coefficients = ee.Array([[0.3561, 0.3972, 0.3904, 0.6966, 0.2286, 0.1596], // Brightness
                             [-0.3344, -0.3544, -0.4556, 0.6966, -0.0242, -0.2630], // Greenness
                             [0.2626, 0.2141, 0.0926, 0.0656, -0.7629, -0.5388], // Wetness
                             [0.0805, -0.0498, 0.1950, -0.1327, 0.5752, -0.7775], // Fourth
                             [-0.7252, -0.0202, 0.6683, 0.0631, -0.1494, -0.0274], // Fifth
                             [0.4000, -0.8172, 0.3832, 0.0602, -0.1095, 0.0985]]); // Sixth

// Print the dimensions.

print(coefficients.length());

// Tasseled Cap

// 2011

var springtcImage2011 = moorespring2011.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);

// In order to complete the matrix multiplication, the input image has to be converted to an array image in which each pixel stores an array:

//Make an Array Image, with a 1-D Array per pixel.

var arrayImage1Dsp2011 = ee.Image(springtcImage2011).toArray();

// Make an Array Image with a 2-D Array per pixel, 6x1.

var arrayImage2Dsp2011 = arrayImage1Dsp2011.toArray(1);

//Do the matrix multiplication, then convert back to a multi-band image:

var componentsImagesp2011 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dsp2011)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};

//

var summertcImage2011 = mooresummer2011.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
var arrayImage1Dsu2011 = ee.Image(summertcImage2011).toArray();
var arrayImage2Dsu2011 = arrayImage1Dsu2011.toArray(1);

var componentsImagesu2011 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dsu2011)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};

//

var falltcImage2011 = moorefall2011.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
var arrayImage1Dfa2011 = ee.Image(falltcImage2011).toArray();
var arrayImage2Dfa2011 = arrayImage1Dfa2011.toArray(1);

var componentsImagefa2011 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dfa2011)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};

// 2015

var springtcImage2015 = moorespring2015.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
var arrayImage1Dsp2015 = ee.Image(springtcImage2015).toArray();
var arrayImage2Dsp2015 = arrayImage1Dsp2015.toArray(1);

var componentsImagesp2015 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dsp2015)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};

//

var summertcImage2015 = mooresummer2015.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
var arrayImage1Dsu2015 = ee.Image(summertcImage2015).toArray();
var arrayImage2Dsu2015 = arrayImage1Dsu2015.toArray(1);

var componentsImagesu2015 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dsu2015)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};

//

var falltcImage2015 = moorefall2015.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
var arrayImage1Dfa2015 = ee.Image(falltcImage2015).toArray();
var arrayImage2Dfa2015 = arrayImage1Dfa2015.toArray(1);

var componentsImagefa2015 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dfa2015)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};

// 2017

var springtcImage2017 = moorespring2017.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
var arrayImage1Dsp2017 = ee.Image(springtcImage2017).toArray();
var arrayImage2Dsp2017 = arrayImage1Dsp2017.toArray(1);

var componentsImagesp2017 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dsp2017)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};

//

var summertcImage2017 = mooresummer2017.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
var arrayImage1Dsu2017 = ee.Image(summertcImage2017).toArray();
var arrayImage2Dsu2017 = arrayImage1Dsu2017.toArray(1);

var componentsImagesu2017 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dsu2017)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};

//

var falltcImage2017 = moorefall2017.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7']);
var arrayImage1Dfa2017 = ee.Image(falltcImage2017).toArray();
var arrayImage2Dfa2017 = arrayImage1Dfa2017.toArray(1);

var componentsImagefa2017 = ee.Image(coefficients)
.matrixMultiply(arrayImage2Dfa2017)
.arrayProject([0])
.arrayFlatten(
[['brightness', 'greenness', 'wetness', 'fourth', 'fifth', 'sixth']]);

var vizParams = {
bands: ['brightness', 'greenness', 'wetness'],
min: -0.1, max: [0.5, 0.1, 0.1]

};


Map.addLayer(componentsImagesp2011, vizParams, 'Moore County 2011 TC Components Spring');
Map.addLayer(componentsImagesu2011, vizParams, 'Moore County 2011 TC Components Summer');
Map.addLayer(componentsImagefa2011, vizParams, 'Moore County 2011 TC Components Fall');
Map.addLayer(componentsImagesp2015, vizParams, 'Moore County 2015 TC Components Spring');
Map.addLayer(componentsImagesu2015, vizParams, 'Moore County 2015 TC Components Summer');
Map.addLayer(componentsImagefa2015, vizParams, 'Moore County 2015 TC Components Fall');
Map.addLayer(componentsImagesp2017, vizParams, 'Moore County 2017 TC Components Spring');
Map.addLayer(componentsImagesu2017, vizParams, 'Moore County 2017 TC Components Summer');
Map.addLayer(componentsImagefa2017, vizParams, 'Moore County 2017 TC Components Fall');


// PDSI

var mc = ee.FeatureCollection('TIGER/2016/Counties')
          .filter(ee.Filter.eq('NAME', 'Moore'));

var pdsiVis = {
  min: -5.0,
  max: 10.0,
  palette: ['red', 'yellow', 'green', 'cyan', 'blue'],
};

// 2011

var dataset1 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2011-03-01', '2011-05-31'));

var pdsi1 = dataset1.select('pdsi');
var pdsimean1 = pdsi1.mean();
var pdsiSpring2011 = pdsimean1.clip(mc);

var dataset2 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2011-06-01', '2011-08-31'));

var pdsi2 = dataset2.select('pdsi');
var pdsimean2 = pdsi2.mean();
var pdsiSummer2011 = pdsimean2.clip(mc);

var dataset3 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2011-09-01', '2011-11-30'));

var pdsi3 = dataset3.select('pdsi');
var pdsimean3 = pdsi3.mean();
var pdsiFall2011 = pdsimean3.clip(mc);

// 2015

var dataset4 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2015-03-01', '2015-05-31'));

var pdsi4 = dataset4.select('pdsi');
var pdsimean4 = pdsi4.mean();
var pdsiSpring2015 = pdsimean4.clip(mc);

var dataset5 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2015-06-01', '2015-08-31'));

var pdsi5 = dataset5.select('pdsi');
var pdsimean5 = pdsi5.mean();
var pdsiSummer2015 = pdsimean5.clip(mc);

var dataset6 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2015-09-01', '2015-11-30'));

var pdsi6 = dataset6.select('pdsi');
var pdsimean6 = pdsi6.mean();
var pdsiFall2015 = pdsimean6.clip(mc);

// 2017

var dataset7 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2017-03-01', '2017-05-31'));

var pdsi7= dataset7.select('pdsi');
var pdsimean7 = pdsi7.mean();
var pdsiSpring2017 = pdsimean7.clip(mc);

var dataset8 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2017-06-01', '2017-08-31'));

var pdsi8 = dataset8.select('pdsi');
var pdsimean8 = pdsi8.mean();
var pdsiSummer2017 = pdsimean8.clip(mc);

var dataset9 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                  .filter(ee.Filter.date('2017-09-01', '2017-11-30'));

var pdsi9 = dataset9.select('pdsi');
var pdsimean9 = pdsi9.mean();
var pdsiFall2017 = pdsimean9.clip(mc);

// Map.addLayer(pdsiSpring2011, pdsiVis, 'PDSI Spring 2011');
// Map.addLayer(pdsiSummer2011, pdsiVis, 'PDSI Summer 2011');
// Map.addLayer(pdsiFall2011, pdsiVis, 'PDSI Fall 2011');
// Map.addLayer(pdsiSpring2015, pdsiVis, 'PDSI Spring 2015');
// Map.addLayer(pdsiSummer2015, pdsiVis, 'PDSI Summer 2015');
// Map.addLayer(pdsiFall2015, pdsiVis, 'PDSI Fall 2015');
// Map.addLayer(pdsiSpring2017, pdsiVis, 'PDSI Spring 2017');
// Map.addLayer(pdsiSummer2017, pdsiVis, 'PDSI Summer 2017');
// Map.addLayer(pdsiFall2017, pdsiVis, 'PDSI Fall 2017');

// Resolve EcoRegions

var ecoRegions = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017");

// patch updated colors
var colorUpdates = [
{ECO_ID: 204, COLOR: '#B3493B'},
{ECO_ID: 245, COLOR: '#267400'},
{ECO_ID: 259, COLOR: '#004600'},
{ECO_ID: 286, COLOR: '#82F178'},
{ECO_ID: 316, COLOR: '#E600AA'},
{ECO_ID: 453, COLOR: '#5AA500'},
{ECO_ID: 317, COLOR: '#FDA87F'},
{ECO_ID: 763, COLOR: '#A93800'},
];

// loop over all other features and create a new style property for styling
// later on
var ecoRegions = ecoRegions.map(function(f) {
  var color = f.get('COLOR');
  return f.set({style: {color: color, width: 0}});
});

// make styled features for the regions we need to update colors for,
// then strip them from the main asset and merge in the new feature
for (var i=0; i < colorUpdates.length; i++) {
  colorUpdates[i].layer = ecoRegions
      .filterMetadata('ECO_ID','equals',colorUpdates[i].ECO_ID)
      .map(function(f) {
        return f.set({style: {color: colorUpdates[i].COLOR, width: 0}});
      });

  ecoRegions = ecoRegions
      .filterMetadata('ECO_ID','not_equals',colorUpdates[i].ECO_ID)
      .merge(colorUpdates[i].layer);
}

// use style property to color shapes
var imageRGB = ecoRegions.style({styleProperty: 'style'});

// Map.addLayer(imageRGB.clip(mc), {}, 'Moore County Resolve EcoRegions 2017');

// EPA EcoRegions

var epa = ee.FeatureCollection("EPA/Ecoregions/2013/L4");

var visParams = {
  palette: ['82b74b','405d27','3e4444'],
  min: 0.0,
  max: 67800000000.0,
  opacity: 0.8,
};

var ecoRegion = ee.Image().float().paint(epa, 'shape_area');

// Map.addLayer(ecoRegion.clip(mc), visParams, 'EPA EcoRegions 2014');
// Map.addLayer(epa, null, 'for Inspector', false);
