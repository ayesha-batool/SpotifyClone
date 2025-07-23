
import { v2 as cloudinary } from 'cloudinary';
import albumModel from '../modals/albumModel.js';

// Add a new album
const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColor } = req.body;

        console.log("Uploaded file:", req.file); // ✅ Should NOT be undefined now

        if (!req.file) {
            return res.status(400).json({ message: "Album cover image is required" });
        }

        // Upload to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image"
        });

        const albumData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        };

        const album = new albumModel(albumData);
        await album.save();

        res.status(201).json({ message: "Album added successfully", album });
    } catch (error) {
        console.error("Error adding album:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// List all albums
const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.json({ success: true, albums: allAlbums });
    } catch (error) {
        res.json({ success: false });
    }
};

// Remove an album by ID
const removeAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const deletedAlbum = await albumModel.findByIdAndDelete(albumId);
        if (deletedAlbum) {
            console.log(`Album removed from MongoDB: _id=${deletedAlbum._id}, name=${deletedAlbum.name}`);
            res.json({ success: true, message: 'Album removed successfully', album: deletedAlbum });
        } else {
            res.status(404).json({ success: false, message: 'Album not found' });
        }
    } catch (error) {
        console.error('Error removing album:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { addAlbum, listAlbum, removeAlbum };
