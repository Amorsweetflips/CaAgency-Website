import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * iPhone-style device shell for vertical campaign video (July 2026 round 3).
 * Deliberately thin bezels so the video fills almost the whole face of the
 * phone; the Dynamic Island pill and side keys sell the device read.
 */
export default function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Bezel */}
      <div className="relative rounded-[46px] mobile:rounded-[38px] bg-[#111114] p-[9px] mobile:p-[7px] shadow-[0_28px_60px_rgba(0,0,0,0.28)] ring-1 ring-black/50">
        {/* Side keys */}
        <span aria-hidden="true" className="absolute -left-[2px] top-[17%] h-[8%] w-[3px] rounded-l-[2px] bg-[#2c2c30]" />
        <span aria-hidden="true" className="absolute -left-[2px] top-[28%] h-[8%] w-[3px] rounded-l-[2px] bg-[#2c2c30]" />
        <span aria-hidden="true" className="absolute -right-[2px] top-[22%] h-[13%] w-[3px] rounded-r-[2px] bg-[#2c2c30]" />
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[37px] mobile:rounded-[31px] bg-black">
          {children}
          {/* Dynamic Island */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[11px] z-[3] h-[21px] w-[80px] mobile:h-[17px] mobile:w-[64px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_2px_rgba(255,255,255,0.12)]"
          />
        </div>
      </div>
    </div>
  )
}
