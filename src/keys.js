require('dotenv').config();

module.exports = {

    database: {
        host: 'localhost',
        user: 'root', 
        password: process.env.PASSDATABASE,
        database: 'database_links'  
    }
}