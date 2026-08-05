/**
 * The brief document.
 *
 * One builder for all three briefs, so a logo brief, a website brief and an
 * app brief arrive looking like the same studio sent them, and so a change to
 * the cover is a change in one place rather than three.
 *
 * The document is the client's copy as much as ours. They download it, and it
 * is often the thing they forward to a partner, a developer or a bank, so it
 * is set as a report rather than a form dump: a branded cover band, a title
 * block, numbered sections, and every answer as a labelled line.
 *
 * Colours and proportions come from styles/globals.css - the same navy hero,
 * the same brand blue and violet, the same orange call to action, the same ink
 * greys. Type is Helvetica, the closest of the fonts every PDF reader already
 * has to the site's grotesque; the work of looking designed is done by the
 * scale, the leading and the margins rather than by a font file we would have
 * to embed in every brief we send.
 */
(function (global) {
  'use strict'

  /* ---------------------------------------------------------------- palette */

  const INK = [11, 23, 51]          // ink-900, headings
  const BODY = [38, 50, 79]         // ink-700, body copy
  const GREY = [90, 100, 128]       // ink-500, secondary
  const FAINT = [154, 163, 186]     // ink-300, labels
  const BRAND = [37, 99, 235]       // brand-600
  const BRAND_DK = [29, 78, 216]    // brand-700, text on tinted fills
  const SOFT = [239, 246, 255]      // brand-50
  const SOFT_LINE = [191, 219, 254] // brand-200
  const VIOLET = [124, 58, 237]
  const ORANGE = [249, 115, 22]
  const HAIRLINE = [226, 232, 240]
  const SKY = [147, 197, 253]       // brand-300, on the navy
  const PAPER = [248, 250, 252]
  const WHITE = [255, 255, 255]
  const NAVY = [7, 19, 46]
  const NAVY_END = [34, 26, 92]

  /* ------------------------------------------------------------- geometry */

  const W = 210
  const M = 18                 // page margin
  const CW = W - 2 * M         // content width
  const TOP = 40               // first baseline on a content page
  const BOTTOM = 266           // last baseline before a page break
  const BAND = 76              // depth of the cover band

  /* ------------------------------------------------------------- the mark */

  // Loaded once, at parse time, so it is in hand long before anyone submits.
  // A brief is never held up for it: if the image is blocked the cover draws
  // the orbit instead and the document is otherwise identical.
  let LOGO = null
  ;(function () {
    const img = new Image()
    img.onload = function () {
      try {
        // 220px is about 200dpi at the size it is drawn. The 512px source goes
        // in uncompressed and adds a megabyte to every brief we email.
        const c = document.createElement('canvas')
        c.width = c.height = 220
        c.getContext('2d').drawImage(img, 0, 0, 220, 220)
        LOGO = c.toDataURL('image/png')
      } catch (e) {}
    }
    img.src = '/logo.png'
  })()

  /* -------------------------------------------------------------- helpers */

  const hex = (h) => {
    try {
      const s = String(h).replace('#', '')
      return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]
    } catch (e) {
      return INK
    }
  }

  /** Section names arrive shouting from the form; the document does not. */
  const titleCase = (s) =>
    String(s)
      .toLowerCase()
      .replace(/(^|[\s(/-])([a-z])/g, (m, a, b) => a + b.toUpperCase())

  /** Type is set through one function so no call site invents its own scale. */
  function type(doc, size, weight, colour, spacing) {
    doc.setFont('helvetica', weight || 'normal')
    doc.setFontSize(size)
    doc.setTextColor(colour[0], colour[1], colour[2])
    doc.setCharSpace(spacing || 0)
  }

  /** A small letter-spaced label, the document's quietest voice. */
  function label(doc, text, x, y, colour, size) {
    type(doc, size || 8, 'bold', colour || FAINT, 1.2)
    doc.text(String(text).toUpperCase(), x, y)
    doc.setCharSpace(0)
  }

  function rule(doc, y, x1, x2, colour, weight) {
    const c = colour || HAIRLINE
    doc.setDrawColor(c[0], c[1], c[2])
    doc.setLineWidth(weight || 0.3)
    doc.line(x1 === undefined ? M : x1, y, x2 === undefined ? W - M : x2, y)
  }

  /** Right-aligned letter-spaced text. jsPDF's own alignment measures the
   *  string without the spacing it then adds, which walks it off the page. */
  function rightText(doc, text, y, spacing) {
    const gap = spacing || 0
    doc.setCharSpace(gap)
    doc.text(text, W - M - (doc.getTextWidth(text) + gap * text.length), y)
    doc.setCharSpace(0)
  }

  /** A filled parallelogram, the shape the cover is built out of. */
  function slant(doc, x, y, w, h, skew, rgb, opacity) {
    doc.setGState(new doc.GState({ opacity: opacity === undefined ? 1 : opacity }))
    doc.setFillColor(rgb[0], rgb[1], rgb[2])
    doc.lines([[skew, h], [w, 0], [-skew, -h]], x, y, [1, 1], 'F', true)
    doc.setGState(new doc.GState({ opacity: 1 }))
  }

  /* ---------------------------------------------------------- the cover */

  /**
   * The band across the top of page one. A navy gradient carrying the same
   * blue, violet and orange the site's hero does, cut into angled planes so
   * the page opens on something built rather than on a rectangle.
   */
  function coverBand(doc) {
    const steps = 48
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1)
      doc.setFillColor(
        Math.round(NAVY[0] + t * (NAVY_END[0] - NAVY[0])),
        Math.round(NAVY[1] + t * (NAVY_END[1] - NAVY[1])),
        Math.round(NAVY[2] + t * (NAVY_END[2] - NAVY[2]))
      )
      doc.rect(0, (i * BAND) / steps, W, BAND / steps + 0.4, 'F')
    }

    // Planes, back to front. They run off both edges of the page on purpose.
    slant(doc, 96, 0, 54, BAND, 26, BRAND, 0.5)
    slant(doc, 138, 0, 40, BAND, 26, VIOLET, 0.55)
    slant(doc, 180, 0, 12, BAND, 26, ORANGE, 0.22)
    slant(doc, 74, 0, 5, BAND, 26, SKY, 0.5)

    // Outlined chevrons, top right, the way the site's grid lines sit over the
    // hero: structure, not decoration competing with the wordmark.
    doc.setGState(new doc.GState({ opacity: 0.5 }))
    doc.setDrawColor(SKY[0], SKY[1], SKY[2])
    doc.setLineWidth(0.5)
    for (let i = 0; i < 3; i++) {
      doc.lines([[4.5, 9], [9, 0], [-4.5, -9]], W - 46 + i * 13, 9, [1, 1], 'S', true)
    }
    doc.setGState(new doc.GState({ opacity: 1 }))
  }

  /** The mark plus the wordmark, at a given size, light or dark. */
  function brandMark(doc, x, y, size, onDark) {
    if (LOGO) {
      doc.addImage(LOGO, 'PNG', x, y, size, size)
    } else {
      doc.setDrawColor(255, 255, 255)
      doc.setLineWidth(0.7)
      doc.ellipse(x + size / 2, y + size / 2, size / 2, size / 5, 'S')
      doc.setFillColor(255, 255, 255)
      doc.circle(x + size / 2, y + size / 2, size / 3.4, 'F')
    }
    const cx = x + size + size * 0.26
    type(doc, size * 0.7, 'bold', onDark ? WHITE : INK, 0)
    doc.text('Logo', cx, y + size * 0.64)
    doc.setTextColor(...(onDark ? [167, 139, 250] : VIOLET))
    doc.text('Orbit', cx + doc.getTextWidth('Logo'), y + size * 0.64)
    return cx
  }

  function cover(doc, o) {
    coverBand(doc)

    const cx = brandMark(doc, M, 14, 17, true)
    type(doc, 8, 'normal', [150, 175, 225], 0.2)
    doc.text('logoorbit.net  ·  support@logoorbit.net  ·  +1 (234) 529-8737', cx, 38)
    doc.setCharSpace(0)

    // The document's own name, set large on the band and right-aligned so it
    // reads before anything else on the page.
    const words = String(o.title).replace(/\s*brief$/i, '').toUpperCase()
    type(doc, 25, 'bold', WHITE, -0.3)
    doc.text(words, W - M, BAND - 26, { align: 'right' })
    type(doc, 14, 'bold', SKY, 4)
    rightText(doc, 'BRIEF', BAND - 14, 4)

    /* ---- the title block, centred under the band ---- */

    let y = BAND + 26
    type(doc, 27, 'bold', INK, -0.5)
    doc.splitTextToSize(o.title, CW).forEach((line) => {
      doc.text(line, W / 2, y, { align: 'center' })
      y += 12
    })
    doc.setCharSpace(0)

    if (o.subject) {
      type(doc, 13, 'normal', GREY)
      doc.text(doc.splitTextToSize(o.subject, CW)[0], W / 2, y, { align: 'center' })
      y += 10
    }

    y += 2
    type(doc, 10.5, 'normal', BODY)
    const meta = [
      ['Prepared for: ', o.client || '-'],
      ['Contact: ', o.email || '-'],
      ['Date: ', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
    ]
    meta.forEach((m) => {
      // Bold label and light value, centred as one line.
      doc.setFont('helvetica', 'bold')
      const lw = doc.getTextWidth(m[0])
      doc.setFont('helvetica', 'normal')
      const vw = doc.getTextWidth(m[1])
      const x = W / 2 - (lw + vw) / 2
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...INK)
      doc.text(m[0], x, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...BODY)
      doc.text(m[1], x + lw, y)
      y += 6.4
    })

    y += 6
    rule(doc, y, M + 20, W - M - 20)
    return y + 14
  }

  /* ------------------------------------------ running header and footer */

  function runningHead(doc, o) {
    brandMark(doc, M, 11, 9, false)
    type(doc, 8, 'bold', FAINT, 1.2)
    rightText(doc, String(o.title).toUpperCase(), 18, 1.2)
    rule(doc, 24)
  }

  function footer(doc, o, page, total) {
    rule(doc, 278)
    type(doc, 8, 'normal', FAINT, 0.3)
    doc.text('LogoOrbit  ·  ' + o.title, M, 284)
    rightText(doc, 'Page ' + page + ' of ' + total, 284, 0.3)
  }

  /* --------------------------------------------------------- the report */

  function build(o) {
    const jsPDF = (global.jspdf || {}).jsPDF
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const data = o.data || {}
    const cols = o.cols || []
    const multi = new Set(o.multi || [])
    const pills = new Set(o.pills || [])
    const skip = new Set(o.skip || [])
    const v = (k) => String(data[k] == null ? '' : data[k]).trim()

    let y = cover(doc, o)
    let counter = 0

    const page = () => {
      doc.addPage()
      runningHead(doc, o)
      y = TOP
    }
    const need = (h) => {
      if (y + h > BOTTOM) page()
    }

    /* An introduction, in the client's own words, set as running text. */
    if (o.summary) {
      type(doc, 12.5, 'bold', INK)
      doc.text('Introduction', M, y)
      rule(doc, y + 3.2, M, M + 26, BRAND, 0.9)
      y += 11

      type(doc, 10.5, 'normal', BODY)
      const lines = doc.splitTextToSize(o.summary, CW)
      lines.forEach((line, i) => {
        // Break before the penultimate line rather than send the last one over
        // on its own.
        if (y + 5.6 > BOTTOM || (i === lines.length - 2 && y + 11.2 > BOTTOM)) page()
        doc.text(line, M, y)
        y += 5.6
      })
      y += 10
    }

    /* The three answers that decide what this project is. */
    const tiles = (o.highlights || []).filter((h) => v(h[1])).slice(0, 3)
    if (tiles.length) {
      const gap = 5
      const tw = (CW - gap * (tiles.length - 1)) / tiles.length
      const th = 26
      need(th + 12)
      tiles.forEach((t, i) => {
        const x = M + i * (tw + gap)
        doc.setFillColor(...SOFT)
        doc.setDrawColor(...SOFT_LINE)
        doc.setLineWidth(0.3)
        doc.roundedRect(x, y, tw, th, 2.5, 2.5, 'FD')
        doc.setFillColor(...BRAND)
        doc.roundedRect(x, y, 1.4, th, 0.7, 0.7, 'F')
        label(doc, t[0], x + 6, y + 9, BRAND, 7.5)
        type(doc, 10.5, 'bold', INK)
        doc.text(doc.splitTextToSize(v(t[1]), tw - 12).slice(0, 2), x + 6, y + 16)
      })
      y += th + 14
    }

    /* ---- sections ---- */

    const section = (name) => {
      counter += 1
      need(28)
      type(doc, 13.5, 'bold', INK, -0.1)
      const heading = counter + '. ' + titleCase(name)
      doc.text(heading, M, y)
      doc.setCharSpace(0)
      rule(doc, y + 3.6, M, M + Math.min(doc.getTextWidth(heading), CW), BRAND, 0.9)
      rule(doc, y + 3.6, M + Math.min(doc.getTextWidth(heading), CW), W - M, HAIRLINE, 0.9)
      y += 12
    }

    /** `• Label: value`, wrapped with a hanging indent under the label. */
    const bullet = (name, value) => {
      const indent = 5
      type(doc, 10.5, 'bold', INK)
      const head = name + ': '
      const hw = doc.getTextWidth(head)
      type(doc, 10.5, 'normal', BODY)
      const first = doc.splitTextToSize(value, CW - indent - hw)
      const firstLine = first[0] || ''
      const rest = value.length > firstLine.length ? doc.splitTextToSize(value.slice(firstLine.length).trim(), CW - indent) : []

      need(6 + rest.length * 5.4)
      doc.setFillColor(...BRAND)
      doc.circle(M + 1.4, y - 1.3, 0.8, 'F')
      type(doc, 10.5, 'bold', INK)
      doc.text(head, M + indent, y)
      type(doc, 10.5, 'normal', BODY)
      doc.text(firstLine, M + indent + hw, y)
      y += 5.6
      rest.forEach((line) => {
        need(7)
        doc.text(line, M + indent, y)
        y += 5.6
      })
      y += 1.4
    }

    /** A long answer: the label on its own line, the answer as a paragraph. */
    const paragraph = (name, value) => {
      need(16)
      label(doc, name, M, y, GREY)
      y += 6
      type(doc, 10.5, 'normal', BODY)
      doc.splitTextToSize(value, CW).forEach((line) => {
        need(7)
        doc.text(line, M, y)
        y += 5.6
      })
      y += 4
    }

    /** A list answer: chips, so twelve tapped choices stay readable. */
    const chips = (name, values) => {
      need(16)
      label(doc, name, M, y, GREY)
      y += 7.5
      type(doc, 9, 'bold', BRAND_DK)
      let x = M
      values.forEach((raw) => {
        const t = String(raw).trim()
        if (!t) return
        const cw = doc.getTextWidth(t) + 10
        if (x + cw > W - M && x > M) {
          x = M
          y += 9.5
          need(12)
        }
        doc.setFillColor(...SOFT)
        doc.setDrawColor(...SOFT_LINE)
        doc.setLineWidth(0.3)
        doc.roundedRect(x, y - 5, cw, 7.6, 3.8, 3.8, 'FD')
        doc.setTextColor(...BRAND_DK)
        doc.text(t, x + 5, y)
        x += cw + 3
      })
      y += 12
    }

    /** The palette, as filled chips with the hex written on them. */
    const swatches = () => {
      if (!cols.length) return
      need(24)
      label(doc, 'Colour palette', M, y, GREY)
      y += 8
      let x = M
      cols.forEach((c) => {
        const rgb = hex(c.hex)
        const name = String(c.name || c.hex)
        type(doc, 8.5, 'bold', WHITE)
        const cw = Math.max(doc.getTextWidth(name) + 12, 26)
        if (x + cw > W - M && x > M) {
          x = M
          y += 13
          need(16)
        }
        doc.setFillColor(rgb[0], rgb[1], rgb[2])
        doc.setDrawColor(...HAIRLINE)
        doc.setLineWidth(0.3)
        doc.roundedRect(x, y - 5.5, cw, 9, 4.5, 4.5, 'FD')
        // Dark fills need light text and pale fills need dark, or the label
        // vanishes into the swatch it is naming.
        const bright = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 150
        doc.setTextColor(...(bright ? INK : WHITE))
        doc.text(name, x + cw / 2, y, { align: 'center' })
        x += cw + 4
      })
      y += 14
    }

    const answer = (name, key) => {
      const value = v(key)
      if (!value || skip.has(key)) return
      if (multi.has(key)) return chips(name, value.split(/,\s|;\s/))
      if (pills.has(key) || value.length <= 74) return bullet(name, value)
      return paragraph(name, value)
    }

    page()
    ;(o.fields || []).forEach((entry) => {
      const name = entry[0]
      const rows = entry[1]
      const filled = rows.filter((r) => v(r[1]) && !skip.has(r[1]))
      const carriesColours = o.swatchIn && name.indexOf(o.swatchIn) === 0
      if (!filled.length && !(carriesColours && cols.length)) return
      section(name)
      filled.forEach((r) => answer(r[0], r[1]))
      if (carriesColours) swatches()
      y += 6
    })

    /* A closing note, so the last page ends rather than stops. */
    need(30)
    y += 4
    doc.setFillColor(...PAPER)
    doc.setDrawColor(...HAIRLINE)
    doc.setLineWidth(0.3)
    doc.roundedRect(M, y, CW, 24, 2.5, 2.5, 'FD')
    type(doc, 10.5, 'bold', INK)
    doc.text('What happens next', M + 7, y + 9)
    type(doc, 9.5, 'normal', GREY)
    doc.text(
      'Our team reads every brief. You will hear from us within 1-2 business days with a plan and a price.',
      M + 7,
      y + 16,
      { maxWidth: CW - 14 }
    )

    const total = doc.getNumberOfPages()
    for (let i = 1; i <= total; i++) {
      doc.setPage(i)
      footer(doc, o, i, total)
    }
    return doc
  }

  global.LOBrief = { build }
})(window)
