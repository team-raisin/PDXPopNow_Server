const { Router } = require('express');
const Artist = require('../models/Artist');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      artistName,
      contact, 
      email,
      img,
      website,
      facebook,
      twitter,
      instagram,
      bandcamp,
      soundcloud,
      youtube,
      vimeo,
      genre,
      description
    } = req.body;
    Artist
      .create({  
        artistName,
        contact, 
        email,
        img,
        website,
        facebook,
        twitter,
        instagram,
        bandcamp,
        soundcloud,
        youtube,
        vimeo,
        genre,
        description
      })
      .then(artist => res.send(artist))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Artist
      .find()
      .lean()
      .then(artists => res.send(artists))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Artist
      .findById(id)
      .then(foundArtist => {
        if(!foundArtist) {
          return new HttpError(404, `no artist found with id: ${id}`);
        }
        res.send(foundArtist);
      })
      .catch(next);
  });
