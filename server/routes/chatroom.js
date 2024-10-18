let path = require("path");

require("dotenv").config();
let PORT = process.env.PORT || 4447;
const express = require("express"),
  fs = require('fs'),
  router = express.Router(),
  habits = require('./lib/habits.js'),
  { Server } = require("socket.io"),
  AXI = !process.env._AXI_ ? 4448 : process.env._AXI_,
  httpServer = express().listen(AXI, () => {
    console.log(`listening on port ${AXI}`);
  }),
//   listen on server
io = new Server(httpServer);
  (cors = require("cors")),
  (passport = require("passport")),
  (initializePassport = require("./lib/passport-config.js")),
  (session = require("express-session")),
  (cookieParser = require("cookie-parser")),
  (MemoryStore = require("memorystore")(session)),
  ({ setMaxListeners } = require("events")),
  (socketIoStart = require("./lib/socketio.js")),
  (docker = "http://localhost:9998");
//   ({ createProxyMiddleware } = require("http-proxy-middleware"));
let messages = {},
  activeUsers = [],
  rooms = [];
const checkAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/module/chatroom/login");
  }
};

const checkNotAuthenticated = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/module/chatroom/home");
  }
};

const checkIcon = (req, res, next) => {
  if (req.user) {
    // console.log(activeUsers);
    // console.log("checking icon");
    // console.log(req.user);
    let getActive = activeUsers.filter((x) => x.id == req.user.id);
    // console.log(getActive);
    if (getActive[0].hasOwnProperty("icon")) {
      next();
    } else {
      res.redirect("/module/chatroom/char-selection");
    }
  }
};
// check is a user already has a profile photo.
const checkNoIcon = (req, res, next) => {
  // if user is not logged in and not
  if (!req.user) {
    // console.log("user and icon not found. going login");
    res.redirect("/module/chatroom/login");
  }
  // if user is logged in, but does not have an icon set
  else if (
    req.user &&
    !activeUsers.filter((u) => req.user.id === u.id)[0].icon
  ) {
    // console.log("choose a character");
    next();
  } else {
    // console.log("user & icon is found. going home");
    res.redirect("/module/chatroom/home");
  }
};

const sessionMiddleware = session({
  name: "uniqCkie",
  cookie: {
    maxAge: 1800000,
    secure: false,
    httpOnly: true,
  },
  store: new MemoryStore({
    checkPeriod: 1800000,
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
});
// middleware
router.use(cors());
// router.use(
//   "/api/docker",
//   createProxyMiddleware({ target: docker + "/api/docker" })
// );
// router.use("/api/home", createProxyMiddleware({ target: docker + "/api/home" }));
// router.use("/numbers", createProxyMiddleware({ target: docker + "/api/numbers" }));

router.use(express.static(path.resolve(__dirname, "../../client/public/chatroom")));
initializePassport(passport, activeUsers);
router.use(express.json());
router.use(cookieParser());
setMaxListeners(20);
router.use(sessionMiddleware);
router.use(express.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());
io.engine.use(sessionMiddleware);
// socket io
socketIoStart(io);

router.use(leaveChat)
// read cursewords.json & route
router.route("/words/curse").get((req, res) => {
  let string = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "lib/cursewords.json"), {
      encoding: "utf-8",
    })
  );
  const { words } = string;
  const alternate = { words: ["fuck", "shit", "fag"] };

  if (!words) {
    res.json(alternate);
  } else {
    res.json({ words: words });
  }
});

router.route("/").get((req, res) => {
  // console.log(habits)
  if (req.isAuthenticated()) {
    res.redirect("/module/chatroom/home");
  } else {
    res.redirect("/module/chatroom/login");
  }
});
// home page GET
router.route("/home").get(checkAuthenticated, (req, res) => {
  habits.home++
  // console.log(habits)
  let obj = activeUsers.find((user) => user.id == req.user.id);
  let checkNoIcon = !obj.hasOwnProperty("icon");
  res.render("chatroom/views/home.ejs", {
    checkIcon: checkNoIcon,
  });
});


