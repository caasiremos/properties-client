import Axios, { isAxiosError } from 'axios';
import { useStorage } from '@vueuse/core';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

const getToken = () => {
  const token = useStorage('ACCESS_TOKEN');
  return token.value ?? null;
};

axios.interceptors.request.use((config) => {
  const token = getToken();
  return {
    ...config,
    headers: {
      ...config.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});


axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
	try {
		const { response } = error;
		if (response.status === 401) {
			localStorage.removeItem('ACCESS_TOKEN');
		}
	} catch (error) {
		console.log(error);
	}
	throw error;
})

export default axios;