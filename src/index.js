import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3030

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`listening on port ${port}. http://localhost:${port}`);
});