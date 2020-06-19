var geometry =
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-118.94599005090573, 47.00518711786543],
          [-118.94599005090573, 46.9332630543377],
          [-118.86599584924558, 46.9332630543377],
          [-118.86599584924558, 47.00518711786543]]], null, false);

          Map.centerObject(geometry, 13);

          // NAIP SEASONS: The ONLY Available Images for WA with 4 Bands ('N') are 2009, 2011, 2013, 2015 //
          // NAIP SEASONS: The ONLY Images in Overlapping Areas are from JUNE/JULY: Summer Growing Season //
          // Reference for 4 Band Imagery by State: https://www.fsa.usda.gov/Assets/USDA-FSA-Public/usdafiles/APFO/NAIP_Covg_20150512.pdf //

          // DUE TO LIMITATIONS: the **ONLY** assessed season is SUMMER (End of JUNE, Beginning of JULY)

          var naip = ee.ImageCollection('USDA/NAIP/DOQQ')
                                .filterBounds(geometry)
                                .set('system: time_start', 'date')
                                .set('system: time_end', 'date');
                                  ee.Filter.calendarRange(9,9, 'month');

          var trueColorVisNAIP = {
            bands: (['R', 'G', 'B']),
            min: 0.0,
            max: 255.0,
          };

          print(naip, 'NAIP Information');

          var naip2009 = ee.ImageCollection(naip)
                                .filterDate('2009-05-01', '2009-09-30')
                                .filterBounds(geometry)
                                .sort('system: time_start')
                                .first();

          print(naip2009, '2009 NAIP Collection Information');

          Map.addLayer(naip2009, trueColorVisNAIP, 'NAIP 2009');

          var naip2011 = ee.ImageCollection(naip)
                                .filterDate('2011-05-01', '2011-09-30')
                                .filterBounds(geometry)
                                  .sort('system: time_start')
                                .first();

          print(naip2011, '2011 NAIP Collection Information');

          Map.addLayer(naip2011, trueColorVisNAIP, 'NAIP 2011');

          var naip2013 = ee.ImageCollection(naip)
                                .filterDate('2013-05-01','2013-09-30')
                                .filterBounds(geometry)
                                  .sort('system: time_start')
                                .first();

          print(naip2013, '2013 NAIP Collection Information');

          Map.addLayer(naip2013, trueColorVisNAIP, 'NAIP 2013');

          var naip2015 = ee.ImageCollection(naip)
                                .filterDate('2015-05-01','2015-09-30')
                                .filterBounds(geometry)
                                .sort('system: time_start')
                                .first();


          print(naip2015, '2015 NAIP Collection Information');

          Map.addLayer(naip2015, trueColorVisNAIP, 'NAIP 2015');

          var summerSeasons = ee.ImageCollection([naip2009, naip2011, naip2013, naip2015]);
          print(summerSeasons, 'Summer Growing Season Info');

          // // LANDSAT 7 SR Tier 1

          var trueColorRGB = {
            bands: ['B3', 'B2', 'B1'],
            min: 0,
            max: 3500,
            gamma: 1.3
          };

          var fCIR = {
            bands: ['B4', 'B3', 'B2'],
            min: 0,
            max: 3500,
            gamma: 1.3
          };

          var landsat = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
                                .filter(ee.Filter.calendarRange(6,7, 'month'))
                                .filterBounds(geometry)
                                .set('system: time_start', 'date')
                                .set('system: time_end', 'date');

          var landsat2009 = ee.ImageCollection(landsat)
                                .filterDate('2009-07-01','2009-7-31')
                                .filterBounds(geometry)
                                .filter(ee.Filter.lt('CLOUD_COVER',10))
                                .sort('system: time_start')
                                .first();

          print(landsat2009, '2009 Landsat Collection Information');

          Map.addLayer(landsat2009.clip(geometry), trueColorRGB, '2009 L7');

          var landsat2011 = ee.ImageCollection(landsat)
                                .filterDate('2011-07-01','2011-07-31')
                                .filterBounds(geometry)
                                .filter(ee.Filter.lt('CLOUD_COVER',10))
                                .sort('system: time_start')
                                .first();

          print(landsat2011, '2011 Landsat Collection Information');

          Map.addLayer(landsat2011.clip(geometry), trueColorRGB, '2011 L7');

          var landsat2013 = ee.ImageCollection(landsat)
                                .filterDate('2013-05-01','2013-10-01')
                                .filterBounds(geometry)
                                .filter(ee.Filter.lt('CLOUD_COVER',10))
                                .sort('system: time_start')
                                .first();

          print(landsat2013, '2013 Landsat Collection Information');

          Map.addLayer(landsat2013.clip(geometry), trueColorRGB, '2013 L7');

          var landsat2015 = ee.ImageCollection(landsat)
                                .filterDate('2015-07-01','2015-07-31')
                                .filterBounds(geometry)
                                .filter(ee.Filter.lt('CLOUD_COVER',10))
                                .sort('system: time_start')
                                .first();

          print(landsat2015, '2015 Landsat Collection Information');

          Map.addLayer(landsat2015.clip(geometry), trueColorRGB, '2015 L7');

          // =============== END EXPLORATORY =============== //

          // Import Images // //

          var nImage2009 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20090627');
          var nImage2011 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20110702');
          var nImage2013 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20130630');
          var nImage2015 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20150701');

          var lImage2009 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_044027_20090702').clip(geometry);
          var lImage2011 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_044027_20110708').clip(geometry);
          var lImage2013 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_044027_20130713').clip(geometry);
          var lImage2015 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_044027_20150703').clip(geometry);


          // =============== GROUND TRUTH =============== //

          Map.addLayer(nImage2009, trueColorVisNAIP, 'NAIP June 2009');
          Map.addLayer(nImage2011, trueColorVisNAIP, 'NAIP July 2011');
          Map.addLayer(nImage2013, trueColorVisNAIP, 'NAIP June 2013');
          Map.addLayer(nImage2015, trueColorVisNAIP, 'NAIP July 2015');

          Map.addLayer(lImage2009, trueColorRGB, 'Landsat July 2009');
          Map.addLayer(lImage2011, trueColorRGB, 'Landsat July 2011');
          Map.addLayer(lImage2013, trueColorRGB, 'Landsat July 2013');
          Map.addLayer(lImage2015, trueColorRGB, 'Landsat July 2015');

          Map.addLayer(lImage2009, fCIR, 'Landsat FCIR July 2009');
          Map.addLayer(lImage2011, fCIR, 'Landsat FCIR July 2011');
          Map.addLayer(lImage2013, fCIR, 'Landsat FCIR July 2013');
          Map.addLayer(lImage2015, fCIR, 'Landsat FCIR July 2015');


          // // =============== BAND MATH: NAIP =============== //

          // // ================ NIR ================ //

          // // Single NIR Band Change from 2009 to 2011

          var diff2009to2011 = nImage2011.select('N').subtract(nImage2009.select('N')).add(156);
          print(diff2009to2011);

          Map.addLayer(diff2009to2011, {}, 'NAIP NIR Diff - 2009 to 2011');

          // // Create a histogram to determine the change threshold.

          var histogram1 = ui.Chart.image.histogram(diff2009to2011, geometry, 30);
          print(histogram1, 'NAIP NIR Difference 2009 & 2011');

          // // Create a binary layer using logical operations. (This is where you apply the thresholds!)

          var change2009to2011 = diff2009to2011.lt(110).or(diff2009to2011.gt(160));

          // // Mask the image with itself.

          change2009to2011 = change2009to2011.mask(change2009to2011);
          Map.addLayer(change2009to2011,
          {min: 0, max: 1, palette: ['green', 'red']},
          'NAIP NIR Binary Change - 2009 to 2011');

          // // Single NIR Band Change from 2011 to 2013

          var diff2011to2013 = nImage2013.select('N').subtract(nImage2011.select('N')).add(94);

          print(diff2011to2013);

          Map.addLayer(diff2011to2013, {}, 'NAIP NIR Diff - 2011 to 2013');

          var histogram2 = ui.Chart.image.histogram(diff2011to2013, geometry, 30);
          print(histogram2, 'NAIP NIR Difference 2011 & 2013');

          var change2011to2013 = diff2011to2013.lt(80).or(diff2011to2013.gt(125));
          print(change2011to2013);

          change2011to2013 = change2011to2013.mask(change2011to2013);
          Map.addLayer(change2011to2013,
          {min: 0, max: 1, palette: ['green', 'red']},
          'NAIP NIR Binary Change - 2011 to 2013');

          // // Single NIR Band Change from 2013 to 2015

          var diff2013to2015 = nImage2015.select('N').subtract(nImage2013.select('N')).add(144);
          print(diff2013to2015);

          Map.addLayer(diff2013to2015, {}, 'NAIP NIR Diff - 2013 to 2015');

          var histogram3 = ui.Chart.image.histogram(diff2013to2015, geometry, 30);
          print(histogram3, 'NAIP NIR Difference 2013 & 2015');

          var change2013to2015 = diff2013to2015.lt(133).or(diff2013to2015.gt(170));
          print(change2013to2015);

          change2013to2015 = change2013to2015.mask(change2013to2015);
          Map.addLayer(change2013to2015,
          {min: 0, max: 1, palette: ['green', 'red']},
          'NAIP NIR Binary Change - 2013 to 2015');

          // ================ RED ================ // //

          // // Single RED Band Change from 2009 to 2011

          var diff2009to2011r = nImage2011.select('R').subtract(nImage2009.select('R')).add(135);
          print(diff2009to2011r);

          Map.addLayer(diff2009to2011r, {}, 'NAIP RED Diff - 2009 to 2011');

          var histogram4 = ui.Chart.image.histogram(diff2009to2011r, geometry, 30);
          print(histogram4, 'NAIP RED Difference 2009 & 2011');

          var change2009to2011r = diff2009to2011r.lt(85).or(diff2009to2011r.gt(150));
          print(change2009to2011r);

          change2009to2011r = change2009to2011r.mask(change2009to2011r);
          Map.addLayer(change2009to2011r,
          {min: 0, max: 1, palette: ['green', 'red']},
          'NAIP RED Binary Change - 2009 to 2011');

          // // Single RED Band Change from 2011 to 2013

          var diff2011to2013r = nImage2013.select('R').subtract(nImage2011.select('R')).add(156);
          print(diff2011to2013r);

          Map.addLayer(diff2011to2013r, {}, 'NAIP RED Diff - 2011 to 2013');

          var histogram5 = ui.Chart.image.histogram(diff2011to2013r, geometry, 30);
          print(histogram5, 'NAIP RED Difference 2011 & 2013');

          var change2011to2013r = diff2011to2013r.lt(120).or(diff2011to2013r.gt(175));
          print(change2011to2013r);

          change2011to2013r = change2011to2013r.mask(change2011to2013r);
          Map.addLayer(change2011to2013r,
          {min: 0, max: 1, palette: ['green', 'red']},
          'NAIP RED Binary Change - 2011 to 2013');

          // // Single RED Band Change from 2013 to 2015

          var diff2013to2015r = nImage2015.select('R').subtract(nImage2013.select('R')).add(128);
          print(diff2013to2015r);

          Map.addLayer(diff2013to2015r, {}, 'NAIP RED Diff - 2013 to 2015');

          var histogram6 = ui.Chart.image.histogram(diff2013to2015r, geometry, 30);
          print(histogram6, 'NAIP RED Difference 2013 & 2015');

          var change2013to2015r = diff2013to2015r.lt(125).or(diff2013to2015r.gt(160));
          print(change2013to2015r);

          change2013to2015r = change2013to2015r.mask(change2013to2015r);
          Map.addLayer(change2013to2015r,
          {min: 0, max: 1, palette: ['green', 'red']},
          'NAIP RED Binary Change - 2013 to 2015');
