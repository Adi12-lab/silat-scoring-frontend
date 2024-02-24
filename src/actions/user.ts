import { axiosInstance } from "~/lib/utils";
import { z } from "zod";
import { userSchema } from "~/schema";
class ServiceUser {
  async create(payload: z.infer<typeof userSchema>) {
    return axiosInstance.post("/user", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get("/user").then((data) => data.data);
  }
}
export default new ServiceUser();
