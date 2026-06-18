export const PHONE = "802-448-0707";
export const PHONE_TEL = "+18024480707";
export const EMAIL = "burlingtonvttaxiride@gmail.com";
export const WHATSAPP = "https://wa.me/18024480707";
export const ADDRESS = "Burlington, Vermont 05401";

export type City = {
  slug: string;
  name: string;
  image: string;
};

function naturalLandscapeImage(slug: string, name: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h * 31) + slug.charCodeAt(i)) >>> 0;
  const hue = 88 + (h % 38);
  const skyHue = 196 + (h % 22);
  const warmHue = 34 + (h % 18);
  const ridgeA = 38 + (h % 20);
  const ridgeB = 46 + ((h >> 3) % 18);
  const lakeY = 610 + ((h >> 5) % 46);
  const treeOffset = h % 90;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" role="img" aria-label="Natural Vermont landscape near ${name}">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="hsl(${skyHue} 78% 76%)"/>
          <stop offset="0.55" stop-color="hsl(${skyHue + 10} 84% 88%)"/>
          <stop offset="1" stop-color="hsl(${warmHue} 82% 84%)"/>
        </linearGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="hsl(${skyHue + 6} 66% 68%)"/>
          <stop offset="1" stop-color="hsl(${skyHue + 20} 58% 48%)"/>
        </linearGradient>
        <linearGradient id="field" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="hsl(${hue} 52% 55%)"/>
          <stop offset="1" stop-color="hsl(${hue + 18} 62% 38%)"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#sky)"/>
      <circle cx="${220 + (h % 760)}" cy="165" r="82" fill="hsl(${warmHue} 92% 79%)" opacity="0.9"/>
      <path d="M0 520 C170 380 265 445 390 310 C520 170 655 410 760 290 C900 125 1030 410 1150 270 C1285 125 1425 390 1600 235 L1600 1000 L0 1000 Z" fill="hsl(${ridgeA} 28% 43%)"/>
      <path d="M0 575 C150 480 310 535 450 405 C585 280 710 530 845 375 C985 225 1120 525 1275 365 C1410 230 1495 420 1600 335 L1600 1000 L0 1000 Z" fill="hsl(${ridgeB} 34% 35%)" opacity="0.95"/>
      <path d="M0 ${lakeY} C240 ${lakeY - 35} 420 ${lakeY + 38} 630 ${lakeY - 5} C835 ${lakeY - 50} 1040 ${lakeY + 48} 1600 ${lakeY - 22} L1600 1000 L0 1000 Z" fill="url(#lake)" opacity="0.92"/>
      <path d="M0 740 C260 690 455 765 720 710 C1020 650 1260 760 1600 690 L1600 1000 L0 1000 Z" fill="url(#field)"/>
      <path d="M0 830 C250 760 470 855 730 792 C1030 718 1280 850 1600 770 L1600 1000 L0 1000 Z" fill="hsl(${hue + 8} 48% 31%)" opacity="0.95"/>
      ${Array.from({ length: 18 }, (_, i) => {
        const x = (i * 96 + treeOffset) % 1620 - 20;
        const y = 660 + ((h >> (i % 8)) % 80);
        const s = 0.72 + (((h >> (i % 13)) % 46) / 100);
        return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-7" y="66" width="14" height="62" rx="6" fill="hsl(34 38% 28%)"/><path d="M0 0 L-48 78 H48 Z" fill="hsl(${hue + 18} 48% 29%)"/><path d="M0 26 L-58 112 H58 Z" fill="hsl(${hue + 10} 54% 35%)"/></g>`;
      }).join("")}
      <path d="M90 925 C320 875 540 940 780 890 C1020 838 1240 930 1510 875" fill="none" stroke="hsl(${warmHue} 64% 72%)" stroke-width="16" opacity="0.45"/>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Destination cards and destination hero sections read from this same image field.
