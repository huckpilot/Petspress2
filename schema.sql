-- Verify what name you are giving this table and ensure that it corrolates to what the app will unerstand
DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
  id INTEGER PRIMARY KEY, 
  name TEXT, type TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER timestamp_update BEFORE UPDATE ON pets BEGIN
  UPDATE pets SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;