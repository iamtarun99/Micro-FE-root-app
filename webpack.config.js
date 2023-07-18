const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/index.ts",
  mode: 'development',
  devServer: {
    port: 4000,
    open: '/ur/ui/home'
  },
  output: {
    publicPath: '/ur/ui/home',
    uniqueName: 'home',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'root',
        remotes: {
          reports: 'reports@http://localhost:3001/ur/ui/reports/remoteEntry.js',
          Schedules: 'schedules@http://localhost:3002/ur/ui/schedules/remoteEntry2.js'
        },
        shared: {
          ...dependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
  ],
  resolve: {
    extensions: ["", '.ts', '.tsx', '.js', '.json'],
  },
};