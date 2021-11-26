const { Pool } = require('pg');

//specifyin connection options
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

//checks to see if we connected ot database
pool.connect().then(() => {
  console.log("Connection to database established 😎");
}).catch (e => {
  console.log('************ERROR************');
  console.log(e.message)
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params)
  },
}