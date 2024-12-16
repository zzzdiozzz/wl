'use strict'
const fastify = require('fastify')({
  logger: true
})



const path = require('node:path')
const AutoLoad = require('@fastify/autoload')
const fastifyView = require('@fastify/view')
const Handlebars = require('handlebars')
const fastifyStatic = require('@fastify/static')
const fastifyEnv = require('@fastify/env')
const config = require('./config/conf.js')
const fp = require('fastify-plugin')
<<<<<<< HEAD
const fastifySql = require('@fastify/mysql')
// const fastifySql, { MySQLRowDataPacket } from '@fastify/mysql'
//const app = fastify()
=======
// const fastifyMysql, { MySQLRowDataPacket } from '@fastify/mysql'
const fastifySql = require('@fastify/mysql')
>>>>>>> 127b5d7 (temporaly)
// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

// mysql connect start

  // fastify.register(require('@fastify/mysql'), {
  //   connectionString: 'mysql://wl_u:wl_p@localhost/wl'
  // })

  fastify.register(fastifySql, {
<<<<<<< HEAD
    promise: true,
=======
>>>>>>> 127b5d7 (temporaly)
    connectionString: 'mysql://wl_u:wl_p@localhost/wl',
    
  });


<<<<<<< HEAD
=======



>>>>>>> 127b5d7 (temporaly)
// mysql connect

  // Add View Engine
  fastify.register(require("@fastify/view"), {
    engine: {
      handlebars: require("handlebars")
    },
    layout: './views/layout.hbs', // Основной шаблон макета
    options: {
      partials: {
        header: './views/partials/header.hbs', // Пример подключения частичных шаблонов
        foother: './views/partials/foother.hbs',
        head: './views/partials/head.hbs',
      },
    },
  })

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
  })

  
/*
// Плагин для загрузки переменных окружения
fastify.register(fastifyEnv, {
  schema,
  dotenv: true, // Автоматическая загрузка из .env
});
*/


}

module.exports.options = options


// Run the server!
fastify.listen({ port: 4040 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  } else {
    console.log(`server listening on ${fastify.server.address().port}`)
  console.log(`Server start ${config.PORT}`)
  console.log(err)
}
  // Server is now listening on ${address}
})
