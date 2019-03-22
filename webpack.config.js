var htmlwebpackplugin=require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var webpack=require('webpack')
const path=require('path')
console.log(process.env.NODE_ENV)
let NODEenv=process.env.NODE_ENV
let config={
	mode:'development',
	entry:path.join(__dirname,'/src/app.js'),
	devtool: '#cheap-module-eval-source-map',
	target:'web',
	output:{
		path:path.join(__dirname,'/dist'),
		filename:'[name].[hash:8].js'
	},
	externals: {
		'vue': 'Vue',
		'vue-router': 'VueRouter',
		'vuex':'Vuex',
		"element-ui":'ELEMENT'
	},
	resolve: {
	    alias: {
	      'vue$': 'vue/dist/vue.js'
	    },
	    extensions: ['*', '.js', '.vue', '.json']
	},
	plugins:[
		new htmlwebpackplugin({
			title:"index",
			template:"./src/index.html",
			filename:"index.html",
			minify: {
		      collapseWhitespace: true,
		    },
		    hash:true
		}),
		new CleanWebpackPlugin(['dist',]),
		new webpack.NamedModulesPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.DefinePlugin({
            SOMETHINE: JSON.stringify('This is something we needed.')
        }),
        new VueLoaderPlugin()
	],
	devServer: {
    	port: 9000,
   	 	open: true,
   	 	hot:true,
  	},
	module:{
		rules:[
			{
				test: /\.jsx$/,
			    loader: 'babel-loader',
			    exclude: /node_modules/
			},
			{
                test: /.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
			},
			{
				test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: /node_modules/
			},
			{
				test:/\.scss$/,
				use:['style-loader', 'css-loader', 'sass-loader','postcss-loader']//用什么处理
			},
			{
			    test: /\.vue$/,
			    loader: 'vue-loader',
			    options: {
			      loaders: {
			       
			      }
			      // other vue-loader options go here
			    }
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
				  {
				    loader: 'file-loader',
				    options: {
				      name: '[name].[ext]',
				      outputPath: 'css/images/'
				    }
				  },{
			      loader: 'image-webpack-loader',
			      options: {
			        bypassOnDebug: true,
			      }
			    }]
			},
			{
			  test: /\.html$/,
			  use: [ {
			    loader: 'html-loader',
			    options: {
			      minimize: true
			    }
			  }],
			}
		]
	}
}
if(NODEenv=='development'){
	config.entry={
		app:path.join(__dirname,'src/app.js')
	}
	config.output.filename="[name].[hash:8].js"
	config.module.rules.push({
				test:/\.css$/,
				use: [
				'style-loader',{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader','sass-loader',
				  
				]
			},)
	// config.plugins.push(new ExtractTextPlugin('./css/style.css'))
	// config.module.rules.push({
	// 			test:/\.css$/,
	// 			use: ExtractTextPlugin.extract({
	// 	          fallback: 'style-loader',
	// 	          use: ['css-loader', 'sass-loader'],
	// 	          publicPath:'../../dist/'
	// 	        })
	// 		})
}else{
	config.plugins.push(new webpack.NoEmitOnErrorsPlugin())
	config.module.rules.push({
				test:/\.css$/,
				use: [
				'style-loader',{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader','sass-loader',
				  
				]
			},)
}
module.exports=config

