require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { pool } = require('./db.js')
const PORT = !process.env.PORT ? 8836 : process.env.PORT;


// middleware
app.use(express.static(require('path').resolve(__dirname,'../client/public')))
app.set("view engine", "ejs");
app.set('views',require('path').resolve(__dirname,'../client/public'))
// app.use(encryptUsers)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// homepage routing
app.route('/').get((req,res)=>{
    res.render('index.ejs')
})

// base routes
app.use('/module/notepad',require('./routes/notepad.js'))
app.use('/module/calculator',require('./routes/calculator.js'))

// scatter plot
app.route('/module/scatter-plot').get((req,res)=>{
  console.log('fired endpoint for scatter')
  try{
    res.sendFile(require('path').resolve(__dirname,'../scatterplot/index.html'))
  }
  catch(err){
    console.log(err)
  }
})




// base routing










// 404 not found
app.use(notFound)

function notFound(req,res,next){
    res.status(494).send('<h1>404! Page not found</h1>')
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
process.on('SIGTERM', async () => {
  console.log(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
  await pool.query('truncate users,notepad cascade; alter sequence notepad_id_seq restart with 1;')
  process.handleExit(0);
});

process.on('SIGINT', async () => {
  console.log(`Process ${process.pid} received SIGINT: Exiting with code 0`);
  await pool.query('truncate users,notepad cascade; alter sequence notepad_id_seq restart with 1;')
  process.handleExit(0);
});
