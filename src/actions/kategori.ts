import { axiosInstance } from "~/lib/utils";
import { NewKategori } from "~/schema";
class ServiceKategori {
  async create(payload: NewKategori) {
    return axiosInstance.post("/kategori", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get("/kategori").then((data) => data.data);
  }
}
export default new ServiceKategori();
