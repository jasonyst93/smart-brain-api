const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'dcce88c1a50748bd905d815724701b4c'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const id = req.body.id;
    db('users').where('id', '=', id)  //db.id  equal=  id(from req.body)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries) //return "3" not {entries:'3'}
        })
        .catch(err => res.status(400).json('unable'))
}

module.exports = {
    handleImage,
    handleApiCall
}