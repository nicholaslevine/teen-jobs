const prisma = require('../db/prisma');
const bcrypt = require('bcryptjs');
const generateUserToken = require('../utils/generateUserToken');

const userController = {
    getJobOffers: async (req, res, next) => {
        try {
            const availableJobs = await prisma.job.findMany({
                where: {
                    taken: false,
                }
            });
            if (!availableJobs){
                return res.status(200).json([])
            };
            res.status(200).json(availableJobs);
        } catch (error) {
            res.status(500).json({error: "Internal server error"});
        }
    },
    createUser: async (req, res, next) => {
        try {
        const {fullName, username, password, description} = req.body;

        if (!fullName || !username || !password || !description){
            return res.status(400).json({error: "Please fill out all fields"});
        }

        const user = await prisma.teen.findUnique({
            where: {
                username
            }
        });

        if (user){
            return res.status(400).json({error: "Username already taken"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            fullName, 
            username,
            password: hashedPassword,
            description,
        }

        const createdUser = await prisma.teen.create({
            data: newUser
        });

        if (createdUser) {
            generateUserToken(createdUser.id, res);

            return res.status(201).json(newUser);
        }
        else {
            return res.status(400).json({error: "Invalid data types"});
        }     
        } catch (error) {
            console.error("Error when creating user", error);
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const {username, password} = req.body;

            const user = await prisma.teen.findUnique({
                where: {
                    username,
                }
            });
    
            if (!user){
                return res.status(400).json({error: "Invalid username"});
            };
    
            const match = await bcrypt.compare(password, user.password);
    
            if (!match) {
                return res.status(404).json({error: "Incorrect password"})
            }
    
            generateUserToken(user.id, res);
            return res.status(200).json({
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                description: user.description,
            })
            
        } catch (error) {
            console.log("Error logging in", error);
            next(error);
            
        }
    },
    logout: async (req, res, next) => {
        try {
            res.cookie("jwt", "", {maxAge : 0});
            return res.status(200).json("Logged out successfully");
        } catch (error) {
            console.error("Error logging out", error);
            next(error);
        }
    },
    info: async (req, res, next) => {
        try {
            const userInfo = await prisma.teen.findUnique({
                where: {
                    id: req.user.id
                },
                select: {
                    fullName: true,
                    username: true,
                    jobs: true,
                    description: true,
                }
            });
            if (!userInfo) {
                return res.status(404).json({error: "User not found"});
            };

            return res.status(200).json({
                fullName: userInfo.fullName,
                username: userInfo.username,
                description: userInfo.description,
                jobs: userInfo.jobs
            })
            
        } catch (error) {
            console.log("Error getting user info", error);
            next(error);
        }
    },
    addJob: async (req, res, next) => {
        try {
            const {jobId} = req.params;
            const userId = req.user.id;

            const job = await prisma.job.findUnique({
                where: {
                    id: jobId,
                    taken: false,
                }
            });

            if (!job){
                return res.status(404).json({error: "Job not found or already taken"});
            };

            const updatedJob = await prisma.job.update({
                where: {id: jobId},
                data: {
                    taken: true,
                    teen: {
                        connect: {id : userId}
                    }
                }
            });

            return res.status(200).json(updatedJob);
        } catch (error) {
            console.error("error adding job", error);
            next(error);
        }
    }

};

module.exports = userController;