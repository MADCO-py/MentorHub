import { Check, X } from "lucide-react";
import type { AvailabilitySlot } from "@/types";
import { cn } from "@/lib/utils";

const DAYS: { key: keyof AvailabilitySlot["days"]; label: string }[] = [
  { key: "lun", label: "Lun" },
  { key: "mar", label: "Mar" },
  { key: "mie", label: "Mié" },
  { key: "jue", label: "Jue" },
  { key: "vie", label: "Vie" },
];

export function AvailabilityCalendar({ schedule }: { schedule: AvailabilitySlot[] }) {
  return (
    <div className="overflow-hidden border border-border">
      <div className="grid grid-cols-6 border-b border-border bg-surface-light">
        <div className="py-2.5 pl-4 font-mono text-[10px] uppercase tracking-widest text-muted">Hora</div>
        {DAYS.map((d) => (
          <div key={d.key} className="py-2.5 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
            {d.label}
          </div>
        ))}
      </div>
      <div className="divide-y divide-border">
        {schedule.map((slot) => (
          <div key={slot.hour} className="grid grid-cols-6">
            <div className="flex items-center pl-4 py-3 font-mono text-xs text-muted border-r border-border">
              {slot.hour}
            </div>
            {DAYS.map((d) => {
              const ok = slot.days[d.key];
              return (
                <div
                  key={d.key}
                  className={cn(
                    "flex items-center justify-center border-l border-border py-3",
                    ok ? "bg-primary/5" : ""
                  )}
                >
                  {ok
                    ? <Check className="h-3.5 w-3.5 text-primary" />
                    : <X    className="h-3.5 w-3.5 text-border" />
                  }
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
