import app from "./app"

const apiVersion = "v1"

export default {
  timeout: 0,
  tokenKey: "token",
  baseURL: app.devEnv
    ? `http://45.14.66.221:8000/api/${apiVersion}`
    : `http://45.14.66.221:8000/api/${apiVersion}`
}
