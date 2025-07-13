-- Seed data for Real Estate Marketplace

-- Insert property categories
INSERT INTO property_categories (name, slug, description, icon, sort_order) VALUES
('Residential Apartment', 'apartment', 'Apartments and flats in residential complexes', 'building', 1),
('Independent House', 'house', 'Standalone houses and bungalows', 'home', 2),
('Villa', 'villa', 'Luxury villas with gardens and premium amenities', 'castle', 3),
('PG/Hostel', 'pg', 'Paying guest accommodations and hostels', 'users', 4),
('Commercial Office', 'office', 'Office spaces for businesses', 'briefcase', 5),
('Shop/Retail', 'shop', 'Retail spaces and shops', 'shopping-bag', 6),
('Warehouse', 'warehouse', 'Storage and warehouse facilities', 'package', 7);

-- Insert comprehensive amenities
INSERT INTO amenities (name, slug, icon, category, sort_order) VALUES
-- Basic amenities
('Parking', 'parking', 'car', 'basic', 1),
('Elevator/Lift', 'elevator', 'arrow-up', 'basic', 2),
('Power Backup', 'power-backup', 'zap', 'basic', 3),
('Water Supply', 'water-supply', 'droplets', 'basic', 4),
('Balcony', 'balcony', 'home', 'basic', 5),

-- Security amenities
('24x7 Security', 'security', 'shield', 'security', 10),
('CCTV Surveillance', 'cctv', 'camera', 'security', 11),
('Gated Community', 'gated-community', 'gate', 'security', 12),
('Intercom', 'intercom', 'phone', 'security', 13),

-- Recreation amenities
('Swimming Pool', 'swimming-pool', 'waves', 'recreation', 20),
('Gymnasium', 'gym', 'dumbbell', 'recreation', 21),
('Garden/Park', 'garden', 'tree-pine', 'recreation', 22),
('Playground', 'playground', 'gamepad-2', 'recreation', 23),
('Clubhouse', 'clubhouse', 'building-2', 'recreation', 24),
('Jogging Track', 'jogging-track', 'footprints', 'recreation', 25),

-- Convenience amenities
('Air Conditioning', 'ac', 'wind', 'convenience', 30),
('Modular Kitchen', 'modular-kitchen', 'chef-hat', 'convenience', 31),
('Furnished', 'furnished', 'sofa', 'convenience', 32),
('Washing Machine', 'washing-machine', 'washing-machine', 'convenience', 33),
('Refrigerator', 'refrigerator', 'refrigerator', 'convenience', 34),
('Microwave', 'microwave', 'microwave', 'convenience', 35),

-- Connectivity amenities
('WiFi/Internet', 'wifi', 'wifi', 'connectivity', 40),
('DTH/Cable TV', 'cable-tv', 'tv', 'connectivity', 41),
('Near Metro Station', 'near-metro', 'train', 'connectivity', 42),
('Bus Connectivity', 'bus-connectivity', 'bus', 'connectivity', 43);

