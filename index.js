import express from 'express';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});
