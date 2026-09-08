-- Schema Setup
CREATE TABLE enterprises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enterprise_id UUID REFERENCES enterprises(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('HR', 'Developer', 'Admin', 'Employee')),
    language_pref VARCHAR(10) DEFAULT 'en' CHECK (language_pref IN ('en', 'am'))
);

CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en VARCHAR(255) NOT NULL,
    title_am VARCHAR(255) NOT NULL,
    target_role VARCHAR(50) NOT NULL
);

CREATE TABLE progress (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
    score INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, module_id)
);

-- Seed Data

-- Insert Enterprises
INSERT INTO enterprises (id, name, domain) VALUES
('11111111-1111-1111-1111-111111111111', 'Awash Bank', 'awashbank.com'),
('22222222-2222-2222-2222-222222222222', 'Ethio Tech', 'ethiotech.com');

-- Insert Profiles (Users)
INSERT INTO profiles (id, enterprise_id, role, language_pref) VALUES
('33333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', 'Admin', 'en'),
('33333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111111', 'Developer', 'am'),
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'HR', 'en'),
('44444444-4444-4444-4444-444444444441', '22222222-2222-2222-2222-222222222222', 'Admin', 'en'),
('44444444-4444-4444-4444-444444444442', '22222222-2222-2222-2222-222222222222', 'Developer', 'en');

-- Insert Modules (Courses)
INSERT INTO modules (id, title_en, title_am, target_role) VALUES
('55555555-5555-5555-5555-555555555551', 'Secure API Coding', 'ደህንነቱ የተጠበቀ ኤፒአይ ኮዲንግ', 'Developer'),
('55555555-5555-5555-5555-555555555552', 'Social Engineering', 'ማህበራዊ ምህንድስና (Social Engineering)', 'HR'),
('55555555-5555-5555-5555-555555555553', 'Phishing Awareness', 'የማስገር ጥቃት (Phishing) ግንዛቤ', 'Employee'),
('55555555-5555-5555-5555-555555555554', 'Enterprise Security Basics', 'የድርጅት ደህንነት መሰረታዊ ነገሮች', 'All');

-- Insert Progress
INSERT INTO progress (user_id, module_id, status, score) VALUES
('33333333-3333-3333-3333-333333333332', '55555555-5555-5555-5555-555555555551', 'Completed', 95),
('33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555552', 'In Progress', 50),
('44444444-4444-4444-4444-444444444442', '55555555-5555-5555-5555-555555555551', 'Not Started', 0);
