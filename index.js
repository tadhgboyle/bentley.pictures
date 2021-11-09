const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
    res.sendFile(getRandomImagePath(), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.get('/:id', (req, res) => {
    const image = getImageById(req.params.id);
    if (image) {
        res.sendFile(image, (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });
    } else {
        res.json({
            error: 'Image not found'
        });
    }
});

app.get('/api/random', (req, res) => {
    res.json(getRandomImageApi());
});

app.get('/api/:id', (req, res) => {
    const image = getImageById(req.params.id, false);
    if (image) {
        res.json({
            id: req.params.id,
            url: 'https://bentley-tadhg-sh.herokuapp.com/' + image
        });
    } else {
        res.json({
            error: 'Image not found'
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening at http://localhost:' + port);
});

const getRandomImagePath = () => {
    const images = fs.readdirSync('./images');
    const image = __dirname + '/images/' + images[Math.floor(Math.random() * images.length)];
    console.log(image);
    return image;
};

const getImageById = (id, path = true) => {
    const images = fs.readdirSync('./images');

    for (const image of images) {
        if (image.substring(0, image.length - 4) .split('-')[1] === id) {
            if (path) {
                return __dirname + '/images/' + image;
            } else {
                return image;
            }
        }
    }

    return null;
};

const getRandomImageApi = () => {
    const path = getRandomImagePath();
    const id = path.substring(0, path.length - 4).split('-')[1];
    return {
        id: id,
        url: 'https://bentley-tadhg-sh.herokuapp.com/' + id
    };
};
