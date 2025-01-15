// Componentes de ArcGIS
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Draw from "@arcgis/core/views/draw/Draw";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import * as projection from "@arcgis/core/geometry/projection";
import Circle from "@arcgis/core/geometry/Circle";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Color from "@arcgis/core/Color.js";

const createSymbol = (fillColor, fillAlpha, outlineColor, outlineAlpha, fill, outline) => {

    console.log(fillAlpha + " " + outlineAlpha);
    return {
        color: [fillColor.r, fillColor.g, fillColor.b, fill.transparency],
        outline: {
            color: [outlineColor.r, outlineColor.g, outlineColor.b, outline.transparency],
            width: 1,
            type: outline.type,// "esriSLS",
            style: outline.style
        },
        type: fill.type, // "esriSFS",
        style: fill.style // fillColor.type
    };
};

const getSymbolByValue = (label, settings, nls) => {

    //const settings = createSettings();

    const getColor = (colorObj) => new Color(colorObj.color);
    const getAlpha = (colorObj) => 255 * (1 - colorObj.transparency);

    // Definimos los colores de relleno y contorno para cada zona
    const spillLocationFillColor = getColor(settings.spillLocationFillColor);
    const spillLocationFillAlpha = getAlpha(settings.spillLocationFillColor);
    const spillLocationOutlineColor = getColor(settings.spillLocationOutlineColor);
    const spillLocationOutlineAlpha = getAlpha(settings.spillLocationOutlineColor);

    const IIZoneFillColor = getColor(settings.IIZoneFillColor);
    const IIZoneFillAlpha = getAlpha(settings.IIZoneFillColor);
    const IIZoneOutlineColor = getColor(settings.IIZoneOutlineColor);
    const IIZoneOutlineAlpha = getAlpha(settings.IIZoneOutlineColor);

    const PAZoneFillColor = getColor(settings.PAZoneFillColor);
    const PAZoneFillAlpha = getAlpha(settings.PAZoneFillColor);
    const PAZoneOutlineColor = getColor(settings.PAZoneOutlineColor);
    const PAZoneOutlineAlpha = getAlpha(settings.PAZoneOutlineColor);

    const downwindZoneFillColor = getColor(settings.downwindZoneFillColor);
    const downwindZoneFillAlpha = getAlpha(settings.downwindZoneFillColor);
    const downwindZoneOutlineColor = getColor(settings.downwindZoneOutlineColor);
    const downwindZoneOutlineAlpha = getAlpha(settings.downwindZoneOutlineColor);

    const fireZoneFillColor = getColor(settings.fireZoneFillColor);
    const fireZoneFillAlpha = getAlpha(settings.fireZoneFillColor);
    const fireZoneOutlineColor = getColor(settings.fireZoneOutlineColor);
    const fireZoneOutlineAlpha = getAlpha(settings.fireZoneOutlineColor);

    const bleveZoneFillColor = getColor(settings.bleveZoneFillColor);
    const bleveZoneFillAlpha = getAlpha(settings.bleveZoneFillColor);
    const bleveZoneOutlineColor = getColor(settings.bleveZoneOutlineColor);
    const bleveZoneOutlineAlpha = getAlpha(settings.bleveZoneOutlineColor);

    switch (label) {
        case nls.spillLocationLabel:
            return createSymbol(
                spillLocationFillColor,
                spillLocationFillAlpha,
                spillLocationOutlineColor,
                spillLocationOutlineAlpha,
                settings.spillLocationFillColor,
                settings.spillLocationOutlineColor,
            );
        case nls.IISettingsLabel:
            return createSymbol(
                IIZoneFillColor,
                IIZoneFillAlpha,
                IIZoneOutlineColor,
                IIZoneOutlineAlpha,
                settings.IIZoneFillColor,
                settings.IIZoneOutlineColor
            );
        case nls.PASettingsLabel:
            return createSymbol(
                PAZoneFillColor,
                PAZoneFillAlpha,
                PAZoneOutlineColor,
                PAZoneOutlineAlpha,
                settings.PAZoneFillColor,
                settings.PAZoneOutlineColor
            );
        case nls.downwindSettingsLabel:
            return createSymbol(
                downwindZoneFillColor,
                downwindZoneFillAlpha,
                downwindZoneOutlineColor,
                downwindZoneOutlineAlpha,
                settings.downwindZoneFillColor,
                settings.downwindZoneOutlineColor
            );
        case nls.fireSettingsLabel:
            return createSymbol(
                fireZoneFillColor,
                fireZoneFillAlpha,
                fireZoneOutlineColor,
                fireZoneOutlineAlpha,
                settings.fireZoneFillColor,
                settings.fireZoneOutlineColor
            );
        case nls.bleveSettingsLabel:
            return createSymbol(
                bleveZoneFillColor,
                bleveZoneFillAlpha,
                bleveZoneOutlineColor,
                bleveZoneOutlineAlpha,
                settings.bleveZoneFillColor,
                settings.bleveZoneOutlineColor
            );
        default:
            return null; // O cualquier valor predeterminado que quieras devolver
    }
}

