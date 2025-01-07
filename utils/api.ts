interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

export const get = <T>(endpoint: string) => apiFetch<T>(endpoint);
export const post = <T>(endpoint: string, body: unknown) =>
  apiFetch<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
export const put = <T>(endpoint: string, body: unknown) =>
  apiFetch<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
export const del = <T>(endpoint: string) =>
  apiFetch<T>(endpoint, { method: 'DELETE' });

export default apiFetch;