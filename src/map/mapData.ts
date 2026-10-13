export interface MapProvinceData {
  id: string;
  name: string;
  realmId: string;
  terrain: "plaine" | "colline" | "montagne" | "côte" | "forêt";
  points: string;
  labelX: number;
  labelY: number;
}

export interface MapRealmData {
  id: string;
  name: string;
  color: string;
}

export const MAP_REALMS: MapRealmData[] = [
  { id: "west-francia", name: "Francie Occidentale", color: "#7a8a5b" },
  { id: "east-francia", name: "Francie Orientale", color: "#8a7355" },
  { id: "lotharingia", name: "Lotharingie", color: "#9a8560" },
  { id: "asturias", name: "Asturies", color: "#6f7f7a" },
  { id: "al-andalus", name: "Al-Andalus", color: "#a3764f" },
  { id: "danelaw", name: "Danelaw", color: "#5d6b7a" },
  { id: "wessex", name: "Wessex", color: "#7d6b50" },
  { id: "ireland", name: "Irlande", color: "#6b7d5a" },
  { id: "scotland", name: "Écosse", color: "#66755f" },
  { id: "norway", name: "Norvège", color: "#607078" },
  { id: "denmark", name: "Danemark", color: "#77856b" },
  { id: "sweden", name: "Suède", color: "#6e7a6a" },
  { id: "moravia", name: "Moravie", color: "#856a5a" },
  { id: "byzantium", name: "Byzance", color: "#8a6a4f" },
  { id: "papacy", name: "États pontificaux", color: "#9d8a97" },
  { id: "lombardy", name: "Lombardie", color: "#997b62" },
  { id: "abbasid", name: "Abbassides", color: "#a5855f" },
  { id: "brittany", name: "Bretagne", color: "#5f7a70" },
];

