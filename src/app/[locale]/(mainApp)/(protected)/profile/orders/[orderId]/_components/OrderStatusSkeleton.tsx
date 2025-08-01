import { cn } from "@/lib/utils"; // Assuming you use a utility for classnames

const OrderStatusSkeleton = () => {
  return (
    <div
      className="relative flex w-full flex-col justify-between"
      style={{ height: "22rem" }}
    >
      {/* The static vertical line in the background */}
      <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 bg-slate-200 dark:bg-slate-700" />

      {/* Create 5 skeleton items to represent the loading state */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "z-10 flex animate-pulse items-center justify-center",
            index === 0 && "items-start", // First item
            index === 4 && "items-end", // Last item
          )}
        >
          {/* Left Side: Text placeholder or Spacer */}
          {index % 2 === 0 ? (
            <div className={cn("-ml-px w-1/2 pr-6 text-right")}>
              <div className="flex flex-col items-end gap-y-2">
                <div className="h-4 w-14 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ) : (
            <div className="w-1/2" />
          )}

          {/* Center Circle */}
          <div className="h-6 w-6 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />

          {/* Right Side: Text placeholder or Spacer */}
          {index % 2 !== 0 ? (
            <div className="-mr-px w-1/2 pl-5 text-left">
              <div className="flex flex-col items-start gap-y-2">
                <div className="h-4 w-14 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ) : (
            <div className="w-1/2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusSkeleton;
