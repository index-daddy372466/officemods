require('dotenv').config()
const { Pool } = require('pg')
const { Sequelize } = require('sequelize')

    let sequalize = process.env.MDX == 'production' ? new Sequelize(process.env.I_URI,
        {dialect:"sqlite",
         storage:"./database.sqlite",
         logging:false,
        }) : null
        if(sequalize){
            sequalize.sync().then(()=>{
                console.log('Sequelize: you are connected to IntegratedDB')
            }).catch(err=>console.log(err))
        }
        // const sequalize2 = new Sequelize(process.env.C_URI,
        //     {dialect:"sqlite",
        //      storage:"./database.sqlite",
        //      logging:false,
        //     })
        //     sequalize2.sync().then(()=>{
        //         console.log('Sequelize: you are connected to calculatorDB')
        //     }).catch(err=>console.log(err))
// const pool = {
//     notepad: new Pool({
//         user: process.env.N_DBU,
//         database: process.env.N_DB,
//         password: process.env.N_PD,
//         port: process.env.DBP,
//         host:process.env.N_DBH,
//         ssl:{
//             rejectUnauthorized:false,
//         }
//     }),
//     calculator: new Pool({
//         user: process.env.C_DBU,
//         database: process.env.C_DB,
//         password: process.env.C_PD,
//         port: process.env.DBP,
//         host:process.env.C_DBH,
//         ssl:{
//             rejectUnauthorized:false,
//         }
    
//     })
// }

const pool = process.env.MDX == 'production' ? new Pool({
    user: process.env.I_DBU,
    database: process.env.I_DB,
    password: process.env.I_PD,
    port: process.env.DBP,
    host:process.env.I_DBH,
    ssl:{
        rejectUnauthorized:false,
    }

}) : new Pool({
    user: process.env.DBU,
    database: process.env.DB,
    password: process.env.PD,
    port: process.env.DBP,
    host:process.env.DBH,
})

console.log(pool)


module.exports = { pool };