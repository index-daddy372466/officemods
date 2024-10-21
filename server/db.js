require('dotenv').config()
const { Pool } = require('pg')
const { Sequelize } = require('sequelize')

    const sequalize = new Sequelize(process.env.N_URI,
        {dialect:"sqlite",
         storage:"./database.sqlite",
         logging:false,
        })
        sequalize.sync().then(()=>{
            console.log('Sequelize: you are connected to notesDB')
        }).catch(err=>console.log(err))
        const sequalize2 = new Sequelize(process.env.C_URI,
            {dialect:"sqlite",
             storage:"./database.sqlite",
             logging:false,
            })
            sequalize2.sync().then(()=>{
                console.log('Sequelize: you are connected to calculatorDB')
            }).catch(err=>console.log(err))
const pool = {
    notepad: new Pool({
        user: process.env.N_DBU,
        database: process.env.N_DB,
        password: process.env.N_PD,
        port: process.env.N_DBP,
        host:process.env.N_DBH,
        ssl:{
            rejectUnauthorized:false,
        }
    }),
    calculator: new Pool({
        user: process.env.C_DBU,
        database: process.env.C_DB2,
        password: process.env.C_PD,
        port: process.env.C_DBP,
        host:process.env.C_DBH,
        ssl:{
            rejectUnauthorized:false,
        }
    
    })
}

// console.log(pool)

module.exports = { pool };