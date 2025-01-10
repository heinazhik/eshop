interface ApiFetchOptions extends RequestInit {
  requireAuth?: boolean;
}

let authToken: string | null = null;

const setAuthToken = (token: string) => {
  authToken = token;
};

const apiFetch = async (url: string, options: ApiFetchOptions = {}) => {
  const headers = new Headers(options.headers || {});
  
  if (options.requireAuth !== false && authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (response.status === 401) {
    // Handle unauthorized access
    window.location.href = '/login';
    return;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export { apiFetch as default, setAuthToken };
