import sendRequest from './send-request';

const BASE_URL = '/api/projects'

export function createProject(newProjectData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', newProjectData)
}

export function getAll() {
    return sendRequest(`${BASE_URL}/get-all`);
}

export function getProjectById(projectId) {
    return sendRequest(`${BASE_URL}/get-one`, 'POST', projectId);
}

export function deleteProject(projectId) {
    return sendRequest(`${BASE_URL}/delete`, 'POST', projectId);
}