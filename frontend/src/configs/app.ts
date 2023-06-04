import pkg from "../../package.json"

const devEnv = process.env.NODE_ENV === "development"
const appName = "Tresford AI Lab"

export default {
  devEnv,
  version: pkg.version,
  appName: devEnv ? `${appName} Develop ` : appName
}
