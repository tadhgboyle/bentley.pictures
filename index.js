const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
    res.sendFile(getRandomImagePath(), (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

app.get('/:id', (req, res) => {
    const image = getImageById(req.params.id);
    if (image) {
        res.sendFile(image, (err) => {
            if (err) {
                res.status(err.status).end();
            }
        });
    } else {
        return res.json({
            error: 'Image not found'
        });
    }
});

app.get('/api/random', (req, res) => {
    return res.json(getRandomImageApi());
});

app.get('/api/:id', (req, res) => {
    const image = getImageById(req.params.id, false);
    if (image) {
        return res.json({
            id: parseInt(req.params.id),
            url: 'https://bentley.tadhg.sh/' + req.params.id,
        });
    } else {
        return res.json({
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
    return  __dirname + '/images/' + images[Math.floor(Math.random() * images.length)];
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
        id: parseInt(id),
        url: 'https://bentley.tadhg.sh/' + id,
    };
};
