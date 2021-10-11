const path = require('path')

module.exports = {
    mode: 'development', // 设置mode
    entry: {
        index: './lib/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: 'rookie-UI',
        libraryTarget: 'umd',
    },
    devServer: {
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            // use:['awesome-typescript-loader']
            // 1.该 Loader 是把 TypeScript 转换成 JavaScript, 只负责新语法的转换，新增的API不会自动添加polyfill
            loader: 'awesome-typescript-loader'
          }
        ]
      },
}