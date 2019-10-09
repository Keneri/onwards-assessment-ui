import axios from "axios";
import config from "../../config/index";

// import tokenApi from "./tokenApi";

const userInstance = axios.create({
  baseURL: config.api,
  headers: {
    "Content-Type": "application/json"
  }
});

class UserApi {
  static UserLogin(payload) {
    return userInstance
      .post("/auth/login", payload)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error;
      });
  }

  static UserRegister(payload) {
    console.log(config.api);
    return userInstance
      .post("/auth/register", payload)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error;
      });
  }
}

export default UserApi;