const zoomToLayer = (layer) => {
    return layer.queryExtent().then((response) => {
        activeView.goTo(response.extent)
            .catch((error) => {
                console.error(error);
            });
    });
}
const fromExtent = (extent) => {
    if (!extent || typeof extent !== "object") {
        throw new Error("A valid extent object is required.");
    }

    // Extract coordinates from the extent
    const { xmin, ymin, xmax, ymax } = extent;

    // Create the ring for the polygon
    const ring = [
        [xmin, ymin], // Bottom-left
        [xmax, ymin], // Bottom-right
        [xmax, ymax], // Top-right
        [xmin, ymax], // Top-left
        [xmin, ymin]  // Close the ring
    ];

    // Create and return the Polygon
    return new Polygon({
        rings: [ring],
        spatialReference: extent.spatialReference
    });
}

const createERGBZones = (
    _selectedMaterial,      // Material seleccionado 
    _pointToIncident,       // Punto del incidente
    spillSize,              // Tamaño del derrame 
    spillTime,              // Tiempo del derrame 
    transportContainer,     // Contenedor de transporte 
    windSpeed,              // Velocidad del viento 
    windDirection,          // Dirección del viento 
    useBleve,               // Indica si BLEVE está habilitado 
    tankCapacity,           // Capacidad del tanque 
    fire,                   // Indica si FIRE está habilitado   
    ERGLayer,               // Capa gráfica donde se agregarán gráficos
    activeView,             // Vista activa del mapa    
    nls,                   // Etiquetas internacionales o configuraciones localizadas
    settings                // Configuraciones de los simbolos
) => {

    console.log("_selectedMaterial: " );
    console.log(_selectedMaterial);

    console.log("_pointToIncident: ");
    console.log(_pointToIncident);

    console.log("spillSize: " );
    console.log(spillSize);

    console.log("spillTime: " );
    console.log(spillTime);

    console.log("transportContainer: " );
    console.log(transportContainer);


    console.log("windSpeed: " );
    console.log(windSpeed);


    console.log("windDirection: " );
    console.log(windDirection);

    console.log("useBleve: " );
    console.log(useBleve);

    console.log("tankCapacity: " );
    console.log(tankCapacity);

    console.log("fire: " );
    console.log(fire);


    // console.log("geometryEngine: " + geometryEngine);
    // console.log("projection: " + projection);
    // console.log("Graphic: " + Graphic);
    // console.log("Circle: " + Circle);
    // console.log("Point: " + Point);
    console.log("ERGLayer: " );
    console.log(ERGLayer);

    console.log("activeView: " );
    console.log(activeView);

    console.log("nls: ");
    console.log(nls);


    console.log("1");

    const selectedMaterial = _selectedMaterial.value; // aqui se debe obtener el material seleccionado

    console.log("2");

    if (selectedMaterial && _pointToIncident) {
        
        console.log("3");

        var b, c, d, f = [];

        let spatialRef = {
            wkid: 102100                 //proyeccion de web mercator
        };

        //crear un array de puntos
        let array = [_pointToIncident];

        console.log("4");
        // projects an array of points
        let projectedPoints = projection.project(array, spatialRef);
         projectedPoints.forEach(function (point) {
             console.log(point.x, point.y);
         });

         console.log("5");

        var centerPoint = projectedPoints[0];
    
        //clearGraphics();
  

        console.log("6");
        if (selectedMaterial.hasOwnProperty("TABLE3") && "yes" === selectedMaterial.TABLE3.toLowerCase()) {
            if ("SM" === spillSize.value.size) {
                b = spillSize.value.size + "_ISO";
                c = spillSize.value.size + "_" + spillTime.value.time;
            } else {
                b = this.transportContainer.value.container + "_ISO";
                c = this.transportContainer.value.container + spillTime.value.time + windSpeed.value.speed;
            }
         
        } else {      
            b = spillSize.value.size + "_ISO";
            c = spillSize.value.size + "_" + spillTime.value.time;
        }      

        console.log("7");

        d = selectedMaterial.hasOwnProperty(b) ? selectedMaterial[b] : 800;
        b = selectedMaterial.hasOwnProperty(c) ? selectedMaterial[c] : 1600;

        console.log("8");
        let isoCircle = new Circle({ // E
            center: centerPoint,
            radius: d,
            geodesic: true,
            numberOfPoints: 360
        });
        
        console.log("9");
        
        if (useBleve.checked && selectedMaterial.BLEVE){
            console.log("9.1");
         
            let capacity = tankCapacity.capacity;
            console.log("9.2");
             console.log(capacity);
            console.log(centerPoint);
            console.log(selectedMaterial[capacity]);

            let bleveBuffer = geometryEngine.geodesicBuffer(centerPoint, selectedMaterial[capacity], "meters"); // y
            console.log("9.3");
            let bleveGraphic = new Graphic(bleveBuffer); // x      
            console.log("9.4");
            bleveGraphic.symbol = getSymbolByValue(nls.bleveSettingsLabel, settings, nls);
            console.log("9.5");
            f.push(bleveGraphic);
            console.log("9.6");
        }
        console.log("10");

        if (fire.checked) {
            let fireBuffer = geometryEngine.geodesicBuffer(centerPoint, selectedMaterial.FIRE_ISO, "meters"); // y
            let fireGraphic = new Graphic(fireBuffer); // x        
            fireGraphic.symbol = getSymbolByValue(nls.fireSettingsLabel,settings, nls);
            f.push(fireGraphic);
        }

        console.log("11");

        if (selectedMaterial.IDNum === 0 || selectedMaterial.BLEVE) {
            //new jimu / dijit / Message({ message: this.nls.noPAZoneMessage }); // t            
        } else {

            console.log("12");

            let halfRadiusCircle = new Circle({ // E
                center: centerPoint,
                radius: b / 2,
                geodesic: true,
                numberOfPoints: 360
            });

            console.log("13");

            let edgePoint = halfRadiusCircle.getPoint(0, 0);
            let extent = new Circle({ center: edgePoint, radius: b / 2, geodesic: true }).extent; // E

            let bottomLeft = new Point(extent.xmin, extent.ymin, spatialRef); // D
            let bottomRight = new Point(extent.xmax, extent.ymin, spatialRef); // D

            let fullBuffer = geometryEngine.geodesicBuffer(centerPoint, b, "meters"); // y          

            let intersectedPolygon = geometryEngine.intersect(fullBuffer, fromExtent(extent));

            let leftPoint = isoCircle.getPoint(0, 270);
            let rightPoint = isoCircle.getPoint(0, 90);
               
            console.log("14");

            intersectedPolygon.rings[0].forEach((coord, idx) => {
                if (coord[0] === bottomLeft.x && coord[1] === bottomLeft.y) {
                    intersectedPolygon.setPoint(0, idx, leftPoint);
                } else if (coord[0] === bottomRight.x && coord[1] === bottomRight.y) {
                    intersectedPolygon.setPoint(0, idx, rightPoint);
                }
            });

            console.log("15");

            let differencePolygon = geometryEngine.difference(intersectedPolygon, isoCircle); // y
            differencePolygon = geometryEngine.rotate(differencePolygon, -1 * windDirection.value, centerPoint); // y

            let extentRotated = geometryEngine.rotate(fromExtent(extent), -1 * windDirection.value, centerPoint); // y, F

            console.log("16");

            let downwindGraphic = new Graphic({
                geometry: differencePolygon,
                symbol: getSymbolByValue(nls.downwindSettingsLabel, settings, nls)
            });    

            console.log("18");

            let paGraphic = new Graphic({
                geometry: extentRotated,
                symbol: getSymbolByValue(nls.PASettingsLabel, settings,nls)
            });

            console.log("19");

            f.push(paGraphic, downwindGraphic);
            console.log("20");
        }   

        console.log("21");

        let isoGraphic = new Graphic({
            geometry: isoCircle,
            symbol: getSymbolByValue(nls.IISettingsLabel, settings,nls)
        });
       
        console.log("22");

        f.push(isoGraphic);

        console.log("23");

        let spillLocationBuffer = geometryEngine.geodesicBuffer(centerPoint, 10, "meters"); // y        
        let spillLocationGraphic = new Graphic({
            geometry: spillLocationBuffer,
            symbol: getSymbolByValue(nls.spillLocationLabel, settings, nls)
        });
   
        console.log("24");

        f.push(spillLocationGraphic);    
        
        console.log("25");
        // agregar los graficos al layer
        ERGLayer.graphics.addMany(f);      

        console.log("26");

        // crear un extent con los graficos
        let mapExtent = ERGLayer.graphics.items.reduce((acc, graphic) => {
            return acc ? acc.union(graphic.geometry.extent) : graphic.geometry.extent;
        }, null);

        console.log("27");

        var options = {
            duration: 1000, // Duration of animation will be 5 seconds
        };

        console.log("28");

        activeView.goTo(mapExtent, options);   
        
        console.log("29");

    }

    console.log("Fin");
};

export default createERGBZones;