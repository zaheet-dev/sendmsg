const express = require('express')
const Post = require('../models/post')
const router = new express.Router()
const multer = require("multer");
const checkAuth = require("../middlewares/check-auth");
const sendmsg = require("./sendmsg");
require('dotenv').config();



const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];

        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});






router.post("",
    checkAuth,
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        const url = req.protocol + "://" + req.get("host")
        const post = new Post({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            imagePath: url + "/images/" + req.file.filename,
            creator: req.userData.userId,
        })
        post.save().
        then(post => {
                if (post) {
                    res.status(201).json({
                        message: "Post added successfully",
                        post: {
                            ...post,
                            id: post._id
                        }
                    })
                } else {
                    res.status(500).json({ message: "Error Adding Post" });
                }

            })
            .catch(e => {})
    })



router.put(
    "/:id",
    checkAuth,
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename
        }

        const post = new Post({
            _id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            imagePath: imagePath,
            creator: req.userData.userId
        });
        Post.updateOne({ _id: req.params.id, creator: req.userData.userId },
            post
        ).then(result => {
            if (result) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(500).json({ message: "Error Upating Post" });
            }
        });
    }
);



router.get("/mypost",
    checkAuth,
    (req, res, next) => {
        Post.find({ creator: req.userData.userId }).then(post => {
                if (post) {
                    res.status(200).json({
                        message: "Posts fetched successfully!",
                        posts: post
                    });
                } else {
                    res.status(404).json({ message: "Post not found!" });
                }
            })
            .catch(e => {});
    });


router.get("", (req, res, next) => {
    Post.find().then(documents => {
        if (documents) {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        } else {
            res.status(404).json({ message: "Post not found!" });
        }

    });
});
router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
        result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Deletion successful!" });
            } else {
                return res.status(401).json({ message: "Not authorized!!" });
            }
        }
    );
});
var oldotp;

router.put(
    "/sendmsg/:id",
    checkAuth,
    async function(req, res, next) {
        const post = new Post({
            _id: req.body.id,
            otps: req.body.otps,
            otpsent: req.body.otpsent,
            creator: req.userData.userId
        });
        console.log("here", post)

        var olddata = await Post.findById(req.body.id).then(post => {
            if (post) {
                console.log("in post", post.otps);
                oldotp = post.otps
                phone = post.phone
                console.log("old", oldotp)
                return {
                    oldotp,
                    phone
                };
            } else {
                res.status(404).json({ message: "Post not found!" });
            }
        });
        console.log(post.otps);
        console.log(olddata.phone);
        var x = await sendmsg.sendMsg(post.otps, olddata.phone);
        console.log("dsad", olddata.oldotp)
        console.log("aaaa", post.otps)
        console.log("dsad", olddata.phone)
        if (olddata.oldotp !== undefined) {
            console.log("inside old")
            post.otps = post.otps + ',' + olddata.oldotp;
        }
        console.log("new otp", post);
        Post.updateOne({ _id: req.params.id, creator: req.userData.userId },
            post
        ).then(result => {
            if (result) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(500).json({ message: "Error Upating Post" });
            }
        });
    }
);
module.exports = router