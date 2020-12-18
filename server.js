const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

const app = express();

require('./config/passport')(passport)

// db config
const db = require('./config/keys').MongoURI

// Connect to Mongo
var  dbConnect = mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log('MongoDB connected')).catch(err => console.log(err))

// ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use('/public', express.static('public'))

// body-parser
app.use(express.urlencoded({extended: false}))

// middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))