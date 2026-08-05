export function StepVideo({ webmSrc, mp4Src, label }: { webmSrc?: string; mp4Src: string; label: string }) {
  return (
    <video
      className="w-full rounded-xl border border-gray-200"
      autoPlay
      loop
      muted
      playsInline
      aria-label={label}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={mp4Src} type="video/mp4" />
    </video>
  )
}
