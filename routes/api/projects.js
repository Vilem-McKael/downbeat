// routes/api/users.js

const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/api/projects');

// POST /api/projects

router.post('/create', projectsCtrl.createProject);

module.exports = router;