const User = require('../models/users');
const List = require('../models/lists');
const Review = require('../models/reviews');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const list = await List.find({ userId: user._id });

        // Menggunakan agregasi untuk mendapatkan review dengan jumlah like dan dislike
        const reviews = await Review.aggregate([
            { $match: { userId: user._id } },
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

        // Menyusun respons berdasarkan data yang tersedia
        return res.status(200).json({
            username: user.username,
            displayName: user.displayName,
            bio: user.bio,
            list: list || [],
            reviews: reviews || [],
            message: 'User data fetched successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error });
    }
}

module.exports = {
    getUserByUsername,
    updateUser
};