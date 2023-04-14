import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
    
    // what type of HTTP request we are replicating
    const options = { method };

    // if we included a specified payload (most likely for token auth)
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }

}