-- Insert admin user
INSERT INTO users (first_name, last_name, email, phone, password_hash, role, verified, email_verified, phone_verified, status) VALUES
('Admin', 'User', 'admin@nobroker.com', '+919999999999', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8G', 'admin', TRUE, TRUE, TRUE, 'active');

-- Insert sample property owners
INSERT INTO users (first_name, last_name, email, phone, password_hash, role, verified, email_verified, phone_verified, status) VALUES
('Rajesh', 'Kumar', 'rajesh@example.com', '+919876543210', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8G', 'owner', TRUE, TRUE, TRUE, 'active'),
('Priya', 'Sharma', 'priya@example.com', '+919876543211', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8G', 'owner', TRUE, TRUE, TRUE, 'active'),
('Amit', 'Patel', 'amit@example.com', '+919876543212', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8G', 'owner', TRUE, TRUE, TRUE, 'active');

-- Insert sample tenants
INSERT INTO users (first_name, last_name, email, phone, password_hash, role, verified, email_verified, phone_verified, status) VALUES
('Anita', 'Singh', 'anita@example.com', '+919876543213', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8G', 'tenant', TRUE, TRUE, TRUE, 'active'),
('Vikram', 'Gupta', 'vikram@example.com', '+919876543214', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8G', 'tenant', TRUE, TRUE, TRUE, 'active');

-- Insert major cities and locations
INSERT INTO locations (name, slug, type, city, state, latitude, longitude) VALUES
('Bangalore', 'bangalore', 'city', 'Bangalore', 'Karnataka', 12.9716, 77.5946),
('Mumbai', 'mumbai', 'city', 'Mumbai', 'Maharashtra', 19.0760, 72.8777),
('Delhi', 'delhi', 'city', 'Delhi', 'Delhi', 28.7041, 77.1025),
('Pune', 'pune', 'city', 'Pune', 'Maharashtra', 18.5204, 73.8567),
('Hyderabad', 'hyderabad', 'city', 'Hyderabad', 'Telangana', 17.3850, 78.4867);

-- Insert Bangalore localities
INSERT INTO locations (name, slug, type, parent_id, city, state, latitude, longitude) VALUES
('Koramangala', 'koramangala', 'locality', 1, 'Bangalore', 'Karnataka', 12.9279, 77.6271),
('Whitefield', 'whitefield', 'locality', 1, 'Bangalore', 'Karnataka', 12.9698, 77.7500),
('Indiranagar', 'indiranagar', 'locality', 1, 'Bangalore', 'Karnataka', 12.9719, 77.6412),
('HSR Layout', 'hsr-layout', 'locality', 1, 'Bangalore', 'Karnataka', 12.9082, 77.6476),
('Electronic City', 'electronic-city', 'locality', 1, 'Bangalore', 'Karnataka', 12.8456, 77.6603),
('Marathahalli', 'marathahalli', 'locality', 1, 'Bangalore', 'Karnataka', 12.9591, 77.6974),
('BTM Layout', 'btm-layout', 'locality', 1, 'Bangalore', 'Karnataka', 12.9165, 77.6101);

-- Insert sample property listings
INSERT INTO listings (owner_id, category_id, title, description, price, deposit, location, address, city, state, pincode, latitude, longitude, bedrooms, bathrooms, area_sqft, property_type, listing_type, furnishing_status, verified, featured, status, availability_date) VALUES
(2, 1, 'Spacious 2BHK Apartment in Koramangala', 'Beautiful apartment with modern amenities, close to metro station and shopping centers. Perfect for small families or working professionals. The apartment features a modular kitchen, spacious bedrooms, and a lovely balcony with garden view.', 25000.00, 50000.00, 'Koramangala', '123 Main Street, 5th Block, Koramangala, Bangalore', 'Bangalore', 'Karnataka', '560034', 12.9279, 77.6271, 2, 2, 1200, 'apartment', 'rent', 'semi_furnished', TRUE, TRUE, 'active', '2024-02-01'),

(3, 3, 'Luxury 3BHK Villa with Private Garden', 'Stunning villa in a gated community with private garden, swimming pool access, and premium amenities. This property offers the perfect blend of luxury and comfort with 24x7 security and power backup.', 45000.00, 90000.00, 'Whitefield', '456 Garden View, Brigade Meadows, Whitefield, Bangalore', 'Bangalore', 'Karnataka', '560066', 12.9698, 77.7500, 3, 3, 1800, 'villa', 'rent', 'fully_furnished', TRUE, FALSE, 'active', '2024-02-15'),

(4, 1, 'Cozy 1BHK Near Metro Station', 'Compact and well-designed 1BHK apartment, just 5 minutes walk from metro station. Ideal for single professionals. The apartment comes with basic furnishing and all necessary amenities.', 15000.00, 30000.00, 'Indiranagar', '789 Metro View, 100 Feet Road, Indiranagar, Bangalore', 'Bangalore', 'Karnataka', '560038', 12.9719, 77.6412, 1, 1, 600, 'apartment', 'rent', 'semi_furnished', FALSE, FALSE, 'pending', '2024-02-10'),

(2, 1, 'Modern 2BHK in HSR Layout', 'Contemporary apartment with excellent connectivity to IT parks. Features include modular kitchen, ample parking, and 24x7 water supply. Located in a well-maintained society with garden and children play area.', 28000.00, 56000.00, 'HSR Layout', '321 Tech Park Road, Sector 1, HSR Layout, Bangalore', 'Bangalore', 'Karnataka', '560102', 12.9082, 77.6476, 2, 2, 1100, 'apartment', 'rent', 'unfurnished', TRUE, FALSE, 'active', '2024-01-25'),

(3, 2, 'Independent 3BHK House with Parking', 'Spacious independent house perfect for families. Features include separate parking for 2 cars, terrace garden, and servant quarters. Located in a quiet residential area with good connectivity.', 35000.00, 70000.00, 'BTM Layout', '654 Residential Avenue, 2nd Stage, BTM Layout, Bangalore', 'Bangalore', 'Karnataka', '560076', 12.9165, 77.6101, 3, 2, 1500, 'house', 'rent', 'unfurnished', TRUE, FALSE, 'active', '2024-02-20');

-- Insert listing amenities relationships
INSERT INTO listing_amenities (listing_id, amenity_id) VALUES
-- Listing 1 amenities (2BHK Koramangala)
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 16), (1, 17), (1, 18),
-- Listing 2 amenities (Villa Whitefield)
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 10), (2, 11), (2, 12), (2, 15), (2, 16), (2, 17), (2, 18), (2, 19), (2, 20),
-- Listing 3 amenities (1BHK Indiranagar)
(3, 1), (3, 2), (3, 3), (3, 6), (3, 16), (3, 19),
-- Listing 4 amenities (2BHK HSR)
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 12), (4, 16), (4, 17),
-- Listing 5 amenities (House BTM)
(5, 1), (5, 3), (5, 4), (5, 5), (5, 6), (5, 12), (5, 13);

-- Insert sample nearby places for better location insights
INSERT INTO nearby_places (listing_id, place_type, name, distance_meters, travel_time_minutes, latitude, longitude) VALUES
-- Koramangala listing nearby places
(1, 'metro', 'Koramangala Metro Station', 800, 10, 12.9279, 77.6271),
(1, 'mall', 'Forum Mall', 1200, 15, 12.9279, 77.6271),
(1, 'hospital', 'Manipal Hospital', 2000, 25, 12.9279, 77.6271),
(1, 'school', 'Delhi Public School', 1500, 20, 12.9279, 77.6271),

-- Whitefield villa nearby places
(2, 'metro', 'Whitefield Metro Station', 2000, 25, 12.9698, 77.7500),
(2, 'mall', 'Phoenix MarketCity', 3000, 35, 12.9698, 77.7500),
(2, 'hospital', 'Columbia Asia Hospital', 1500, 20, 12.9698, 77.7500),
(2, 'school', 'Ryan International School', 1000, 12, 12.9698, 77.7500);

-- Insert sample inquiries
INSERT INTO inquiries (listing_id, inquirer_id, name, phone, email, message, inquiry_type, status) VALUES
(1, 5, 'Anita Singh', '+919876543213', 'anita@example.com', 'Hi, I am interested in this property. Can we schedule a visit this weekend?', 'schedule_visit', 'new'),
(2, 6, 'Vikram Gupta', '+919876543214', 'vikram@example.com', 'Is the rent negotiable? Also, when is the earliest I can move in?', 'price_negotiation', 'new'),
(1, NULL, 'Rohit Mehta', '+919876543215', 'rohit@example.com', 'Looking for a 2BHK for my family. Is this property still available?', 'general', 'new');

-- Insert sample saved searches
INSERT INTO saved_searches (user_id, name, location, min_price, max_price, property_type, bedrooms, email_alerts, sms_alerts) VALUES
(5, 'Affordable 2BHK in South Bangalore', 'Koramangala, BTM Layout, HSR Layout', 20000, 30000, 'apartment', 2, TRUE, FALSE),
(6, 'Luxury Villa in East Bangalore', 'Whitefield, Marathahalli', 40000, 60000, 'villa', 3, TRUE, TRUE);

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, listing_id, read_status) VALUES
(2, 'new_inquiry', 'New Inquiry for Your Property', 'You have received a new inquiry for your property in Koramangala', 1, FALSE),
(3, 'listing_approved', 'Property Listing Approved', 'Your villa listing in Whitefield has been approved and is now live', 2, FALSE),
(5, 'new_listing', 'New Property Match', 'A new 2BHK apartment matching your search criteria is now available', 4, FALSE);

-- Update listing counts for locations
UPDATE locations SET listing_count = (
    SELECT COUNT(*) FROM listings 
    WHERE listings.city = locations.city 
    AND listings.status = 'active'
);
