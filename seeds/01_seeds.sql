INSERT INTO users (name, email, password) 
VALUES ('John', 'johnny@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bobby', 'bobbyy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Hayley', 'hayley@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
Values (1, 'Speed Lamp', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 120, 3, 2, 4, 'Canada', 'Elm Street', 'Toronto', 'Ontario', 'L5X 3V1', 'true'),
(1, 'Blank Corner', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 435, 2, 3, 1, 'Canada', 'Worth Avenue', 'Waterloo', 'Ontario', 'L4W 6V4', 'false'),
(3, 'Sunday Delight', 'description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 783, 6, 5, 7, 'Canada', 'Bathurst Street', 'Kingston', 'Ontario', 'L51 2W4', 'true');

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
Values ('2018-09-11', '2018-09-26', 1, 2 ),
('2014-10-21', '2014-10-21', 2, 3),
('2016-07-17', '2016-08-01', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
Values (2, 1, 1, 5, 'alright'),
(3, 2, 2, 8, 'very good'),
(1, 3, 3, 9, 'amazing');