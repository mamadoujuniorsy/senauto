import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeriesSelectorProps {
  onSelect: (series: string) => void;
}

const SeriesSelector: React.FC<SeriesSelectorProps> = ({ onSelect }) => {
  const handleSelectChange = (series: string) => {
    onSelect(series);
  };

  return (
    <div className="flex items-center justify-center">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[250px] items-center justify-center bg-blue-400 text-white">
          <SelectValue placeholder="Veuillez choisir une série" />
        </SelectTrigger>
        <SelectContent className="bg-blue-400 text-white">
          {["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12"].map(
            (series) => (
              <SelectItem key={series} value={series} className="cursor-pointer">
                {series}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SeriesSelector;
