const express = require('express')
    , app = express()
    , fs = require('fs')
    , getStat = require('util').promisify(fs.stat);

import {cyan, blue, bold, green, gray} from 'colors'


app.get('/audio/:music', async (req, res) => {
    const filePath = `./musics/${req.params.music}.mp3`;
    
    getStat(filePath)
    .then((stat) => {
        console.log(stat)
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });
    
        const stream = fs.createReadStream(filePath);
    
        // stream.on('end', () => console.log(bold('>') + ' requested ' + bold(gray(req.params.music))));
    
        // streaming of the music
        stream.pipe(res);
    })
    .catch((err) => {
        res.status(404).json({code: 404, message: "Music not found"})
    })
})

app.listen(3000, () => console.log(green('➜  ') + bold(cyan('Streamer'))  + ' running in ' + blue(bold(":3000"))));