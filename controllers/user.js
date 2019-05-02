const bcrypt = require("bcrypt");
const jwt = ("jsonwebtoken");
const User = require("../models/user");

exports.getUser = (req, res, next) => {
    User.findAll()
        .then(user => {
            res.json(user)
        })
        .catch(err => res.json({
            success: false
        }))
};

exports.postUser = (req, res, next) => {
    const {
        Name,
        Username,
        Password
    } = req.body

    if (!Name || !Username || !Password) {
        res.status(400).json({
            msg: "All fields are required"
        })
    } else {
        let hashedPassword;
        User.findOne({
            where: {
                Username
            }
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    msg: "user already exist"
                })
            } else {
                try {
                    const salt = bcrypt.genSaltSync(10);
                    hashedPassword = bcrypt.hashSync(Password, salt)
                } catch (error) {
                    throw error;
                }
                User.create({
                    Name,
                    Username,
                    Password: hashedPassword
                })
                    .then(user => {
                        jwt.sign({
                            id: user.id
                        },
                            process.env.Auth_SECRET_KEY, {
                                expiresIn: "2h"
                            },
                            (err, token) => {
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        Name: user.Name,
                                        Username: user.Username,
                                        Password: user.Password
                                    }
                                })
                            });
                    }).catch(err => res.status(500).json({
                        msg: "An error occured",
                        error: err
                    }))
            }
        }).catch(err => next(err))
    }
};