var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: ['./src/index.ts'],
  output: {
    path: './lib',
    filename: 'index.js',
    library: 'angular2-voog-wysihtml',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
    	  test: /\.ts$/,
    	  loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader'
        ]
    	},
      {
        test: /\.scss$/,
        loaders: ["raw-loader", "sass"]
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      },
      {
        include: /wysihtml.js$/,
        loader: "expose-loader?wysihtml"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        wysihtml: "wysihtml",
    })
  ],
  resolve: {
    alias: {
      "wysihtml": "wysihtml.js",
      "parser_rules": "advanced_and_extended.js"
    },
    root: [path.resolve('./src'), path.resolve('./src/vendor'), path.resolve('node_modules')],
    extensions: ['', '.js', '.ts', 'd.ts']
  },
	externals: [
		"@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/http",
    "rxjs/Rx"
  ]
};
