const path = require('path')
module.exports = {
    entry: {
        index: './lib/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: 'rookie-UI',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // use:['awesome-typescript-loader']
                // 1.该 Loader 是把 TypeScript 转换成 JavaScript, 只负责新语法的转换，新增的API不会自动添加polyfill
                use: ['awesome-typescript-loader', {
                    loader: require.resolve("react-docgen-typescript-loader"),
                    options: {
                        shouldExtractLiteralValuesFromEnum: true,
                        propFilter: (prop) => {
                            if (prop.parent) {
                                return !prop.parent.fileName.includes('node_modules')
                            }
                            return true
                        }
                    }
                }]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,  // 优化处理加快速度
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }
}