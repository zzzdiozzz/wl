'use strict'

// Маршруты

module.exports = async function (fastify, opts) {
  fastify.get('/', async (req, rep) => {
    return rep.viewAsync('./views/index.hbs', { title: 'About Us', message: 'Welcome to the About Page!' });
<<<<<<< HEAD
  }),


// fastify.get('/db', async (req, rep) => {
//   const users = fastify.mysql.query('SELECT name, uid FROM users')
//   const title = 'Users'
//   const message = 'users list:'
//   console.log(users);
//   return rep.viewAsync('./views/users.hbs', { users, message, title });
// })

fastify.get('/db', async (req, rep) => {
  try {
    // Дожидаемся выполнения SQL-запроса
    const [users] = await fastify.mysql.query('SELECT * FROM users');

    const title = 'Users';
    const message = 'users list:';

    console.log(users); // Здесь будут данные из таблицы

    // Передаем данные в шаблон HBS
    return rep.view('./views/users.hbs', { users, message, title });
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error);
    return rep.send({ error: 'Не удалось получить данные из базы данных' });
  }
});


}
=======
  })



fastify.get('/db', async (req, rep) =>{
  const users = await fastify.mysql.query(
    'SELECT *  FROM users', 
//    function onResult (err, result) {
//      rep.send(err || result)
//return console.log(row[1])
//    }
  )
    let title = 'Users'
    let message = 'users list'
  return rep.viewAsync('./views/users.hbs', { title, message, users});
})


}
>>>>>>> 127b5d7 (temporaly)
