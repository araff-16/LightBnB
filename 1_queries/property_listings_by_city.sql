-- SELECT properties.id,properties.title, properties.cost_per_night, AVG(property_reviews.rating) as average_rating
-- FROM property_reviews
-- INNER JOIN properties
-- ON properties.id = property_reviews.property_id
-- WHERE city = 'Vancouver' 
-- GROUP BY properties.id
-- HAVING AVG(property_reviews.rating) >= 4
-- ORDER BY cost_per_night ASC
-- LIMIT 10;

-- ^^^MY VERSION

SELECT properties.id,properties.title, properties.cost_per_night, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;