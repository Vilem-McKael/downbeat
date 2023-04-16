const Project = require('../../models/project.js');

module.exports = {
    createProject
}

async function createProject(req, res) {
    try {
        const project = Project.create(req.body);
        console.log(req.body, project);
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}