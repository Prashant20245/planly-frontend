export function LandscapeBackground() {
  return (
    <>
      {/* Soft background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60"
      />

      {/* Decorative landscape */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full opacity-95"
      >
        <defs>
          <linearGradient id="signup-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0fdf9" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <linearGradient id="signup-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8f5ed" />
            <stop offset="100%" stopColor="#8bd5c3" />
          </linearGradient>
        </defs>

        <rect width="1600" height="1000" fill="url(#signup-sky)" />

        {/* Clouds */}
        <g fill="#ffffff" opacity="0.75">
          <path d="M0 330 Q35 270 85 315 Q115 255 160 315 Q205 285 240 335 L240 410 L0 410Z" />
          <path d="M1150 250 Q1190 195 1230 245 Q1270 190 1320 250 Q1370 220 1410 275 L1410 350 L1150 350Z" />
          <path d="M350 420 Q390 375 430 415 Q470 370 510 420 L510 460 L350 460Z" />
        </g>

        {/* Sunrise */}
        <circle cx="900" cy="590" r="92" fill="#fff1b8" opacity="0.8" />

        {/* Distant mountains */}
        <path
          d="M0 610 L100 475 L160 545 L250 440 L345 570 L440 470 L535 570 L640 445 L735 565 L830 480 L930 580 L1030 445 L1135 555 L1240 460 L1360 575 L1470 450 L1600 590 L1600 1000 L0 1000Z"
          fill="#b8e6d9"
        />

        {/* Middle mountains */}
        <path
          d="M0 670 L125 540 L220 620 L330 515 L450 650 L575 540 L700 650 L820 530 L945 650 L1080 530 L1210 650 L1360 515 L1480 635 L1600 545 L1600 1000 L0 1000Z"
          fill="#75c9b0"
        />

        {/* Mountain highlights */}
        <g fill="#e4f8ef" opacity="0.85">
          <path d="M100 540 L125 475 L160 545 L135 528Z" />
          <path d="M250 440 L300 550 L270 520 L250 490 L230 520Z" />
          <path d="M640 445 L700 620 L665 565 L640 505 L615 550Z" />
          <path d="M1030 445 L1090 610 L1055 560 L1030 500 L1000 555Z" />
          <path d="M1470 450 L1525 590 L1490 550 L1470 495 L1440 545Z" />
        </g>

        {/* Lake */}
        <path
          d="M0 740 Q350 690 700 740 T1600 720 L1600 850 L0 850Z"
          fill="url(#signup-water)"
        />

        <g fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.65">
          <path d="M420 755 Q650 740 860 755 T1250 750" />
          <path d="M550 785 Q750 775 950 785 T1380 780" />
          <path d="M260 810 Q440 800 620 810" />
        </g>

        {/* Forested hills */}
        <path
          d="M0 700 Q200 650 380 740 T760 760 Q980 720 1170 760 T1600 700 L1600 1000 L0 1000Z"
          fill="#21896d"
        />

        <path
          d="M0 790 Q220 730 430 810 T830 815 Q1080 760 1300 820 T1600 790 L1600 1000 L0 1000Z"
          fill="#075b49"
        />

        {/* Left pine trees */}
        <g fill="#064e3b">
          <path d="M45 700 L80 575 L115 700 H98 L125 755 H35 L62 700Z" />
          <path d="M125 755 L155 650 L185 755 H172 L194 800 H110 L136 755Z" />
          <path d="M220 800 L250 690 L280 800 H265 L285 845 H205 L235 800Z" />
          <path d="M15 830 L40 750 L65 830 H53 L73 870 H0 L24 830Z" />
        </g>

        {/* Right pine trees */}
        <g fill="#064e3b">
          <path d="M1450 745 L1485 605 L1520 745 H1502 L1530 800 H1430 L1458 745Z" />
          <path d="M1365 800 L1390 710 L1415 800 H1402 L1420 845 H1345 L1372 800Z" />
          <path d="M1530 825 L1555 735 L1580 825 H1568 L1590 870 H1510 L1538 825Z" />
        </g>

        {/* Foreground */}
        <path
          d="M0 900 Q250 850 500 925 T1000 920 Q1300 865 1600 905 L1600 1000 L0 1000Z"
          fill="#034b3c"
        />

        {/* Decorative foliage */}
        <g fill="#0f766e" opacity="0.8">
          <path d="M20 980 Q35 920 65 900 Q55 945 20 980Z" />
          <path d="M45 990 Q75 930 105 940 Q85 975 45 990Z" />
          <path d="M1570 985 Q1540 925 1510 915 Q1520 960 1570 985Z" />
          <path d="M1540 995 Q1510 945 1480 950 Q1500 980 1540 995Z" />
        </g>
      </svg>
    </>
  );
}
