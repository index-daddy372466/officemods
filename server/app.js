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








// cleanup function
async function cleanUp(op,ex={exit:true}){
  await pool.query('truncate noteusers,notepad cascade; alter sequence notepad_id_seq restart with 1;')
  if(ex.exit) process.exit()
  process.handleExit(0);
}

// 404 not found
app.use(notFound)

function notFound(req,res,next){
    res.status(494).send('<h1>404! Page not found</h1>')
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

process.on('SIGINT', cleanUp.bind(null,{exit:true}) );
process.on('uncaughtException', cleanUp.bind(null,{exit:true}) );
