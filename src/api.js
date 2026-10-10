const API_URL = 'http://127.0.0.1:8000/api/v1';

// api helper function (header, body)
async function apiRequest(path, options = {}) {
    //header
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // response
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message) || 'Request failed.';
    }

    return data;
}

export function login(credentials){
    return apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}