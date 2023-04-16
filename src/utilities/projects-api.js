import sendRequest from './send-request';

const BASE_URL = '/api/projects'

export function createProject(userData) {
    return sendRequest(BASE_URL, 'POST', userData)
}
