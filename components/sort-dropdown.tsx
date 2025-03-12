"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SortDropdown({
  value,
  onValueChange,
}: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">En vedette</SelectItem>
        <SelectItem value="newest">Plus récents</SelectItem>
        <SelectItem value="price-low">Prix: Croissant</SelectItem>
        <SelectItem value="price-high">Prix: Décroissant</SelectItem>
      </SelectContent>
    </Select>
  );
}
