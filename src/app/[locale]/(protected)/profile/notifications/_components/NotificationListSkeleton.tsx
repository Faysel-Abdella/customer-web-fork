const NotificationListSkeleton = () => {
  const skeletons = Array.from({ length: 3 });

  return (
    <div className="space-y-3">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="bg-background relative animate-pulse overflow-hidden rounded-lg border p-4 shadow-none" // Added animate-pulse for a shimmer effect
        >
          <div className="flex items-start gap-4">
            {/* Right side: Content Area */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  {/* Title Placeholder */}
                  <div className="bg-muted-foreground h-4 w-3/4 rounded"></div>
                  {/* Description Placeholder */}
                  <div className="bg-muted-foreground mt-2 h-3 w-full rounded"></div>
                  <div className="bg-muted-foreground mt-1 h-3 w-5/6 rounded"></div>

                  {/* Second line of description */}
                  {/* Timestamp Placeholder */}
                  <div className="bg-muted-foreground mt-2 h-2.5 w-1/3 rounded"></div>
                </div>

                {/* Buttons Placeholder */}
                <div className="flex flex-shrink-0 gap-1">
                  <div className="bg-muted-foreground h-8 w-20 rounded"></div>

                  {/* Placeholder for Mark Read button */}
                  <div className="bg-muted-foreground h-8 w-16 rounded"></div>

                  {/* Placeholder for Delete button */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationListSkeleton;
