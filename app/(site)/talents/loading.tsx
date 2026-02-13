export default function TalentsLoading() {
  return (
    <div className="bg-background-dark py-section-y-desktop mobile:py-[50px] px-section-x">
      <div className="max-w-container mx-auto">
        {/* Hero skeleton */}
        <div className="mb-12">
          <div className="h-12 bg-white/10 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/10 rounded-lg w-96 mb-2 animate-pulse"></div>
          <div className="h-6 bg-white/10 rounded-lg w-80 animate-pulse"></div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-white/10 rounded-2xl animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded-sm w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
