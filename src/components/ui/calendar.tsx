"use client";

import React, { useState } from "react";
import Calendar, { CalendarProps as ReactCalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Asegúrate de importar los estilos predeterminados

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = {
  value?: Date | null;
  onChange?: (date: Date | null, event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

function CalendarComponent({ value, onChange, className }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const handleDateChange: ReactCalendarProps["onChange"] = (value, event) => {
    const selected = Array.isArray(value) ? value[0] : value; // Obtiene una sola fecha si es un rango
    setSelectedDate(selected || null);
    if (onChange) onChange(selected || null, event);
  };

  return (
    <div className={cn("p-3 rounded-md border bg-white shadow-md", className)}>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        nextLabel={<ChevronRight className="h-4 w-4" />}
        prevLabel={<ChevronLeft className="h-4 w-4" />}
        tileClassName={({ date }) =>
          cn(
            "text-center p-2 rounded-md hover:bg-gray-200",
            selectedDate?.toDateString() === date.toDateString() &&
              "bg-blue-500 text-white"
          )
        }
        className="react-calendar"
      />
    </div>
  );
}

CalendarComponent.displayName = "CalendarComponent";

export { CalendarComponent };
