const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
let books = [{
        id: 1,
        name: ' Đánh thức con người phi thường trong bạn '
    },
    {   
        id: 2,
        name: ' Suy nghĩ vẫn vơ của kẻ nhàn rỗi '
    },
    {
        id: 3,
        name: ' Bắt trẻ đồng xanh '
    },
    ]

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


router.get('/books', function(req, res){
    res.send(books);
});

router.post('/books', function(req, res){
    books = [...books, {id: books.length + 1, name: req.body.name}]
    res.redirect('/books');
})

router.get('/books/read/:id', function(req, res){
    let object = books.find((book) => {
        return book.id === parseInt(req.params.id)
    })
    if (object) {
        res.send(object);
    } else {
        res.send({
            message: 'Không tìm thấy'
        })
    }
})

router.put('/books/edit/:id', function(req, res){
    let object = books.find((book) => {
        return book.id === parseInt(req.params.id)
    })
    if (object) {
        object.name = req.body.name;
        res.redirect('/books');
    } else {
        res.send({
            message: 'Không tìm thấy'
        })
    }
})

router.delete('/books/delete/:id', function(req, res){
   books.splice(req.params.id, 1);
   res.redirect('/books')
})
app.use(router);
app.listen(port);
console.log('Sever listening on port: ' + port);