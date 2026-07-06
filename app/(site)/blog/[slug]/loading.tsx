export default function Loading() {
  return (
    <div className="min-h-screen bg-background-base flex items-center justify-center px-section-x">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-accent-red border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-black/70 text-[16px]">Loading...</p>
      </div>
    </div>
  )
}
