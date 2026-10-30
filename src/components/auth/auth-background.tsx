export function AuthBackground() {
  return (
    <>
      {/* Soft atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/50"
      >
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-teal-100/30 blur-3xl" />

        <svg
          viewBox="0 0 1440 480"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-x-0 bottom-0 h-[42%] w-full min-w-[800px] opacity-80 sm:h-[48%] lg:h-[54%]"
        >
          <defs>
            <linearGradient id="authMountainLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>

            <linearGradient id="authMountainDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Distant mountain range */}
          <path
            d="M0 300 L110 190 L175 245 L300 105 L405 220 L520 145 L650 265 L790 130 L920 240 L1050 120 L1190 240 L1320 150 L1440 260 L1440 480 L0 480 Z"
            fill="#d1fae5"
          />

          {/* Middle mountain range */}
          <path
            d="M0 350 L140 235 L245 300 L380 180 L500 315 L650 205 L800 330 L955 195 L1080 305 L1230 200 L1440 340 L1440 480 L0 480 Z"
            fill="url(#authMountainLight)"
          />

          {/* Foreground hills */}
          <path
            d="M0 390 Q170 280 350 365 T700 355 T1050 345 T1440 330 L1440 480 L0 480 Z"
            fill="#6ee7b7"
            opacity="0.75"
          />

          <path
            d="M0 430 Q220 350 420 420 T820 395 T1180 390 T1440 405 L1440 480 L0 480 Z"
            fill="url(#authMountainDark)"
            opacity="0.8"
          />

          {/* Lake */}
          <path
            d="M250 440 Q500 410 720 445 T1150 435 L1440 455 L1440 480 L250 480 Z"
            fill="#d1fae5"
            opacity="0.9"
          />

          {/* Pine trees */}
          {[
            [45, 420, 65],
            [105, 440, 48],
            [175, 425, 70],
            [260, 448, 42],
            [1260, 435, 60],
            [1330, 445, 48],
            [1390, 420, 75],
          ].map(([x, y, size]) => (
            <g key={x} transform={`translate(${x} ${y})`} fill="#065f46">
              <path
                d={`M0 ${-size} L${-size * 0.32} ${-size * 0.3} L${-size * 0.12} ${-size * 0.3} L${-size * 0.4} 0 L${size * 0.4} 0 L${size * 0.12} ${-size * 0.3} L${size * 0.32} ${-size * 0.3} Z`}
              />
            </g>
          ))}
        </svg>
      </div>
    </>
  );
}
