import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import { pertandinganSchema, NewPertandingan, PesertaComplete } from "~/schema";
import ServicePertandingan from "~/actions/pertandingan";
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

import PesertaCombobox from "./peserta-comobobox";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function AddPeserta({
  kegiatan_id,
  peserta,
}: {
  kegiatan_id: string;
  peserta: PesertaComplete[];
}) {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof pertandinganSchema>>({
    resolver: zodResolver(pertandinganSchema),
    defaultValues: {
      gelanggang: "",
      sudut_biru_id: "",
      sudut_merah_id: "",
      kegiatan_id,
    },
  });

  const pertandinganMutation = useMutation({
    mutationKey: ["add-pertandingan"],
    mutationFn: ServicePertandingan.create,
    onSuccess: () => {
      toast.success(`pertandingan berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["pertandingan"] });
    },
    onError: () => {
      toast.error("pertandingan gagal ditambahkan");
    },
  });

  function onSubmit(values: NewPertandingan) {
    pertandinganMutation.mutate(values);
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
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Pertandingan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Pertandingan</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="gelanggang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gelanggang</FormLabel>
                  <FormControl>
                    <Input placeholder="gelanggang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sudut_biru_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sudut biru</FormLabel>
                  <PesertaCombobox
                    form={form}
                    sudut={field.name}
                    peserta={peserta}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sudut_merah_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sudut Merah</FormLabel>
                  <PesertaCombobox
                    form={form}
                    sudut={field.name}
                    peserta={peserta}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={pertandinganMutation.isPending}>
                {pertandinganMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPeserta;
