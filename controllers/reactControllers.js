// controllers/reactionController.js
const Reaction = require("../models/reactions");
const Review = require("../models/reviews");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// POST /reviews/:reviewId/like-dislike
const reactToReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { reaction } = req.body; // "like" atau "dislike"
        const userId = req.user.id;

        // Validasi: User tidak bisa bereaksi ke review miliknya sendiri
        const review = await Review.findById(reviewId);
        if (review.userId.equals(userId)) {
            return res.status(403).json({ error: "Tidak boleh bereaksi ke review sendiri" });
        }

        // Cek apakah user sudah pernah bereaksi
        const existingReaction = await Reaction.findOne({ userId, reviewId });

        // Case 1: User belum pernah bereaksi → Buat reaksi baru
        if (!existingReaction) {
            const newReaction = new Reaction({ userId, reviewId, reaction });
            await newReaction.save();
            return res.json({ message: `Berhasil ${reaction} review` });
        }

        // Case 2: User sudah bereaksi dengan jenis yang sama → Hapus reaksi (toggle)
        if (existingReaction.reaction === reaction) {
            await Reaction.deleteOne({ _id: existingReaction._id });
            return res.json({ message: "Reaksi dihapus" });
        }

        // Case 3: User ganti reaksi (like → dislike atau sebaliknya) → Update reaksi
        existingReaction.reaction = reaction;
        await existingReaction.save();
        res.json({ message: `Reaksi diubah menjadi ${reaction}` });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// controllers/reviewController.js
const getReviewWithReactions = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(reviewId) } },
            {
                $lookup: {
                    from: "reactions", // Nama collection Reaction di MongoDB
                    localField: "_id",
                    foreignField: "reviewId",
                    as: "reactions"
                }
            },
            {
                $set: {
                    like: {
                        $size: {
                            $filter: {
                                input: "$reactions",
                                as: "reaction",
                                cond: { $eq: ["$$reaction.reaction", "like"] }
                            }
                        }
                    },
                    dislike: {
                        $size: {
                            $filter: {
                                input: "$reactions",
                                as: "reaction",
                                cond: { $eq: ["$$reaction.reaction", "dislike"] }
                            }
                        }
                    }
                }
            },
            { $project: { reactions: 0 } } // Sembunyikan array reactions dari output
        ]);

        if (!review[0]) return res.status(404).json({ error: "Review tidak ditemukan" });
        res.json(review[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    reactToReview,
    getReviewWithReactions,
};