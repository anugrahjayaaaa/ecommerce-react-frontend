const API_URL = 'http://127.0.0.1:8000/api/v1';

// api helper function (header, body)
async function apiRequest(path, options = {}) {
    // add token handle
    const access_token = options.access_token;

    //header
    const isFormData = options.body instanceof FormData;

    const headers = {
        Accept: 'application/json',
        ...(isFormData ? {} : {'Content-Type': 'application/json'}),
        ...options.headers,
    };

    if(access_token){
        headers.Authorization = `Bearer ${access_token}`;
    }

    // response
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Request failed.');
    }

    return data;
}

export function login(credentials){
    return apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

// categories endpoint
export function getCategories(access_token){
    return apiRequest('/categories', {
        access_token
    });
}

export function createCategory(category, access_token){
    return apiRequest('/categories', {
        method: 'POST',
        access_token,
        body: JSON.stringify(category),
    });
}

export function updateCategory(id, category, access_token){
    return apiRequest(`/categories/${id}`, {
        method: 'PUT',
        access_token,
        body: JSON.stringify(category),
    });
}

export function deleteCategory(id, access_token){
    return apiRequest(`/categories/${id}`, {
        method: 'DELETE',
        access_token,
    });
}

// products endpoint
export function getProducts(access_token){
    return apiRequest('/products', {
        access_token
    });
}

export function createProduct(product, access_token){
    return apiRequest('/products', {
        method: 'POST',
        access_token,
        body: product,
    });
}

export function updateProduct(id, product, access_token){
    product.append('_method', 'PUT');

    return apiRequest(`/products/${id}`, {
        method: 'POST',
        access_token,
        body: product,
    });
}

export function deleteProduct(id, access_token){
    return apiRequest(`/products/${id}`, {
        method: 'DELETE',
        access_token,
    });
}
