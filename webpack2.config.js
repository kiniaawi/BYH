const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
            devServer: {
                open: true
            },
            mode: "development",
            // entry: {
            //     login: './src/Login.js',
            //     dashboard: './src/App.js',
            // },
            // output: {
            //     filename: '[name].js',
            //     publicPath: "/",
            //     path: path.resolve(__dirname, "build"),
            // },
            module: {
                exports: {
                    entry: {
                        login: './src/Login.js',
                        dashboard: './src/App.js'
                    },
                    output: {
                        filename: '[name].js',
                        publicPath: "/",
                        path: path.resolve(__dirname, "build"),
                    }
                },
                rules: [
                 {
                    test: /\.(jpe?g|png)$/,
                    exclude: /node_modules/,
                    // use: ["url-loader", "file-loader"]
                    use: "file-loader",
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                // {
                //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
                //     use: "url-loader"
                // },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    //template: "./public/index.html"
                }),
            ]
        }
};