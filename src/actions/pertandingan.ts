import { axiosInstance } from "~/lib/utils";
import { NewPertandingan } from "~/schema";
class ServicePertandingan {
  async create(payload: NewPertandingan) {
    return axiosInstance
      .post("/pertandingan", payload)
      .then((data) => data.data);
  }
  async all(kegiatan_id: string) {
    return axiosInstance
      .get(`/pertandingan?kegiatan=${kegiatan_id}`)
      .then((data) => data.data);
  }

  async find(pertandingan_id: number) {
    return axiosInstance
      .get("/pertandingan/" + pertandingan_id)
      .then((data) => data.data);
  }
}
export default new ServicePertandingan();
