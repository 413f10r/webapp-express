import express from 'express';
const app = express();
const port = 3000;













//attivazione del server
app.listen(port, () => {
    console.log(`YOUR SERVER IS OK ON PORT: ${port}`)
})