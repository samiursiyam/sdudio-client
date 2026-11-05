'use client';

import { useState } from 'react';

/* Studio equipment list — each tab shows its own set of items.
   Switching tabs re-renders the list with a fade/slide transition. */
const equipmentTabs = [
  {
    name: 'Microphones',
    items: [
      'Slate ML-1 VMS',
      'Rode NTK',
      'Blue Microphones Bluebird SL',
      'Electrovoice RE-20',
      'The Kracken Sub Kick',
      'AKG C214',
      'Neumann KM 184 x2',
      'Sennheiser MKH 70',
      'Rode NT1-A',
      'Lewitt LCT 940',
      'Shure SM58-C',
      'Audio Technica AT2035',
      'Shure SM7B',
      'Sennheiser MD 421',
      'Aston Spirit',
      'Warm Audio WA-87',
    ],
  },
  {
    name: 'Monitors',
    items: [
      'KRK Rokit 5-G3',
      'Presonus Eris E5',
      'Dynaudio Lyd 7',
      'Genelec M040',
      'JBL Lsr305',
      'Audioengine A5+',
      'Focal Alpha 80',
      'Focal Twin6 Be',
      'Mackie Mr5 Mk3',
      'Yamaha Hs8',
      'Avantone Mix Cubes',
      'Adam A77x',
      'M-Audio Bx5 D2',
      'Eve Audio Sc205',
      'Neumann Kh 120',
    ],
  },
  {
    name: 'Instruments',
    items: [
      'Yamaha U1 Piano',
      'Roland RD-2000 Stage Piano',
      'Fender Stratocaster',
      'Gibson Les Paul Standard',
      'Martin D-28 Acoustic',
      'Yamaha FG800 Acoustic',
      'DW Collector Series Drum Kit',
      'Roland TD-27 Electronic Kit',
      'Fender Precision Bass',
      'Music Man StingRay Bass',
      'Korg Kronos Workstation',
      'Nord Stage 3',
      'Taylor 814ce',
      'Ibanez JEM7V',
      'Pearl Masters Maple Kit',
    ],
  },
  {
    name: 'Software',
    items: [
      'Ableton Live 12 Suite',
      'Logic Pro X',
      'FL Studio Producer',
      'Pro Tools Studio',
      'Cubase Pro 13',
      'Reaper License',
      'Native Instruments Komplete 15',
      'Spectrasonics Omnisphere',
      ' Serum (Xfer)',
      'Waves Mercury Bundle',
      'FabFilter Pro Bundle',
      'UAD Ultimate Bundle',
      'iZotope RX Advanced',
      'Soundtoys 5',
      'Valhalla DSP Bundle',
    ],
  },
  {
    name: 'Amps',
    items: [
      'Fender Twin Reverb',
      'Marshall JCM800',
      'Vox AC30',
      'Mesa Boogie Dual Rectifier',
      'Orange Rocker 32',
      'Fender Bassman',
      'Marshall DSL40',
      'Roland Jazz Chorus 120',
      'Ampeg SVT-4 Pro',
      'Gallien-Krueger 800RB',
      'Peavey 5150',
      'Hughes & Kettner TubeMeister',
      'Matchless HC-30',
      'Fender Hot Rod Deluxe',
      'EVH 5150III',
    ],
  },
];

/* Split the items of one tab into 4 equal columns */
const splitIntoColumns = (items) => {
  const columns = [];
  const perColumn = Math.ceil(items.length / 4);
  for (let i = 0; i < items.length; i += perColumn) {
    columns.push(items.slice(i, i + perColumn));
  }
  return columns;
};

export function EquipmentShowcase() {
  const [active, setActive] = useState('Microphones');

  const activeTab = equipmentTabs.find((tab) => tab.name === active);
  const columns = splitIntoColumns(activeTab.items);

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-10">
        {/* Small handwritten heading */}
        <p className="text-center text-3xl text-[#e61a4f] [font-family:var(--font-hand)] sm:text-4xl">
          What we use
        </p>
        <h2 className="mt-1 text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Studio Equipment
        </h2>

        {/* Tab pills — active one gets the pink outline */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {equipmentTabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              onClick={() => setActive(tab.name)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                active === tab.name
                  ? 'border border-[#e61a4f] bg-white text-[#e61a4f]'
                  : 'border border-transparent text-foreground hover:text-[#e61a4f]'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Item list — key forces a re-mount so the fade/slide
            animation replays every time the tab changes.
            Mobile: 4 columns scroll horizontally (left → right).
            Desktop: the 4 columns fit the full width. */}
        <div
          key={active}
          className="mt-10 animate-in fade-in slide-in-from-bottom-6 -mx-4 overflow-x-auto px-4 [scrollbar-width:thin] duration-500"
        >
          <div className="grid min-w-[640px] grid-cols-4 gap-x-6 gap-y-5 sm:min-w-0 sm:px-0">
            {columns.map((column, columnIndex) => (
              <ul key={columnIndex} className="space-y-5">
                {column.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-[#e61a4f]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Read more pill */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-[#e61a4f] px-16 py-6 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#c9123f]"
          >
            Read more
          </button>
        </div>
      </div>
    </section>
  );
}
