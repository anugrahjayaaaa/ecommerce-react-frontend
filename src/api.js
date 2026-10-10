// Same-origin: Vite proxies these paths to Laravel, so the session cookie
// is never a cross-site cookie.
const API_URL = '/api/v1';

// Laravel encrypts the XSRF-TOKEN cookie and decrypts the X-XSRF-TOKEN header,
// so the raw cookie value must be echoed back verbatim.
function readCookie(name) {
    const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));

    return match ? decodeURIComponent(match[2]) : null;
}

// Establishes the session cookie and the XSRF-TOKEN cookie. Must resolve before
// any state-changing request, otherwise Laravel rejects it with 419.
export function ensureCsrfCookie() {
    return fetch('/sanctum/csrf-cookie', { credentials: 'include' });
}

async function apiRequest(path, options = {}) {
    const isFormData = options.body instanceof FormData;
    const method = (options.method || 'GET').toUpperCase();

    const headers = {
        Accept: 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
    };

    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        const xsrfToken = readCookie('XSRF-TOKEN');

        if (xsrfToken) {
            headers['X-XSRF-TOKEN'] = xsrfToken;
        }
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        credentials: 'include',
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || 'Request failed.');
    }

    return data;
}

export function me() {
    return apiRequest('/me');
}

export function login(credentials) {
    return apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

export function logout() {
    return apiRequest('/logout', { method: 'POST' });
}

// categories endpoint
export function getCategories() {
    return apiRequest('/categories');
}

export function createCategory(category) {
    return apiRequest('/categories', {
        method: 'POST',
        body: JSON.stringify(category),
    });
}

export function updateCategory(id, category) {
    return apiRequest(`/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(category),
    });
}

export function deleteCategory(id) {
    return apiRequest(`/categories/${id}`, {
        method: 'DELETE',
    });
}

// products endpoint
export function getProducts() {
    return apiRequest('/products');
}

export function createProduct(product) {
    return apiRequest('/products', {
        method: 'POST',
        body: product,
    });
}

export function updateProduct(id, product) {
    product.append('_method', 'PUT');

    return apiRequest(`/products/${id}`, {
        method: 'POST',
        body: product,
    });
}

export function deleteProduct(id) {
    return apiRequest(`/products/${id}`, {
        method: 'DELETE',
    });
}