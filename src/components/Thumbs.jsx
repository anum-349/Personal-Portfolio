// Hand-drawn thumbnails: ink line-work over a loose "watercolour" wash slightly out of register.
// On hover the wash slides into place (CSS in styles.css).

const gearPath = (cx, cy, r, teeth = 8, depth = 9) => {
  const pts = []
  const n = teeth * 4
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const rr = i % 4 === 0 || i % 4 === 1 ? r + depth : r
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
}

const Frame = ({ children, wash }) => (
  <svg className="thumb" viewBox="0 0 320 200" role="img" aria-hidden="true" focusable="false">
    <g className="wash" style={{ fill: 'var(--tone)' }}>{wash}</g>
    <g className="ink" filter="url(#rough)">{children}</g>
  </svg>
)

const blob = (x, y, w, h) => <ellipse cx={x} cy={y} rx={w} ry={h} />

const art = {
  forensic: () => (
    <Frame wash={<>{blob(150, 105, 95, 70)}{blob(215, 80, 40, 40)}</>}>
      <rect x="70" y="28" width="120" height="150" rx="4" />
      <path d="M86 52h60M86 68h88" />
      <rect x="86" y="82" width="70" height="9" className="solid" />
      <path d="M86 102h88M86 118h40" />
      <rect x="132" y="116" width="42" height="9" className="solid" />
      <circle cx="205" cy="105" r="42" />
      <path d="M236 136l38 40" strokeWidth="5" />
      <path d="M185 120c0-14 8-26 20-26s20 12 20 26M192 124c0-10 5-19 13-19s13 9 13 19M199 126c0-6 3-11 6-11s6 5 6 11" />
    </Frame>
  ),
  smartdoc: () => (
    <Frame wash={<>{blob(120, 110, 80, 65)}{blob(235, 80, 55, 45)}</>}>
      <rect x="44" y="50" width="86" height="112" rx="4" />
      <rect x="58" y="38" width="86" height="112" rx="4" className="paper" />
      <path d="M72 62h56M72 76h44M72 90h56M72 104h30" />
      {[[210, 50], [250, 78], [228, 112], [270, 130], [196, 140], [262, 40], [180, 92]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" className={i === 2 ? 'solid' : ''} />
      ))}
      <path d="M144 80C170 78 190 100 224 110" strokeDasharray="4 5" />
      <circle cx="228" cy="112" r="15" />
      <path d="M228 112L250 78M228 112L196 140M228 112L180 92" strokeDasharray="2 5" />
    </Frame>
  ),
  roomero: () => (
    <Frame wash={<>{blob(160, 100, 105, 70)}</>}>
      <rect x="50" y="30" width="220" height="140" />
      <path d="M50 96h96M190 30v54M190 120v50M146 96v30" />
      <path d="M146 126a24 24 0 0 1 24 -24" />
      <rect x="64" y="42" width="66" height="38" rx="3" />
      <path d="M64 56h66" />
      <rect x="206" y="48" width="48" height="26" rx="4" />
      <circle cx="230" cy="148" r="14" />
      <path d="M80 118h46v38H80z" />
      <path d="M270 70h-5M270 78h-5M270 86h-5" />
    </Frame>
  ),
  autoster: () => (
    <Frame wash={<>{blob(165, 105, 100, 50)}</>}>
      <path d="M48 128c0-14 6-20 22-24l30-34c4-5 10-8 18-8h56c10 0 18 4 24 12l22 28c14 2 28 6 28 18v8" />
      <path d="M100 70l-12 34h126l-20-30c-3-4-7-6-12-6z" />
      <path d="M150 70v34" />
      <path d="M48 128h30M118 128h86M246 128h26" />
      <circle cx="98" cy="132" r="19" className="paper" />
      <circle cx="98" cy="132" r="7" />
      <circle cx="226" cy="132" r="19" className="paper" />
      <circle cx="226" cy="132" r="7" />
      <path d="M12 96h26M6 110h34M20 124h18" />
    </Frame>
  ),
  lms: () => (
    <Frame wash={<>{blob(150, 120, 95, 55)}{blob(235, 70, 40, 35)}</>}>
      <path d="M160 70c-24-14-60-14-96 0v86c36-14 72-14 96 0 24-14 60-14 96 0V70c-36-14-72-14-96 0z" />
      <path d="M160 70v86" />
      <path d="M80 88c20-4 46-4 66 4M80 106c20-4 46-4 66 4M174 92c20-8 46-8 66-4M174 110c20-8 46-8 66-4" />
      <path d="M160 18l-58 20 58 20 58-20z" className="paper" />
      <path d="M130 50v14c18 10 42 10 60 0V50M218 38v26" />
    </Frame>
  ),
  carmech: () => (
    <Frame wash={<>{blob(120, 105, 70, 70)}{blob(240, 90, 45, 55)}</>}>
      <path d={gearPath(120, 104, 44, 9, 11)} className="paper" />
      <circle cx="120" cy="104" r="18" />
      <circle cx="120" cy="104" r="5" className="solid" />
      <g transform="rotate(38 232 100)">
        <path d="M222 30a22 22 0 1 0 20 0v34h-6V50h-8v14h-6z" />
        <rect x="224" y="64" width="16" height="104" rx="8" />
        <circle cx="232" cy="156" r="3" />
      </g>
    </Frame>
  ),
  chatbot: () => (
    <Frame wash={<>{blob(115, 70, 70, 36)}{blob(215, 120, 60, 40)}</>}>
      <path d="M46 36h116a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8H84l-22 18v-18H46a8 8 0 0 1-8-8V44a8 8 0 0 1 8-8z" />
      <path d="M56 56h80M56 72h52" />
      <path d="M170 96h108a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8h-12v18l-22-18h-74a8 8 0 0 1-8-8v-36a8 8 0 0 1 8-8z" className="paper" />
      <circle cx="200" cy="122" r="4" className="solid" />
      <circle cx="222" cy="122" r="4" className="solid" />
      <circle cx="244" cy="122" r="4" className="solid" />
    </Frame>
  ),
  stock: () => (
    <Frame wash={<>{blob(160, 110, 110, 60)}</>}>
      <path d="M38 30v140h250" />
      {[[70, 120, 140, 100], [102, 110, 150, 124], [134, 90, 130, 108], [166, 74, 112, 90], [198, 60, 100, 80], [230, 44, 92, 62]].map(([x, top, bot, b], i) => (
        <g key={i}>
          <path d={`M${x} ${top - 14}V${bot + 10}`} />
          <rect x={x - 8} y={top} width="16" height={Math.abs(b - top) + 8} className={i % 2 ? 'solid' : 'paper'} />
        </g>
      ))}
      <path d="M50 150C100 140 130 120 170 96S230 62 280 46" strokeDasharray="5 5" />
    </Frame>
  ),
  globe: () => (
    <Frame wash={<>{blob(160, 108, 70, 70)}{blob(230, 60, 36, 30)}</>}>
      <circle cx="150" cy="112" r="64" />
      <ellipse cx="150" cy="112" rx="64" ry="22" />
      <ellipse cx="150" cy="112" rx="26" ry="64" />
      <path d="M150 48v128M86 112h128" />
      <path d="M118 62C130 20 190 12 226 30" />
      <path d="M196 80C230 50 262 56 284 90" />
      <path d="M104 150C70 160 46 140 40 112" />
      <circle cx="226" cy="30" r="5" className="solid" /><circle cx="284" cy="90" r="5" className="solid" /><circle cx="40" cy="112" r="5" className="solid" />
    </Frame>
  ),
  musetales: () => (
    <Frame wash={<>{blob(130, 105, 85, 62)}{blob(245, 70, 40, 50)}</>}>
      <path d="M60 110c0-44 38-76 88-76 40 0 74 22 74 56 0 24-22 26-34 20-14-8-30 4-20 20 8 14-6 28-30 28-44 0-78-20-78-48z" className="paper" />
      <circle cx="96" cy="80" r="9" /><circle cx="136" cy="62" r="9" className="solid" /><circle cx="180" cy="70" r="9" /><circle cx="94" cy="118" r="9" className="solid" />
      <g transform="rotate(32 252 100)">
        <rect x="246" y="30" width="12" height="90" rx="4" />
        <path d="M246 120h12l-2 16c-1 8-7 8-8 0z" className="solid" />
      </g>
      <path d="M200 160c20-14 40 10 62 0s30-8 48-2" />
    </Frame>
  ),
  minishell: () => (
    <Frame wash={<>{blob(160, 105, 105, 62)}</>}>
      <rect x="40" y="32" width="240" height="136" rx="8" />
      <path d="M40 58h240" />
      <circle cx="58" cy="45" r="4" /><circle cx="74" cy="45" r="4" /><circle cx="90" cy="45" r="4" />
      <text x="58" y="88" className="mono">$ ls | grep .py</text>
      <text x="58" y="110" className="mono">main.py  shell.py</text>
      <text x="58" y="132" className="mono">$ cd ..</text>
      <rect x="112" y="122" width="9" height="14" className="solid blink" />
    </Frame>
  ),
  spare: () => (
    <Frame wash={<>{blob(110, 100, 70, 60)}{blob(236, 110, 50, 50)}</>}>
      <path d="M60 62l22-12 22 12v26l-22 12-22-12z" className="paper" />
      <circle cx="82" cy="75" r="9" />
      <path d={gearPath(214, 66, 26, 8, 8)} className="paper" />
      <circle cx="214" cy="66" r="9" />
      <path d="M60 140h14l6-14 10 28 10-28 10 28 10-28 6 14h14" />
      <circle cx="226" cy="146" r="20" /><circle cx="226" cy="146" r="9" />
    </Frame>
  ),
  birthday: () => (
    <Frame wash={<>{blob(160, 125, 90, 45)}{blob(235, 50, 40, 35)}</>}>
      <rect x="80" y="112" width="160" height="50" rx="6" />
      <rect x="104" y="76" width="112" height="36" rx="6" className="paper" />
      <path d="M80 130c14 10 20-8 34 0s20-8 34 0 20-8 34 0 20-8 34 0 14-4 24 0" />
      {[132, 160, 188].map((x) => (
        <g key={x}>
          <rect x={x - 3} y="54" width="6" height="22" />
          <path d={`M${x} 34c-8 8-8 14 0 18 8-4 8-10 0-18z`} className="solid flame" />
        </g>
      ))}
      <path d="M40 40l8 8M60 22l-4 10M262 34l-8 8M278 62l-10-2M52 90l10 2M270 100l-10-4" />
    </Frame>
  ),
}

export default function Thumb({ kind, tone }) {
  const C = art[kind] || art.forensic
  return (
    <div className={`thumb-wrap tone-${tone}`}>
      <C />
    </div>
  )
}

// SVG filter that wobbles every line a little, so nothing looks ruler-straight.
export const RoughFilter = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
      </filter>
    </defs>
  </svg>
)
