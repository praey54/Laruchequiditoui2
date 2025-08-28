// db-query.js
import 'dotenv/config';
import pg from 'pg';
const { Client } = pg;

async function runQuery() {
  const query = process.argv[1];
  if (!query) {
    console.error('Error: Please provide a SQL query as an argument.');
    process.exit(1);
  }

  const client = new Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  try {
    await client.connect();
    console.log('Connected to the database.');
    const res = await client.query(query);
    console.log('Query Result:');
    console.table(res.rows);
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await client.end();
    console.log('Disconnected from the database.');
  }
}

runQuery();