import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const entry = './src/index.js';
export const output = {
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist'),
};
export const module = {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets',
                    },
                },
            ],
        },
    ],
};
export const plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
];
