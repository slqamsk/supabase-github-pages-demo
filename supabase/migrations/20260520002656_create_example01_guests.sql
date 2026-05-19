-- Создаём таблицу 
CREATE TABLE example01_guests (
    guest_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    guest_name VARCHAR(20) NOT NULL
);
