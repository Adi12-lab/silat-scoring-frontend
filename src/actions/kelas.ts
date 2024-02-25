import { axiosInstance } from "~/lib/utils";
import { NewKelas } from "~/schema";
class ServiceKelas {
  async create(payload: NewKelas) {
    return axiosInstance.post("/kelas", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get("/kelas").then((data) => data.data);
  }
}
export default new ServiceKelas();
