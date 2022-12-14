module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'test') {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: env('DATABASE_FILENAME', '.tmp/test.db'),
        },
        useNullAsDefault: true
      }
    };
  }
  
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'pronocup'),
        user: env('DATABASE_USERNAME', 'pronocup'),
        password: env('DATABASE_PASSWORD', 'supersecretpassword'),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  };
};
