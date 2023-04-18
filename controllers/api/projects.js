const { MongoDriverError } = require('mongodb');
const Project = require('../../models/project.js');
const project = require('../../models/project.js');

module.exports = {
    createProject,
    getAll,
    deleteOne,
    getOne,
    addTrack,
    saveProject
}

// PROJECTS

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

async function getOne(req, res) {
    try {
        projectId = req.body.id;
        const project = await Project.find({user: req.user._id, _id: projectId});
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function deleteOne(req, res) {
    try {
        await Project.findOneAndDelete({_id: req.body.projectId});
        res.status(200).json('File deleted.');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function saveProject(req, res) {
    try {
        const projectToUpdate = await Project.findById(req.body._id);
        projectToUpdate.title = req.body.title;
        projectToUpdate.tracks = req.body.tracks;
        projectToUpdate.bpm = req.body.bpm;
        await projectToUpdate.save();
        res.status(200).json('Project saved');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// TRACKS

async function addTrack(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        console.log(req.params.id);
        console.log(project);
        project.tracks.push(req.body);
        const updatedProject = await project.save();
        console.log(updatedProject);
        res.json(updatedProject);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}