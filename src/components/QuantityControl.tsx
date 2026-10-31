"use client";

export function QuantityControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-[#eadfce]">
      <button
        type="button"
        className="h-10 w-10 text-lg"
        onClick={() => onChange(Math.max(0.5, value - 0.5))}
        aria-label="کاهش مقدار"
      >
        −
      </button>
      <span className="min-w-16 text-center text-sm">
        {new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(
          value,
        )}{" "}
        کیلو
      </span>
      <button
        type="button"
        className="h-10 w-10 text-lg"
        onClick={() => onChange(Math.min(20, value + 0.5))}
        aria-label="افزایش مقدار"
      >
        +
      </button>
    </div>
  );
}
