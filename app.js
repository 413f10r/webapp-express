// import 'dotenv/config'
import express from 'express';
const app = express();
import cors from 'cors';
const port = 3000; //const port = process.env.SERVER_PORT || 3000;
import movieRouter from './routers/movieRouter.js';
import setImagePath from './middelwares/imgPath.js';

//middleware cors 
app.use(
    cors({
        origin: "http://localhost:5173 " //origin: process.env.FRONTEND_APP,
    })
);
app.use(express.static('public'))
//middleware per gestire le informazioni del body
app.use(express.json())
//middleware img
app.use(setImagePath)
//rotta di test
app.get('/', (req, res) => {
    res.send('Server Movie tutto a posto!');
});
// router movie
app.use('/movies', movieRouter)

//attivazione del server
app.listen(port, () => {
    console.log(`YOUR SERVER IS OK ON PORT: ${port}`)
})