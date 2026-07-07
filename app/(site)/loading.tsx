// Layout-stable shell: skeleton bars in the hero position instead of a
// full-screen centered spinner, so the swap to real content doesn't repaint
// the whole viewport or reassign LCP.
export default function Loading() {
  return (
    <div className="min-h-screen bg-background-base py-[80px] mobile:py-[50px] px-section-x">
      <div className="max-w-container mx-auto">
        <div className="h-14 bg-black/10 rounded-lg w-2/3 max-w-[600px] mb-6 animate-pulse"></div>
        <div className="h-6 bg-black/10 rounded-lg w-1/2 max-w-[440px] mb-3 animate-pulse"></div>
        <div className="h-6 bg-black/10 rounded-lg w-2/5 max-w-[360px] animate-pulse"></div>
      </div>
    </div>
  )
}
