const properties = require('./json/properties.json');
const users = require('./json/users.json');
const db = require('../db')

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  
  return db.query(`
  SELECT *
  FROM users
  WHERE email = $1`, [email])
  .then(res => 
    {return res.rows[0]}) //IF THE ARRAY IS EMPTY NULL WILL BE RETURNED
  .catch(err => err.message)
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1`, [id])
  .then(res => res.rows[0]) 
  .catch(err => err.message) 
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  
  return db.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3) RETURNING *`, [user.name, user.email, user.password])
  .then(res => res.rows[0]) 
  .catch(err => err.message)
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db.query(`
  SELECT * FROM properties
  JOIN reservations ON reservations.property_id = properties.id
  WHERE guest_id  = $1
  LIMIT $2
  `, [guest_id,limit])
  .then(res => res.rows) 
  .catch(err => err.message)

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;


  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${queryParams.length} `;
  }else {

    let needAnd = false
    // CITY
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
      needAnd = true
    }

    //Min Price
    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`);
      queryString += `${needAnd ? 'AND' : 'WHERE'} cost_per_night >= $${queryParams.length} `;
      needAnd = true
    }
    //Max Price
    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night}`);
      queryString += `${needAnd ? 'AND' : 'WHERE'} cost_per_night <= $${queryParams.length} `;
      needAnd = true
    }
    //Min Rating
    
  }

  queryString += `
  GROUP BY properties.id`
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
    needAnd = true
  }

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;


  // 6
  return db.query(queryString, queryParams).then((res) => res.rows);

}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  //THIS WORKS BUT WHEN WE CREATE NEW LISTINGS WE CAN PASS IN EMPTY STRINGS TO THE DATABASE WHICH WE DONT WANT
  let queryString = `
  INSERT INTO properties (
    owner_id, 
    title,
    description, 
    thumbnail_photo_url, 
    cover_photo_url, 
    cost_per_night, 
    parking_spaces, 
    number_of_bathrooms, 
    number_of_bedrooms, 
    country, 
    street, 
    city, 
    province, 
    post_code
  ) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ,$13 ,$14) 
  RETURNING *`;

  let values = [
    property.owner_id, 
    property.title, 
    property.description, 
    property.thumbnail_photo_url, 
    property.cover_photo_url, 
    property.cost_per_night, 
    property.parking_spaces, 
    property.number_of_bathrooms, 
    property.number_of_bedrooms, 
    property.country, 
    property.street, 
    property.city, 
    property.province, 
    property.post_code
  ]

  return db.query(queryString, values)
  .then(res => res.rows) 
  .catch(err => {
    console.log(err.message)
    return err.message;
    })

}
exports.addProperty = addProperty;

