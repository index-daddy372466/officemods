const express = require('express');
const router = express.Router()
const { pool } = require("../db").pool
const path = require('path')

router.use(express.static(path.resolve(__dirname,'../../client/public/calculator')))
// post result & equation to the database
router.route('/equal').post(async(req,res)=>{
    const { result, equation } = req.body;
    try{
        if(!equation){
            res.json({data:'no data'})
        }
        else{
            let insert = await pool.query("insert into calculator(result,equation) values($1,$2)",[result,equation])
            let getCount = await pool.query("select count(id) from calculator")
            let getData = await pool.query("select result,equation from calculator")
            let counter = +getCount.rows[0]['count']
            let data = getData.rows
            res.json({c:counter,d:data})
        }
        
    }
    catch(err){
        console.log(err)
    }

})
// get the full history of results & equations (how to get the result) from database
router.route('/equal').get(async(req,res)=>{
    try{
        const selectAll = await pool.query("select * from calculator order by id desc")
        const map =[...selectAll.rows].map((row=>{
            return {
                id:row.id,
                res: row.result,
                equation:row.equation
            }
        }))
        res.json({data:map})
    }
    catch(err){
        console.log(err)
    }
})
// truncate (delete) all rows in database & restart it's sequence to 1
router.route('/history/delete').get(async(req,res)=>{
    await pool.query("truncate calculator;alter sequence calculator_history_id_seq restart with 1")
    console.log('calculator values are deleted')
    res.redirect('/')
})

module.exports = router;