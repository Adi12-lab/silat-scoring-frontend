import { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { PesertaComplete } from "~/schema";
import { UseFormReturn } from "react-hook-form";

type Sudut = "sudut_merah_id" | "sudut_biru_id";

interface PesertaComboboxProps {
  peserta: PesertaComplete[];
  form: UseFormReturn<{
    sudut_merah_id: string;
    sudut_biru_id: string;
    gelanggang: string;
    kegiatan_id: string;
  }>;
  // onChange: (sudutinput: Sudut, id:) => void;
  sudut: Sudut;
  // pesertaSelected: PesertaComplete;
  // setPesertaSelected: (peserta: PesertaComplete) => void;
}

function PesertaCombobox({ peserta, form, sudut }: PesertaComboboxProps) {
  const [pesertaSelected, setPesertaSelected] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between"
            // !.value && "text-muted-foreground"
          )}
        >
          {pesertaSelected
            ? peserta.find((ps) => ps.nama === pesertaSelected)?.nama
            : "Pilih peserta"}
          {/* {pesertaSelected
            ? peserta.find((ps) => ps.nama === pesertaSelected.nama)?.nama
            : "pilih peserta"} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="cari peserta" />
          <CommandEmpty>Peserta tidak ditemukan</CommandEmpty>
          <CommandGroup>
            {peserta.map((ps) => (
              <CommandItem
                value={ps.nama}
                key={ps.id}
                onSelect={(currentPeserta) => {
                  setPesertaSelected(currentPeserta === ps.nama ? "" : ps.nama);
                  form.setValue(sudut, ps.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    ps.nama === pesertaSelected ? "opacity-100" : "opacity-0"
                  )}
                />
                {ps.nama} | {ps.kategori.nama} - {ps.kelas.nama}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default PesertaCombobox;
