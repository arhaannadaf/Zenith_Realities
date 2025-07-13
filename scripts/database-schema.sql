-- Real Estate Marketplace Database Schema
-- Compatible with MySQL 8.0+ and PostgreSQL 12+

-- Enable UUID extension for PostgreSQL (comment out for MySQL)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with comprehensive user management
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('tenant', 'owner', 'admin') NOT NULL DEFAULT 'tenant',
    profile_image VARCHAR(500),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    
    -- Verification status
    verified BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP NULL,
    phone_verified_at TIMESTAMP NULL,
    
    -- Account status
    status ENUM('active', 'inactive', 'suspended', 'deleted') DEFAULT 'active',
    last_login_at TIMESTAMP NULL,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_users_email (email),
    INDEX idx_users_phone (phone),
    INDEX idx_users_role (role),
    INDEX idx_users_status (status),
    INDEX idx_users_verified (verified)
);

-- OTP table for verification and password reset
CREATE TABLE otps (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    otp_type ENUM('email_verification', 'phone_verification', 'password_reset', 'login_verification') NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_otps_user_id (user_id),
    INDEX idx_otps_code (otp_code),
    INDEX idx_otps_expires (expires_at)
);

-- Categories for property types
CREATE TABLE property_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Property listings table
CREATE TABLE listings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    owner_id BIGINT NOT NULL,
    category_id INT,
    
    -- Basic information
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    deposit DECIMAL(12, 2),
    maintenance_charge DECIMAL(10, 2) DEFAULT 0,
    
    -- Location details
    location VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Property specifications
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    balconies INT DEFAULT 0,
    area_sqft INT NOT NULL,
    carpet_area_sqft INT,
    built_up_area_sqft INT,
    floor_number INT,
    total_floors INT,
    age_of_property INT, -- in years
    
    -- Property type and listing details
    property_type ENUM('apartment', 'villa', 'house', 'pg', 'office', 'shop', 'warehouse') NOT NULL,
    listing_type ENUM('rent', 'sale') NOT NULL,
    furnishing_status ENUM('unfurnished', 'semi_furnished', 'fully_furnished') DEFAULT 'unfurnished',
    availability_date DATE,
    
    -- Preferences
    preferred_tenants ENUM('family', 'bachelors', 'company', 'any') DEFAULT 'any',
    vegetarian_only BOOLEAN DEFAULT FALSE,
    pets_allowed BOOLEAN DEFAULT FALSE,
    
    -- Status and verification
    verified BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive', 'pending', 'rejected', 'rented', 'sold') DEFAULT 'pending',
    rejection_reason TEXT,
    
    -- Analytics
    views_count INT DEFAULT 0,
    contact_count INT DEFAULT 0,
    favorite_count INT DEFAULT 0,
    
    -- Admin fields
    verified_by BIGINT,
    verified_at TIMESTAMP NULL,
    featured_until TIMESTAMP NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES property_categories(id) ON DELETE SET NULL,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_listings_owner (owner_id),
    INDEX idx_listings_location (city, location),
    INDEX idx_listings_price (price),
    INDEX idx_listings_type (property_type, listing_type),
    INDEX idx_listings_status (status),
    INDEX idx_listings_featured (featured, featured_until),
    INDEX idx_listings_coordinates (latitude, longitude),
    INDEX idx_listings_created (created_at),
    INDEX idx_listings_bedrooms (bedrooms),
    INDEX idx_listings_area (area_sqft)
);

-- Property images table
CREATE TABLE listing_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    listing_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    file_size INT, -- in bytes
    width INT,
    height INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    INDEX idx_images_listing (listing_id),
    INDEX idx_images_primary (is_primary)
);

