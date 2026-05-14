
-- all queries cause I fucked the last time up.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  room_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  room_number TEXT UNIQUE NOT NULL
);

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  device_name TEXT,
  user_id INTEGER REFERENCES users(id),
  room_id INTEGER REFERENCES rooms(id),
  status BOOLEAN DEFAULT TRUE
);

CREATE TABLE readings (
  id SERIAL PRIMARY KEY,
  device_id INTEGER REFERENCES devices(id),

  voltage REAL,
  current REAL,
  power REAL,
  energy REAL,
  frequency REAL,
  pf REAL,

  valid BOOLEAN,

  esp_timestamp BIGINT,

  created_at TIMESTAMP DEFAULT NOW()
);