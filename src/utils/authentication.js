import axios from "axios";

export const login = async (email, password, showSpinner) => {
  try {
    showSpinner.value = true;
    const resolve = await axios.post(  
      //"http://127.0.0.1:8080/api/auth/login",
      "https://sigmap.link/atlas-queretaro-back/public/api/auth/login",
      //"https://9970-2806-265-b488-8140-d88f-ddab-14da-ae82.ngrok-free.app/api/auth/login",
      {
        email: email,
        password: password,
      }
    );
    showSpinner.value = false;
    if (resolve.data.success) {
      localStorage.setItem("user-info", JSON.stringify(resolve.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    showSpinner.value = false;
    return false;
  }
};

export default {
  login,
};
