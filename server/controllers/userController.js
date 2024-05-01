let User = require("../models/User");
const path = require("path");
const jwt = require("jsonwebtoken");

exports.signUp = async (req,res)=>{
    try {
        console.log(req.body);

        let user = new User(req.body);
        let result = await user.signUp();
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            role: result.role,
            id: result._id,
        };

        const token = jwt.sign(data, jwtSecretKey);
        res.status(200).json({ message: "user added", userId : data._id, token: token , role: data.role, user: result.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.signIn = async (req,res)=>{
    console.log(req.body);
    let user = new User(req.body);
    user
        .signIn()
        .then(function (result) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                role: result.role,
                id: result._id,
            };

            const token = jwt.sign(data, jwtSecretKey);
            console.log({ token: token, role: result.role, id: result._id });
            res.json({ token: token, role: result.role, id: result._id, user: result.user });
        })
        .catch(function (e) {
            console.log(e);
        });
}