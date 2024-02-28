var collection = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-15.825098211054565, 46.65553568821407],
          [-15.825098211054565, 33.98717696631419],
          [7.773534601445435, 33.98717696631419],
          [7.773534601445435, 46.65553568821407]]], null, false),
    table = ee.FeatureCollection("projects/ee-pmisson/assets/eclipse2026");

    alert('Doublecheck the location at least one day earlier to garantee that there are obstacles on your view direction')
// Cargar la colección de imágenes

var elevation = ee.Image('USGS/SRTMGL1_003');

var shadowMap1 = ee.Terrain.hillShadow({
  image: elevation,
  azimuth: 238,
  zenith: 90-1,
  neighborhoodSize: 200,
  hysteresis: true
});

var shadowMap6 = ee.Terrain.hillShadow({
  image: elevation,
  azimuth: 238,
  zenith: 90-6,
  neighborhoodSize: 200,
  hysteresis: true
});

var hillshade = ee.Terrain.hillshade(elevation, 238, 7); //238
var hillshadow =ee.Terrain.hillShadow(elevation, 238, 6);
Map.addLayer(hillshade, {min: 0, max: 255}, 'Hillshade', false);
Map.addLayer(shadowMap6, {min: 0, max: 1}, 'Iluminated 6º',false);


// Filtrar por fecha para obtener imágenes de agosto
var augustImages = collection.filter(ee.Filter.calendarRange(8, 8, 'month'));

// Seleccionar la banda 'cf_cvg'
var cfCvg = augustImages.select('cf_cvg');

// Calcular la media
var meanImage = cfCvg.mean().divide(27);

// Visualizar el resultado
Map.addLayer(meanImage, {min: 0, max: 1, palette: ['blue', 'green', 'red']}, 'Mean cloud free nights VIIRS');
Map.addLayer(shadowMap1, {min: 0, max: 1, opacity: 0.2}, 'Iluminated 1º',true);
// Crear el panel para la leyenda
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Titulo de la leyenda
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});

// Añadir el título al panel de la leyenda
legend.add(legendTitle);

// Valores y etiquetas de la leyenda
var palette =['blue', 'green', 'red'];
var labels = ['0%', '50%', '100%'];

// Añadir los colores y etiquetas a la leyenda
palette.forEach(function(color, index){
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });

  var description = ui.Label({
    value: labels[index],
    style: {margin: '0 0 4px 6px'}
  });

  // Añadir el color y la etiqueta al panel de la leyenda
  legend.add(ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
});

// Añadir la leyenda al mapa
Map.add(legend);



// Cargar la colección de imágenes
var collection = ee.ImageCollection("NOAA/VIIRS/001/VNP46A1");

// Filtrar por fecha para obtener imágenes de agosto
var augustImages = collection.filter(ee.Filter.calendarRange(8, 8, 'month'));

// Seleccionar la banda deseada, por ejemplo, 'DNB_At_Sensor_Radiance_500m'
var selectedBand = augustImages.select('QF_Cloud_Mask');

// Calcular la media
var meanImage = selectedBand.mean();

// Visualizar el resultado
Map.addLayer(meanImage, {min: 92, max: 177, palette: ['blue', 'green', 'red']}, 'VIIRS CloudMask', false);


// Cargar la colección de imágenes
var collection = ee.ImageCollection("NOAA/VIIRS/001/VNP46A1");


// Función para enmascarar imágenes basada en los criterios especificados
function maskCriteria(image) {
  var cloudMask = image.select('QF_Cloud_Mask');
  var dayMask = cloudMask.bitwiseAnd(1).eq(0);
  var cloudMaskBits = cloudMask.rightShift(6);
  var cloudConditionMask = cloudMaskBits.eq(2).or(cloudMaskBits.eq(3));
  return image.updateMask(dayMask)//.updateMask(cloudConditionMask);
}

// Aplicar la función de máscara a la colección y filtrar por la geometría
var filteredCollection = collection
                          .map(maskCriteria)
                          .filterBounds(geometry);

// Crear filtros de fecha
var filterMonth = ee.Filter.calendarRange(8, 8, 'month');
var filterDays = ee.Filter.calendarRange(8, 20, 'day_of_month');

// Aplicar filtros de fecha
var augustImages = filteredCollection
                    .filter(filterMonth)
                    .filter(filterDays);

// Seleccionar la banda deseada y calcular la media
var selectedBand = augustImages.select('BrightnessTemperature_M16');
var meanImage = selectedBand.mean();

// Visualizar el resultado
Map.addLayer(meanImage, {min: 150, max: 195, palette: ['blue', 'green', 'red']}, 'Brightness Temperature M16  VIIRS',false);
// Importar la librería SunCalc para calcular la posición del sol
// Cargar la colección de imágenes
var dataset = ee.ImageCollection('MODIS/061/MCD18A1')
                  // Filtrar para incluir solo los meses de agosto de cada año
                  .filter(ee.Filter.calendarRange(8, 8, 'month'));

// Seleccionar la banda de interés
var gmt_1200_dsr = dataset.select('GMT_1800_DSR');

// Definir la visualización
var gmt_1200_dsr_vis = {
  min: 0,
  max: 155,
  palette: ['0f17ff', 'b11406', 'f1ff23'],
};

// Configurar el centro del mapa y añadir la capa
Map.setCenter(-3, 40, 5);
Map.addLayer(
    gmt_1200_dsr, gmt_1200_dsr_vis,
    'Total Sun Radiation dsr at GMT 18:00 (MODIS)',false);
    

// Define las coordenadas a las que quieres centrar el mapa.
var longitude = -3;
var latitude = 40;

// Define el nivel de zoom.
var zoomLevel = 6;
Map.addLayer(table,{} ,'Eclipse 2026 path')
// Usa el método setCenter para centrar el mapa.
Map.setCenter(longitude, latitude, zoomLevel);
