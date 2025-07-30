#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO categories (category_name) 
VALUES
  ('Groceries'),
  ('Fruits'),
  ('Vegetables'),
  ('Clothing'),
  ('Electronics'),
  ('Books')
  ON CONFLICT (category_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  item_name VARCHAR(100) NOT NULL,
  quantity INT DEFAULT 0,
  price NUMERIC(10, 2) NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO items (item_name, quantity, price, category_id)
VALUES
  ('Apple', 10, 0.50, 2),
  ('Banana', 20, 0.30, 2),
  ('Carrot', 15, 0.20, 3),
  ('T-Shirt', 50, 15.99, 4),
  ('Smartphone', 30, 499.99, 5),
  ('Novel', 25, 12.99, 6);
`;

async function main() {
  console.log("seeding...");
  const connectionString = process.argv[2] || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("❌ No connection string provided.");
    process.exit(1);
  }

  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
