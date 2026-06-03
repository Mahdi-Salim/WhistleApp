import { Platform } from 'react-native';

const API_HOST = Platform.OS === 'web'
  ? 'http://localhost:3000'
  : 'http://192.168.43.131:3000';

const API_URL = `${API_HOST}/api/auth`;

const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number = 15000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('الطلب استغرق وقتا طويلا جدا');
    }
    throw error;
  }
};

export const loginRequest = 
async (
    email: string,
    password: string,
) => {
  console.log('[AuthService] Attempting login to:', `${API_URL}/login`);
  console.log('[AuthService] With email:', email);

  const response = await fetchWithTimeout(
    `${API_URL}/login`,
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }
  );

  console.log('[AuthService] Login response status:', response.status);
  
  const data = await response.json();
  console.log('[AuthService] Login response data:', data);

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data.data.token;
};

export const getCurrentUser = 
async (token: string) => {
    console.log('[AuthService] Fetching current user...');
    
    const response = await fetchWithTimeout(
        `${API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    console.log('[AuthService] User response status:', response.status);
    const data = await response.json();
    console.log('[AuthService] User response data:', data);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user');
    }
    return data.data;
};