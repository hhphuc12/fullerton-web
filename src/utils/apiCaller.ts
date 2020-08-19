import LocalStorage from "./localStorage";

enum apiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
};

const callApi = (endpoint: string, method?: string, data?: object) => {
  const config = {
    method: method || apiMethod.GET,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LocalStorage.getAccessToken() || '',
    },
    body: JSON.stringify(data),
  };
  return fetch(process.env.REACT_APP_API_SERVER + endpoint, config)
    .then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      }
      throw res.statusText;
    });
};

export { callApi, apiMethod };
