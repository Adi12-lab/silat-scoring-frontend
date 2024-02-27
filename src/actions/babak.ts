import { axiosInstance } from "~/lib/utils";
import { NewBabak } from "~/schema";
class ServiceBabak {
  async create(payload: NewBabak) {
    return axiosInstance.post("/babak", payload).then((data) => data.data);
  }
  async all(kegiatan_id: string) {
    return axiosInstance
      .get(`/babak?pertandingan=${kegiatan_id}`)
      .then((data) => data.data);
  }
}
export default new ServiceBabak()