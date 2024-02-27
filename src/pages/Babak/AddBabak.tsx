import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusSquare } from "lucide-react";

import { NewBabak, babakSchema } from "~/schema";
import ServiceBabak from "~/actions/babak";
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
import { Input } from "~/components/ui/input";

function AddBabak({ pertandingan_id }: { pertandingan_id: number }) {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof babakSchema>>({
    resolver: zodResolver(babakSchema),
    defaultValues: {
      no: 0,
      pertandingan_id,
      status: "belum_dimulai",
      timer: 0,
    },
  });

  const babakMutation = useMutation({
    mutationKey: ["add-babak"],
    mutationFn: ServiceBabak.create,
    onSuccess: (payload) => {
      toast.success(`Babak ${payload.no} berhasil ditambahkan`);
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["babak"] });
    },
    onError: () => {
      toast.error("Babak gagal ditambahkan");
    },
  });

  function onSubmit(values: NewBabak) {
    babakMutation.mutate(values);
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
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Babak
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Babak</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Babak</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="no"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timer (detik)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="babak"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={babakMutation.isPending}>
                {babakMutation.isPending ? "Menyimpan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBabak;
