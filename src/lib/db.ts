import { neon } from '@neondatabase/serverless'

export function getDb() {
  const databaseUrl = import.meta.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(databaseUrl)
}

// SQL to create the todos table (run manually in Neon console):
// CREATE TABLE IF NOT EXISTS todos (
//   id SERIAL PRIMARY KEY,
//   title TEXT NOT NULL,
//   content TEXT DEFAULT '',
//   completed BOOLEAN DEFAULT false,
//   due_date DATE,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   updated_at TIMESTAMPTZ DEFAULT NOW()
// );
