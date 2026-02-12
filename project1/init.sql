CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mentors (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    expertise TEXT[],
    company VARCHAR(100),
    rating DECIMAL(3, 2) DEFAULT 5.0,
    is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    mentor_id INT REFERENCES mentors(id),
    student_id INT REFERENCES users(id),
    slot_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed'
);

-- Seed Data
INSERT INTO users (email, password_hash, full_name, role) VALUES 
('demo@vidyamitra.com', '$2a$10$abcdefg...', 'Alex Student', 'student'),
('sarah@google.com', '$2a$10$abcdefg...', 'Sarah Chen', 'mentor');

INSERT INTO mentors (user_id, expertise, company, rating) VALUES
(2, ARRAY['System Design', 'React'], 'Google', 4.9);