-- Amenities master table
CREATE TABLE amenities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    category ENUM('basic', 'security', 'recreation', 'convenience', 'connectivity') DEFAULT 'basic',
    description TEXT,
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Listing amenities junction table
CREATE TABLE listing_amenities (
    listing_id BIGINT NOT NULL,
    amenity_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (listing_id, amenity_id),
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- OCR uploads table for sign processing
CREATE TABLE ocr_uploads (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    listing_id BIGINT,
    
    -- File information
    original_filename VARCHAR(255),
    image_url VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    
    -- OCR results
    extracted_text TEXT,
    extracted_phone VARCHAR(20),
    extracted_email VARCHAR(255),
    extracted_price DECIMAL(12, 2),
    confidence_score DECIMAL(3, 2),
    
    -- Processing status
    processed BOOLEAN DEFAULT FALSE,
    processing_status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    error_message TEXT,
    processed_at TIMESTAMP NULL,
    
    -- Admin review
    reviewed BOOLEAN DEFAULT FALSE,
    reviewed_by BIGINT,
    reviewed_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE SET NULL,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_ocr_user (user_id),
    INDEX idx_ocr_status (processing_status),
    INDEX idx_ocr_reviewed (reviewed)
);

-- User favorites table
CREATE TABLE user_favorites (
    user_id BIGINT NOT NULL,
    listing_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (user_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    
    INDEX idx_favorites_user (user_id),
    INDEX idx_favorites_listing (listing_id)
);

-- Contact inquiries table
CREATE TABLE inquiries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    listing_id BIGINT NOT NULL,
    inquirer_id BIGINT,
    
    -- Contact details (for non-registered users)
    name VARCHAR(200),
    phone VARCHAR(20),
    email VARCHAR(255),
    
    -- Inquiry details
    message TEXT,
    inquiry_type ENUM('general', 'schedule_visit', 'price_negotiation', 'more_info') DEFAULT 'general',
    preferred_contact_time ENUM('morning', 'afternoon', 'evening', 'anytime') DEFAULT 'anytime',
    
    -- Status tracking
    status ENUM('new', 'contacted', 'scheduled', 'visited', 'closed') DEFAULT 'new',
    owner_response TEXT,
    
    -- Timestamps
    responded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (inquirer_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_inquiries_listing (listing_id),
    INDEX idx_inquiries_inquirer (inquirer_id),
    INDEX idx_inquiries_status (status),
    INDEX idx_inquiries_created (created_at)
);

-- Saved searches table
CREATE TABLE saved_searches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    
    -- Search criteria (stored as JSON or individual columns)
    search_criteria JSON,
    location VARCHAR(255),
    min_price DECIMAL(12, 2),
    max_price DECIMAL(12, 2),
    property_type VARCHAR(50),
    bedrooms INT,
    
    -- Notification settings
    email_alerts BOOLEAN DEFAULT TRUE,
    sms_alerts BOOLEAN DEFAULT FALSE,
    
    -- Status
    active BOOLEAN DEFAULT TRUE,
    last_notified_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_saved_searches_user (user_id),
    INDEX idx_saved_searches_active (active)
);

-- Notifications table
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type ENUM('listing_approved', 'listing_rejected', 'new_inquiry', 'price_alert', 'new_listing', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Related entities
    listing_id BIGINT,
    inquiry_id BIGINT,
    
    -- Status
    read_status BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    
    -- Delivery channels
    email_sent BOOLEAN DEFAULT FALSE,
    sms_sent BOOLEAN DEFAULT FALSE,
    push_sent BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE SET NULL,
    FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE SET NULL,
    
    INDEX idx_notifications_user (user_id),
    INDEX idx_notifications_read (read_status),
    INDEX idx_notifications_type (type),
    INDEX idx_notifications_created (created_at)
);

-- Analytics and tracking
CREATE TABLE listing_views (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    listing_id BIGINT NOT NULL,
    user_id BIGINT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    session_id VARCHAR(100),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_views_listing (listing_id),
    INDEX idx_views_user (user_id),
    INDEX idx_views_date (viewed_at)
);

-- Admin activity logs
CREATE TABLE admin_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    admin_id BIGINT NOT NULL,
    action ENUM('approve_listing', 'reject_listing', 'suspend_user', 'activate_user', 'delete_listing', 'feature_listing') NOT NULL,
    target_type ENUM('user', 'listing', 'inquiry') NOT NULL,
    target_id BIGINT NOT NULL,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_admin_logs_admin (admin_id),
    INDEX idx_admin_logs_action (action),
    INDEX idx_admin_logs_target (target_type, target_id),
    INDEX idx_admin_logs_created (created_at)
);

-- Location data for better search
CREATE TABLE locations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    type ENUM('city', 'locality', 'sublocality', 'landmark') NOT NULL,
    parent_id INT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    pincode VARCHAR(10),
    active BOOLEAN DEFAULT TRUE,
    listing_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES locations(id) ON DELETE SET NULL,
    INDEX idx_locations_type (type),
    INDEX idx_locations_parent (parent_id),
    INDEX idx_locations_city (city),
    INDEX idx_locations_coordinates (latitude, longitude),
    INDEX idx_locations_slug (slug)
);

-- Commute and nearby places (for location insights)
CREATE TABLE nearby_places (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    listing_id BIGINT NOT NULL,
    place_type ENUM('metro', 'bus_stop', 'school', 'hospital', 'mall', 'restaurant', 'bank', 'atm') NOT NULL,
    name VARCHAR(255) NOT NULL,
    distance_meters INT NOT NULL,
    travel_time_minutes INT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    INDEX idx_nearby_listing (listing_id),
    INDEX idx_nearby_type (place_type),
    INDEX idx_nearby_distance (distance_meters)
);
