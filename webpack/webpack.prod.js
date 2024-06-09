import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';

export default merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
});