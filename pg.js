const {Pool} = require('pg');

const pool = new Pool({
    
    host: "queenie.db.elephantsql.com",
        user: "yqhnpyhx",
        port: 5432,
        database: "yqhnpyhx",
        password: "ioTspDAEZctbTQxE3HCoDLTcqJEQmkmI"
});


// host: "localhost",
//     user: "postgres",
//     port: 5432,
//     database: "demo_edo",
//     password: "new"

const rows = async (SQL, ...params)=> {
    const client = await pool.connect()
    
    try{
        const {rows} = await client.query(SQL,params)
        return rows
    }
    finally{
        client.release()
    }
}

const row = async (SQL, ...params)=> {
    const client = await pool.connect()
    
    try{
        const {rows: [row]} = await client.query(SQL,params)
        return row
    }
    finally{
        client.release()
    }
}

module.exports.rows = rows;
module.exports.row = row;
