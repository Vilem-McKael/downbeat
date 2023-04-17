const Project = require('../../models/project.js');

module.exports = {
    createProject,
    getAll
}

async function createProject(req, res) {
    try {
        req.body.user = req.user._id;
        const project = await Project.create(req.body);
        console.log('req.body', req.body, 'project', project);
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function getAll(req, res) {
    try {
        const projects = await Project.find({user: req.user._id});
        console.log(projects);
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}