// Local photos stay untouched; generated coverage uses unique no-human natural landscape art.
export const VT_DESTINATIONS: City[] = [
  // Existing local-asset destinations (kept as-is)
  { slug: "stowe-vt", name: "Stowe, VT", image: "/places/stowe-vt.jpg" },
  { slug: "middlebury-vt", name: "Middlebury, VT", image: "/places/middlebury-vt.jpg" },
  { slug: "montpelier-vt", name: "Montpelier, VT", image: "/places/montpelier-vt.jpg" },
  { slug: "waterbury-vt", name: "Waterbury, VT", image: "/places/waterbury-vt.jpg" },
  { slug: "jay-peak-resort-vt", name: "Jay Peak Resort, VT", image: "/places/jay-peak-vt.jpg" },
  { slug: "manchester-vt", name: "Manchester, VT", image: "/places/manchester-vt.jpg" },
  { slug: "smugglers-notch-vt", name: "Smugglers' Notch, VT", image: "/places/smugglers-notch-vt.jpg" },
  { slug: "sugarbush-vt", name: "Sugarbush, VT", image: "/places/sugarbush-vt.jpg" },
  { slug: "killington-vt", name: "Killington, VT", image: "/places/killington-vt.jpg" },
  { slug: "woodstock-vt", name: "Woodstock, VT", image: "/places/woodstock-vt.jpg" },
  { slug: "st-albans-vt", name: "St. Albans, VT", image: "/places/st-albans-vt.jpg" },
  { slug: "burlington-vt", name: "Burlington, VT", image: "/places/burlington-vt.jpg" },
  { slug: "alburgh-vt", name: "Alburgh, VT", image: "/places/alburgh-vt.jpg" },
  { slug: "northfield-vt", name: "Northfield, VT", image: "/places/northfield-vt.jpg" },
  // Extended Vermont coverage — each uses a unique natural landscape image with no people, vehicles, or missing remote URLs.
  ...([
    ["south-burlington-vt", "South Burlington, VT", "south-burlington"],
    ["winooski-vt", "Winooski, VT", "winooski"],
    ["essex-vt", "Essex, VT", "essex"],
    ["essex-junction-vt", "Essex Junction, VT", "essex-junction"],
    ["colchester-vt", "Colchester, VT", "colchester"],
    ["williston-vt", "Williston, VT", "williston"],
    ["shelburne-vt", "Shelburne, VT", "shelburne"],
    ["charlotte-vt", "Charlotte, VT", "charlotte"],
    ["hinesburg-vt", "Hinesburg, VT", "hinesburg"],
    ["richmond-vt", "Richmond, VT", "richmond"],
    ["jericho-vt", "Jericho, VT", "jericho"],
    ["underhill-vt", "Underhill, VT", "underhill"],
    ["cambridge-vt", "Cambridge, VT", "cambridge"],
    ["johnson-vt", "Johnson, VT", "johnson"],
    ["hyde-park-vt", "Hyde Park, VT", "hyde-park"],
    ["morrisville-vt", "Morrisville, VT", "morrisville"],
    ["elmore-vt", "Elmore, VT", "elmore"],
    ["wolcott-vt", "Wolcott, VT", "wolcott"],
    ["hardwick-vt", "Hardwick, VT", "hardwick"],
    ["craftsbury-vt", "Craftsbury, VT", "craftsbury"],
    ["greensboro-vt", "Greensboro, VT", "greensboro"],
    ["east-burke-vt", "East Burke, VT", "east-burke"],
    ["burke-vt", "Burke, VT", "burke-mountain"],
    ["lyndonville-vt", "Lyndonville, VT", "lyndonville"],
    ["st-johnsbury-vt", "St. Johnsbury, VT", "st-johnsbury"],
    ["danville-vt", "Danville, VT", "danville"],
    ["cabot-vt", "Cabot, VT", "cabot"],
    ["marshfield-vt", "Marshfield, VT", "marshfield"],
    ["plainfield-vt", "Plainfield, VT", "plainfield"],
    ["barre-vt", "Barre, VT", "barre"],
    ["berlin-vt", "Berlin, VT", "berlin"],
    ["waitsfield-vt", "Waitsfield, VT", "waitsfield"],
    ["warren-vt", "Warren, VT", "warren"],
    ["fayston-vt", "Fayston, VT", "fayston"],
    ["moretown-vt", "Moretown, VT", "moretown"],
    ["duxbury-vt", "Duxbury, VT", "duxbury"],
    ["bolton-valley-vt", "Bolton Valley, VT", "bolton-valley"],
    ["huntington-vt", "Huntington, VT", "huntington"],
    ["camels-hump-vt", "Camel's Hump, VT", "camels-hump"],
    ["starksboro-vt", "Starksboro, VT", "starksboro"],
    ["bristol-vt", "Bristol, VT", "bristol"],
    ["new-haven-vt", "New Haven, VT", "new-haven"],
    ["vergennes-vt", "Vergennes, VT", "vergennes"],
    ["ferrisburgh-vt", "Ferrisburgh, VT", "ferrisburgh"],
    ["addison-vt", "Addison, VT", "addison"],
    ["cornwall-vt", "Cornwall, VT", "cornwall"],
    ["salisbury-vt", "Salisbury, VT", "salisbury"],
    ["brandon-vt", "Brandon, VT", "brandon"],
    ["pittsford-vt", "Pittsford, VT", "pittsford"],
    ["proctor-vt", "Proctor, VT", "proctor"],
    ["rutland-vt", "Rutland, VT", "rutland"],
    ["castleton-vt", "Castleton, VT", "castleton"],
    ["fair-haven-vt", "Fair Haven, VT", "fair-haven"],
    ["poultney-vt", "Poultney, VT", "poultney"],
    ["pawlet-vt", "Pawlet, VT", "pawlet"],
    ["dorset-vt", "Dorset, VT", "dorset"],
    ["arlington-vt", "Arlington, VT", "arlington"],
    ["shaftsbury-vt", "Shaftsbury, VT", "shaftsbury"],
    ["bennington-vt", "Bennington, VT", "bennington"],
    ["pownal-vt", "Pownal, VT", "pownal"],
    ["wilmington-vt", "Wilmington, VT", "wilmington"],
    ["west-dover-vt", "West Dover, VT", "west-dover"],
    ["mount-snow-vt", "Mount Snow, VT", "mount-snow-ski"],
    ["ludlow-vt", "Ludlow, VT", "ludlow"],
    ["okemo-mountain-vt", "Okemo Mountain, VT", "okemo-mountain"],
    ["plymouth-vt", "Plymouth, VT", "plymouth"],
    ["chester-vt", "Chester, VT", "chester"],
    ["springfield-vt", "Springfield, VT", "springfield"],
    ["bellows-falls-vt", "Bellows Falls, VT", "bellows-falls"],
    ["putney-vt", "Putney, VT", "putney"],
    ["brattleboro-vt", "Brattleboro, VT", "brattleboro"],
    ["newfane-vt", "Newfane, VT", "newfane"],
    ["townshend-vt", "Townshend, VT", "townshend"],
    ["jamaica-vt", "Jamaica, VT", "jamaica"],
    ["stratton-mountain-vt", "Stratton Mountain, VT", "stratton-mountain"],
    ["bromley-mountain-vt", "Bromley Mountain, VT", "bromley-mountain"],
    ["quechee-vt", "Quechee, VT", "quechee-gorge"],
    ["norwich-vt", "Norwich, VT", "norwich"],
    ["hartford-vt", "Hartford, VT", "hartford"],
    ["windsor-vt", "Windsor, VT", "windsor"],
    ["mount-ascutney-vt", "Mount Ascutney, VT", "mount-ascutney"],
    ["south-royalton-vt", "South Royalton, VT", "south-royalton"],
    ["bethel-vt", "Bethel, VT", "bethel"],
    ["randolph-vt", "Randolph, VT", "randolph"],
    ["rochester-vt", "Rochester, VT", "rochester"],
    ["bradford-vt", "Bradford, VT", "bradford"],
    ["newbury-vt", "Newbury, VT", "newbury"],
    ["thetford-vt", "Thetford, VT", "thetford"],
    ["fairlee-vt", "Fairlee, VT", "fairlee"],
    ["peacham-vt", "Peacham, VT", "peacham"],
    ["barnet-vt", "Barnet, VT", "barnet"],
    ["island-pond-vt", "Island Pond, VT", "island-pond"],
    ["lake-willoughby-vt", "Lake Willoughby, VT", "lake-willoughby"],
    ["westmore-vt", "Westmore, VT", "westmore"],
    ["barton-vt", "Barton, VT", "barton"],
    ["glover-vt", "Glover, VT", "glover"],
    ["newport-vt", "Newport, VT", "newport-lake"],
    ["derby-vt", "Derby, VT", "derby"],
    ["south-hero-vt", "South Hero, VT", "south-hero"],
    ["north-hero-vt", "North Hero, VT", "north-hero"],
    ["grand-isle-vt", "Grand Isle, VT", "grand-isle"],
    ["isle-la-motte-vt", "Isle La Motte, VT", "isle-la-motte"],
    ["highgate-vt", "Highgate, VT", "highgate"],
    ["swanton-vt", "Swanton, VT", "swanton"],
    ["enosburg-vt", "Enosburg, VT", "enosburg"],
    ["richford-vt", "Richford, VT", "richford"],
    ["montgomery-vt", "Montgomery, VT", "montgomery"],
    ["fairfax-vt", "Fairfax, VT", "fairfax"],
    ["georgia-vt", "Georgia, VT", "georgia-vt"],
  ] as const).map(([slug, name]) => {
    return {
      slug,
      name,
      image: naturalLandscapeImage(slug, name),
    };
  }),


];

