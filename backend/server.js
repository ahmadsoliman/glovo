import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));