// character selection
router.route("/char-selection").get(checkNoIcon, async (req, res) => {
  const dir = fs.readdirSync(path.resolve(__dirname,'../../client/public/chatroom/media'),{encoding:'utf8'})
  let files = [...dir].map(f=>{
    return `/chatroom/media/${f}`
  })
  res.render("chatroom/views/character.ejs",{
    files
  });
});
// test - post animal to a user in activeUsers
router.route("/char/icon").post(checkNoIcon, (req, res) => {
  const { icon } = req.body;
  // console.log(icon);
  try {
    if (req.user) {
      // // console.log(req.user.id)
      activeUsers.find((user) => user.id == req.user.id).icon = icon;
      let curruser = activeUsers.filter((user) => user.id == req.user.id);
      // console.log(curruser);

      res.json({ icon: icon });
    }
  } catch (err) {
    throw err;
  }
});

// icon picture GET
router.route("/char/photo").get((req, res) => {
  habits.character++
  // console.log(habits)
  if (req.user) {
    let obj = activeUsers.find((user) => user.id === req.user.id);
    if (!obj.hasOwnProperty("icon")) {
      res.send(
        `Choose a character. <a href="/char-selection">Choose character</a><br>Go home. <a href="/home">Home</a>`
      );
    } else {
      res.json({ icon: obj.icon });
    }
  } else {
    res.send(`Sign in. <a href="/login">Sign in</a>`);
  }
});
// login page
router.route("/login").get(checkNotAuthenticated, (req, res) => {
  if (req.query.id && (req.query.id === req.user.id)) {
    // retrieve id from query object and pass it to id
    id = req.query.id;
    // find the user by id within activeUsers array
    let findUser = activeUsers.find((user) => user.id == id);
    // find the user fucking with your router/system
    // console.log("user in violation");
    // console.log(findUser);
  }
  res.render("chatroom/views/index.ejs");
});
// login attempt
router.route("/login-attempt").post(
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/module/chatroom/char-selection",
    failureRedirect: "/module/chatroom/login",
  })
);
// logout GET
router.get("/logout", checkAuthenticated, (req, res) => {
  let user = req.user,
    id;
  // find the user who is fucking with your system (if query exists)
  if (req.query.id) {
    habits.violation.user = req.user.name
    // console.log(habits)
    // retrieve id from query object and pass it to id
    id = req.query.id;
    // find the user by id within activeUsers array
    let findUser = activeUsers.find((user) => user.id == id);
    // find the user fucking with your router/system
    // console.log("user in violation");
    // console.log(findUser);
  }
  for (let i = 0; i < activeUsers.length; i++) {
    if (activeUsers[i].id == user.id) {
      // console.log(activeUsers[i]);
      activeUsers.splice(activeUsers.indexOf(activeUsers[i]), 1);
    }
  }
  // console.log("");
  // console.log("remaining active users");
  // console.log(activeUsers);
  req.logout(() => {
    res.redirect("/module/chatroom/");
  });
});
// lockdown
router.route("/lock1").get(checkNotAuthenticated, (req, res) => {
  setTimeout(() => httpServer.close(), 750);
  res.render("chatroom/views/lockdown.ejs");
});
router.route("/lock2").get(checkAuthenticated, (req, res) => {
  // find the user who is fucking with your system (if query exists)
  if (req.query.id && (req.query.id === req.user.id)) {
    habits.violation.user = req.user.name
    // console.log(habits)
    // retrieve id from query object and pass it to id
    id = req.query.id;
    // find the user by id within activeUsers array
    let findUser = activeUsers.find((user) => user.id == id);
    // find the user fucking with your router/system
    // console.log("user in violation");
    // console.log(findUser);
  }
  setTimeout(() => httpServer.close(), 750);
  res.render("chatroom/views/lockdown.ejs");
});
// exisiting rooms
router.get("/rooms/existing", checkAuthenticated, (req, res) => {
  let roomData = [...rooms];
  if (rooms.length < 1) {
    res.json({ room: "no data" });
  } else {
    res.json({ room: roomData });
  }
});
router.post("/rooms/check", (req, res) => {
  if (!rooms.includes(req.body.room)) {
    res.status(403).json({ err: "unauthorized!" });
  } else {
    res.json({ data: true });
  }
});

