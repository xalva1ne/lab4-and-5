const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs")

const app = express()

app.use(express.json())
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["POST", "GET"],
      credentials: true,
    })
  );
app.use(cookieParser())

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Lab4',
    port: '8889'
})

const tokenValidation = (req, res, next) => {
  const cookieToken = req.cookies.jwt
  if(!cookieToken){
    return res.json({Error: 'Токен отсутствует'})
  } else {
    jwt.verify(cookieToken, 'supersecret', (err, decoded) => {
      req.name = decoded.name
      req.email = decoded.email
      next()
    })
  }
}

app.get('/', tokenValidation,(req, res) => {
  return res.json({Status: 'Success', name: req.name, email: req.email})
})

app.get('/logout', (req, res) => {
  res.clearCookie('jwt')
  return res.json({Status: 'Success'})
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, req.body.password];
  
    database.query(sql, [values], (err, result) => {
      if (result) {
        return res.json({Status: 'Success'})
      } else {
        res.send({ message: "Произошла ошибка при регистрации" });
      }
    });
  });

app.post('/auth', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?"
    database.query(sql, [req.body.username], (err, data) => {
      if(data.length > 0) {
        bcrypt.compare(req.body.password, data[0].password, (err, response) => {
          if(response){
            const name = req.body.username
            const email = data[0].email
            const token = jwt.sign(
              { name, email }, "supersecret"
              )
            res.cookie('jwt', token, { expires: new Date(Date.now() + 12096e5), secure: false, httpOnly: false })
            return res.json({Status: 'Success'})
          } else {
            return res.json({Error: 'Пароль неверный'})
          }
        })
      } else {
        return res.json({Error: 'Пользователя не существует'})
      }
    })
})

app.listen(4444, () => {
    console.log('Сервер запущен...');
})