import axios from 'axios';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});

export async function fetchStops() {
  const response = await apiClient.get('/stops');
  return response.data;
}
