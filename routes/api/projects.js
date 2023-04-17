// routes/api/users.js

const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/api/projects');

// /api/projects

router.post('/create', projectsCtrl.createProject);

router.get('/get-all', projectsCtrl.getAll);

router.post('/get-one', projectsCtrl.getOne);

router.post('/delete', projectsCtrl.deleteOne);

// api/projects/add-track
router.post('/:id/add-track', projectsCtrl.addTrack);

module.exports = router;