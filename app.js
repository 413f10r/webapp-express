
import express from 'express';
const app = express();

const port = 3000;

import movieRouter from './routers/movieRouter.js';

import setImagePath from './middelwares/imgPath.js';


app.use(express.static('public'))


//middleware per gestire le informazioni del body
app.use(express.json())
app.use(setImagePath)
app.use('/movies', movieRouter)






//attivazione del server
app.listen(port, () => {
    console.log(`YOUR SERVER IS OK ON PORT: ${port}`)
})