export type Airport = {
  code: string;
  name: string;
  location: string;
  drive: string;
  description: string;
  image: string;
};

export const AIRPORTS: Airport[] = [
  { code: "BOS", name: "Boston Logan International", location: "Boston, Massachusetts", drive: "~3.5 hrs drive",
    description: "Boston Logan is New England's largest hub. Fixed-rate transfers from Vermont to Boston Logan for international connections and routes not available from BTV.",
    image: "/places/airport-bos.jpg" },
  { code: "BDL", name: "Bradley International", location: "Windsor Locks, Connecticut", drive: "~4 hrs drive",
    description: "Bradley International serves Hartford-Springfield with a wide range of domestic and international flights.",
    image: "/places/airport-bdl.jpg" },
  { code: "MHT", name: "Manchester-Boston Regional", location: "Manchester, New Hampshire", drive: "~3 hrs drive",
    description: "Manchester-Boston Regional is a convenient alternative to Logan with competitive fares and less congestion.",
    image: "/places/airport-mht.jpg" },
  { code: "PBG", name: "Plattsburgh International", location: "Plattsburgh, New York", drive: "~1 hr drive",
    description: "Plattsburgh International is the closest NY airport to Burlington — ideal for cross-border travel to Montreal.",
    image: "/places/airport-pbg.jpg" },
  { code: "ALB", name: "Albany International", location: "Albany, New York", drive: "~2 hrs drive",
    description: "Albany International offers a broad selection of domestic flights and is popular when BTV fares are high.",
    image: "/places/airport-alb.jpg" },
  { code: "RUT", name: "Rutland Southern Vermont Regional", location: "Rutland, Vermont", drive: "~1.5 hrs drive",
    description: "Rutland Regional serves southern Vermont with connecting service to larger hubs.",
    image: "/places/airport-rut.jpg" },
  { code: "LEB", name: "Lebanon Municipal Airport", location: "Lebanon, New Hampshire", drive: "~2 hrs drive",
    description: "Lebanon Municipal serves the Upper Valley region with connections to New Hampshire aviation services.",
    image: "/places/airport-leb.jpg" },
  { code: "LGA", name: "LaGuardia Airport", location: "New York City, New York", drive: "~5 hrs drive",
    description: "LaGuardia is a major NYC hub with extensive domestic routes. We offer long-distance transfers from Vermont.",
    image: "/places/airport-lga.jpg" },
  { code: "EWR", name: "Newark Liberty International", location: "Newark, New Jersey", drive: "~5 hrs drive",
    description: "Newark Liberty is a United hub with strong transatlantic connections — door-to-door from Vermont.",
    image: "/places/airport-ewr.jpg" },
  { code: "JFK", name: "John F. Kennedy International", location: "New York City, New York", drive: "~5.5 hrs drive",
    description: "JFK is a global gateway with more international routes than any other NYC airport.",
    image: "/places/airport-jfk.jpg" },
  { code: "YUL", name: "Montréal-Trudeau International", location: "Montréal, Québec", drive: "~2 hrs drive",
    description: "Montréal-Trudeau is the closest major international airport to Burlington. Direct cross-border transfers with meet & greet and fixed rates.",
    image: "/places/yul-airport.jpg" },
  { code: "PWM", name: "Portland International Jetport", location: "Portland, Maine", drive: "~3.5 hrs drive",
    description: "Portland Jetport serves northern New England with select national routes.",
    image: "/places/airport-pwm.jpg" },
  { code: "BGR", name: "Bangor International Airport", location: "Bangor, Maine", drive: "~4 hrs drive",
    description: "Bangor International offers affordable fares and is convenient for northern Vermont travelers.",
    image: "/places/airport-bgr.jpg" },
];
