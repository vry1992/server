import Pool from 'pg';

export const pool = new Pool.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'dubaev',
    password: 'user',
    port: 5432,
})