import { fetchFromAPI } from "../api";

export default class AuthService {
  login = (email, password) => {
    return fetchFromAPI("POST", "login", {
      email,
      password
    });
  };

  logout = id => {
    return fetchFromAPI("POST", "logout", {
      id
    });
  };

  // Make an api call to some /logged-in endpoint
  // If not logged in clear the cookies etc.
  //
  // TODO: Lookup how to do this properly
  isLoggedIn = async userId => {
    console.log(`checking if ${userId} is logged in...`);

    try {
      const rsp = await fetchFromAPI("POST", "logged-in", {});
      console.log("rsp:", rsp);
      return true;
    } catch (err) {
      console.log("err:", err);
    }
    console.log("finished");
    return false;
  };
}
