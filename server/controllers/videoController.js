const Video = require('../models/videoModel');
const { s3, upload } = require('../utils/s3BucketHelper');



const trainerUploadVideo = async (req, res) => {

    try {
        const trainerId = req.userId;
        const { title, description } = req.body;


        // Use req.files to get the files information
        const file = req.files[0];

        // Upload the video file directly to S3
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: Date.now().toString() + '-' + file.originalname,
            Body: file.buffer,
            ACL: 'public-read',
        };

        const s3Response = await s3.upload(params).promise();
        const fileUrl = s3Response.Location;

        // Save video details to the database
        const video = new Video({ title, description, fileUrl, trainerId });
        await video.save();

        res.status(201).json({
            message: 'Video uploaded successfully!',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error in uploading video or saving to the database',
        });
    }
};


const trainerGetVideos = async (req, res) => {

    try {
        const trainerId = req.userId;

        // Fetch videos that belong to the specific trainer
        const videos = await Video.find({ trainerId }).populate('trainerId','fullName');

        if (!videos || videos.length === 0) {
            return res.status(404).json({
                message: 'No videos found for this trainer',
            });
        }

        res.status(200).json({
            message: 'Videos fetched successfully!',
            videos: videos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error in fetching videos',
        });
    }
};



const userGetAllVideos = async (req,res) => {

    try {
        // Fetch all the video details from the database
        const videos = await Video.find({});

        if (!videos) {
            return res.status(404).json({
                message: 'No videos found',
            });
        }

        res.status(200).json({
            message: 'Videos fetched successfully!',
            videos: videos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error in fetching videos',
        });
    }
}



const userGetVideoClass = async (req,res) => {

    try {
        // Fetch the video details from the database
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                message: 'Video not found',
            });
        }

        res.status(200).json({
            message: 'Video fetched successfully!',
            video: video,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error in fetching video',
        });
    }
}


module.exports = {
    trainerUploadVideo,
    userGetAllVideos,
    userGetVideoClass,
    trainerGetVideos

}