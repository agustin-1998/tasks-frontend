export const apiCall = async ({ route, data = null, method = 'GET', token = null }) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;
  
    const headers = {
      'Authorization': `Bearer ${token ?? localStorage.getItem('auth_token')}`,
      'Content-Type': 'application/json'
    };
  
    const options = {
      method: method,
      headers: headers,
    };
  
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }
  
    try {
      const response = await $fetch(`${apiUrl}/${route}`, options);
      return response;
    } catch (error) {
      console.error('API call failed', error);
      throw error;
    }
  };
  