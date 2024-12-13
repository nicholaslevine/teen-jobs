const prisma = require('../db/prisma');
const generateProviderToken = require('../utils/generateProviderToken');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateUserToken');

const providerController = {
    login: async (req, res, next) => {
        try {
            const {username, password} = req.body;
            
            const provider = await prisma.provider.findUnique({
                where: {
                    username: username,
                }
            });

            if (!provider) {
                return res.status(400).json({error: "Incorrect username"});
            }

            const match = await bcrypt.compare(password, provider.password);

            if (!match){
                return res.status(404).json({error: "Incorrect password"});
            };

            generateToken(provider.id, res);
            return res.status(200).json({
                id: provider.id,
                name: provider.name,
                username: provider.username,
                description: provider.description
            })
            
        } catch (error) {
            console.log("error logging in", error);
            next(error);
        }
    },
    signup: async (req, res, next) => {
        try{
        const {username, password, name, description} = req.body;

        if (!username || !password || !name || !description){
            return res.status(404).json({error: "Please fill out all fields"});
        }

        const provider = await prisma.provider.findUnique({
            where: {
                username
            }
        });

        if (provider) {
            return res.status(400).json({error: "Username already exists"});
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newProvider = {
            username,
            password: hashedPassword,
            name,
            description
        };

        const createdProvider  = await prisma.provider.create({
            data: newProvider
        });

        if (createdProvider) {
            generateProviderToken(createdProvider.id, res);
            return res.status(201).json(newProvider);
        }
        else {
            return res.status(400).json({error: "Invalid data types"});
        }     
        } catch (error) {
            console.error("Error when creating user", error);
            next(error);
        }

    },
    create: async (req, res, next) => {
        try {
            const {name, description} = req.body;

            if (!name || !description) {
                return res.status(400).json({error: "Please provide name and description"});
            }

            const data = {
                name, 
                description,
                taken: false,
                provider: {
                    connect: {id : req.user.id}
                }
            };
            const createdJob = await prisma.job.create({
                data: data,
            });

            if (createdJob) {
                return res.status(201).json(data);
            }
        return res.status(404).json({error: "Invalid data types"});     
        } catch (error) {
            console.error("Error when creating job offer", error);
            next(error);
        }
    },
    getJobs: async (req, res, next) => {
        try {
            const myJobOffers = await prisma.job.findMany({
                where: {
                    providerId: req.user.id
                }
            });
            if (!myJobOffers){
                return res.status(200).json([]);
            }

            res.status(200).json(myJobOffers);
            
        } catch (error) {
            console.log("error looking at jobs", error);
            next(error);     
        }
    },
    logout: async (req, res, next) => {
        try {
            res.cookie("jwt", "", {maxAge: 0});
            return res.status(200).json("Logged out successfully");
        } catch (error) {
            console.log("Error logging out", error);
            next(error);
        }
    }

}

module.exports = providerController;