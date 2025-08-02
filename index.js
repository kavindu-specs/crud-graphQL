const express = require('express');
const http= require("http")
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser')
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas");



const connectDB = require("./config/db")
const app = express();
const server = http.createServer(app);

dotenv.config({path:'.env'})

connectDB()

app.use(express.json())

app.use(cookieParser())
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);


server.listen(3000, () => console.log('Style pulse app is listening on port 3000.'));