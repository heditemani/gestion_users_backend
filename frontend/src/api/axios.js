import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ================================
// Interceptor Response
// Ila token expira → jdedou automatiquement
// ================================
api.interceptors.response.use(
    (response) => response,  // kol chay behi → rja3 response
    async (error) => {
        const originalRequest = error.config;

        // Token expira?
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh = localStorage.getItem('refresh_token');

                // Tlob token jdid
                const res = await axios.post(
                    'http://localhost:8000/api/users/token/refresh/',
                    { refresh }
                );

                // Khabi token jdid
                localStorage.setItem('access_token', res.data.access);

                // A3wed el request el awela b token jdid
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                return api(originalRequest);

            } catch {
                localStorage.clear();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;