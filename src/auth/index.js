import { fetchFromAPI } from "../api";

const LOCAL_STORAGE_USERID_KEY = "userId";

export default class AuthService {
  login = (email, password) => {
    return fetchFromAPI("POST", "login", {
      email,
      password
    }).then(rsp => {
      // setUserId in localStorage then return a promise for the caller to
      // handle
      this.setUserId(rsp.data.user_id);
      return rsp;
    });
  };

  logout = id => {
    return fetchFromAPI("POST", "logout", {
      id
    }).then(rsp => {
      this.clearUserId();
      return rsp;
    });
  };

  // Make an api call to some /logged-in endpoint
  // If not logged in clear the cookies etc.
  //
  // TODO: Lookup how to do this properly
  isLoggedIn = async userId => {
    try {
      await fetchFromAPI("POST", "logged-in", {});
      return true;
    } catch (err) {}
    return false;
  };

  setUserId = userId => {
    localStorage.setItem(LOCAL_STORAGE_USERID_KEY, userId);
  };

  getUserId = () => {
    const idString = localStorage.getItem(LOCAL_STORAGE_USERID_KEY);
    return Number(idString);
  };

  clearUserId = () => {
    localStorage.removeItem(LOCAL_STORAGE_USERID_KEY);
  };
}
