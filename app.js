import express from "express";
const app = express();
const port = 5000;

app.use(express.json())

app.use('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
