const Project = require('../../models/project.js');

module.exports = {
    createProject,
    getAll,
    deleteOne
}

async function createProject(req, res) {
    try {
        req.body.user = req.user._id;
        const project = await Project.create(req.body);
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function getAll(req, res) {
    try {
        const projects = await Project.find({user: req.user._id});
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function deleteOne(req, res) {
    try {
        const project = await Project.findOneAndDelete({_id: req.body.projectId});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}