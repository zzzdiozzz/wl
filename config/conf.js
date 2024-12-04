const config = {
  development: {
    PORT: 4000,
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASSWORD: 'example',
  },
  production: {
    PORT: 8080,
    DB_HOST: 'prod-db.example.com',
    DB_USER: 'admin',
    DB_PASSWORD: 'securepassword',
  },
};

const ENV = process.env.NODE_ENV || 'development';
module.exports = config[ENV];