var geometry =
    /* color: #0000ff */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-114.8024987060547, 37.07909543284672],
          [-114.8024987060547, 31.05508396263879],
          [-108.9138268310547, 31.05508396263879],
          [-108.9138268310547, 37.07909543284672]]], null, false);

          var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_RAW')
            .filterDate('2014-01-01', '2015-01-01');

          var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];

          var image = ee.Image(collection
          .filterDate('2014-01-01', '2014-12-31')
          .filterBounds(geometry)
          .sort('CLOUD_COVER')
          .first());
          print('A Landsat Scene:', image);

          // Map.setCenter(-112.3807, 36.1521, 10);

          // Map.setCenter(-110.9424, 36.9691, 10);

          Map.setCenter(-111.844, 33.197, 7);

          var trueColor = {
          bands: ['B4', 'B3', 'B2'],
          min: 5000,
          max: 19000
          };

          Map.addLayer(image.clip(geometry), trueColor, 'True-Color Image');

          //False Color IR Composite

          var falseColorIR = {
          bands: ['B5', 'B4', 'B3'],
          min: 5000,
          max: 19000
          };

          Map.addLayer(image.clip(geometry), falseColorIR, 'False-Color IR Composite');

          // Natural Color (varying max values)

          var naturalColor = {
          bands: ['B4', 'B3', 'B2'],
          min: 5000,
          max: 19000
          };

          Map.addLayer(image.clip(geometry), naturalColor, 'Natural Color v1');

          var naturalColor2 = {
          bands: ['B4', 'B3', 'B2'],
          min: 5000,
          max: 19000
          };

          Map.addLayer(image.clip(geometry), naturalColor2, 'Natural Color v2');

          // False Color

          var falseColor = {
          bands: ['B6', 'B5', 'B4'],
          min: 5000,
          max: 19000
          };

          Map.addLayer(image.clip(geometry), falseColor, 'False Color');

          // Playing with SRTM

          var imageSRTM = ee.Image('CGIAR/SRTM90_V4');

          Map.addLayer(imageSRTM.clip(geometry), {min: -1, max: 19000}, 'SRTM');

          Map.addLayer(imageSRTM.clip(geometry), {min: 0, max: 3000}, 'Custom');

          Map.addLayer(imageSRTM.clip(geometry), {min: 0, max: 3000, palette: ['blue', 'green', 'red']},
              'Custom Palette');

          //

          var median = collection.filterDate('2014-01-01', '2015-01-01').median();
          var mean = collection.filterDate('2014-01-01', '2015-01-01').mean();
          var min = collection.filterDate('2014-01-01', '2015-01-01').min();
          var max = collection.filterDate('2014-01-01', '2015-01-01').max();

          var visParams = {bands: ['B4', 'B3', 'B2'], max: 30000};

          Map.addLayer(median.clip(geometry), visParams, 'Median Layer');
          Map.addLayer(mean.clip(geometry), visParams, 'Mean Layer');
          Map.addLayer(min.clip(geometry), visParams, 'Min Layer');
          Map.addLayer(max.clip(geometry), visParams, 'Max Layer');

          //

          var hansenImage = ee.Image('UMD/hansen/global_forest_change_2018_v1_6');
          var datamask = hansenImage.select('datamask');
          var mask = datamask.eq(1);
          var maskedComposite = median.updateMask(mask);
          Map.addLayer(maskedComposite.clip(geometry), visParams, 'Masked Layer');
          print(hansenImage, "Hansen Image")

          // Make a water image out of the mask.
          var water = mask.not();

          // Mask water with itself to mask all the zeros (non-water).
          water = water.mask(water);

          // Make an image collection of visualization images.
          var mosaic = ee.ImageCollection([
            median.visualize(visParams),
            water.visualize({palette: '00ffff'}),
          ]).mosaic();

          // Display the mosaic.
          Map.addLayer(mosaic.clip(geometry), {}, 'Water');
