import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import { kegiatanSchema } from "~/schema";
import ServiceKegiatan from "~/actions/kegiatan";
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

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";

function AddKegiatan() {
  const queryClient = useQueryClient();
  //   const [date, setDate] = useState<Date | undefined>(new Date());

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof kegiatanSchema>>({
    resolver: zodResolver(kegiatanSchema),
    defaultValues: {
      nama: "",
      tanggal: new Date(),
    },
  });

  const kegiatanMutation = useMutation({
    mutationKey: ["add-kegiatan"],
    mutationFn: ServiceKegiatan.create,
    onSuccess: (payload) => {
      toast.success(`Kegiatan ${payload.nama} berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({queryKey: ['kegiatan']})
    },
    onError: () => {
      toast.error("Kegiatan gagal ditambahkan");
    },
  });

  function onSubmit(values: z.infer<typeof kegiatanSchema>) {
    kegiatanMutation.mutate(values);
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
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Kegiatan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah kegiatan</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kegiatan</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Kegiatan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Kegiatan</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={kegiatanMutation.isPending}>
                {kegiatanMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddKegiatan;
