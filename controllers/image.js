const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "e93311aba1c84ea59dc7ba68a9e4b2b0",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      for (let i = 0; i < response.outputs[0].data.regions.length; i++) {
        this.displayFaceBox(this.calculateFaceLocation(response, i));
      }
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Unable to get entries."));
};

module.exports = {
  handleImage,
  handleApiCall,
};