const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/users");

mongoose.connect('mongodb://127.0.0.1/db_rpl')
    .then((result) => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console(err)
    });

const seedAdmin = [
    {
        username: "admin1",
        password: "123admin",
        displayName: "LebahGanteng",
        bio: "Admin 1 Bio",
        role: "admin"
    },
    {
        username: "admin2",
        password: "123admin",
        displayName: "spiderMan",
        bio: "Admin 2 Bio",
        role: "admin"
    }
]

const hashPasswords = async (admins) => {
    for (let admin of admins) {
        admin.password = await bcrypt.hash(admin.password, 10); // Hash password with salt rounds = 10
    }
    return admins;
};

hashPasswords(seedAdmin).then((hashedAdmins) => {
    User.insertMany(hashedAdmins).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
});
