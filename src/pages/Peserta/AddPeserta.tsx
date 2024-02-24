import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import { pesertaSchema, Kelas, Peserta } from "~/schema";
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

function AddPeserta({ kegiatan_id }: { kegiatan_id: string }) {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof pesertaSchema>>({
    resolver: zodResolver(pesertaSchema),
    defaultValues: {
      nama: "",
      daerah: "",
      kelas: "C",
      perguruan: "",
      kegiatan_id, //bisa karena pertama kali ter render akan melihat props nya
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

  function onSubmit(values: Peserta) {
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
              name="kelas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={Kelas[0]} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Kelas.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
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
