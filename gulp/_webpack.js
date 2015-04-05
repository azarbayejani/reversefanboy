var path = require('path');

var _ = require('lodash');
var webpack = require('webpack');

var webpackBasicConfig = {
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../build'),
		publicPath: '/'
	},
	module: {
		loaders: [
		/*
			{
				test: /\.jsx$/,
				loader: ['jsx-loader?stripTypes', loaderBabel].join('!')
			},
		*/
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		/*
		,
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(loaderCSS)
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [loaderImage]
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract([loaderCSS, 'stylus-loader'].join('!'))
			}
			*/
		]
	},
	plugins: [
		//new ExtractTextPlugin('[name].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(
					'production' === process.env.NODE_ENV ? 'production' : 'debug'
				)
			}
		})
	],
	resolve: {
		root: path.resolve(__dirname, '../src'),
		extensions: ['', '.js', '.jsx']
	}
};

module.exports = function(opts) {
	var options = opts || { };
	var config = _.clone(webpackBasicConfig);

	if (options.watch) {
		config.watch = true;
	}

	if (options.output) {
		config.output = options.output;
	}

	if (Array.isArray(options.plugins)) {
		_.forEach(options.plugins, function(plugin) {
			config.plugins.push(plugin);
		});
	}

	if (options.entry) {
		config.entry = options.entry;
	}

	if (options.disableDebug) {
		config.debug = false;
		config.devtool = false;
	}

	return config;
};
