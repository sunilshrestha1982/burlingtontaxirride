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

// Photos live in /public/places/ and are generated via AI to match each destination.
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
  // Extended Vermont coverage — each uses a unique, town-tagged photo from LoremFlickr (stable per lock seed).
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
  ] as const).map(([slug, name], i) => {
    // Curated pool of real Unsplash landscape photos (mountains, lakes, forests,
    // autumn foliage, covered bridges, farmland, rivers) — all natural New
    // England / Vermont-style scenery. Stable CDN URLs, deterministic per slug.
    const pool = [
      "photo-1506905925346-21bda4d32df4", // mountain lake
      "photo-1441974231531-c6227db76b6e", // forest sun
      "photo-1418065460487-3e41a6c84dc5", // mountain meadow
      "photo-1470770841072-f978cf4d019e", // alpine lake reflection
      "photo-1500964757637-c85e8a162699", // autumn forest road
      "photo-1501785888041-af3ef285b470", // lake mountains
      "photo-1448375240586-882707db888b", // forest sunbeam
      "photo-1472214103451-9374bd1c798e", // autumn trees
      "photo-1507041957456-9c397ce39c97", // foggy forest
      "photo-1511497584788-876760111969", // mountain valley
      "photo-1469474968028-56623f02e42e", // mountain dawn
      "photo-1426604966848-d7adac402bff", // valley landscape
      "photo-1497436072909-60f360e1d4b1", // forest layers
      "photo-1418489098061-ce87b5dc3aee", // rolling hills
      "photo-1475924156734-496f6cac6ec1", // covered bridge autumn
      "photo-1508739773434-c26b3d09e071", // autumn road
      "photo-1502082553048-f009c37129b9", // forest river
      "photo-1490604001847-b712b0c2f967", // farmland field
      "photo-1483728642387-6c3bdd6c93e5", // mountain stream
      "photo-1418985991508-e47386d96a71", // lakeside cabin
      "photo-1444930694458-01babe71870e", // autumn lake
      "photo-1431794062232-2a99a5431c6c", // green valley
      "photo-1465311530779-5241f5a29892", // pine forest
      "photo-1473773508845-188df298d2d1", // mountain peaks
      "photo-1476610182048-b716b8518aae", // forest path autumn
      "photo-1500382017468-9049fed747ef", // rural meadow
      "photo-1502082553048-f009c37129b9", // river forest
      "photo-1519681393784-d120267933ba", // mountain night
      "photo-1505765050516-f72dcac9c60e", // wooded hills
      "photo-1455218873509-8097305ee378", // mountain lake green
      "photo-1485470733090-0aae1788d5af", // mountain landscape
      "photo-1454496522488-7a8e488e8606", // wide valley
      "photo-1464822759023-fed622ff2c3b", // forest creek
      "photo-1431036379983-8e0ab1f4bcfb", // autumn maple
      "photo-1502082553048-f009c37129b9", // river autumn
      "photo-1467173572019-4a8b1cfa05a3", // foggy mountains
      "photo-1502784444187-359ac186c5bb", // farmland sunset
      "photo-1444090542259-0af8fa96557e", // village hills
      "photo-1492571350019-22de08371fd3", // green field
      "photo-1486870591958-9b9d0d1dda99", // covered bridge
      "photo-1499002238440-d264edd596ec", // autumn vermont
      "photo-1477959858617-67f85cf4f1df", // sunlit forest
      "photo-1465056836041-7f43ac27dcb5", // misty lake
      "photo-1473773508845-188df298d2d1", // rugged peaks
      "photo-1506260408121-e353d10b87c7", // snow mountains
    ];
    // Hash slug to pick a deterministic, stable photo per destination.
    let h = 0;
    for (let k = 0; k < slug.length; k++) h = (h * 31 + slug.charCodeAt(k)) >>> 0;
    const id = pool[(h + i) % pool.length];
    return {
      slug,
      name,
      image: `https://images.unsplash.com/${id}?w=1200&h=800&fit=crop&q=80`,
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