// clear rooms
router.route("/room/clear").get(checkAuthenticated, (req, res) => {
  habits.clear++
  // console.log(habits)
  rooms = [];
  for (let property in messages) {
    if (messages.hasOwnProperty(property)) {
      delete messages[property];
    }
  }
  res.redirect("/module/chatroom/home");
});
// create a room
router.post("/room/create", checkAuthenticated, (req, res) => {
  habits.create++
  // console.log(habits)
  // console.log(req.body.room);
  let { room } = req.body;
  messages[room] = [];
  // // console.log("room on post");
  // // console.log(room);
  try {
    if (room && (!rooms.includes(room) || rooms.indexOf(room) == -1)) {
      rooms.push(room);
      // console.log(rooms);
      res.json({ room: rooms });
    } else {
      res.status(404).json({ rooms: undefined });
    }
  } catch (err) {
    throw err;
  }
});
router.get(
  "/room/:room",
  checkAuthenticated,
  checkIcon,
  (req, res) => {
    habits.join++
    // console.log(habits)
    if (!rooms.includes(req.params.room)) {
      res
        .status(403)
        .send("err: unauthorized!, </a><br>Go home. <a href='/home'>Home</a>");
    } else {
      res.render("chatroom/views/chat.ejs", {
        room: req.params.room,
      });
    }
  }
);
// store messages in fake db
router.get("/room/:room/:message", (req, res) => {
  console.log('is this firing?')
  habits.sendmessage++
  // console.log(habits)
  const { room, message } = req.params;
  console.log(message)
  if (rooms.indexOf(room) == -1) {
    res.send("not a room. </a><br>Go home. <a href='/home'>Home</a>");
  } else {
    var offset =
      Math.floor(new Date().getTimezoneOffset() / 60) * (60 * 60 * 1000);
    let timestamp = new Date().getTime() - offset;
    let activeuser = activeUsers.find((u) => u.id == req.user.id);
    let obj = {
      message: message,
      sender: req.user.name,
      icon: activeuser.icon,
      timestamp: timestamp,
    };
    messages[room].push(obj);
    res.json({ messages: messages[room] });
  }
});
// get messages in fake db
router.get("/:room/sec/messages", (req, res) => {
  habits.messagesall++
  // room in question
  let { room } = req.params;
  let keys, vals, filtered;
  // extract properties & values from req.query object
  if (Object.values(req.query).length > 0) {
    (keys = Object.keys(req.query)), (vals = Object.values(req.query));
    let msgs = messages[room];
    // filter the search
    filtered = msgs.filter((m, index) => {
      // return null
      return keys.every((k, idx) => m[k] == vals[idx]);
    });
    let property = "filter: " + keys.join(" and ");
    let obj = {};
    obj[property] = filtered;
    habits.messagesfiltered++
    // console.log(habits)
    res.json(obj);
  } else if (rooms.indexOf(room) == -1) {
    res.send("not a room. </a><br>Go home. <a href='/module/chat/home'>Home</a>");
  } else {
    if (messages[room].length > 0) {
      res.json({ messages: messages[room] });
    } else {
      res.json({ messages: "no messages" });
    }
  }
  // res.redirect('/module/chatroom/room/'+room)
});

// 404
router.use(function (req, res) {
  res.status(404).json({
    error: "This result brought you here! 404 not found",
  });
});

// check for web violations, XXS/Injection/etc...


let endpoints = []
// middleware to check if a user is going to home from leave (chat)
function leaveChat(req, res, next) {
  // capture endpoints into array
  endpoints.push(req.path)
  if (endpoints.length >= 3) {
    endpoints.shift();
  }
  // if([ '/clothes/sec/messages', '/home' ])
  if (/\/sec\/messages$/g.test(endpoints[0]) && /^\/home$/.test(endpoints[1])) {
    habits.leave++
    // console.log(habits)
  }
  // console.log(endpoints)
  next();
}

module.exports = router;
