import axios from "axios";

// Good error handling tips here:
// https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/

export class APIError {
  constructor({ data, status, statusText }) {
    this.data = data;
    this.status = status;
    this.statusText = statusText;
  }
}

// Can use the Github openAPI to test:
// "https://api.github.com/users/nazwhale/repos"
export function getRepos() {
  const apiUrl = `${process.env.REACT_APP_API_URL}/repos`;

  return axios
    .get(apiUrl)
    .then(res => res.data)
    .catch(err => console.error(err));
}

export function fetchFromAPI(method, path, params) {
  const url = `${process.env.REACT_APP_API_URL}${path}`;

  return axios({
    method,
    url,
    data: JSON.stringify(params),
    withCredentials: true
  }).catch(error => {
    // Handle unauthenticated request
    //
    // Not sure how best to handle both here and in my protected route 🤔
    // Current plan is a bit jank, as we'd have two bits of code trying to
    // do the same redirect.
    if (error.response != null && error.response.status === 401) {
      window.location.pathname = "/login";
    } else {
      throw error;
    }
  });
}
