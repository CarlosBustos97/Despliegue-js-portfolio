//Creamos una constante y utilizamos un requiere para traer
//Este elemento, esto ya esta disponible en node asi que no
//Necesitamos instalar nada
//__dirname corresponde a la ruta donde se esta ejecutando actualmente el script

  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin')//recurso para html
  const MiniCssExtractPlugin = require('mini-css-extract-plugin') //Se agrega recurso de minicss
  const CopyPlugin = require('copy-webpack-plugin')
//  const CssMinizerPlugin = require('css-minimizer-webpack-plugin')
//  const TerserPlugin = require('terser-webpack-plugin');
  const Dotenv = require('dotenv-webpack')

  //Creamos un modulo que vamos a exportar con un objeto que va a tener
   // La configuracion deseada de nuestro proyecto
  
  module.exports = {
    //la primera configuracion que anadimos es entry la cual nos va a permitir
      //establecer el punto de entrada de nuestra aplicacion
        // apartir de aqui todo se va conectando
    entry: './src/index.js',
  
    //Es hacia donde enviamos lo que va a preparar webpack en este caso podremos
     //establecer un nombre de carpeta o nombre de archivo y entre otros 
      //es importante establecer un nombre especifico para esto que es la carpeta
        //dist que es un diminutivo de distribution
  
    //En un objeto dentro de output vamos a anadir los elementos internos para trabajar
      //lo primero es path que es lo que trajimos al inicio para hacer el uso de resolve 
        // que nos va a permitir saber donde se encuentra nuestro proyecto en que
          //directorio y poderlo utilizar  de esta forma no tendremos un problema con el 
            //nombre de la carpeta, o donde estoy posicionado.
  
      //Asi cuando enviemos nuestro proyecto a un servidor en la nube va a preparar
        //nuestro proyecto va a utilizar el directorio que esta encontrandoce este 
          // repositorio o este proyecto con eso garantizamos que siempre encontrara
            // La carpeta donde se ubica este proyecto.
      //Podremos utilizar el nombre que queramos por en este caso es recomendado 
        // utilizar dist ya que es un estandar de la compilacion de estos proyectos
    output:{
      path: path.resolve(__dirname, 'dist'),
      //podremos ponerle un nombre al archivo resultante del js que se va a unificar
        //podremos encontrarlo como bundel o hash pero por el momento utilizamos main
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true, // Se queda ejecutando y se compilará cada que se guarde un archivo
  
    //extensiones con las que trabajaremos
    resolve:{
  
      //En un arreglo pasaremos las extensiones que vamos a utilizar
        //normalmente lo que utilizamos .js 
         // pero si estamos trabajando con svelte o react vamos a tener 
          // que establecer que tipo de extensiones va a tener que
            //identificar webpack para leer los archivos que hay dentro de
              // nuestro proyecto
      extensions:['.js'],
      alias: {
        '@utils': path.resolve(__dirname, 'src/utils/'), // crea un alias utils el cual se encuentra en la ruta src/utils
        '@templates': path.resolve(__dirname, 'src/templates/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@images': path.resolve(__dirname, 'src/assets/images/'),
      },
    },
    //Se agrega configuacion estblecida en el archivo de configuracion de babel (.babelrc)
    //Se obpimiza y garantiza que cualquier navegador lo pueda leer --> para eso se usa babel
    //Rules //Reglas que se van a establecer para trabajar con diferentes tipos archivos o elementos
    module: {
        rules:[ 
            { //Regla del modulo para configuracion de babel
            //Permite saber que tipo de extenciones se van a manejar, debe ser una expreción  regular
            test: /\.m?js$/, //cualquier archivo que empiece con m (module) o js cierra, utilizar cualquier extencion que sea mjs o js
            exclude: /node_modules/, // Excluye cualquier archivo que se encuentre en node_modules
            use: { //pasar intrnamente el loader que se va a utilizar
                loader: 'babel-loader'
            },
        },
        { // Regla para el modulo de css
          test: /\.css|.styl$/i, // Se agrega extencion para css
          use: [MiniCssExtractPlugin.loader,'css-loader', 'stylus-loader' ],

        },
        {
          test: /\.png/,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            }
          }
        },
      ]
    }, 
    plugins: [
        new HtmlWebpackPlugin( // toma el archivo index.html y lo optimiza agregandolo al dist 
            {
                inject: true,
                template: './public/index.html',
                filename: './index.html'
            }
        ),
        new MiniCssExtractPlugin({
          filename: 'assets/[name].[contenthash].css'
        }), // Crea una nueva instancia de Mini Css
        new CopyPlugin({ // Crea una nueva instancia de copyPlgin y le enviar una configuracion
          patterns:[{
            from: path.resolve(__dirname, 'src', 'assets/images'),  //desde donde, aquí si encuentras los archivos que se van a mover
            to: 'assets/images' //A donde va a mover los archivos o carpeta
          }]
        }),
        new Dotenv(), // Variable de entorno
    ],
    /*optimization:{ No es necesaria para el modo desarrollo
      minimize: true,
      minimizer:[
        new CssMinizerPlugin(), //Para optimizar CSS
        new TerserPlugin(), //Para optimizar JS
      ]
    }*/
  }