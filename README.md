# eclipse2026cloudsandvisibility
Clouds and visibility for the 2026 total eclipse
 KMZ from http://xjubier.free.fr/en/site_pages/SolarEclipsesGoogleEarth.html

 # Eclipse Visibility and Cloud Cover Analysis Tool

This tool is designed to analyze visibility and cloud cover for the upcoming solar eclipse on August 12, 2026, using Google Earth Engine (GEE). It utilizes various datasets, including NOAA/VIIRS DNB Monthly composites, SRTMGL1 elevation data, and a custom eclipse path feature collection, to provide insights into optimal viewing locations.

## Features

- **Eclipse Path Visualization**: Utilizes a custom FeatureCollection to display the path of the eclipse.
- **Elevation-based Shadow Mapping**: Generates shadow maps based on terrain elevation to assess potential obstructions.
- **Cloud Cover Analysis**: Leverages the NOAA/VIIRS DNB Monthly V1 VCMSLCFG dataset to analyze cloud cover statistics for August, aiming to predict clear sky conditions.
- **Visibility Enhancement**: Applies hillshade and hillshadow techniques to enhance visibility of terrain features relevant to eclipse viewing.

## Usage

1. **Setup**: Ensure you have access to Google Earth Engine and the required datasets are available in your GEE account.
2. **Load and Visualize Eclipse Path**: The script automatically loads the eclipse path and visualizes it on the map.
3. **Elevation and Shadow Analysis**: Utilize SRTMGL1 elevation data to generate shadow maps for 1º and 6º sun elevation angles, providing insights into potential viewing obstructions.
4. **Cloud Cover Analysis**: Filter the NOAA/VIIRS dataset for August and calculate mean cloud-free coverage to identify areas with potentially clear skies.
5. **Visualization**: Leverage GEE's visualization capabilities to overlay analysis results on the map, including terrain hillshade, illuminated areas, and cloud cover statistics.

## Important Notes

- Double-check the location at least one day earlier to guarantee there are no obstacles in your view direction.
- Cloud cover analysis is based on historical data; actual conditions may vary. Always consult local weather forecasts closer to the event.

## Legend

A legend is included to interpret the cloud cover statistics, with colors ranging from blue (0% cloud cover) to red (100% cloud cover).

## Customization

The script is modular, allowing for easy customization of analysis parameters such as the date range, geographic extent, and visualization settings.

## Dependencies

- Google Earth Engine
- NOAA/VIIRS DNB Monthly V1 VCMSLCFG dataset
- USGS SRTMGL1 elevation data
- Custom eclipse path FeatureCollection

## Acknowledgments

This tool was developed using public datasets and the Google Earth Engine platform. Special thanks to the providers of these datasets and the GEE community for their invaluable resources and support.

For any questions or feedback regarding this tool, please contact the development team.
