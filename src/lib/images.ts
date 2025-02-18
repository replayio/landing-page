export function getAspectRatio(aspectRatio: string) {
  const [num, denom] = aspectRatio.split('/')
  return Number(num) / Number(denom)
}
