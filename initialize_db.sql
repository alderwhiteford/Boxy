DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS reservations;

DROP TYPE IF EXISTS AMENITY;
DROP TYPE IF EXISTS SPACETYPE;

CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    drivers_license_photo VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL,
    verified_on DATE,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL);

CREATE TYPE AMENITY as ENUM ('Pest Controlled', 'Fire Alarm System', 'Smoke Free',
                                'Pet Free', 'Access to Elevator', 'Ground Floor',
                                'Climate Controlled', 'Private Storage', 'Party Free'); 

CREATE TYPE SPACETYPE as ENUM ('Basement', 'Closet', 'Common Living Space', 'Bedroom',
                                'Cabinet', 'Unoccupied Room', 'Other');


CREATE TABLE IF NOT EXISTS listings(
    listing_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    host_id SERIAL NOT NULL,
    dates_available DATE[] NOT NULL,
    price DECIMAL NOT NULL,
    description VARCHAR(255) NOT NULL,
    amenities AMENITY[] NOT NULL,
    space_type SPACETYPE NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    editable BOOLEAN NOT NULL,
    created_on DATE NOT NULL,
    space_available INTEGER[] NOT NULL,
    longitude DECIMAL NOT NULL, 
    latitude DECIMAL NOT NULL); 

CREATE TABLE IF NOT EXISTS reservations(
    reservation_id SERIAL PRIMARY KEY,
    host_id SERIAL NOT NULL,
    stasher_id SERIAL NOT NULL,
    listing_id SERIAL NOT NULL,
    accepted BOOLEAN NOT NULL,
    accepted_on DATE,
    requested_on DATE[] NOT NULL,
    dates_requested DATE[] NOT NULL);
 
-- adding dummy listings 

INSERT INTO listings(name, host_id, dates_available, price, description, amenities, space_type, address, city, zip_code, state, editable, created_on, space_available, longitude, latitude)
            VALUES('listing1', 432424, ARRAY[CAST('2023-12-12' as DATE)], 21.2, 'very nice space', ARRAY[CAST('Pet Free' as AMENITY)], 'Basement', '1234 Huntington Ave.', 'Boston', 92115, 'MA', true, '2008-11-11', ARRAY[1, 2, 3], 24.1234, 54.6543)
            
    