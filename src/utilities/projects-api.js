import sendRequest from './send-request';

const BASE_URL = '/api/projects'

export function createProject(newProjectData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', newProjectData)
}

export function getAll() {
    return sendRequest(`${BASE_URL}/get-all`);
}