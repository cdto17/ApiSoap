const express = require('express');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();

const router = express.Router();

// Datos simulados para las canciones
let songs = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', year: 1975, coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png' },
    { id: 2, title: 'Imagine', artist: 'John Lennon', year: 1971, coverImage: 'https://upload.wikimedia.org/wikipedia/en/6/69/ImagineCover.jpg' },
    { id: 3, title: 'Hotel California', artist: 'Eagles', year: 1976, coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg' },
];

// Obtener todas las canciones
router.get('/songs', (req, res) => {
    const xmlSongs = songs.map(song => ({
        song: {
            id: song.id,
            title: song.title,
            artist: song.artist,
            year: song.year,
            coverImage: song.coverImage
        }
    }));
    const xml = builder.buildObject({ songs: xmlSongs });
    res.type('application/xml');
    res.send(xml);
});




module.exports = router;
