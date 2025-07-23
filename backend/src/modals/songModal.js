import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
})
const songModel = mongoose.models.song || mongoose.model("song", songSchema); //if mongoose model is available with name song then use it otherwise create a new model with name song
export default songModel;