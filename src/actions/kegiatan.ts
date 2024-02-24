import { axiosInstance } from "~/lib/utils";
import { z } from "zod";
import { kegiatanSchema } from "~/schema";
class ServiceKegiatan {
  async create(payload: z.infer<typeof kegiatanSchema>) {
    return axiosInstance.post("/kegiatan", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get("/kegiatan").then((data) => data.data);
  }
}
export default new ServiceKegiatan();
