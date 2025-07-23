import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

})
const albumModel = mongoose.models.album || mongoose.model("album", albumSchema); //if mongoose model is available with name song then use it otherwise create a new model with name song
export default albumModel;