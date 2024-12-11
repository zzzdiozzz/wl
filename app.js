'use strict'
// import Fastify from 'fastify'
// const fastify = require('fastify')()
// const fastify = Fastify({
//   logger: true
// })
// CommonJs
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
const fastifyMysql, { MySQLRowDataPacket } from '@fastify/mysql'
const app = fastify()
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

  app.register(fastifyMysql, {
    connectionString: 'mysql://wl_u:wl_p@localhost/wl',
  });


  //async (req, reply) => {
    const connection =  fastify.mysql.getConnection()
    const [rows, fields] =  connection.query(
      'SELECT * FROM users',
    )
    connection.release()
     console.log('Test'+rows[1])
  //}


  //fastify.mysql.getConnection(onConnect)

  // function onConnect (err, client) {
  //   if (err) return reply.send(err)

  //     const [rows, fields] =  connection.query(
  //    // 'SELECT id, username, hash, salt FROM users WHERE id=?', [req.params.id],
  //    'SELECT * FROM users',
  //     function onResult (err, result) {
  //       client.release()
  //       reply.send(err || result)
  //     }
  //   )
  //   console.log('Test' + fields[1])  
  // }
  
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
