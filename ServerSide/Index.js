const express = require('express');
const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('../Public/View'));
app.use(express.static('../Public/Model'));
app.use(express.static('../Public/Controller/Home.js'));


