const express = require('express');
const app = express();

app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('../Public/View'));
app.use(express.static('../Public/Controller/Home.js'));

app.get('/Search&t=[a-z]*', function (req,res)
{
    let url = req.url;
    let Title = /(?<=Search&t=)(.*)/i.exec(url);
    res.send(Title[0])
})



