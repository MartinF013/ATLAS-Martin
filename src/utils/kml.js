import axios from "axios";
import { Result } from "postcss";

export const deleteKML = async (id_kml, showSpinner) => {
  let confirmDelete = confirm("¿Deseas eliminarlo?");
  if (confirmDelete) {
    try {
      //   showSpinner.value = true;
      const response = await axios.post(
        //"http://127.0.0.1:8080/api/siegir/eliminarArchivo",
        "https://sigmap.link/atlas-queretaro-back/public/api/siegir/eliminarArchivo",
        {
          id: id_kml,
        }
      );
      //   showSpinner.value = false;
      if (response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      //   showSpinner.value = false;
      console.log(e);
      return false;
    }
  }
};

export const getKMLs = async () => {
  try {
    const response = await axios.post(
      //"http://127.0.0.1:8080/api/siegir/obtenerKmls"
      "https://sigmap.link/atlas-queretaro-back/public/api/siegir/obtenerKmls",
      //"https://9970-2806-265-b488-8140-d88f-ddab-14da-ae82.ngrok-free.app/api/siegir/obtenerKmls",
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const savekml = async (data, showSpinner) => {
  try {
    showSpinner.value = true;
    let formData = new FormData();
    formData.append("archivo", data);
    const response = await axios.post(
      //"http://127.0.0.1:8080/api/siegir/guardarKML",
      "https://sigmap.link/atlas-queretaro-back/public/api/siegir/guardarKML",
      //"https://9970-2806-265-b488-8140-d88f-ddab-14da-ae82.ngrok-free.app/api/siegir/guardarKML",
      formData
    );
    // console.log(response);
    showSpinner.value = false;
    if (response.data.success) {
      return response.data;
    } else {
      return false;
    }
  } catch (e) {
    showSpinner.value = false;
    console.log(e);
    return false;
  }
};

export default {
  deleteKML,
  getKMLs,
  savekml,
};