export const MAP_PROVINCES: MapProvinceData[] = [
  { id: "ile-de-france", name: "Île-de-France", realmId: "west-francia", terrain: "plaine", points: "330,238 364,228 378,252 368,282 334,276 320,256", labelX: 348, labelY: 256 },
  { id: "orleans", name: "Orléanais", realmId: "west-francia", terrain: "plaine", points: "296,272 334,276 336,306 300,318 282,296", labelX: 306, labelY: 296 },
  { id: "champagne", name: "Champagne", realmId: "west-francia", terrain: "colline", points: "364,228 400,220 414,248 400,270 368,282", labelX: 388, labelY: 248 },
  { id: "aquitaine", name: "Aquitaine", realmId: "west-francia", terrain: "plaine", points: "252,318 300,318 300,366 254,374 232,342", labelX: 274, labelY: 344 },
  { id: "toulouse", name: "Toulousain", realmId: "west-francia", terrain: "colline", points: "200,342 254,374 244,412 196,404 178,368", labelX: 214, labelY: 380 },
  { id: "septimania", name: "Septimanie", realmId: "west-francia", terrain: "côte", points: "228,418 282,430 278,462 232,458", labelX: 254, labelY: 440 },
  { id: "bourgogne", name: "Bourgogne", realmId: "west-francia", terrain: "forêt", points: "336,306 368,300 376,338 344,352 310,334", labelX: 342, labelY: 328 },
  { id: "bretagne", name: "Bretagne", realmId: "brittany", terrain: "côte", points: "176,262 214,258 216,296 190,306 164,284", labelX: 190, labelY: 282 },
  { id: "normandie", name: "Normandie", realmId: "west-francia", terrain: "côte", points: "262,234 322,230 330,258 288,268 266,252", labelX: 296, labelY: 246 },
  { id: "lotharingia-prov", name: "Lotharingie", realmId: "lotharingia", terrain: "forêt", points: "402,218 438,214 450,242 430,262 400,248", labelX: 424, labelY: 238 },
  { id: "frisia", name: "Frise", realmId: "lotharingia", terrain: "côte", points: "398,178 436,172 442,198 404,204", labelX: 420, labelY: 190 },
  { id: "burgundy-kingdom", name: "Royaume de Bourgogne", realmId: "lotharingia", terrain: "montagne", points: "352,352 386,362 382,400 348,408 330,376", labelX: 360, labelY: 382 },
  { id: "bavaria", name: "Bavière", realmId: "east-francia", terrain: "montagne", points: "452,286 492,276 504,308 476,334 448,314", labelX: 474, labelY: 304 },
  { id: "saxony", name: "Saxe", realmId: "east-francia", terrain: "forêt", points: "436,172 474,164 486,196 456,214 438,196", labelX: 462, labelY: 194 },
  { id: "franconia", name: "Franconie", realmId: "east-francia", terrain: "colline", points: "434,226 470,222 476,252 448,264 432,244", labelX: 452, labelY: 244 },
  { id: "swabia", name: "Souabe", realmId: "east-francia", terrain: "montagne", points: "404,270 436,262 444,290 414,310 398,290", labelX: 420, labelY: 286 },
  { id: "denmark-prov", name: "Danemark", realmId: "denmark", terrain: "côte", points: "442,128 486,120 492,152 450,158", labelX: 466, labelY: 140 },
  { id: "norway-prov", name: "Norvège", realmId: "norway", terrain: "montagne", points: "404,44 452,36 462,84 424,96 396,66", labelX: 428, labelY: 66 },
  { id: "sweden-prov", name: "Suède", realmId: "sweden", terrain: "forêt", points: "470,60 516,56 520,104 480,112 466,84", labelX: 492, labelY: 84 },
  { id: "wessex-prov", name: "Wessex", realmId: "wessex", terrain: "côte", points: "256,178 300,172 304,208 262,214", labelX: 280, labelY: 194 },
  { id: "danelaw-prov", name: "Danelaw", realmId: "danelaw", terrain: "plaine", points: "298,148 348,142 352,180 302,186", labelX: 324, labelY: 164 },
  { id: "ireland-prov", name: "Irlande", realmId: "ireland", terrain: "colline", points: "180,140 224,136 228,182 184,188", labelX: 202, labelY: 162 },
  { id: "scotland-prov", name: "Écosse", realmId: "scotland", terrain: "montagne", points: "246,88 292,80 296,124 250,130", labelX: 268, labelY: 106 },
  { id: "moravia-prov", name: "Moravie", realmId: "moravia", terrain: "forêt", points: "506,270 546,262 554,296 512,306", labelX: 528, labelY: 284 },
  { id: "carinthia", name: "Carinthie", realmId: "moravia", terrain: "montagne", points: "488,326 522,318 530,348 496,356", labelX: 508, labelY: 340 },
  { id: "lombardy-prov", name: "Lombardie", realmId: "lombardy", terrain: "plaine", points: "436,344 472,336 478,366 440,374", labelX: 456, labelY: 354 },
  { id: "papacy-prov", name: "Rome", realmId: "papacy", terrain: "colline", points: "444,394 478,386 482,416 448,424", labelX: 462, labelY: 406 },
  { id: "byzantium-italy", name: "Italie byzantine", realmId: "byzantium", terrain: "côte", points: "462,436 498,428 502,462 466,468", labelX: 482, labelY: 448 },
  { id: "byzantium-balkans", name: "Balkans", realmId: "byzantium", terrain: "montagne", points: "512,344 560,338 572,384 534,400 508,372", labelX: 538, labelY: 370 },
  { id: "greece", name: "Grèce", realmId: "byzantium", terrain: "côte", points: "520,410 566,406 570,442 528,448", labelX: 544, labelY: 428 },
  { id: "anatolia", name: "Anatolie", realmId: "byzantium", terrain: "montagne", points: "588,360 632,352 640,392 596,400", labelX: 612, labelY: 378 },
  { id: "abbasid-syria", name: "Syrie", realmId: "abbasid", terrain: "côte", points: "644,364 678,358 684,396 650,402", labelX: 662, labelY: 380 },
  { id: "abbasid-mesopotamia", name: "Mésopotamie", realmId: "abbasid", terrain: "plaine", points: "688,332 726,326 732,362 694,370", labelX: 708, labelY: 348 },
  { id: "asturias-prov", name: "Asturies", realmId: "asturias", terrain: "montagne", points: "108,372 152,362 158,398 116,406", labelX: 130, labelY: 386 },
  { id: "al-andalus-prov", name: "Al-Andalus", realmId: "al-andalus", terrain: "plaine", points: "116,414 196,408 204,452 124,460", labelX: 158, labelY: 434 },
];

export const MAP_SEAS: { id: string; name: string; points: string; labelX: number; labelY: number }[] = [
  { id: "manche", name: "Manche", points: "0,120 620,120 620,60 0,60", labelX: 240, labelY: 92 },
  { id: "atlantique", name: "Océan Atlantique", points: "0,0 900,0 900,60 0,60", labelX: 80, labelY: 36 },
  { id: "mediterranee", name: "Mer Méditerranée", points: "180,470 900,470 900,620 180,620", labelX: 520, labelY: 546 },
];

export function realmColor(realmId: string): string {
  return MAP_REALMS.find((r) => r.id === realmId)?.color ?? "#999";
}

export function realmName(realmId: string): string {
  return MAP_REALMS.find((r) => r.id === realmId)?.name ?? "Inconnu";
}
