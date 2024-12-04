'use strict'

// Маршруты

module.exports = async function (fastify, opts) {
  fastify.get('/', async (req, rep) => {
    return rep.viewAsync('./views/index.hbs', { title: 'About Us', message: 'Welcome to the About Page!' });
  })
}


