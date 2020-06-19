var boundingBox = /* color: #ff0000 */ee.Geometry.LinearRing(
        [[-114.029935546875, 37.12096750852173],
         [-111.9590126953125, 36.725738284424736],
         [-112.52480859375, 34.96256007895751],
         [-114.5517861328125, 35.39359059550445],
         [-114.029935546875, 37.12096750852173]]),
    epa = ee.FeatureCollection("EPA/Ecoregions/2013/L4"),
    resolve = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017"),
    point = /* color: #ffc82d */ee.Geometry.Point([-113.337796875, 36.02695137365228]);

    Map.setCenter(-113.337796875,36.02695137365228, 8);

    var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];

    var arizona = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate('2015-03-01','2019-10-31')
        .filterBounds(point)
        .filter(ee.Filter.eq('WRS_PATH', 38))
        .filter(ee.Filter.eq('WRS_ROW', 35));
    print(arizona, 'Arizona');

    var vizParams = {
      bands: ['B5', 'B4', 'B3'],
      min: 500,
      max: 3150,
      gamma: [0.95, 1.1, 1]
    };

    var arizona2015 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate('2015-03-01', '2015-05-31')
        .filterBounds(point)
        .filter(ee.Filter.eq('WRS_PATH', 38))
        .filter(ee.Filter.eq('WRS_ROW', 35));
        var image15 = ee.Image(arizona2015.sort('CLOUD_COVER').first());
    print('Least cloudy image 2015: ', image15);

    var arizona2016 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate('2016-03-01', '2016-10-01')
        .filterBounds(point)
        .filter(ee.Filter.eq('WRS_PATH', 38))
        .filter(ee.Filter.eq('WRS_ROW', 35));
        var image16 = ee.Image(arizona2016.sort('CLOUD_COVER').first());
    print('Least cloudy image 2016: ', image16);

    var arizona2017 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate('2017-03-01', '2017-10-01')
        .filterBounds(point)
        .filter(ee.Filter.eq('WRS_PATH', 38))
        .filter(ee.Filter.eq('WRS_ROW', 35));
        var image17 = ee.Image(arizona2017.sort('CLOUD_COVER').first());
    print('Least cloudy image 2017: ', image17);

    var arizona2018 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate('2018-03-01', '2018-10-01')
        .filterBounds(point)
        .filter(ee.Filter.eq('WRS_PATH', 38))
        .filter(ee.Filter.eq('WRS_ROW', 35));
        var image18 = ee.Image(arizona2018.sort('CLOUD_COVER').first());
    print('Least cloudy image 2018: ', image18);

    var arizona2019 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate('2019-03-01', '2019-10-01')
        .filterBounds(point)
        .filter(ee.Filter.eq('WRS_PATH', 38))
        .filter(ee.Filter.eq('WRS_ROW', 35));
        var image19 = ee.Image(arizona2019.sort('CLOUD_COVER').first());
    print('Least cloudy image 2019: ', image19);

    // False Color Composite

    var vizParams = {
      bands: ['B5', 'B4', 'B3'],
      min: 500,
      max: 3150,
      gamma: [0.95, 1.1, 1]
    };

    Map.addLayer(image15, vizParams, 'AZ 2015 False Color Composite');
    Map.addLayer(image16, vizParams, 'AZ 2016 False Color Composite');
    Map.addLayer(image17, vizParams, 'AZ 2017 False Color Composite');
    Map.addLayer(image18, vizParams, 'AZ 2018 False Color Composite');
    Map.addLayer(image19, vizParams, 'AZ 2019 False Color Composite');

    // NDVI
    var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};

    var nir1 = image15.select('B5');
    var red1 = image15.select('B4');
    var ndvi1 = nir1.subtract(red1).divide(nir1.add(red1)).rename('NDVI1');

    var nir2 = image16.select('B5');
    var red2 = image16.select('B4');
    var ndvi2 = nir2.subtract(red2).divide(nir2.add(red2)).rename('NDVI2');

    var nir3 = image17.select('B5');
    var red3 = image17.select('B4');
    var ndvi3 = nir3.subtract(red3).divide(nir3.add(red3)).rename('NDVI3');

    var nir4 = image18.select('B5');
    var red4 = image18.select('B4');
    var ndvi4 = nir4.subtract(red4).divide(nir4.add(red4)).rename('NDVI4');

    var nir5 = image19.select('B5');
    var red5 = image19.select('B4');
    var ndvi5 = nir5.subtract(red5).divide(nir5.add(red5)).rename('NDVI5');

    Map.addLayer(ndvi1, ndviParams, 'Arizona 2015 NDVI');
    Map.addLayer(ndvi2, ndviParams, 'Arizona 2016 NDVI');
    Map.addLayer(ndvi3, ndviParams, 'Arizona 2017 NDVI');
    Map.addLayer(ndvi4, ndviParams, 'Arizona 2018 NDVI');
    Map.addLayer(ndvi5, ndviParams, 'Arizona 2019 NDVI');

    // 2015

    var ndvi = image15.normalizedDifference(['B5', 'B4']);
    var ndwi = image15.normalizedDifference(['B3', 'B5']);

    // Create some binary images from thresholds on the indices.
    // This threshold is designed to detect bare land.
    var bare1 = ndvi.lt(0.2).and(ndwi.lt(0.3));
    // This detects bare land with lower sensitivity. It also detects shadows.
    var bare2 = ndvi.lt(0.2).and(ndwi.lt(0.8));

    // Define visualization parameters for the spectral indices.
    var ndviViz = {min: -1, max: 1, palette: ['FF0000', '00FF00']};
    var ndwiViz = {min: 0.5, max: 1, palette: ['00FFFF', '0000FF']};

    // Mask and mosaic visualization images.  The last layer is on top.
    var mosaic15 = ee.ImageCollection([
      // NDWI > 0.5 is water.  Visualize it with a blue palette.
      ndwi.updateMask(ndwi.gte(0.5)).visualize(ndwiViz),
      // NDVI > 0.2 is vegetation.  Visualize it with a green palette.
      ndvi.updateMask(ndvi.gte(0.2)).visualize(ndviViz),
      // Visualize bare areas with shadow (bare2 but not bare1) as gray.
      bare2.updateMask(bare2.and(bare1.not())).visualize({palette: ['AAAAAA']}),
      // Visualize the other bare areas as white.
      bare1.updateMask(bare1).visualize({palette: ['FFFFFF']}),
    ]).mosaic();
    Map.addLayer(mosaic15, {}, '2015');

    // 2016

    var ndvi = image16.normalizedDifference(['B5', 'B4']);
    var ndwi = image16.normalizedDifference(['B3', 'B5']);

    var bare1 = ndvi.lt(0.2).and(ndwi.lt(0.3));

    var bare2 = ndvi.lt(0.2).and(ndwi.lt(0.8));

    var ndviViz = {min: -1, max: 1, palette: ['FF0000', '00FF00']};
    var ndwiViz = {min: 0.5, max: 1, palette: ['00FFFF', '0000FF']};

    var mosaic16 = ee.ImageCollection([
      ndwi.updateMask(ndwi.gte(0.5)).visualize(ndwiViz),
      ndvi.updateMask(ndvi.gte(0.2)).visualize(ndviViz),
      bare2.updateMask(bare2.and(bare1.not())).visualize({palette: ['AAAAAA']}),
      bare1.updateMask(bare1).visualize({palette: ['FFFFFF']}),
    ]).mosaic();
    Map.addLayer(mosaic16, {}, '2016');

    // 2017

    var ndvi = image17.normalizedDifference(['B5', 'B4']);
    var ndwi = image17.normalizedDifference(['B3', 'B5']);

    var bare1 = ndvi.lt(0.2).and(ndwi.lt(0.3));

    var bare2 = ndvi.lt(0.2).and(ndwi.lt(0.8));

    var ndviViz = {min: -1, max: 1, palette: ['FF0000', '00FF00']};
    var ndwiViz = {min: 0.5, max: 1, palette: ['00FFFF', '0000FF']};

    var mosaic17 = ee.ImageCollection([
      ndwi.updateMask(ndwi.gte(0.5)).visualize(ndwiViz),
      ndvi.updateMask(ndvi.gte(0.2)).visualize(ndviViz),
      bare2.updateMask(bare2.and(bare1.not())).visualize({palette: ['AAAAAA']}),
      bare1.updateMask(bare1).visualize({palette: ['FFFFFF']}),
    ]).mosaic();
    Map.addLayer(mosaic17, {}, '2017');

    // 2018

    var ndvi = image18.normalizedDifference(['B5', 'B4']);
    var ndwi = image18.normalizedDifference(['B3', 'B5']);

    var bare1 = ndvi.lt(0.2).and(ndwi.lt(0.3));

    var bare2 = ndvi.lt(0.2).and(ndwi.lt(0.8));

    var ndviViz = {min: -1, max: 1, palette: ['FF0000', '00FF00']};
    var ndwiViz = {min: 0.5, max: 1, palette: ['00FFFF', '0000FF']};

    var mosaic18 = ee.ImageCollection([
      ndwi.updateMask(ndwi.gte(0.5)).visualize(ndwiViz),
      ndvi.updateMask(ndvi.gte(0.2)).visualize(ndviViz),
      bare2.updateMask(bare2.and(bare1.not())).visualize({palette: ['AAAAAA']}),
      bare1.updateMask(bare1).visualize({palette: ['FFFFFF']}),
    ]).mosaic();
    Map.addLayer(mosaic18, {}, '2018');

    // 2019

    var ndvi = image19.normalizedDifference(['B5', 'B4']);
    var ndwi = image19.normalizedDifference(['B3', 'B5']);

    var bare1 = ndvi.lt(0.2).and(ndwi.lt(0.3));

    var bare2 = ndvi.lt(0.2).and(ndwi.lt(0.8));

    var ndviViz = {min: -1, max: 1, palette: ['FF0000', '00FF00']};
    var ndwiViz = {min: 0.5, max: 1, palette: ['00FFFF', '0000FF']};

    var mosaic19 = ee.ImageCollection([
      ndwi.updateMask(ndwi.gte(0.5)).visualize(ndwiViz),
      ndvi.updateMask(ndvi.gte(0.2)).visualize(ndviViz),
      bare2.updateMask(bare2.and(bare1.not())).visualize({palette: ['AAAAAA']}),
      bare1.updateMask(bare1).visualize({palette: ['FFFFFF']}),
    ]).mosaic();
    Map.addLayer(mosaic19, {}, '2019');

    //

    var constant1 = ndvi1;
    var constant2 = ndvi2;
    var constant3 = ndvi3;
    var constant4 = ndvi4;
    var constant5 = ndvi5;

    // Create a collection by giving a list to the constructor.
    var collectionFromConstructor = ee.ImageCollection([constant1, constant2, constant3, constant4, constant5]);
    print('collectionFromConstructor: ', collectionFromConstructor);

    // Create a collection with fromImages().
    var collectionFromImages = ee.ImageCollection.fromImages(
      [ndvi1, ndvi2, ndvi3, ndvi4, ndvi5]);
    print('collectionFromImages: ', collectionFromImages);

    // Merge two collections.
    var mergedCollection = collectionFromConstructor.merge(collectionFromImages);
    print('mergedCollection: ', mergedCollection);

    // Create a toy FeatureCollection
    var features = ee.FeatureCollection(
      [ee.Feature(null, {foo: 1}), ee.Feature(null, {foo: 2})]);

    // Create an ImageCollection from the FeatureCollection
    // by mapping a function over the FeatureCollection.
    var images = features.map(function(feature) {
      return ee.Image(ee.Number(feature.get('foo')));
    });

    // Print the resultant collection.
    print('Image collection: ', images);

    //

    var az = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate('2015-03-01','2019-10-31')
        .filterBounds(point)
        .filter(ee.Filter.eq('WRS_PATH', 38))
        .filter(ee.Filter.eq('WRS_ROW', 35));

    // Function to calculate and add an NDVI band
    var addNDVI = function(image) {
    return image.addBands(image.normalizedDifference(['B5', 'B4']));
    };

    // Add NDVI band to image collection
    var azNDVI = az.map(addNDVI);
    // Extract NDVI band and create NDVI median composite image
    var NDVI = azNDVI.select(['nd']);
    var NDVImean = NDVI.mean();

    var ndvi_pal = ['33ccff', '33ccff', '33ccff', '33ccff', '33ccff', '33ccff', '74A901',
        'cc9900', '996633', '3E8601', '207401', '056201', '004C00', '023B01',
        '012E01', '011D01', '011301'];

    // Time Series Chart

    var plotNDVI = ui.Chart.image.seriesByRegion(azNDVI, point, ee.Reducer.mean(),
    'nd',500,'system:time_start', 'system:index')
                  .setChartType('LineChart').setOptions({
                    title: 'NDVI Time Series (mean) 2015 through 2019',
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDVI'}
    });


    print(plotNDVI);

    Map.addLayer(NDVImean, {min:-0.5, max:0.9, palette: ndvi_pal}, 'NDVI');

    //

    epa = ee.FeatureCollection("EPA/Ecoregions/2013/L4");
    resolve = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017");

    // Resolve EcoRegions

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

    var resolve = resolve.map(function(f) {
      var color = f.get('COLOR');
      return f.set({style: {color: color, width: 0}});
    });

    for (var i=0; i < colorUpdates.length; i++) {
      colorUpdates[i].layer = resolve
          .filterMetadata('ECO_ID','equals',colorUpdates[i].ECO_ID)
          .map(function(f) {
            return f.set({style: {color: colorUpdates[i].COLOR, width: 0}});
          });

      resolve = resolve
          .filterMetadata('ECO_ID','not_equals',colorUpdates[i].ECO_ID)
          .merge(colorUpdates[i].layer);
    }

    var imageRGB = resolve.style({styleProperty: 'style'});

    // EPA EcoRegions


    var visParams = {
      palette: ['82b74b','405d27','3e4444'],
      min: 0.0,
      max: 67800000000.0,
      opacity: 0.8,
    };
    var image = ee.Image().float().paint(epa, 'shape_area');

    /// Drought Index

    var pdsiVis = {
      min: -5.0,
      max: 10.0,
      palette: ['red', 'yellow', 'green', 'cyan', 'blue'],
    };

    var dataset1 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                      .filter(ee.Filter.date('2015-03-01', '2015-10-31'));

    var dates = ee.List(dataset1.get('date_range'));
    var dateRange = ee.DateRange(dates.get(0), dates.get(1));
    print(dateRange);

    var pdsi1 = dataset1.select('pdsi');

    var dataset2 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                      .filter(ee.Filter.date('2016-07-01', '2016-07-31'));
    var pdsi2 = dataset2.select('pdsi');

    var dataset3 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                      .filter(ee.Filter.date('2017-07-01', '2017-07-31'));
    var pdsi3 = dataset3.select('pdsi');

    var dataset4 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                      .filter(ee.Filter.date('2018-07-01', '2018-07-31'));
    var pdsi4 = dataset4.select('pdsi');

    var dataset5 = ee.ImageCollection('IDAHO_EPSCOR/PDSI')
                      .filter(ee.Filter.date('2019-07-01', '2019-07-31'));
    var pdsi5 = dataset5.select('pdsi');

    Map.addLayer(imageRGB.clip(boundingBox), {}, 'Resolve EcoRegions 2017');

    Map.addLayer(image.clip(boundingBox), visParams, 'EPA EcoRegions 2014');

    Map.addLayer(pdsi1.mean(), pdsiVis, 'PDSI 2015');
    Map.addLayer(pdsi2.mean(), pdsiVis, 'PDSI 2016');
    Map.addLayer(pdsi3.mean(), pdsiVis, 'PDSI 2017');
    Map.addLayer(pdsi4.mean(), pdsiVis, 'PDSI 2018');
    Map.addLayer(pdsi5.mean(), pdsiVis, 'PDSI 2019');
