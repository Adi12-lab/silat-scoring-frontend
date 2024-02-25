import { axiosInstance } from "~/lib/utils";
import { NewPeserta } from "~/schema";
class ServicePeserta {
  async create(payload: NewPeserta) {
    return axiosInstance.post("/peserta", payload).then((data) => data.data);
  }
  async all(kegiatan_id: string) {
    return axiosInstance
      .get(`/peserta?kegiatan=${kegiatan_id}`)
      .then((data) => data.data);
  }
}
export default new ServicePeserta();
