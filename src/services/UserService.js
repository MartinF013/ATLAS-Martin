import axios from "axios";

export async function getLayers() {
  // const response = await axios.post('https://sigmap.link/siegir-backend/public/api/siegir/obtenerCapas');
  const response = await axios.post(
    //"https://sigmap.link/siegir-backend/public/api/siegir/obtenerCapas"
    "https://sigmap.link/atlas-queretaro-back/public/api/siegir/obtenerCapas"    
  );
  return response.data;
}

export async function getPluviometros(year, month, day) {
  let url = "";

  const response = await axios.post(
    //"https://sigmap.link/siegir-backend/public/api/siegir/obtenerPluviometros",
    "https://sigmap.link/atlas-queretaro-back/public/api/siegir/obtenerPluviometros",
    null,
    {
      params: {
        year: year,
        month: month,
        day: day,
      },
    }
  );

  //  console.log(response);
  //Convert data to cvs structure

  if ((response.data.message = "siegir.success")) {
    if (response.data.data.hecho == true) {
      let items = response.data.data.data;

      // Convert Object to JSON
      var jsonObject = JSON.stringify(items);

      // Convert JSON to CSV & Display CSV
      let csvData = ConvertToCSV(jsonObject);

      //console.log(csvData);

      const blob = new Blob([csvData], {
        type: "plain/text",
      });

      url = URL.createObjectURL(blob);
    }
  }
  return { url: url, name: "Pluviometros" };
}

function ConvertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  var labels = [];

  for (var i = 0; i < array.length; i++) {
    getLabels("", array[i], labels);
  }

  str += objectToCSVRow(labels);

  for (var i = 0; i < array.length; i++) {
    var line = [];
    for (var label in labels) {
      line.push(findbystring(array[i], labels[label]));
    }

    str += objectToCSVRow(line);
  }

  //Reemplazar latitude y Longitude

  str = str.replace("latitud", "Latitude");
  str = str.replace("longitud", "Longitude");

  return str;
}

function pushUnique(arr, item) {
  if (item != "" && !arr.includes(item)) arr.push(item);
}

function getLabels(name, item, labels) {
  if (typeof item == "object") {
    for (var index in item) {
      let thisname = "";
      if (name != "") thisname = name + ".";
      thisname += index;
      getLabels(thisname, item[index], labels);
    }
  } else {
    pushUnique(labels, name);
  }
}

function objectToCSVRow(dataObject) {
  var dataArray = [];
  for (var o in dataObject) {
    var innerValue =
      typeof dataObject[o] == "undefined" ? "" : dataObject[o].toString();
    var result = innerValue.replace(/"/g, '""');
    // result = '"' + result + '"';
    let value = Number(result);

    if (!isNaN(value)) {
      dataArray.push(value);
    } else {
      dataArray.push(result);
    }
  }
  return dataArray.join("|") + "\r\n";
}

//https://stackoverflow.com/a/6491621
function findbystring(o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

//export async function getLayers() {
//    const response = await axios.post('https://sigmap.link/siegir-backend/public/api/siegir/obtenerCapas');
//    return response.data;
//}
