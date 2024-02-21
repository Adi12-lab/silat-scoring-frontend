import { axiosInstance } from "~/lib/utils";
import { User } from "~/schema";
class ServiceAuth {
  login(payload: User) {
    return axiosInstance.post("/auth/login", payload, {});
  }
  register(payload: User) {
    return axiosInstance.post("/auth/register", payload);
  }
  isAuth() {
    return axiosInstance.post("/auth/is-auth");
  }
  isNotAuth() {
    return axiosInstance.post("/auth/is-not-auth");
  }
  logout() {
    return axiosInstance.post("/auth/logout");
  }
}
export default new ServiceAuth();
