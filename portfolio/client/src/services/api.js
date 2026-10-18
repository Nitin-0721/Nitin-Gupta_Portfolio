import axios from 'axios';

// Resolve and sanitize backend URL
const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000';

let cleanBaseUrl = rawApiUrl.trim().replace(/\/+$/, '');
if (!cleanBaseUrl.endsWith('/api')) {
  cleanBaseUrl = `${cleanBaseUrl}/api`;
}

const api = axios.create({
  baseURL: cleanBaseUrl,
  timeout: 60000, // 60s accommodates Render free-tier cold-starts
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with automatic retry for GET requests on cold-start timeout
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const isTimeout = error.code === 'ECONNABORTED' || (error.message && error.message.toLowerCase().includes('timeout'));
    const isNetworkError = !error.response && error.message && error.message.toLowerCase().includes('network');

    // Auto-retry once for GET requests that encounter cold start timeouts
    if (config && config.method?.toLowerCase() === 'get' && !config._retried && (isTimeout || isNetworkError)) {
      config._retried = true;
      // Wait 3 seconds for backend container to finish spinning up
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return api(config);
    }

    let message = error.response?.data?.message;
    if (!message) {
      if (isTimeout) {
        message = 'Server is waking up from standby (Render free tier). Please retry in a few moments.';
      } else if (isNetworkError) {
        message = 'Unable to reach backend server. Please verify network connectivity and backend URL.';
      } else {
        message = error.message || 'API request failed';
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default api;