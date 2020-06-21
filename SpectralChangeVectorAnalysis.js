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

          var aoi =
              /* color: #98ff00 */
              /* shown: false */
              /* displayProperties: [
                {
                  "type": "rectangle"
                }
              ] */
              geometry;

          Map.centerObject(aoi, 13);
          // NAIP SEASONS: The ONLY Available Images for WA with 4 Bands ('N') are 2009, 2011, 2013, 2015 //
          // NAIP SEASONS: The ONLY Images in Overlapping Areas are from JUNE/JULY: Summer Growing Season //
          // Reference for 4 Band Imagery by State: https://www.fsa.usda.gov/Assets/USDA-FSA-Public/usdafiles/APFO/NAIP_Covg_20150512.pdf //

          // DUE TO LIMITATIONS: the **ONLY** assessed season is SUMMER (End of JUNE, Beginning of JULY)

          var naip = ee.ImageCollection('USDA/NAIP/DOQQ')
                                .filterBounds(aoi)
                                .set('system: time_start', 'date')
                                .set('system: time_end', 'date');
                                  ee.Filter.calendarRange(9,9, 'month');

          var trueColorVisNAIP = {
            bands: (['R', 'G', 'B']),
            min: 0.0,
            max: 255.0,
          };

          // print(naip, 'NAIP Information');

          var naip2009 = ee.ImageCollection(naip)
                                .filterDate('2009-05-01', '2009-09-30')
                                .filterBounds(aoi)
                                .sort('system: time_start')
                                .first();

          // print(naip2009, '2009 NAIP Collection Information');

          var naip2011 = ee.ImageCollection(naip)
                                .filterDate('2011-05-01', '2011-09-30')
                                .filterBounds(aoi)
                                  .sort('system: time_start')
                                .first();

          // print(naip2011, '2011 NAIP Collection Information');

          var naip2013 = ee.ImageCollection(naip)
                                .filterDate('2013-05-01','2013-09-30')
                                .filterBounds(aoi)
                                  .sort('system: time_start')
                                .first();

          // print(naip2013, '2013 NAIP Collection Information');

          var naip2015 = ee.ImageCollection(naip)
                                .filterDate('2015-05-01','2015-09-30')
                                .filterBounds(aoi)
                                .sort('system: time_start')
                                .first();


          // print(naip2015, '2015 NAIP Collection Information');


          // Map.addLayer(naip2009, trueColorVisNAIP, 'NAIP 2009');
          // Map.addLayer(naip2011, trueColorVisNAIP, 'NAIP 2011');
          // Map.addLayer(naip2013, trueColorVisNAIP, 'NAIP 2013');
          // Map.addLayer(naip2015, trueColorVisNAIP, 'NAIP 2015');

          var summerSeasons = ee.ImageCollection([naip2009, naip2011, naip2013, naip2015]);
          // print(summerSeasons, 'Summer Growing Season Info');

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
                                .filterBounds(aoi)
                                .set('system: time_start', 'date')
                                .set('system: time_end', 'date');

          var landsat2009 = ee.ImageCollection(landsat)
                                .filterDate('2009-07-01','2009-7-31')
                                .filterBounds(aoi)
                                .filter(ee.Filter.lt('CLOUD_COVER',10))
                                .sort('system: time_start')
                                .first();

          // print(landsat2009, '2009 Landsat Collection Information');

          var landsat2011 = ee.ImageCollection(landsat)
                                .filterDate('2011-07-01','2011-07-31')
                                .filterBounds(aoi)
                                .filter(ee.Filter.lt('CLOUD_COVER',10))
                                .sort('system: time_start')
                                .first();

          // print(landsat2011, '2011 Landsat Collection Information');

          var landsat2013 = ee.ImageCollection(landsat)
                                .filterDate('2013-05-01','2013-10-01')
                                .filterBounds(aoi)
                                .filter(ee.Filter.lt('CLOUD_COVER',10))
                                .sort('system: time_start')
                                .first();

          // print(landsat2013, '2013 Landsat Collection Information');

          var landsat2015 = ee.ImageCollection(landsat)
                                .filterDate('2015-07-01','2015-07-31')
                                .filterBounds(aoi)
                                .filter(ee.Filter.lt('CLOUD_COVER',10))
                                .sort('system: time_start')
                                .first();

          // print(landsat2015, '2015 Landsat Collection Information');

          // Map.addLayer(landsat2009.clip(geometry), trueColorRGB, '2009 L7');
          // Map.addLayer(landsat2011.clip(geometry), trueColorRGB, '2011 L7');
          // Map.addLayer(landsat2013.clip(geometry), trueColorRGB, '2013 L7');
          // Map.addLayer(landsat2015.clip(geometry), trueColorRGB, '2015 L7');

          // =============== END EXPLORATORY =============== //

          // Import Images // //

          var nImage2009 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20090627');
          var nImage2011 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20110702');
          var nImage2013 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20130630');
          var nImage2015 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20150701');

          // var lImage2009 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_044027_20090702').clip(geometry);
          // var lImage2011 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_044027_20110708').clip(geometry);
          // var lImage2013 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_044027_20130713').clip(geometry);
          // var lImage2015 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_044027_20150703').clip(geometry);


          // =============== GROUND TRUTH =============== //

          // Map.addLayer(nImage2009, trueColorVisNAIP, 'NAIP June 2009');
          // Map.addLayer(nImage2011, trueColorVisNAIP, 'NAIP July 2011');
          // Map.addLayer(nImage2013, trueColorVisNAIP, 'NAIP June 2013');
          // Map.addLayer(nImage2015, trueColorVisNAIP, 'NAIP July 2015');

          // Map.addLayer(lImage2009, trueColorRGB, 'Landsat July 2009');
          // Map.addLayer(lImage2011, trueColorRGB, 'Landsat July 2011');
          // Map.addLayer(lImage2013, trueColorRGB, 'Landsat July 2013');
          // Map.addLayer(lImage2015, trueColorRGB, 'Landsat July 2015');

          // Map.addLayer(lImage2009, fCIR, 'Landsat FCIR July 2009');
          // Map.addLayer(lImage2011, fCIR, 'Landsat FCIR July 2011');
          // Map.addLayer(lImage2013, fCIR, 'Landsat FCIR July 2013');
          // Map.addLayer(lImage2015, fCIR, 'Landsat FCIR July 2015');


          // // =============== BAND MATH: NAIP =============== //

          var image2009 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20090627').select(['N', 'R']);
          var image2011 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20110702').select(['N', 'R']);
          var image2013 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20130630').select(['N', 'R']);
          var image2015 = ee.Image('USDA/NAIP/DOQQ/m_4611801_ne_11_1_20150701').select(['N', 'R']);

          var date1band1 = image2009.select(['R']);
          var date2band1 = image2011.select(['R']);
          var date3band1 = image2013.select(['R']);
          var date4band1 = image2015.select(['R']);
          var date1band2 = image2009.select(['N']);
          var date2band2 = image2011.select(['N']);
          var date3band2 = image2013.select(['N']);
          var date4band2 = image2015.select(['N']);

          // Subtract each Date/Band combination and then assign that difference
          // to one of the sectors depending upon the sign of the result.

          // Date2Band1 - Date1Band1 = +/- (Either a positive or negative value will be created)
          // Date2Band2 - Date1Band2 = +/- (Either a positive or negative value will be created)

          // ======= RED DIFFERENCING ======= //

          var redDiff2009to2011 = date2band1.subtract(date1band1); // Red 2011 - Red 2009
          // print(redDiff2009to2011, 'Red Band Difference 2009 & 2011');

          // Map.addLayer(img_set1, {}, 'NAIP Red Diff - 2009 to 2011');

          //

          var redDiff2011to2013 = date3band1.subtract(date2band1); // Red 2013 - Red 2011
          // print(redDiff2011to2013, 'Red Band Difference 2011 & 2013');

          // Map.addLayer(redDiff2011to2013, {}, 'NAIP Red Diff - 2011 to 2013');

          //

          var redDiff2013to2015 = date4band1.subtract(date3band1); // Red 2015 - Red 2013
          // print(redDiff2013to2015, 'Red Band Difference 2013 & 2015');

          // Map.addLayer(redDiff2011to2013, {}, 'NAIP Red Diff - 2011 to 2013');


          // ======= NIR DIFFERENCING ======= //


          var nirDiff2009to2011 = date2band2.subtract(date1band2); // NIR 2011 - NIR 2009
          // print(nirDiff2009to2011, 'NIR Band Difference 2009 & 2011');

          // Map.addLayer(img_set1, {}, 'NAIP NIR Diff - 2009 to 2011');

          var nirDiff2009to2011Hist = ui.Chart.image.histogram(nirDiff2009to2011, aoi, 30);
          // print(nirDiff2009to2011Hist, 'NAIP NIR Difference 2009 & 2011');

          //

          var nirDiff2011to2013 = date3band2.subtract(date2band2); // NIR 2013 - NIR 2011
          // print(nirDiff2011to2013, 'NIR Band Difference 2011 & 2013');

          // Map.addLayer(nirDiff2011to2013, {}, 'NAIP NIR Diff - 2011 to 2013');

          //

          var nirDiff2013to2015 = date4band2.subtract(date3band2); // NIR 2015 - NIR 2013
          // print(nirDiff2013to2015, 'NIR Band Difference 2013 & 2015');

          // Map.addLayer(nirDiff2011to2013, {}, 'NAIP NIR Diff - 2011 to 2013');


          // Use logical operations to decide the assignment of the Sector Code.
          // This will result in an output image from this step with classes 1 through 4.

          // Sector Code:

          // Sector | Band 1 | Band 2
          // -------------------------
          //    1   |   +    |   +
          //    2   |   +    |   -
          //    3   |   -    |   +
          //    4   |   -    |   -

          // // Example from Zoom Call: to determine the +/- for Sector Code
          // var redPlus = redDiff2009to2011.gt(0);
          // var redMinus = redDiff2009to2011.lt(0);
          // var nirPlus = nirDiff2009to2011.gt(0);
          // var redMinus = nirDiff2009to2011.lt(0);

          // ===== INITIAL TAKE FOR 2009 & 2011 ===== //

          // Conceptually, each sector would be defined as follows based on the
          // table and band values where Band 1 = Red and Band 2 = NIR
          // !!! This code is not compatible with Bob/Gorelick's Code !!!

          // var sector1 = redDiff2009to2011.gt(0).and(nirDiff2009to2011.gt(0));
          // var sector2 = redDiff2009to2011.gt(0).and(nirDiff2009to2011.lt(0));
          // var sector3 = redDiff2009to2011.lt(0).and(nirDiff2009to2011.gt(0));
          // var sector4 = redDiff2009to2011.lt(0).and(nirDiff2009to2011.lt(0));

          // var sectorCollection = ee.ImageCollection.fromImages([sector1, sector2, sector3, sector4]);

          // var imageList = sectorCollection.toList(sectorCollection.size());
          // var sector1 = imageList.get(0);
          // var sector2 = imageList.get(1);
          // var sector3 = imageList.get(2);
          // var sector4 = imageList.get(3);

          // print(imageList, 'ImageList');
          // print(sector1, 'Sector 1');
          // print(sector2, 'Sector 2');
          // print(sector3, 'Sector 3');
          // print(sector4, 'Sector 4');


          // ===== RED ===== //

          // 2009

          var sectorShell2009 = ee.Image(image2009).select(['R']).clip(aoi);

          var sectorMap2009 = ee.Image(sectorShell2009)
          .where(redDiff2009to2011.gt(0).and(nirDiff2009to2011.gt(0)), 1)
          .where(redDiff2009to2011.gt(0).and(nirDiff2009to2011.lt(0)), 2)
          .where(redDiff2009to2011.lt(0).and(nirDiff2009to2011.gt(0)), 3)
          .where(redDiff2009to2011.lt(0).and(nirDiff2009to2011.lt(0)), 4)
          .updateMask(sectorShell2009);

          Map.addLayer(sectorMap2009.select('R'), {min: 1, max: 4, palette: ['#005ce6','#40ff00', '#ff0000', '#ffffff']},'Sector Map 2009 (RED)');

          // 2011

          var sectorShell2011 = ee.Image(image2011).select(['R']).clip(aoi);

          var sectorMap2011 = ee.Image(sectorShell2011)
          .where(redDiff2009to2011.gt(0).and(nirDiff2009to2011.gt(0)), 1)
          .where(redDiff2009to2011.gt(0).and(nirDiff2009to2011.lt(0)), 2)
          .where(redDiff2009to2011.lt(0).and(nirDiff2009to2011.gt(0)), 3)
          .where(redDiff2009to2011.lt(0).and(nirDiff2009to2011.lt(0)), 4)
          .updateMask(sectorShell2011);

          Map.addLayer(sectorMap2011.select('R'), {min: 1, max: 4, palette: ['#005ce6','#40ff00', '#ff0000', '#ffffff']},'Sector Map 2011 (RED)');

          // 2013

          var sectorShell2013 = ee.Image(image2013).select(['R']).clip(aoi);

          var sectorMap2013 = ee.Image(sectorShell2013)
          .where(redDiff2011to2013.gt(0).and(nirDiff2011to2013.gt(0)), 1)
          .where(redDiff2011to2013.gt(0).and(nirDiff2011to2013.lt(0)), 2)
          .where(redDiff2011to2013.lt(0).and(nirDiff2011to2013.gt(0)), 3)
          .where(redDiff2011to2013.lt(0).and(nirDiff2011to2013.lt(0)), 4)
          .updateMask(sectorShell2013);

          Map.addLayer(sectorMap2013.select('R'), {min: 1, max: 4, palette: ['#005ce6','#40ff00', '#ff0000', '#ffffff']},'Sector Map 2013 (RED)');

          // 2015

          var sectorShell2015 = ee.Image(image2015).select(['R']).clip(aoi);

          var sectorMap2015 = ee.Image(sectorShell2015)
          .where(redDiff2013to2015.gt(0).and(nirDiff2013to2015.gt(0)), 1)
          .where(redDiff2013to2015.gt(0).and(nirDiff2013to2015.lt(0)), 2)
          .where(redDiff2013to2015.lt(0).and(nirDiff2013to2015.gt(0)), 3)
          .where(redDiff2013to2015.lt(0).and(nirDiff2013to2015.lt(0)), 4)
          .updateMask(sectorShell2015);

          Map.addLayer(sectorMap2015.select('R'), {min: 1, max: 4, palette: ['#005ce6','#40ff00', '#ff0000', '#ffffff']},'Sector Map 2015 (RED)');

          // ===== NIR ===== //

          // 2009

          var sectorShell2009 = ee.Image(image2009).select(['N']).clip(aoi);

          var sectorMap2009 = ee.Image(sectorShell2009)
          .where(redDiff2009to2011.gt(0).and(nirDiff2009to2011.gt(0)), 1)
          .where(redDiff2009to2011.gt(0).and(nirDiff2009to2011.lt(0)), 2)
          .where(redDiff2009to2011.lt(0).and(nirDiff2009to2011.gt(0)), 3)
          .where(redDiff2009to2011.lt(0).and(nirDiff2009to2011.lt(0)), 4)
          .updateMask(sectorShell2009);

          Map.addLayer(sectorMap2009.select('N'), {min: 1, max: 4, palette: ['#005ce6','#40ff00', '#ff0000', '#ffffff']},'Sector Map 2009 (NIR)');

          // 2011

          var sectorShell2011 = ee.Image(image2011).select(['N']).clip(aoi);

          var sectorMap2011 = ee.Image(sectorShell2011)
          .where(redDiff2009to2011.gt(0).and(nirDiff2009to2011.gt(0)), 1)
          .where(redDiff2009to2011.gt(0).and(nirDiff2009to2011.lt(0)), 2)
          .where(redDiff2009to2011.lt(0).and(nirDiff2009to2011.gt(0)), 3)
          .where(redDiff2009to2011.lt(0).and(nirDiff2009to2011.lt(0)), 4)
          .updateMask(sectorShell2011);

          Map.addLayer(sectorMap2011.select('N'), {min: 1, max: 4, palette: ['#005ce6','#40ff00', '#ff0000', '#ffffff']},'Sector Map 2011 (NIR)');

          // 2013

          var sectorShell2013 = ee.Image(image2013).select(['N']).clip(aoi);

          var sectorMap2013 = ee.Image(sectorShell2013)
          .where(redDiff2011to2013.gt(0).and(nirDiff2011to2013.gt(0)), 1)
          .where(redDiff2011to2013.gt(0).and(nirDiff2011to2013.lt(0)), 2)
          .where(redDiff2011to2013.lt(0).and(nirDiff2011to2013.gt(0)), 3)
          .where(redDiff2011to2013.lt(0).and(nirDiff2011to2013.lt(0)), 4)
          .updateMask(sectorShell2013);

          Map.addLayer(sectorMap2013.select('N'), {min: 1, max: 4, palette: ['#005ce6','#40ff00', '#ff0000', '#ffffff']},'Sector Map 2013 (NIR)');

          // 2015

          var sectorShell2015 = ee.Image(image2015).select(['N']).clip(aoi);

          var sectorMap2015 = ee.Image(sectorShell2015)
          .where(redDiff2013to2015.gt(0).and(nirDiff2013to2015.gt(0)), 1)
          .where(redDiff2013to2015.gt(0).and(nirDiff2013to2015.lt(0)), 2)
          .where(redDiff2013to2015.lt(0).and(nirDiff2013to2015.gt(0)), 3)
          .where(redDiff2013to2015.lt(0).and(nirDiff2013to2015.lt(0)), 4)
          .updateMask(sectorShell2015);

          Map.addLayer(sectorMap2015.select('N'), {min: 1, max: 4, palette: ['#005ce6','#40ff00', '#ff0000', '#ffffff']},'Sector Map 2015 (NIR)');


          // set position of panel

          var legend = ui.Panel({
          style: {
          position: 'bottom-left',
          padding: '8px 15px'
          }
          });

          // Create legend title
          var legendTitle = ui.Label({
          value: 'Sector Map Change',
          style: {
          fontWeight: 'bold',
          fontSize: '12px',
          margin: '0 0 4px 0',
          padding: '0'
          }
          });

          // Add the title to the panel
          legend.add(legendTitle);

          // Creates and styles 1 row of the legend.
          var makeRow = function(color, name) {

          // Create the label that is actually the colored box.
          var colorBox = ui.Label({
          style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
          }
          });

          // Create the label filled with the description text.
          var description = ui.Label({
          value: name,
          style: {margin: '0 0 4px 6px'}
          });

          // return the panel
          return ui.Panel({
          widgets: [colorBox, description],
          layout: ui.Panel.Layout.Flow('horizontal')
          });
          };

          // Palette with the colors
          var palette =['005ce6','40ff00','ff0000','ffffff'];

          // name of the legend
          var names = ['Blue: Sector 1', 'Green: Sector 2', 'Red: Sector 3', 'White: Sector 4'];

          // Add color and and names
          for (var i = 0; i < 4; i++) {
          legend.add(makeRow(palette[i], names[i]));
          }

          // add legend to map
          Map.add(legend);
