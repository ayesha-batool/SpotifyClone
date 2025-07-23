// import { v2 as cloudinary } from 'cloudinary';
// import songModel from '../modals/songModal.js';
// const addSong = async (req, res) => {
//     try {
//         const name = req.body.name
//         const desc = req.body.desc
//         const album = req.body.album
//         const audioFile = req.files.audio[0]
//         const imageFile = req.files.image[0]
//         const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
//             resource_type: "video"
//         });
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//             resource_type: "image"
//         });
//         const duration=`${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;
//         const songData={
//             name,desc,album,image:imageUpload.secure_url,
//             file:audioUpload.secure_url,
//             duration
//         }
//         const song = await songModel(songData);
//         await song.save();
//         res.status(201).json({ message: "Song added successfully", song });
//         console.log(name,desc,album,audioUpload, imageUpload);
//     }
//     catch (error) {
//         console.error("Error adding song:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }
// const listSong = async (req, res) => {

// }
// export { addSong, listSong };
import { v2 as cloudinary } from 'cloudinary';
import songModel from '../modals/songModal.js';

const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;

        // Fix: Handle missing files safely
        if (!req.files || !req.files.audio || !req.files.image) {
            return res.status(400).json({ message: "Audio and Image files are required" });
        }

        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        // Upload files to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: "video"
        });

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        });

        // Calculate audio duration
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        // Prepare song data
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        // Save to DB
        const song = new songModel(songData);
        await song.save();
        console.log(`Song added to MongoDB: _id=${song._id}, name=${song.name}`);

        res.status(201).json({ message: "Song added successfully", song });
        console.log({ name, desc, album, audioUpload, imageUpload });

    } catch (error) {
        console.error("Error adding song:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        console.error("Error listing songs:", error);
        res.status(500).json({ success: false, songs: [], message: "Failed to fetch songs" });
    }
};


const removeSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const deletedSong = await songModel.findByIdAndDelete(songId);
        if (deletedSong) {
            console.log(`Song removed from MongoDB: _id=${deletedSong._id}, name=${deletedSong.name}`);
            res.json({ success: true, message: 'Song removed successfully', song: deletedSong });
        } else {
            res.status(404).json({ success: false, message: 'Song not found' });
        }
    } catch (error) {
        console.error('Error removing song:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { addSong, listSong, removeSong };
