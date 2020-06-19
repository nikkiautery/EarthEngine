var point = /* color: #bf04c2 */ee.Geometry.Point([-122.39422090246335, 37.77360443582881]),
    landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1");

    // Step 1:

    var image = ee.Image(landsat
    .filterDate('2014-01-01', '2014-12-31')
    .filterBounds(point)
    .sort('CLOUD_COVER')
    .first());
    print('A Landsat Scene:', image);

    // Step 2: True Color

    var trueColor = {
    bands: ['B4', 'B3', 'B2'],
    min: 4000,
    max: 12000
    };
    Map.addLayer(image, trueColor, 'True-Color Image');

    // Step 2b: False Color IR Composite

    var falseColorIR = {
    bands: ['B5', 'B4', 'B3'],
    min: 4000,
    max: 13000
    };
    Map.addLayer(image, falseColorIR, 'False-Color IR Composite');

    // Step 2c: Explore Other Band Combos

    // Natural Color (varying max values)

    var naturalColor = {
    bands: ['B4', 'B3', 'B2'],
    min: 4000,
    max: 13000
    };
    Map.addLayer(image, naturalColor, 'Natural Color v1');

    var naturalColor2 = {
    bands: ['B4', 'B3', 'B2'],
    min: 4000,
    max: 12000
    };
    Map.addLayer(image, naturalColor2, 'Natural Color v2');

    // False Color

    var falseColor = {
    bands: ['B6', 'B5', 'B4'],
    min: 4000,
    max: 13000
    };
    Map.addLayer(image, falseColor, 'False Color');

    // Step 3: Plot At-Sensor Radiance @ Several Locations

    var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];
    var dnImage = image.select(bands);
    var radiance = ee.Algorithms.Landsat.calibratedRadiance(dnImage);
    var radParams = {bands: ['B4', 'B3', 'B2'], min: 0, max: 100};
    Map.addLayer(radiance, radParams, 'radiance');

    // Step 4: Sensor at TOA Reflectance @ Several Locations

    var toaImage = ee.Image('LANDSAT/LC8_L1T_TOA/LC80440342014077LGN00');
    Map.addLayer(toaImage, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'toa');

    // Step 4c: Hard Coding Locations & Plotting

    var ggPark = ee.Geometry.Point([-122.4860, 37.7692]);

    var reflectiveBands = bands.slice(0, 7);
    var wavelengths = [0.44, 0.48, 0.56, 0.65, 0.86, 1.61, 2.2];
    var reflectanceImage = toaImage.select(reflectiveBands);
    var options = {
    title: 'Landsat 8 TOA spectrum in Golden Gate Park',
    hAxis: {title: 'Wavelength (micrometers)'},
    vAxis: {title: 'Reflectance'},
    lineWidth: 1,
    pointSize: 4
    };

    var chart = Chart.image.regions(
    reflectanceImage, ggPark, null, 30, null, wavelengths)
    .setOptions(options);

    print(chart);

    // Step 4d: Hard Coding Locations & Plotting @ Other Locations

    // Lone Mountain

    var loneMountain = ee.Geometry.Point([-122.45387, 37.77702]);

    var reflectiveBands = bands.slice(0, 7);
    var wavelengths = [0.44, 0.48, 0.56, 0.65, 0.86, 1.61, 2.2];
    var reflectanceImage = toaImage.select(reflectiveBands);
    var options = {
    title: 'Landsat 8 TOA spectrum in Lone Mountain',
    hAxis: {title: 'Wavelength (micrometers)'},
    vAxis: {title: 'Reflectance'},
    lineWidth: 1,
    pointSize: 4
    };

    var chart = Chart.image.regions(
    reflectanceImage, loneMountain, null, 30, null, wavelengths)
    .setOptions(options);

    print(chart);

    // SoMa

    var soMa = ee.Geometry.Point([-122.40572, 37.77858]);

    var reflectiveBands = bands.slice(0, 7);
    var wavelengths = [0.44, 0.48, 0.56, 0.65, 0.86, 1.61, 2.2];
    var reflectanceImage = toaImage.select(reflectiveBands);
    var options = {
    title: 'Landsat 8 TOA spectrum in SoMa',
    hAxis: {title: 'Wavelength (micrometers)'},
    vAxis: {title: 'Reflectance'},
    lineWidth: 1,
    pointSize: 4
    };

    var chart = Chart.image.regions(
    reflectanceImage, soMa, null, 30, null, wavelengths)
    .setOptions(options);

    print(chart);

    // Haight-Ashbury

    var haightAshburry = ee.Geometry.Point([-122.4481, 37.7694]);

    var reflectiveBands = bands.slice(0, 7);
    var wavelengths = [0.44, 0.48, 0.56, 0.65, 0.86, 1.61, 2.2];
    var reflectanceImage = toaImage.select(reflectiveBands);
    var options = {
    title: 'Landsat 8 TOA spectrum in Haight-Ashburry',
    hAxis: {title: 'Wavelength (micrometers)'},
    vAxis: {title: 'Reflectance'},
    lineWidth: 1,
    pointSize: 4
    };

    var chart = Chart.image.regions(
    reflectanceImage, haightAshburry, null, 30, null, wavelengths)
    .setOptions(options);

    print(chart);
