module.exports = {
    username: 'root',
    password: '',
    database: 'chatdb',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: (log) => {
        if (process.env.DEVELOPMENT === 'production') console.log(log)
    },
    timezone: '+07:00',
}
