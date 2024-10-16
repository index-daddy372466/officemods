require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// const { pool } = require("../db");
const PORT = !process.env.PORT ? 8836 : process.env.PORT;
const cookieSession = require('cookie-session')
const {
  createCipheriv,
  randomBytes,
  createDecipheriv,
  createHash,
} = require("crypto");

// middleware
app.use(express.static(require('path').resolve(__dirname,'../client/public')))
app.set("view engine", "ejs");
app.set('views',require('path').resolve(__dirname,'../client/public'))
app.use(
  cookieSession({
    name: "session",
    maxAge: 1800000,
    secret: process.env.SECRET,
    priority: "medium",
    secure: false,
    httpOnly: false,
  })
);
// app.use(encryptUsers)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// homepage routing
app.route('/').get((req,res)=>{
    res.render('index.ejs')
})





// base routing










// 404 not found
app.use(notFound)

// encrypt users
// async function encryptUsers(req, res, next) {
//     let newdate = new Date();
//       let date = newdate.getTime().toString();
//       // encrypt the date with a cipher
//       let key = randomBytes(32);
//       let salt = randomBytes(16);    
//   try{  
//     let newId = createId(date,key,salt)
//     // check to see if id is already in db
//     let userFound = await pool.query('select * from users where id = $1',[req.session.id])
//     // collect id(s) found
//     let found = userFound.rows
//     // console.log(found)
//     if(found.length < 1){
//         // console.log('no users found')
//         req.session.id = newId
//         await pool.query('insert into users(id) values($1); ',[req.session.id])
//     }
//     else{
//       // console.log('user found!')
//     }

    
//     next();
//   }
  
//   catch(err){
//     throw new Error(err)
//   }
// }
// create id
function createId(id){
  // const cipher = createCipheriv("aes-256-gcm", key, salt);
  // const encryptId = cipher.update(id, "utf-8", "hex") + cipher.final("hex");
  // return encryptId;
  const hash = createHash('sha1').update(id).digest('hex')
  // console.log('hash')

  return hash
}; 
// encrypt notes
function encrypt(notes){
  // console.log('encrypt')
  // start symmetric encryption
  const alg = 'aes-256-gcm'
  const key = Buffer.alloc(32,process.env.KEY);
  // console.log(key)
  const iv = randomBytes(16)
  // console.log('iv original')
  // console.log(iv)
  // console.log('iv hex')
  // console.log(iv.toString('hex'))
  const cipher = createCipheriv(alg,key,iv);
  const encryptedNote = cipher.update(notes, "utf-8", "hex") + cipher.final("hex");
  return JSON.stringify({note:encryptedNote,iv:iv.toString('hex')})
}
function decrypt(encrypted,iv,alg){
  // console.log('decrypt')
  // start symmetric encryption
  const key = Buffer.alloc(32,process.env.KEY);
  // console.log('key')
  // console.log(key)
  // console.log('almost iv')
  // console.log(iv)
  iv = Buffer.from(iv,'hex')
  // console.log('iv')
  // console.log(iv)
  const decipher = createDecipheriv(alg,key,iv);
  const decryptedNote = Buffer.from(
    decipher.update(Buffer.from(encrypted, "hex"), "utf-8"))  
    return decryptedNote.toString()
}
function notFound(req,res,next){
    res.status(494).send('<h1>404! Page not found</h1>')
}



// listen on server
const server = app.listen(PORT, () => {
  console.log("You are listening on port: " + PORT);
});


// truncate tables & sequence in db when serveris closed
server.on('close',async ()=>{
  console.log('server closed')
})
// graceful shutdown
process.on('SIGINT',()=>{
  server.close(async()=>{
    const query = 'truncate users,notepad cascade;alter sequence notepad_id_seq restart with 1;'
    await pool.query(query)
    process.exit(0)
  })
})