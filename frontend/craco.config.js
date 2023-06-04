const CracoAlias = require("craco-alias")
const webpack = require("webpack")

module.exports = {
    webpack: {
        plugins: [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(require("./package.json").version),
            })
        ]
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: '.',
                tsConfigPath: "./tsconfig.json"
            }
        }
    ]
}