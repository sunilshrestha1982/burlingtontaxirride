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
