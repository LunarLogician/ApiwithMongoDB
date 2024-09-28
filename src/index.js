import express from 'express';
import path from 'path';
import router from './routs/router.js';
import { fileURLToPath } from 'url';
import mongoose from './routs/conn.js';
import Usercol from './models/students.js';

const app = express();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
app.use(router);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
