import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import { pesertaSchema, Kelas, Kategori, NewPeserta } from "~/schema";
import ServicePeserta from "~/actions/peserta";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { generateString } from "~/lib/utils";

function AddPeserta({
  kegiatan_id,
  kelasData,
  kategoriData,
}: {
  kegiatan_id: string;
  kategoriData: Kategori[];
  kelasData: Kelas[];
}) {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof pesertaSchema>>({
    resolver: zodResolver(pesertaSchema),
    defaultValues: {
      nama: "",
      daerah: "",
      perguruan: "",
      kegiatan_id, //bisa karena pertama kali ter render akan melihat props nya
      kelas_id: 0,
      kategori_id: 0,
    },
  });

  const pesertaMutation = useMutation({
    mutationKey: ["add-peserta"],
    mutationFn: ServicePeserta.create,
    onSuccess: (payload) => {
      toast.success(`Peserta ${payload.nama} berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["peserta"] });
    },
    onError: () => {
      toast.error("Peserta gagal ditambahkan");
    },
  });

  function onSubmit(values: NewPeserta) {
    pesertaMutation.mutate(values);
    // console.log(values);
  }
  return (
    <Dialog
      open={openDialog}
      onOpenChange={() => {
        form.reset();
        setOpenDialog(!openDialog);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          size="lg"
          className="text-lg mt-4 float-right"
        >
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Peserta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Peserta</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Peserta</FormLabel>
                  <FormControl>
                    <Input placeholder="nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="perguruan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perguruan</FormLabel>
                  <FormControl>
                    <Input placeholder="perguruan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="daerah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daerah</FormLabel>
                  <FormControl>
                    <Input placeholder="daerah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kelas_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={kelasData[0].id} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kelasData.map((item: Kelas) => (
                        <SelectItem
                          key={generateString(5)}
                          value={item.id.toString()}
                        >
                          {item.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kategori_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={kategoriData[0].id}
                          placeholder={kategoriData[0].nama}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kategoriData.map((item: Kategori) => (
                        <SelectItem
                          key={generateString(5)}
                          value={item.id.toString()}
                        >
                          {item.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={pesertaMutation.isPending}>
                {pesertaMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPeserta;
