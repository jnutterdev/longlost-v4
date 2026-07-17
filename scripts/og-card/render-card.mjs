import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const fontsDir = join(process.cwd(), 'node_modules', '@fontsource');

const plexSansRegular = readFileSync(join(fontsDir, 'ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff'));
const plexSansBold = readFileSync(join(fontsDir, 'ibm-plex-sans/files/ibm-plex-sans-latin-700-normal.woff'));
const plexMono = readFileSync(join(fontsDir, 'ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff'));

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

// Tokyo Night palette
const BG_OUTER = '#16161e';
const FG = '#c0caf5';
const FG_MUTED = '#a9b1d6';
const FG_DIM = 'rgba(192,202,245,0.55)';
const BORDER = 'rgba(59,66,97,0.9)';
const ACCENT = '#bb9af7';
const ACCENT_GLOW = 'rgba(187,154,247,0.2)';

function titleFontSize(title) {
  if (title.length <= 50) return 60;
  if (title.length <= 80) return 50;
  return 42;
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + '…';
}

export async function renderCard({ title, excerpt, tags = [], date, kicker = 'TRANSMISSION_LOG' }) {
  const markup = {
    type: 'div',
    props: {
      style: {
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        display: 'flex',
        padding: '28px',
        backgroundColor: BG_OUTER,
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              padding: '56px',
              borderRadius: '24px',
              border: `1px solid ${BORDER}`,
              backgroundImage: `radial-gradient(ellipse 110% 130% at 105% 110%, ${ACCENT_GLOW} 0%, rgba(187,154,247,0) 65%), radial-gradient(ellipse 40% 50% at 0% 0%, rgba(122,162,247,0.08) 0%, rgba(122,162,247,0) 55%), linear-gradient(135deg, #1f2335 0%, #1a1b26 50%, #16161e 100%)`,
            },
            children: [
              // Kicker row
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '14px' },
                  children: [
                    {
                      type: 'div',
                      props: { style: { width: '28px', height: '1px', backgroundColor: FG_MUTED } },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'IBM Plex Mono',
                          fontSize: '22px',
                          letterSpacing: '3px',
                          color: FG_MUTED,
                          textTransform: 'uppercase',
                        },
                        children: kicker,
                      },
                    },
                  ],
                },
              },
              // Centered content block: title, excerpt, tags
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'center',
                    gap: '24px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontFamily: 'IBM Plex Sans',
                          fontSize: `${titleFontSize(title)}px`,
                          fontWeight: 700,
                          lineHeight: 1.15,
                          color: FG,
                          maxWidth: '980px',
                        },
                        children: title,
                      },
                    },
                    ...(excerpt
                      ? [{
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              fontFamily: 'IBM Plex Sans',
                              fontSize: '24px',
                              fontWeight: 400,
                              lineHeight: 1.5,
                              color: FG_MUTED,
                              maxWidth: '920px',
                            },
                            children: truncate(excerpt, 160),
                          },
                        }]
                      : []),
                    ...(tags.length
                      ? [{
                          type: 'div',
                          props: {
                            style: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
                            children: tags.map((tag) => ({
                              type: 'div',
                              props: {
                                style: {
                                  display: 'flex',
                                  fontFamily: 'IBM Plex Mono',
                                  fontSize: '20px',
                                  color: ACCENT,
                                  background: 'rgba(187,154,247,0.08)',
                                  border: '1px solid rgba(187,154,247,0.2)',
                                  padding: '6px 16px',
                                  borderRadius: '6px',
                                },
                                children: tag,
                              },
                            })),
                          },
                        }]
                      : []),
                  ],
                },
              },
              // Footer row
              {
                type: 'div',
                props: {
                  style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'IBM Plex Mono',
                          fontSize: '20px',
                          letterSpacing: '1px',
                          color: FG_DIM,
                          textTransform: 'uppercase',
                        },
                        children: date,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontFamily: 'IBM Plex Sans',
                          fontSize: '26px',
                          fontWeight: 700,
                          color: FG,
                        },
                        children: [
                          { type: 'span', props: { children: 'longlostforgotten' } },
                          { type: 'span', props: { style: { color: ACCENT }, children: '.com' } },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(markup, {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fonts: [
      { name: 'IBM Plex Sans', data: plexSansRegular, weight: 400, style: 'normal' },
      { name: 'IBM Plex Sans', data: plexSansBold, weight: 700, style: 'normal' },
      { name: 'IBM Plex Mono', data: plexMono, weight: 500, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: CARD_WIDTH } });
  return resvg.render().asPng();
}
