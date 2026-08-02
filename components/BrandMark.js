import Image from 'next/image'

/**
 * The company mark.
 *
 * It lives in one file because it appears in the header, the footer and the
 * mobile menu, and three hand-copied versions is how a logo ends up rendering
 * at three different sizes on the same site.
 *
 * The artwork is a raster with its own glow baked in, so it is served as a
 * transparent PNG rather than redrawn as SVG. `logo.png` is 512px square,
 * which covers every retina size it is used at here.
 */
export default function BrandMark({ className = 'w-10 h-10' }) {
  return (
    <Image
      src="/logo.png"
      alt=""
      // Fixed dimensions rather than `sizes`: the mark is never wider than
      // 40px on screen, and a fixed pair asks the optimiser for 1x and 2x of
      // that instead of a full responsive ladder up to 3840px.
      width={80}
      height={80}
      className={`${className} shrink-0 object-contain`}
      // The header is the first thing painted and the mark sits in it, so it
      // must not wait behind anything below the fold.
      priority
    />
  )
}
