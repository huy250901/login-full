import axios, { AxiosInstance, AxiosResponse } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      // baseURL: "https://localhost:44305/api/",
      baseURL: "http://api.training.div3.pgtest.co/api/v1/",
      timeout: 300000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const http = new Http().instance;

export default http;