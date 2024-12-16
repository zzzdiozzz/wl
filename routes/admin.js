'use strict'

// Маршруты

module.exports = async function (fastify, opts) {

  fastify.get('/admin/', async (req, rep) => {
      // Передаем данные в шаблон HBS
      const message = 'Admin panel.\n Sieg Heil, dear Admin!'
      const title = 'Admin panel.'
      return rep.viewAsync('./views/admin/index.hbs', 
        { message, title, 
        layout: './layouts/admin_layouts.hbs', }
      );
  });
  


fastify.get('/admin/users', async (req, rep) => {
  try {
    // Дожидаемся выполнения SQL-запроса
    const [users] = await fastify.mysql.query('SELECT * FROM users');

    const title = 'Users';
    const message = 'users list:';

    console.log(users); // Здесь будут данные из таблицы

    // Передаем данные в шаблон HBS
    return rep.view('./views/admin/users.hbs', { users, message, title });
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error);
    return rep.send({ error: 'Не удалось получить данные из базы данных' });
  }
});


}