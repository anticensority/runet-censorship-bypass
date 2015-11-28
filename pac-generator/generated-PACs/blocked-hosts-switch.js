function FindProxyForURL(url, host) {
  // ProstoVPN.AntiZapret PAC-ip File
  // Generated on Sun Nov 22 10:12:29 MSK 2015

  // The whole PAC script is reevaluated on each call of this function.

  host = host.replace(/\.+$/).toLowerCase(); // E.g. WinHTTP may be nasty.

  // HTTPS proxy is a HTTP proxy over SSL. It is NOT CONNECT proxy!
  // Supported only in Chrome and Firefox.
  // http://www.chromium.org/developers/design-documents/secure-web-proxy
  // This is to bypass FULL DPI
  var isIE = /*@cc_on!@*/!1;
  var viaProxy = isIE
    ? 'PROXY proxy.antizapret.prostovpn.org:3128; DIRECT'
    : 'HTTPS proxy.antizapret.prostovpn.org:3143; PROXY proxy.antizapret.prostovpn.org:3128; DIRECT';

  return (function ifProxyByTrie(host) {
    var doms = host.split('.');
  switch( doms.pop() ) {
    case "102":
      if (doms.pop() === "120")
        if (doms.pop() === "48")
          return doms.pop() === "37";
      break;
    case "137":
      if (doms.pop() === "22")
        if (doms.pop() === "122")
          return doms.pop() === "153";
      break;
    case "160":
      if (doms.pop() === "17")
        if (doms.pop() === "202")
          return doms.pop() === "149";
      break;
    case "161":
      if (doms.pop() === "17")
        if (doms.pop() === "202")
          return doms.pop() === "149";
      break;
    case "169":
      if (doms.pop() === "184")
        if (doms.pop() === "211")
          return doms.pop() === "95";
      break;
    case "226":
      if (doms.pop() === "93")
        if (doms.pop() === "174")
          return doms.pop() === "93";
      break;
    case "40":
      if (doms.pop() === "244")
        if (doms.pop() === "71")
          return doms.pop() === "212";
      break;
    case "50":
      if (doms.pop() === "34")
        if (doms.pop() === "95")
          return doms.pop() === "209";
      break;
    case "58":
      if (doms.pop() === "66")
        if (doms.pop() === "44")
          return doms.pop() === "198";
      break;
    case "ag":
      switch( doms.pop() ) {
        case "primewire":
        case "vd":
          return true;
      }
      break;
    case "am":
      switch( doms.pop() ) {
        case "legalportal":
        case "libros":
        case "libros":
          return true;
      }
      break;
    case "asia":
      if (doms.pop() === "maxbet")
        return doms.pop() === "cafe";
      break;
    case "at":
      switch( doms.pop() ) {
        case "777slot":
        case "777slot":
        case "enzymes":
          return true;
      }
      break;
    case "au":
      if (doms.pop() === "com")
        return doms.pop() === "onlinesmoke";
      break;
    case "az":
      switch( doms.pop() ) {
        case "kinoman":
        case "pics":
        case "video":
          return true;
        case "video":
          return doms.pop() === "true-detective";
      }
      break;
    case "be":
      switch( doms.pop() ) {
        case "iman":
        case "pokerstars":
        case "shishkin":
        case "weedy":
          return true;
      }
      break;
    case "bg":
      return doms.pop() === "ruletkaonline";
    case "biz":
      switch( doms.pop() ) {
        case "222rc":
        case "22rc":
        case "24dv":
        case "24dv":
        case "24ora":
        case "26rc":
        case "28ps":
        case "2f2":
        case "2m2":
        case "4party":
        case "4party":
        case "6-w":
        case "777rc":
        case "acmerc":
        case "adigeya-krd":
        case "albina-blog":
        case "aleg43":
        case "alexmix":
        case "alexmix":
        case "amfetaminsaler":
        case "anasha":
        case "angelotrip":
        case "angelotrip":
        case "arhstuff":
        case "arma24":
        case "aroma-mix":
        case "bab24":
        case "bagsbany":
        case "belf":
        case "berilegal":
        case "best-maza":
        case "best174":
        case "bigbangrc":
        case "bigrc":
        case "bigrc":
        case "bihw":
        case "blackbrothers":
        case "blizo":
        case "blue-chemical":
        case "blue-chemical":
        case "bmwrc":
        case "bratrc":
        case "bropp":
        case "brorc":
        case "brorc":
        case "budbuddy":
        case "c-rc":
        case "caivp":
        case "cannado":
        case "cash-forum":
        case "cbdc":
        case "chaplin24":
        case "chaplin24":
        case "chem24":
        case "chem24":
        case "chempro":
        case "chempro":
        case "chemrc":
        case "chems":
        case "chemsmoke":
        case "cisconsult":
        case "cisconsult":
        case "clipi":
        case "clubrc":
        case "cocainecard":
        case "cocainecard":
        case "cpravki":
        case "cvmg":
        case "daffydrugs":
        case "daffydrugs":
        case "daffylads":
        case "daffylads":
        case "darkrc":
        case "darkrc":
        case "dcge":
        case "denver24":
        case "dhrc":
        case "diplom4u":
        case "diplomy":
        case "doc24":
        case "doc24":
        case "don24":
        case "donikrsk":
        case "doniomsk":
        case "doom44":
        case "dosug24":
        case "dosug24":
        case "drugsrc":
        case "drugsspacefamily":
        case "dv24":
        case "dv24":
        case "dyrman":
        case "dyrman":
        case "dzrklad":
        case "eeeee":
        case "envac":
        case "eurolabforum":
        case "exclusiv24":
        case "familyguy":
        case "familyguy":
        case "fast75":
        case "fg24":
        case "fg24":
        case "fiton":
        case "flowerscoffee":
        case "flowerscoffee":
        case "flowsmoke":
        case "forever-models":
        case "forparty":
        case "forparty":
        case "freejournal":
        case "fsell":
        case "fulltilt":
        case "gaba":
        case "ganjaseeds":
        case "ganjaseeds":
        case "ganjeprom":
        case "ganjeprom":
        case "gav-gav":
        case "gav-min":
        case "geneticseeds":
        case "glyki":
        case "glyki":
        case "gold-orda":
        case "goldorda":
        case "goldrc":
        case "goodday24":
        case "goodday24":
        case "goodklad":
        case "gorc":
        case "grinvich":
        case "grinvich":
        case "growerland":
        case "hapwa":
        case "hard24":
        case "high-stone":
        case "high-stone-forum":
        case "high-stone-forum":
        case "highseeds":
        case "hollandseeds":
        case "hsmai":
        case "iceberg-lab":
        case "iegalrc":
        case "iegalrc":
        case "iglou":
        case "ikrastall":
        case "ildi":
        case "illbill24":
        case "imperia-of-hentai":
        case "insud":
        case "irk-klad":
        case "irkutskklad":
        case "jokertoys24":
        case "kaktostrann":
        case "kalibrirc":
        case "kalibrirc":
        case "kanna":
        case "kapitan-flint":
        case "karakum":
        case "karakum":
        case "kep24x7":
        case "kep24x7":
        case "kgn24":
        case "ki555":
        case "ki555":
        case "klad1":
        case "klad2":
        case "klad3":
        case "klad4":
        case "klad4u":
        case "klad4u":
        case "klad72":
        case "klad96":
        case "kladlegal":
        case "klads":
        case "koks":
        case "koks":
        case "komklad":
        case "kumar24":
        case "kumar24":
        case "kupisex":
        case "kupit-diplom":
        case "kupit-mdma":
        case "kupit-prava":
        case "kupitdiplom":
        case "kurgan45":
        case "larek":
        case "lazar-shaulov":
        case "ldbj":
        case "legairc":
        case "legal-chem":
        case "legal-chem":
        case "legal24":
        case "legal76":
        case "legalby":
        case "legalby":
        case "legalcenter":
        case "legalcity":
        case "legalcity":
        case "legalcy":
        case "legaldrug":
        case "legaldrug":
        case "legalplanet":
        case "legalpoint":
        case "legalpoint":
        case "legalrc":
        case "legalrc-shop":
        case "legalrcshop":
        case "legendann":
        case "legionshop":
        case "legpills":
        case "legpills":
        case "leqalcr":
        case "leqalcr":
        case "ls-collection":
        case "ls-collection":
        case "ls-magazine":
        case "luckyomsk":
        case "mafia1":
        case "mafia2":
        case "mafia2":
        case "magic24":
        case "magic24":
        case "maximix":
        case "maximix":
        case "mazai":
        case "mazai":
        case "mazairc":
        case "mazairc":
        case "md-shop":
        case "megarc":
        case "meksika":
        case "miap":
        case "miksvam":
        case "mirlegala":
        case "mirlegala":
        case "mister-x":
        case "mixxx":
        case "mm24":
        case "mms24":
        case "molochnik-rc":
        case "molodezhka":
        case "molot24":
        case "moskvi4":
        case "myfileload":
        case "n-tura":
        case "n-tura":
        case "napas":
        case "narkom":
        case "narkom":
        case "narkoman":
        case "narkopult":
        case "narmarrc":
        case "nelegala2":
        case "nelegala2":
        case "nelegala3":
        case "nelegala5":
        case "night-legal-seller":
        case "nikolya":
        case "nudeboys":
        case "nudeteens":
        case "o-q":
        case "onestuff":
        case "online-casino-poker":
        case "panda24":
        case "pasporta":
        case "pauk":
        case "pharma-chem":
        case "piek":
        case "pillz":
        case "pillz":
        case "pizdato":
        case "polo420":
        case "pornodoch":
        case "positiv45":
        case "postreq":
        case "povarhab":
        case "pravarus":
        case "pravb":
        case "premiumhentai":
        case "privol":
        case "prosto24":
        case "prosto24":
        case "psyhoforum":
        case "pure-nymphs":
        case "qmems":
        case "qnems":
        case "qualityporn":
        case "rasslabon":
        case "rasta-palatka":
        case "razor29":
        case "rc-forum":
        case "rc-forum":
        case "rc-korm":
        case "rc-korm":
        case "rc-legal":
        case "rc-market":
        case "rcfoks":
        case "rcgid":
        case "rcgid":
        case "rcgo":
        case "rcinfo":
        case "rclab":
        case "rclab18":
        case "rcland":
        case "rcland":
        case "rclandstore":
        case "rclandstore":
        case "rclegalstore":
        case "rcmarket":
        case "rcmarket":
        case "rcmerch":
        case "rcmerch":
        case "rcmercher":
        case "rcmercher":
        case "rcsale":
        case "rcsalez":
        case "rcsalez":
        case "rcseller":
        case "rcseller":
        case "rcstore":
        case "rcstore":
        case "reagenty-kuritelnyye-smesi-geroin-efedrin-metadon-lsd-mdma-jwh":
        case "reagenty-kuritelnyye-smesi-geroin-efedrin-metadon-lsd-mdma-jwh":
        case "realkz":
        case "reallegal":
        case "realrc":
        case "redclub":
        case "redclub":
        case "relaxportal":
        case "renas":
        case "ritte":
        case "rossiarusskie":
        case "royairc":
        case "royalrc":
        case "royalrc":
        case "royalrc1":
        case "rucrime":
        case "rusensi":
        case "rusex":
        case "russpace":
        case "sabec":
        case "sailormoon":
        case "samaraklad":
        case "santaferc":
        case "seedstrade":
        case "sekops":
        case "seriousrc":
        case "setca":
        case "sexcompas":
        case "sf7":
        case "shadymarket":
        case "shamanika":
        case "shamarc":
        case "shishka":
        case "shockmodels":
        case "shockmodels":
        case "shop-stuff":
        case "shop-stuffpp":
        case "shopklad":
        case "sib24":
        case "sibseeds":
        case "sibseeds":
        case "sibvostlegal":
        case "silk-dv":
        case "silkdv":
        case "silkdv":
        case "sirionrc":
        case "skbar":
        case "skbar38":
        case "skdrc":
        case "skdrc":
        case "skit-m":
        case "skit-m":
        case "sloat":
        case "slotobar":
        case "sn70":
        case "snowmixstore":
        case "soli":
        case "sp1ce":
        case "sp1ce":
        case "speedm":
        case "spice-online24":
        case "ssaib":
        case "stamp24":
        case "starfox74":
        case "stockchem":
        case "stuff-rc":
        case "stuff-rc":
        case "sweetyear":
        case "sweetyear":
        case "swimpool":
        case "swimpool":
        case "sysanin":
        case "t-a":
        case "teenpornclub":
        case "tlpp":
        case "tltklad":
        case "tm45":
        case "tm45":
        case "toprc":
        case "toprc":
        case "tops24":
        case "torrent-film":
        case "tp-c":
        case "traderc":
        case "troekur":
        case "trustpartner":
        case "trustshop":
        case "trustshop":
        case "trustshops":
        case "trustshops":
        case "trustspartner":
        case "twistcasino":
        case "tybio":
        case "tybio":
        case "udeda":
        case "univermag":
        case "uns24":
        case "vasilkov":
        case "vintorez":
        case "vip-zona":
        case "virtual-legal":
        case "virtual-legal":
        case "vitaminrc":
        case "vredy":
        case "vredy":
        case "vsetyt":
        case "wayaway":
        case "weas":
        case "webru":
        case "weedhash":
        case "whiteamf":
        case "whitebunker":
        case "whitedolina":
        case "whzcchem":
        case "world-chemical":
        case "world-hentai":
        case "wustuff":
        case "wustuff":
        case "wvw-legalrc":
        case "www-legalrc":
        case "x4y":
        case "young-area":
        case "yourc":
        case "yourc":
        case "zaklad":
        case "zaklad":
        case "zaklad2":
        case "zaklad5ball":
        case "zakladka":
        case "zakladki":
        case "zakladki24":
        case "zakladrus":
        case "zamuti24":
        case "zargacum":
        case "zomzom":
        case "zoorc24":
          return true;
        case "alf-rc":
          return doms.pop() === "hb";
        case "caivp":
          switch( doms.pop() ) {
            case "24":
            case "247":
            case "avtoklad":
              return true;
          }
          break;
        case "dcge":
          switch( doms.pop() ) {
            case "amfetamin-eyforetiknizhniy-tagil":
            case "boshkitumen":
              return true;
          }
          break;
        case "e-w":
          return doms.pop() === "spays-kazan";
        case "eurobro":
          return doms.pop() === "gde-kupit-spajs_orenburg";
        case "fiton":
          return doms.pop() === "1gde-mozhno-kuritelnye-smesi-v-kazanii";
        case "flge":
          switch( doms.pop() ) {
            case "11":
            case "pirat5":
              return true;
          }
          break;
        case "jofra":
          return doms.pop() === "zz";
        case "kanna":
          return doms.pop() === "en";
        case "karakum":
          return doms.pop() === "eng";
        case "kladlegal":
          switch( doms.pop() ) {
            case "ghdie-kupit-boshki-orienburgh":
            case "ghdie-kupit-boshki-solikamsk":
            case "ghdie-kupit-spais-eliektrostal":
            case "ghdie-kupit-spais-kunghur":
              return true;
          }
          break;
        case "ldbj":
          return doms.pop() === "kupit-legalnyy-poroshok-v-syktyvkare";
        case "livedoor":
          switch( doms.pop() ) {
            case "pic2ch":
            case "stalker":
              return true;
          }
          break;
        case "miap":
          switch( doms.pop() ) {
            case "kupit-spays-astrahan":
            case "kupit-spays-kazan":
            case "kupit-spays-v-astrahani":
            case "kupit-spays-v-krasnoyarske":
            case "kupit-spice-surgut":
            case "kuritelnye-smesi-kupit-v-kazani":
            case "legalnye-poroshki-cheboksary":
            case "legalnye-poroshki-nizhniy-novgorod":
            case "legalnye-poroshki-v-barnaule":
            case "legalnye-poroshki-v-moskve-kruglosutochno":
            case "legalnye-poroshki-v-nizhnem-novgorode":
            case "legalnye-poroshki-v-nizhnevartovske":
            case "legalnye-poroshki-v-novokuznecke":
            case "legalnye-poroshki-v-novosibirske":
            case "legalnye-poroshki-v-penze":
            case "legalnye-poroshki-v-rostove-kupit":
            case "legalnye-poroshki-v-samare":
            case "legalnye-poroshki-v-sochi":
            case "legalnye-poroshki-v-spb":
            case "legalnye-poroshki-zakladki":
            case "legalnye-soli-kupit-v-izhevske":
              return true;
          }
          break;
        case "o-q":
          switch( doms.pop() ) {
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-ekaterinburge":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-kirove":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-kostrome":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-krasnodare":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-magnitogorske":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-dmitrove":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-domodedovo":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-habarovske":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-kirove":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-kolomne":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-koroleve":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-lubercah":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-mytischah":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-nizhnem-novgorode":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-podolske":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-surgute":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-tumeni":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-zelenograde":
            case "gde-zakazat-vzyat-kupit-legalnye-poroshki-v-abakane":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-abakane":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-astrahani":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-bryanske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-cheboksarah":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-chelyabinske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-habarovske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-irkutske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-ivanovo":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-izhevske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-kazani":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-kemerovo":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-kirove":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-kurgane":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-kurske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-lipecke":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-magnitogorske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-moskve":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-naberezhnyh-chelnah":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-nizhnevartovske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-odincovo":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-orle":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-permi":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-pitere":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-saranske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-sterlitamake":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-syktyvkare":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-ufe":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-ulyanovske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-volgograde":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-volzhskom":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-voronezhe":
            case "kupit-amfetamin-eyforetik-v-ekaterinburge":
            case "kupit-amfetamin-eyforetik-v-izhevske":
            case "kupit-amfetamin-eyforetik-v-kirove":
            case "kupit-amfetamin-eyforetik-v-kostrome":
            case "kupit-amfetamin-eyforetik-v-krasnodare":
            case "kupit-amfetamin-eyforetik-v-kurgane":
            case "kupit-amfetamin-eyforetik-v-magnitogorske":
            case "kupit-amfetamin-eyforetik-v-nizhnem-novgorode":
            case "kupit-amfetamin-eyforetik-v-ryazani":
            case "kupit-amfetamin-eyforetik-v-sankt-peterburge":
            case "kupit-amfetamin-eyforetik-v-syktyvkare":
            case "kupit-amfetamin-eyforetik-v-yoshkar-ole":
            case "kupit-ekstazi-mdma-pilsy-v-dmitrove":
            case "kupit-ekstazi-mdma-pilsy-v-domodedovo":
            case "kupit-ekstazi-mdma-pilsy-v-kirove":
            case "kupit-ekstazi-mdma-pilsy-v-kolomne":
            case "kupit-ekstazi-mdma-pilsy-v-koroleve":
            case "kupit-ekstazi-mdma-pilsy-v-lubercah":
            case "kupit-ekstazi-mdma-pilsy-v-mytischah":
            case "kupit-ekstazi-mdma-pilsy-v-nizhnem-novgorode":
            case "kupit-ekstazi-mdma-pilsy-v-novosibirske":
            case "kupit-ekstazi-mdma-pilsy-v-odincovo":
            case "kupit-ekstazi-mdma-pilsy-v-podolske":
            case "kupit-ekstazi-mdma-pilsy-v-surgute":
            case "kupit-ekstazi-mdma-pilsy-v-tumeni":
            case "kupit-ekstazi-mdma-pilsy-v-zelenograde":
            case "kupit-jwh-reagent-dlya-spaysa-v-pyatigorske":
            case "kupit-legalnye-poroshki-v-abakane":
            case "kupit-skorost-mdpv-v-abakane":
            case "kupit-skorost-mdpv-v-barnaule":
            case "kupit-skorost-mdpv-v-bryanske":
            case "kupit-skorost-mdpv-v-cheboksarah":
            case "kupit-skorost-mdpv-v-chelyabinske":
            case "kupit-skorost-mdpv-v-irkutske":
            case "kupit-skorost-mdpv-v-ivanovo":
            case "kupit-skorost-mdpv-v-izhevske":
            case "kupit-skorost-mdpv-v-kazani":
            case "kupit-skorost-mdpv-v-kemerovo":
            case "kupit-skorost-mdpv-v-kirove":
            case "kupit-skorost-mdpv-v-kurgane":
            case "kupit-skorost-mdpv-v-kurske":
            case "kupit-skorost-mdpv-v-lipecke":
            case "kupit-skorost-mdpv-v-magnitogorske":
            case "kupit-skorost-mdpv-v-moskve":
            case "kupit-skorost-mdpv-v-naberezhnyh-chelnah":
            case "kupit-skorost-mdpv-v-nizhnevartovske":
            case "kupit-skorost-mdpv-v-odincovo":
            case "kupit-skorost-mdpv-v-permi":
            case "kupit-skorost-mdpv-v-pitere":
            case "kupit-skorost-mdpv-v-rostove-na-donu":
            case "kupit-skorost-mdpv-v-saranske":
            case "kupit-skorost-mdpv-v-sterlitamake":
            case "kupit-skorost-mdpv-v-syktyvkare":
            case "kupit-skorost-mdpv-v-ulyanovske":
            case "kupit-skorost-mdpv-v-volgograde":
            case "kupit-skorost-mdpv-v-volzhskom":
            case "kupit-skorost-mdpv-v-voronezhe":
              return true;
          }
          break;
        case "onlyhot":
          return doms.pop() === "chan";
        case "pharma-chem":
          return doms.pop() === "en";
        case "piek":
          switch( doms.pop() ) {
            case "jwh-ryazan":
            case "jwh-sochi":
            case "kupit-jwh-arhangelsk":
            case "kupit-jwh-bryansk":
            case "kupit-jwh-ekaterinburg":
            case "kupit-jwh-irkutsk":
            case "kupit-jwh-kaliningrad":
            case "kupit-jwh-kemerovo":
            case "kupit-jwh-magnitogorsk":
            case "kupit-jwh-murmansk":
            case "kupit-jwh-nizhniy-novgorod":
            case "kupit-jwh-novokuzneck":
            case "kupit-jwh-orenburg":
            case "kupit-jwh-penza":
            case "kupit-jwh-ryazan":
            case "kupit-jwh-samara":
            case "kupit-jwh-sankt-peterburg":
            case "kupit-jwh-sochi":
            case "kupit-jwh-vladivostok":
            case "kupit-jwh-volgograd":
            case "kupit-jwh-volzhskiy":
            case "kupit-jwh-yoshkar-ola":
            case "kupit-kuritelnye-smesi-chita":
            case "kupit-kuritelnye-smesi-lipeck":
            case "kupit-kuritelnye-smesi-nizhniy-tagil":
            case "kupit-kuritelnye-smesi-voronezh":
            case "kupit-legalnye-narkotiki-v-moskve":
            case "kupit-legalnye-poroshki-v-ulyanovske":
            case "kupit-legalnyy-poroshok-v-anape":
            case "kupit-legalnyy-poroshok-v-magnitogorske":
            case "kupit-legalnyy-poroshok-v-saratove":
            case "kupit-spays-arhangelsk":
            case "kupit-spays-bryansk":
            case "kupit-spays-chita":
            case "kupit-spays-ekaterinburg":
            case "kupit-spays-habarovsk":
            case "kupit-spays-irkutsk":
            case "kupit-spays-ivanovo":
            case "kupit-spays-izhevsk":
            case "kupit-spays-kaliningrad":
            case "kupit-spays-kaluga":
            case "kupit-spays-kemerovo":
            case "kupit-spays-kostroma":
            case "kupit-spays-krasnoyarsk":
            case "kupit-spays-kurgan":
            case "kupit-spays-kursk":
            case "kupit-spays-naberezhnye-chelny":
            case "kupit-spays-nizhniy-novgorod":
            case "kupit-spays-orenburg":
            case "kupit-spays-penza":
            case "kupit-spays-perm":
            case "kupit-spays-petrozavodsk":
            case "kupit-spays-ryazan":
            case "kupit-spays-sankt-peterburg":
            case "kupit-spays-saratov":
            case "kupit-spays-smolensk":
            case "kupit-spays-stavropol":
            case "kupit-spays-tumen":
            case "kupit-spays-tver":
            case "kupit-spays-v-chelyabinske":
            case "kupit-spays-v-irkutske":
            case "kupit-spays-v-kaluge":
            case "kupit-spays-v-krasnoyarske":
            case "kupit-spays-v-kurske":
            case "kupit-spays-v-moskve-optom":
            case "kupit-spays-v-mytischah":
            case "kupit-spays-v-penze":
            case "kupit-spays-v-volgograde":
            case "kupit-spays-v-voronezhe":
            case "kupit-spays-vladikavkaz":
            case "kupit-spays-vladimir":
            case "kupit-spays-vladivostok":
            case "kupit-spays-volgograd":
            case "kupit-spays-volzhskiy":
            case "kupit-spice-bryansk":
            case "kupit-spice-ivanovo":
            case "kupit-spice-kazan":
            case "kupit-spice-komsomolsk-na-amure":
            case "kupit-spice-vladikavkaz":
            case "kupit-v-permi-spays":
            case "kuritelnye-smesi-barnaul":
            case "kuritelnye-smesi-kupit-v-barnaule":
            case "kuritelnye-smesi-kupit-v-chelyabinske":
            case "kuritelnye-smesi-v-ufe-kupit":
            case "legalnye-kuritelnye-miksy-krasnodar":
            case "legalnye-kuritelnye-miksy-surgut":
            case "legalnye-kuritelnye-smesi-krasnodar":
            case "legalnye-narkotiki-irkutsk":
            case "legalnye-narkotiki-krasnodar":
            case "legalnye-poroshki-arhangelsk":
            case "legalnye-poroshki-chelyabinks":
            case "legalnye-poroshki-chita":
            case "legalnye-poroshki-irkutsk":
            case "legalnye-poroshki-kaliningrad":
            case "legalnye-poroshki-kazan":
            case "legalnye-poroshki-kirov":
            case "legalnye-poroshki-krasnodar":
            case "legalnye-poroshki-krasnoyarsk":
            case "legalnye-poroshki-kursk":
            case "legalnye-poroshki-lipeck":
            case "legalnye-poroshki-magnitogorsk":
            case "legalnye-poroshki-naberezhnye-chelny":
            case "legalnye-poroshki-nizhnevartovsk":
            case "legalnye-poroshki-nizhniy-novgorod":
            case "legalnye-poroshki-nizhniy-tagil":
            case "legalnye-poroshki-novokuzneck":
            case "legalnye-poroshki-novosibirsk":
            case "legalnye-poroshki-omsk":
            case "legalnye-poroshki-orenburg":
            case "legalnye-poroshki-orl":
            case "legalnye-poroshki-penza":
            case "legalnye-poroshki-petrozavodsk":
            case "legalnye-poroshki-rostov":
            case "legalnye-poroshki-ryazan":
            case "legalnye-poroshki-sankt-peterburg":
            case "legalnye-poroshki-saransk":
            case "legalnye-poroshki-saratov":
            case "legalnye-poroshki-smolensk":
            case "legalnye-poroshki-stavropol":
            case "legalnye-poroshki-sterlitamak":
            case "legalnye-poroshki-surgut":
            case "legalnye-poroshki-taganrog":
            case "legalnye-poroshki-tolyatti":
            case "legalnye-poroshki-tomsk":
            case "legalnye-poroshki-tver":
            case "legalnye-poroshki-ulyanovsk":
            case "legalnye-poroshki-v-moskve-kruglosutochno":
            case "legalnye-poroshki-v-novosibirske":
            case "legalnye-poroshki-v-pitere":
            case "legalnye-poroshki-v-rostove":
            case "legalnye-poroshki-v-rostove-kupit":
            case "legalnye-poroshki-v-tolyatti":
            case "legalnye-poroshki-v-volgograde":
            case "legalnye-poroshki-vladikavkaz":
            case "legalnye-poroshki-vladimir":
            case "legalnye-poroshki-volgograd":
            case "legalnye-poroshki-volzhskiy":
            case "legalnye-poroshki-yakutsk":
            case "legalnye-poroshki-yaroslavl":
            case "legalnye-poroshki-yoshkar-ola":
              return true;
          }
          break;
        case "pokerstars":
          return doms.pop() === "ru";
        case "qmems":
          return doms.pop() === "kupit-spays-groznyy";
        case "qnems":
          switch( doms.pop() ) {
            case "kupit-spays-murmansk":
            case "kupit-spays-perm":
            case "legalnyy-poroshok-kazan":
              return true;
          }
          break;
        case "rc-market":
          return doms.pop() === "legalproduct";
        case "reagenty-kuritelnyye-smesi-geroin-efedrin-metadon-lsd-mdma-jwh":
          return doms.pop() === "legalnyye-narkotiki-sol-dlya-vann-dzhiviash";
        case "relaxportal":
          return doms.pop() === "moscow";
        case "renas":
          switch( doms.pop() ) {
            case "boshki-miks-sol-kupit-v-nizhnem-novgorode":
            case "kupit-boshki-v-moskve":
            case "kupit-legalku-po-zakladke-v-moskve":
            case "kupit-legalku-v-novorossiyske":
            case "kupit-legalnye-poroshki-v-cheboksarah":
            case "kupit-legalnye-poroshki-v-surgute":
            case "kupit-legalnye-poroshki-v-ufe":
            case "kupit-skorost-spays-sol-v-yaroslavle":
            case "kurnut-v-sudake-boshki-konopli-kupit":
            case "poroh-spays-kupit-v-krasnoyarske":
              return true;
          }
          break;
        case "ritte":
          switch( doms.pop() ) {
            case "jwh-izhevsk":
            case "kupit-kuritelnye-miksy-izhevsk":
            case "kupit-kuritelnye-miksy-krasnoyarsk":
            case "kupit-kuritelnye-miksy-sochi":
            case "kupit-kuritelnye-smesi-kruglosutochno":
            case "kupit-kuritelnye-smesi-kuzminki":
            case "kupit-kuritelnye-smesi-v-himkah":
            case "kupit-kuritelnye-smesi-v-kaluge":
            case "kupit-kuritelnye-smesi-v-krasnodare":
            case "kupit-kuritelnye-smesi-v-krasnoyarske":
            case "kupit-kuritelnye-smesi-v-lubercah":
            case "kupit-kuritelnye-smesi-v-smolenske":
            case "kupit-kuritelnye-smesi-v-spb":
            case "kupit-kuritelnye-smesi-v-yaroslavle":
            case "kupit-kuritelnye-smesi-vladikavkaz":
            case "kupit-kuritelnye-smesi-vyhino":
            case "kupit-legalnye-kuritelnye-smesi-optom":
            case "kupit-legalnye-narkotiki-v-moskve":
            case "kupit-legalnye-poroshki-vo-vladivostoke":
            case "kupit-legalnyy-poroshok-v-anape":
            case "kupit-spays-kazan":
            case "kupit-spays-kostroma":
            case "kupit-spays-sankt-peterburg":
            case "kupit-spays-v-smolenske":
            case "kupit-spays-volzhskiy":
            case "kupit-spice-irkutsk":
            case "kuritelnye-miksy-ekaterinburg":
            case "kuritelnye-miksy-kostroma":
            case "kuritelnye-smesi-kazan":
            case "kuritelnye-smesi-kupit-v-kazani":
            case "kuritelnye-smesi-v-butovo":
            case "legalnye-kuritelnye-miksy-kaliningrad":
            case "legalnye-kuritelnye-miksy-vladivostok":
            case "legalnye-kuritelnye-smesi-surgut":
            case "legalnye-miksy-volzhskiy":
            case "legalnye-narkotiki-ekaterinburg":
            case "legalnye-narkotiki-krasnoyarsk":
            case "legalnye-poroshki-cheboksary":
            case "legalnye-poroshki-kostroma":
            case "legalnye-poroshki-naberezhnye-chelny":
            case "legalnye-poroshki-nizhnevartovsk":
            case "legalnye-poroshki-ulan-ude":
            case "legalnye-poroshki-vologda":
              return true;
          }
          break;
        case "sabec":
          switch( doms.pop() ) {
            case "kupit-jwh-kazan":
            case "legalnye-soli-v-nizhnem-novgorode":
              return true;
          }
          break;
        case "salerc":
          return doms.pop() === "orda";
        case "sf7":
          switch( doms.pop() ) {
            case "kupit-amfetamin-eyforetikbryansk":
            case "kupit-amfetamin-eyforetikchita":
            case "kupit-amfetamin-eyforetikgroznyy":
            case "kupit-amfetamin-eyforetikhimki":
            case "kupit-amfetamin-eyforetikizhevsk":
            case "kupit-amfetamin-eyforetikkazan":
            case "kupit-amfetamin-eyforetikkislovodsk":
            case "kupit-amfetamin-eyforetikkrasnodar":
            case "kupit-amfetamin-eyforetikmoskva":
            case "kupit-amfetamin-eyforetikmurmansk":
            case "kupit-amfetamin-eyforetiknahodka":
            case "kupit-amfetamin-eyforetiknizhniy-novgorod":
            case "kupit-amfetamin-eyforetikorenburg":
            case "kupit-amfetamin-eyforetikpenza":
            case "kupit-amfetamin-eyforetikperm":
            case "kupit-amfetamin-eyforetikpetropavlovsk-kamchatskiy":
            case "kupit-amfetamin-eyforetikrostov-na-donu":
            case "kupit-amfetamin-eyforetiksamara":
            case "kupit-amfetamin-eyforetikschelkovo":
            case "kupit-amfetamin-eyforetikserpuhov":
            case "kupit-amfetamin-eyforetiksochi":
            case "kupit-amfetamin-eyforetiksterlitamak":
            case "kupit-amfetamin-eyforetikuzhno-sahalinsk":
            case "kupit-amfetamin-eyforetikvladivostok":
            case "kupit-amfetamin-eyforetikvoronezh":
            case "kupit-boshkiekaterinburg":
            case "kupit-boshkimoskva":
            case "kupit-boshkinovosibirsk":
            case "kupit-boshkirybinsk":
            case "kupit-boshkivoronezh":
            case "kupit-ekstazi-mdma-pilsyblagoveschensk":
            case "kupit-ekstazi-mdma-pilsychelyabinsk":
            case "kupit-ekstazi-mdma-pilsyekaterinburg":
            case "kupit-ekstazi-mdma-pilsyhabarovsk":
            case "kupit-ekstazi-mdma-pilsyivanovo":
            case "kupit-ekstazi-mdma-pilsykazan":
            case "kupit-ekstazi-mdma-pilsykolomna":
            case "kupit-ekstazi-mdma-pilsykrasnoyarsk":
            case "kupit-ekstazi-mdma-pilsymytischi":
            case "kupit-ekstazi-mdma-pilsynovosibirsk":
            case "kupit-ekstazi-mdma-pilsyserpuhov":
            case "kupit-ekstazi-mdma-pilsytumen":
            case "kupit-ekstazi-mdma-pilsyulan-ude":
            case "kupit-gashish-moskva":
            case "kupit-jwh-reagentizhevsk":
            case "kupit-jwh-reagentulyanovsk":
            case "kupit-kokaingroznyy":
            case "kupit-legalnye-narkotikikazan":
            case "kupit-legalnye-poroshkimagadan":
            case "kupit-legalnye-poroshkitumen":
            case "kupit-legalnye-poroshkiufa":
            case "kupit-skorost-mdpv-angarsk":
            case "kupit-skorost-mdpv-arhangelsk":
            case "kupit-skorost-mdpv-armavir":
            case "kupit-skorost-mdpv-ekaterinburg":
            case "kupit-skorost-mdpv-elec":
            case "kupit-skorost-mdpv-habarovsk":
            case "kupit-skorost-mdpv-kazan":
            case "kupit-skorost-mdpv-krasnoyarsk":
            case "kupit-skorost-mdpv-magnitogorsk":
            case "kupit-skorost-mdpv-novorossiysk":
            case "kupit-skorost-mdpv-noyabrsk":
            case "kupit-skorost-mdpv-samara":
            case "kupit-skorost-mdpv-tumen":
            case "kupit-skorost-mdpv-vladivostok":
            case "kupit-skorost-mdpv-voronezh":
            case "kupit-skorost-mdpv-yakutsk":
            case "kupit-spayscheboksary":
            case "kupit-spayshabarovsk":
            case "kupit-spayshimki":
            case "kupit-spaysnaberezhnye-chelny":
            case "kupit-spaysstavropol":
            case "kupit-spayssyktyvkar":
            case "kupit-spayssyzran":
            case "kupit-spaystaganrog":
            case "kupit-spaystambov":
            case "kupit-spaystobolsk":
            case "kupit-spaystolyatti":
            case "kupit-spaystomsk":
            case "kupit-spaystumen":
            case "kupit-spaystver":
            case "kupit-spaysufa":
            case "kupit-spaysulan-ude":
            case "kupit-spaysussuriysk":
            case "kupit-spaysyalta":
              return true;
          }
          break;
        case "sloat":
          switch( doms.pop() ) {
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-chelyabinske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-ekaterinburge":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-irkutske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-izhevske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-kirove":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-koroleve":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-krasnodare":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-lubercah":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-minske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-moskve":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-mytischah":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-nizhnem-novgorode":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-novosibirske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-omske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-orle":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-permi":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-podolske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-rostove-na-donu":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-ryazani":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-smolenske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-tumeni":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-ulan-ude":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-ulyanovske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-voronezhe":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-yaroslavle":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-yoshkar-ole":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-zelenograde":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-cherepovce":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-domodedovo":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-ekaterinburge":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-odincovo":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-podolske":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-abakane":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-bryanske":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-chelyabinske":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-kaliningrade":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-kazani":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-kirove":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-krasnodare":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-kurgane":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-magnitogorske":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-novosibirske":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-permi":
            case "gde-zakazat-vzyat-kupit-legalnye-narkotiki-v-kazani":
            case "gde-zakazat-vzyat-kupit-legalnye-poroshki-v-ukraine":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-abakane":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-arhangelske":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-astrahani":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-irkutske":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-izhevske":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-kemerovo":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-kirove":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-krasnodare":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-kurgane":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-kurske":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-lipecke":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-permi":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-ryazani":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-volzhskom":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-voronezhe":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-barnaule":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-cheboksarah":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-ekaterinburge":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-habarovske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-irkutske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-kazani":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-krasnodare":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-krasnoyarske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-kurske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-moskve":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-nizhnevartovske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-novosibirske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-orle":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-pitere":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-rostove-na-donu":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-sankt-peterburge":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-saranske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-spb":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-sterlitamake":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-ufe":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-volgograde":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-volzhskom":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-voronezhe":
            case "gde-zakazat-vzyat-kupit-spays-v-kaliningrade":
            case "gde-zakazat-vzyat-kupit-spays-v-krasnoyarske":
            case "gde-zakazat-vzyat-kupit-spays-v-kurgane":
            case "gde-zakazat-vzyat-kupit-spays-v-naberezhnyh-chelnah":
            case "gde-zakazat-vzyat-kupit-spays-v-nizhnevartovske":
            case "gde-zakazat-vzyat-kupit-spays-v-novokuznecke":
            case "gde-zakazat-vzyat-kupit-spays-v-orle":
            case "gde-zakazat-vzyat-kupit-spays-v-penze":
            case "gde-zakazat-vzyat-kupit-spays-v-petrozavodske":
            case "gde-zakazat-vzyat-kupit-spays-v-ryazani":
            case "gde-zakazat-vzyat-kupit-spays-v-sankt-peterburge":
            case "gde-zakazat-vzyat-kupit-spays-v-saratove":
            case "gde-zakazat-vzyat-kupit-spays-v-smolenske":
            case "gde-zakazat-vzyat-kupit-spays-v-sochi":
            case "gde-zakazat-vzyat-kupit-spays-v-syktyvkare":
            case "kupit-amfetamin-eyforetik-v-abakane":
            case "kupit-amfetamin-eyforetik-v-chelyabinske":
            case "kupit-amfetamin-eyforetik-v-dmitrove":
            case "kupit-amfetamin-eyforetik-v-domodedovo":
            case "kupit-amfetamin-eyforetik-v-ekaterinburge":
            case "kupit-amfetamin-eyforetik-v-irkutske":
            case "kupit-amfetamin-eyforetik-v-izhevske":
            case "kupit-amfetamin-eyforetik-v-kirove":
            case "kupit-amfetamin-eyforetik-v-kolomne":
            case "kupit-amfetamin-eyforetik-v-koroleve":
            case "kupit-amfetamin-eyforetik-v-krasnodare":
            case "kupit-amfetamin-eyforetik-v-lubercah":
            case "kupit-amfetamin-eyforetik-v-mahachkale":
            case "kupit-amfetamin-eyforetik-v-mytischah":
            case "kupit-amfetamin-eyforetik-v-nizhnem-novgorode":
            case "kupit-amfetamin-eyforetik-v-novosibirske":
            case "kupit-amfetamin-eyforetik-v-odincovo":
            case "kupit-amfetamin-eyforetik-v-omske":
            case "kupit-amfetamin-eyforetik-v-orle":
            case "kupit-amfetamin-eyforetik-v-permi":
            case "kupit-amfetamin-eyforetik-v-rostove-na-donu":
            case "kupit-amfetamin-eyforetik-v-ryazani":
            case "kupit-amfetamin-eyforetik-v-samare":
            case "kupit-amfetamin-eyforetik-v-smolenske":
            case "kupit-amfetamin-eyforetik-v-tumeni":
            case "kupit-amfetamin-eyforetik-v-ulan-ude":
            case "kupit-amfetamin-eyforetik-v-ulyanovske":
            case "kupit-amfetamin-eyforetik-v-voronezhe":
            case "kupit-amfetamin-eyforetik-v-yaroslavle":
            case "kupit-amfetamin-eyforetik-v-yoshkar-ole":
            case "kupit-amfetamin-eyforetik-v-zelenograde":
            case "kupit-boshki-v-spb":
            case "kupit-ekstazi-mdma-pilsy-v-domodedovo":
            case "kupit-ekstazi-mdma-pilsy-v-ekaterinburge":
            case "kupit-ekstazi-mdma-pilsy-v-habarovske":
            case "kupit-ekstazi-mdma-pilsy-v-nizhnem-novgorode":
            case "kupit-ekstazi-mdma-pilsy-v-podolske":
            case "kupit-ekstazi-mdma-pilsy-v-tumeni":
            case "kupit-jwh-reagent-dlya-spaysa-v-abakane":
            case "kupit-jwh-reagent-dlya-spaysa-v-arhangelske":
            case "kupit-jwh-reagent-dlya-spaysa-v-astrahani":
            case "kupit-jwh-reagent-dlya-spaysa-v-bryanske":
            case "kupit-jwh-reagent-dlya-spaysa-v-chelyabinske":
            case "kupit-jwh-reagent-dlya-spaysa-v-ekaterinburge":
            case "kupit-jwh-reagent-dlya-spaysa-v-grodno":
            case "kupit-jwh-reagent-dlya-spaysa-v-izhevske":
            case "kupit-jwh-reagent-dlya-spaysa-v-kirove":
            case "kupit-jwh-reagent-dlya-spaysa-v-krasnodare":
            case "kupit-jwh-reagent-dlya-spaysa-v-krasnoyarske":
            case "kupit-jwh-reagent-dlya-spaysa-v-kurgane":
            case "kupit-jwh-reagent-dlya-spaysa-v-lipecke":
            case "kupit-jwh-reagent-dlya-spaysa-v-moskve":
            case "kupit-jwh-reagent-dlya-spaysa-v-nizhnem-novgorode":
            case "kupit-jwh-reagent-dlya-spaysa-v-novokuznecke":
            case "kupit-jwh-reagent-dlya-spaysa-v-novosibirske":
            case "kupit-jwh-reagent-dlya-spaysa-v-orenburge":
            case "kupit-jwh-reagent-dlya-spaysa-v-permi":
            case "kupit-jwh-reagent-dlya-spaysa-v-rostove-na-donu":
            case "kupit-jwh-reagent-dlya-spaysa-v-samare":
            case "kupit-jwh-reagent-dlya-spaysa-v-sankt-peterburge":
            case "kupit-jwh-reagent-dlya-spaysa-v-turinske":
            case "kupit-jwh-reagent-dlya-spaysa-v-volgograde":
            case "kupit-jwh-reagent-dlya-spaysa-v-volzhskom":
            case "kupit-jwh-reagent-dlya-spaysa-v-voronezhe":
            case "kupit-jwh-reagent-dlya-spaysa-v-yoshkar-ole":
            case "kupit-legalnye-poroshki-v-bratske":
            case "kupit-legalnye-poroshki-v-kazani":
            case "kupit-legalnye-poroshki-v-krasnodare":
            case "kupit-legalnye-poroshki-v-lubercah":
            case "kupit-legalnye-poroshki-v-nizhnem-novgorode":
            case "kupit-legalnye-poroshki-v-sochi":
            case "kupit-legalnye-poroshki-v-tambove":
            case "kupit-legalnye-poroshki-v-tomske":
            case "kupit-legalnye-poroshki-v-tumeni":
            case "kupit-met-sol-skorost-spays-jwh-v-abakane":
            case "kupit-met-sol-skorost-spays-jwh-v-arhangelske":
            case "kupit-met-sol-skorost-spays-jwh-v-astrahani":
            case "kupit-met-sol-skorost-spays-jwh-v-ekaterinburge":
            case "kupit-met-sol-skorost-spays-jwh-v-irkutske":
            case "kupit-met-sol-skorost-spays-jwh-v-izhevske":
            case "kupit-met-sol-skorost-spays-jwh-v-kaliningrade":
            case "kupit-met-sol-skorost-spays-jwh-v-kazani":
            case "kupit-met-sol-skorost-spays-jwh-v-kemerovo":
            case "kupit-met-sol-skorost-spays-jwh-v-krasnoyarske":
            case "kupit-met-sol-skorost-spays-jwh-v-kurske":
            case "kupit-met-sol-skorost-spays-jwh-v-lipecke":
            case "kupit-met-sol-skorost-spays-jwh-v-magnitogorske":
            case "kupit-met-sol-skorost-spays-jwh-v-nizhnem-novgorode":
            case "kupit-met-sol-skorost-spays-jwh-v-novokuznecke":
            case "kupit-met-sol-skorost-spays-jwh-v-novosibirske":
            case "kupit-met-sol-skorost-spays-jwh-v-orenburge":
            case "kupit-met-sol-skorost-spays-jwh-v-permi":
            case "kupit-met-sol-skorost-spays-jwh-v-petrozavodske":
            case "kupit-met-sol-skorost-spays-jwh-v-ryazani":
            case "kupit-met-sol-skorost-spays-jwh-v-samare":
            case "kupit-met-sol-skorost-spays-jwh-v-volgograde":
            case "kupit-met-sol-skorost-spays-jwh-v-volzhskom":
            case "kupit-met-sol-skorost-spays-jwh-v-voronezhe":
            case "kupit-met-sol-skorost-spays-jwh-v-yoshkar-ole":
            case "kupit-skorost-mdpv-v-barnaule":
            case "kupit-skorost-mdpv-v-cheboksarah":
            case "kupit-skorost-mdpv-v-ekaterinburge":
            case "kupit-skorost-mdpv-v-habarovske":
            case "kupit-skorost-mdpv-v-ivanovo":
            case "kupit-skorost-mdpv-v-izhevske":
            case "kupit-skorost-mdpv-v-kaluge":
            case "kupit-skorost-mdpv-v-kazani":
            case "kupit-skorost-mdpv-v-krasnodare":
            case "kupit-skorost-mdpv-v-krasnoyarske":
            case "kupit-skorost-mdpv-v-lipecke":
            case "kupit-skorost-mdpv-v-moskve":
            case "kupit-skorost-mdpv-v-nizhnem-novgorode":
            case "kupit-skorost-mdpv-v-novosibirske":
            case "kupit-skorost-mdpv-v-omske":
            case "kupit-skorost-mdpv-v-orle":
            case "kupit-skorost-mdpv-v-rostove-na-donu":
            case "kupit-skorost-mdpv-v-ryazani":
            case "kupit-skorost-mdpv-v-sankt-peterburge":
            case "kupit-skorost-mdpv-v-saranske":
            case "kupit-skorost-mdpv-v-spb":
            case "kupit-skorost-mdpv-v-sterlitamake":
            case "kupit-skorost-mdpv-v-tomske":
            case "kupit-skorost-mdpv-v-ufe":
            case "kupit-skorost-mdpv-v-volgograde":
            case "kupit-skorost-mdpv-v-volzhskom":
            case "kupit-skorost-mdpv-v-voronezhe":
            case "kupit-spays-v-kaliningrade":
            case "kupit-spays-v-kemerovo":
            case "kupit-spays-v-kirove":
            case "kupit-spays-v-krasnoyarske":
            case "kupit-spays-v-naberezhnyh-chelnah":
            case "kupit-spays-v-nizhnevartovske":
            case "kupit-spays-v-novokuznecke":
            case "kupit-spays-v-novosibirske":
            case "kupit-spays-v-omske":
            case "kupit-spays-v-orenburge":
            case "kupit-spays-v-orle":
            case "kupit-spays-v-penze":
            case "kupit-spays-v-permi":
            case "kupit-spays-v-samare":
            case "kupit-spays-v-sankt-peterburge":
            case "kupit-spays-v-saratove":
            case "kupit-spays-v-stavropole":
            case "kupit-spays-v-syktyvkare":
            case "skorost-mdpv-v-krasnoyarske":
            case "skorost-mdpv-v-moskve":
            case "skorost-mdpv-v-omske":
            case "skorost-mdpv-v-orle":
            case "skorost-mdpv-v-voronezhe":
              return true;
          }
          break;
        case "ssaib":
          switch( doms.pop() ) {
            case "boshki-v-spb":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-chelyabinske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-irkutske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-izhevske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-koroleve":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-krasnodare":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-lubercah":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-mytischah":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-nizhnem-novgorode":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-novosibirske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-odincovo":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-orenburge":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-permi":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-podolske":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-ryazani":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-samare":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-tumeni":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-ukraine":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-ulan-ude":
            case "gde-zakazat-vzyat-kupit-amfetamin-eyforetik-v-zelenograde":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-domodedovo":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-nizhnem-novgorode":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-podolske":
            case "gde-zakazat-vzyat-kupit-ekstazi-mdma-pilsy-v-tumeni":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-ekaterinburge":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-moskve":
            case "gde-zakazat-vzyat-kupit-jwh-reagent-dlya-spaysa-v-novokuznecke":
            case "gde-zakazat-vzyat-kupit-legalnye-poroshki-v-nizhnevartovske":
            case "gde-zakazat-vzyat-kupit-legalnye-poroshki-v-novogireevo":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-ryazani":
            case "gde-zakazat-vzyat-kupit-met-sol-skorost-spays-jwh-v-samare":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-barnaule":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-cheboksarah":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-habarovske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-irkutske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-ivanovo":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-izhevske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-moskve":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-nizhnevartovske":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-orle":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-pitere":
            case "gde-zakazat-vzyat-kupit-skorost-mdpv-v-rostove-na-donu":
            case "gde-zakazat-vzyat-kupit-spays-v-kaliningrade":
            case "gde-zakazat-vzyat-kupit-spays-v-kemerovo":
            case "gde-zakazat-vzyat-kupit-spays-v-kurgane":
            case "gde-zakazat-vzyat-kupit-spays-v-nizhnevartovske":
            case "gde-zakazat-vzyat-kupit-spays-v-orenburge":
            case "gde-zakazat-vzyat-kupit-spays-v-orle":
            case "gde-zakazat-vzyat-kupit-spays-v-penze":
            case "gde-zakazat-vzyat-kupit-spays-v-petrozavodske":
            case "gde-zakazat-vzyat-kupit-spays-v-samare":
            case "gde-zakazat-vzyat-kupit-spays-v-sankt-peterburge":
            case "gde-zakazat-vzyat-kupit-spays-v-saratove":
            case "gde-zakazat-vzyat-kupit-spays-v-smolenske":
            case "gde-zakazat-vzyat-kupit-spays-v-sochi":
            case "jwh-reagent-dlya-spaysa-v-yoshkar-ole":
            case "kupit-amfetamin-eyforetik-v-dmitrove":
            case "kupit-amfetamin-eyforetik-v-domodedovo":
            case "kupit-amfetamin-eyforetik-v-ekaterinburge":
            case "kupit-amfetamin-eyforetik-v-irkutske":
            case "kupit-amfetamin-eyforetik-v-kirove":
            case "kupit-amfetamin-eyforetik-v-krasnodare":
            case "kupit-amfetamin-eyforetik-v-lubercah":
            case "kupit-amfetamin-eyforetik-v-mytischah":
            case "kupit-amfetamin-eyforetik-v-nizhnem-novgorode":
            case "kupit-amfetamin-eyforetik-v-novosibirske":
            case "kupit-amfetamin-eyforetik-v-odincovo":
            case "kupit-amfetamin-eyforetik-v-omske":
            case "kupit-amfetamin-eyforetik-v-orle":
            case "kupit-amfetamin-eyforetik-v-permi":
            case "kupit-amfetamin-eyforetik-v-podolske":
            case "kupit-amfetamin-eyforetik-v-rostove-na-donu":
            case "kupit-amfetamin-eyforetik-v-ryazani":
            case "kupit-amfetamin-eyforetik-v-skaype":
            case "kupit-amfetamin-eyforetik-v-tumeni":
            case "kupit-amfetamin-eyforetik-v-ulan-ude":
            case "kupit-amfetamin-eyforetik-v-ulyanovske":
            case "kupit-amfetamin-eyforetik-v-voronezhe":
            case "kupit-amfetamin-eyforetik-v-yoshkar-ole":
            case "kupit-amfetamin-eyforetik-v-zelenograde":
            case "kupit-ekstazi-mdma-pilsy-v-ekaterinburge":
            case "kupit-ekstazi-mdma-pilsy-v-habarovske":
            case "kupit-ekstazi-mdma-pilsy-v-nizhnem-novgorode":
            case "kupit-ekstazi-mdma-pilsy-v-odincovo":
            case "kupit-ekstazi-mdma-pilsy-v-podolske":
            case "kupit-jwh-reagent-dlya-spaysa-v-pyatigorske":
            case "kupit-jwh-reagent-dlya-spaysa-v-samare":
            case "kupit-jwh-reagent-dlya-spaysa-v-volgograde":
            case "kupit-legalnye-poroshki-v-magnitogorske":
            case "kupit-legalnye-poroshki-v-taganroge":
            case "kupit-met-sol-skorost-spays-jwh-v-kemerovo":
            case "kupit-met-sol-skorost-spays-jwh-v-krasnodare":
            case "kupit-met-sol-skorost-spays-jwh-v-kurgane":
            case "kupit-met-sol-skorost-spays-jwh-v-novokuznecke":
            case "kupit-skorost-mdpv-v-angarske":
            case "kupit-skorost-mdpv-v-barnaule":
            case "kupit-skorost-mdpv-v-chite":
            case "kupit-skorost-mdpv-v-habarovske":
            case "kupit-skorost-mdpv-v-ivanovo":
            case "kupit-skorost-mdpv-v-izhevske":
            case "kupit-skorost-mdpv-v-lipecke":
            case "kupit-skorost-mdpv-v-orle":
            case "kupit-skorost-mdpv-v-pitere":
            case "kupit-skorost-mdpv-v-rostove-na-donu":
            case "kupit-skorost-mdpv-v-samare":
            case "kupit-skorost-mdpv-v-sankt-peterburge":
            case "kupit-skorost-mdpv-v-spb":
            case "kupit-skorost-mdpv-v-syktyvkare":
            case "kupit-skorost-mdpv-v-tule":
            case "kupit-skorost-mdpv-v-volzhskom":
            case "kupit-spays-v-kaliningrade":
            case "kupit-spays-v-kemerovo":
            case "kupit-spays-v-krasnoyarske":
            case "kupit-spays-v-kurgane":
            case "kupit-spays-v-naberezhnyh-chelnah":
            case "kupit-spays-v-novosibirske":
            case "kupit-spays-v-omske":
            case "kupit-spays-v-orle":
            case "kupit-spays-v-permi":
            case "kupit-spays-v-petrozavodske":
            case "kupit-spays-v-ryazani":
            case "kupit-spays-v-saratove":
            case "kupit-spays-v-smolenske":
            case "kupit-spays-v-sochi":
            case "kupit-spays-v-stavropole":
            case "kupit-spays-v-syktyvkare":
            case "kupit-spays-v-tumeni":
            case "skorost-mdpv-v-saranske":
            case "skorost-mdpv-v-sterlitamake":
              return true;
          }
          break;
        case "t-a":
          switch( doms.pop() ) {
            case "11":
            case "22":
            case "33":
            case "44":
            case "55":
            case "66":
            case "77":
              return true;
          }
          break;
        case "tlpp":
          switch( doms.pop() ) {
            case "formula-mn-25":
            case "gde-kupit-skorost":
            case "gde-kupit-skorost-narkotik":
            case "gde-kupit-skorost-v-novosibirske":
            case "jwh-018-gde-kupit":
            case "jwh-astrahan":
            case "jwh-belgorod":
            case "jwh-bryansk":
            case "jwh-irkutsk":
            case "jwh-naberezhnye-chelny":
            case "jwh-novosibirsk":
            case "jwh-ryazan":
            case "kupit-jwh":
            case "kupit-jwh-astrahan":
            case "kupit-jwh-habarovsk":
            case "kupit-jwh-kirov":
            case "kupit-jwh-krasnoyarsk":
            case "kupit-jwh-kurgan":
            case "kupit-jwh-lipeck":
            case "kupit-jwh-magnitogorsk":
            case "kupit-jwh-murmansk":
            case "kupit-jwh-nizhnevartovsk":
            case "kupit-jwh-nizhniy-novgorod":
            case "kupit-jwh-novokuzneck":
            case "kupit-jwh-omsk":
            case "kupit-jwh-penza":
            case "kupit-jwh-perm":
            case "kupit-jwh-rostov":
            case "kupit-jwh-surgut":
            case "kupit-jwh-taganrog":
            case "kupit-jwh-tula":
            case "kupit-jwh-tumen":
            case "kupit-jwh-vladivostok":
            case "kupit-jwh-volgograd":
            case "kupit-jwh-volzhskiy":
            case "kupit-jwh-yakutsk":
            case "kupit-jwh-yoshkar-ola":
            case "kupit-kuritelnye-miksy-barnaul":
            case "kupit-kuritelnye-miksy-bryansk":
            case "kupit-kuritelnye-miksy-cheboksary":
            case "kupit-kuritelnye-miksy-ivanovo":
            case "kupit-kuritelnye-miksy-izhevsk":
            case "kupit-kuritelnye-miksy-kemerovo":
            case "kupit-kuritelnye-miksy-magnitogorsk":
            case "kupit-kuritelnye-miksy-petrozavodsk":
            case "kupit-kuritelnye-miksy-samara":
            case "kupit-kuritelnye-miksy-sankt-peterburg":
            case "kupit-kuritelnye-miksy-sochi":
            case "kupit-kuritelnye-miksy-surgut":
            case "kupit-kuritelnye-miksy-tula":
            case "kupit-kuritelnye-miksy-ulyanovsk":
            case "kupit-kuritelnye-miksy-yakutsk":
            case "kupit-kuritelnye-smesi-astrahan":
            case "kupit-kuritelnye-smesi-cheboksary":
            case "kupit-kuritelnye-smesi-habarovsk":
            case "kupit-kuritelnye-smesi-izhevsk":
            case "kupit-kuritelnye-smesi-kirov":
            case "kupit-kuritelnye-smesi-kostroma":
            case "kupit-kuritelnye-smesi-magnitogorsk":
            case "kupit-kuritelnye-smesi-nizhniy-novgorod":
            case "kupit-kuritelnye-smesi-novosibirsk":
            case "kupit-kuritelnye-smesi-orl":
            case "kupit-kuritelnye-smesi-perm":
            case "kupit-kuritelnye-smesi-petrozavodsk":
            case "kupit-kuritelnye-smesi-saratov":
            case "kupit-kuritelnye-smesi-smolensk":
            case "kupit-kuritelnye-smesi-surgut":
            case "kupit-kuritelnye-smesi-tula":
            case "kupit-kuritelnye-smesi-tumen":
            case "kupit-kuritelnye-smesi-tver":
            case "kupit-kuritelnye-smesi-vladikavkaz":
            case "kupit-kuritelnye-smesi-vladimir":
            case "kupit-legalnye-kuritelnye-smesi":
            case "kupit-legalnye-poroshki-v-moskve":
            case "kupit-legalnye-smesi":
            case "kupit-legalnyy-kuritelnyy-miks":
            case "kupit-reagent-dlya-miksov":
            case "kupit-skorost":
            case "kupit-skorost-poroshok-legalnyy":
            case "kupit-spays-arhangelsk":
            case "kupit-spays-barnaul":
            case "kupit-spays-belgorod":
            case "kupit-spays-cheboksary":
            case "kupit-spays-groznyy":
            case "kupit-spays-habarovsk":
            case "kupit-spays-ivanovo":
            case "kupit-spays-kaliningrad":
            case "kupit-spays-kaluga":
            case "kupit-spays-kazan":
            case "kupit-spays-kemerovo":
            case "kupit-spays-komsomolsk-na-amure":
            case "kupit-spays-krasnodar":
            case "kupit-spays-krasnoyarsk":
            case "kupit-spays-lipeck":
            case "kupit-spays-magnitogorsk":
            case "kupit-spays-murmansk":
            case "kupit-spays-naberezhnye-chelny":
            case "kupit-spays-nizhniy-novgorod":
            case "kupit-spays-novokuzneck":
            case "kupit-spays-novosibirsk":
            case "kupit-spays-omsk":
            case "kupit-spays-orl":
            case "kupit-spays-perm":
            case "kupit-spays-samara":
            case "kupit-spays-saransk":
            case "kupit-spays-sochi":
            case "kupit-spays-sterlitamak":
            case "kupit-spays-surgut":
            case "kupit-spays-taganrog":
            case "kupit-spays-tula":
            case "kupit-spays-tumen":
            case "kupit-spays-tver":
            case "kupit-spays-ufa":
            case "kupit-spays-ulan-ude":
            case "kupit-spays-vladikavkaz":
            case "kupit-spays-vladivostok":
            case "kupit-spays-volzhskiy":
            case "kupit-spays-voronezh":
            case "kupit-spice-cheboksary":
            case "kupit-spice-izhevsk":
            case "kupit-spice-kurgan":
            case "kupit-spice-lipeck":
            case "kupit-spice-petrozavodsk":
            case "kupit-spice-rostov":
            case "kupit-spice-sankt-peterburg":
            case "kupit-spice-smolensk":
            case "kupit-spice-surgut":
            case "kupit-spice-tomsk":
            case "kupit-spice-vologda":
            case "kupit-spice-voronezh":
            case "kupit-spice-yaroslavl":
            case "kuplu-kuritelnyy-miks":
            case "kuplu-legalnyy-poroshok":
            case "kureha-krasnodar":
            case "kuritelnye-miksy-astrahan":
            case "kuritelnye-miksy-cheboksary":
            case "kuritelnye-miksy-komsomolsk-na-amure":
            case "kuritelnye-miksy-murmansk":
            case "kuritelnye-miksy-nizhnevartovsk":
            case "kuritelnye-miksy-novokuzneck":
            case "kuritelnye-miksy-saransk":
            case "kuritelnye-miksy-surgut":
            case "kuritelnye-miksy-tula":
            case "kuritelnye-miksy-voronezh":
            case "kuritelnye-miksy-yoshkar-ola":
            case "kuritelnye-smesi-barnaul":
            case "kuritelnye-smesi-habarovsk":
            case "kuritelnye-smesi-jwh":
            case "kuritelnye-smesi-surgut":
            case "kuritelnye-smesi-tula":
            case "legalnaya-skorost":
            case "legalnaya-trava":
            case "legalnye-kuritelnye-miksy":
            case "legalnye-kuritelnye-miksy-cheboksary":
            case "legalnye-kuritelnye-miksy-komsomolsk-na-amure":
            case "legalnye-kuritelnye-miksy-nizhniy-tagil":
            case "legalnye-kuritelnye-miksy-penza":
            case "legalnye-kuritelnye-miksy-saransk":
            case "legalnye-kuritelnye-miksy-sterlitamak":
            case "legalnye-kuritelnye-miksy-surgut":
            case "legalnye-kuritelnye-miksy-tula":
            case "legalnye-kuritelnye-miksy-ulyanovsk":
            case "legalnye-kuritelnye-miksy-vologda":
            case "legalnye-kuritelnye-miksy-voronezh":
            case "legalnye-kuritelnye-smesi-barnaul":
            case "legalnye-kuritelnye-smesi-belgorod":
            case "legalnye-kuritelnye-smesi-cheboksary":
            case "legalnye-kuritelnye-smesi-komsomolsk-na-amure":
            case "legalnye-kuritelnye-smesi-naberezhnye-chelny":
            case "legalnye-kuritelnye-smesi-perm":
            case "legalnye-kuritelnye-smesi-ryazan":
            case "legalnye-kuritelnye-smesi-samara":
            case "legalnye-kuritelnye-smesi-saransk":
            case "legalnye-kuritelnye-smesi-saratov":
            case "legalnye-kuritelnye-smesi-stavropol":
            case "legalnye-kuritelnye-smesi-surgut":
            case "legalnye-kuritelnye-smesi-tambov":
            case "legalnye-kuritelnye-smesi-tolyatti":
            case "legalnye-kuritelnye-smesi-tula":
            case "legalnye-kuritelnye-smesi-tver":
            case "legalnye-kuritelnye-smesi-ufa":
            case "legalnye-kuritelnye-smesi-ulan-ude":
            case "legalnye-kuritelnye-smesi-ulyanovsk":
            case "legalnye-kuritelnye-smesi-v-moskve":
            case "legalnye-kuritelnye-smesi-vladikavkaz":
            case "legalnye-kuritelnye-smesi-volgograd":
            case "legalnye-kuritelnye-smesi-volzhskiy":
            case "legalnye-kuritelnye-smesi-voronezh":
            case "legalnye-kuritelnye-smesi-yaroslavl":
            case "legalnye-miksy":
            case "legalnye-miksy-arhangelsk":
            case "legalnye-miksy-barnaul":
            case "legalnye-miksy-belgorod":
            case "legalnye-miksy-chelyabinks":
            case "legalnye-miksy-chita":
            case "legalnye-miksy-ivanovo":
            case "legalnye-miksy-komsomolsk-na-amure":
            case "legalnye-miksy-krasnoyarsk":
            case "legalnye-miksy-magnitogorsk":
            case "legalnye-miksy-nizhniy-novgorod":
            case "legalnye-miksy-penza":
            case "legalnye-miksy-surgut":
            case "legalnye-miksy-vladivostok":
            case "legalnye-narkotiki-astrahan":
            case "legalnye-narkotiki-barnaul":
            case "legalnye-narkotiki-belgorod":
            case "legalnye-narkotiki-cheboksary":
            case "legalnye-narkotiki-cherepovec":
            case "legalnye-narkotiki-kaliningrad":
            case "legalnye-narkotiki-kirov":
            case "legalnye-narkotiki-komsomolsk-na-amure":
            case "legalnye-narkotiki-kostroma":
            case "legalnye-narkotiki-krasnoyarsk":
            case "legalnye-narkotiki-magnitogorsk":
            case "legalnye-narkotiki-murmansk":
            case "legalnye-narkotiki-naberezhnye-chelny":
            case "legalnye-narkotiki-nizhniy-novgorod":
            case "legalnye-narkotiki-omsk":
            case "legalnye-narkotiki-rostov":
            case "legalnye-narkotiki-samara":
            case "legalnye-narkotiki-smolensk":
            case "legalnye-narkotiki-stavropol":
            case "legalnye-narkotiki-sterlitamak":
            case "legalnye-narkotiki-surgut":
            case "legalnye-narkotiki-tolyatti":
            case "legalnye-narkotiki-tomsk":
            case "legalnye-narkotiki-ufa":
            case "legalnye-narkotiki-ulan-ude":
            case "legalnye-narkotiki-ulyanovsk":
            case "legalnye-narkotiki-vladikavkaz":
            case "legalnye-narkotiki-vladivostok":
            case "legalnye-narkotiki-volzhskiy":
            case "legalnye-poroshki-cheboksary":
            case "legalnye-poroshki-cherepovec":
            case "legalnye-poroshki-chita":
            case "legalnye-poroshki-habarovsk":
            case "legalnye-poroshki-izhevsk":
            case "legalnye-poroshki-kaluga":
            case "legalnye-poroshki-kazan":
            case "legalnye-poroshki-kirov":
            case "legalnye-poroshki-kostroma":
            case "legalnye-poroshki-kurgan":
            case "legalnye-poroshki-kursk":
            case "legalnye-poroshki-nizhniy-novgorod":
            case "legalnye-poroshki-omsk":
            case "legalnye-poroshki-orenburg":
            case "legalnye-poroshki-orl":
            case "legalnye-poroshki-ryazan":
            case "legalnye-poroshki-soli":
            case "legalnye-poroshki-sterlitamak":
            case "legalnye-poroshki-surgut":
            case "legalnye-poroshki-taganrog":
            case "legalnye-poroshki-tula":
            case "legalnye-poroshki-tver":
            case "legalnye-poroshki-ulan-ude":
            case "legalnye-poroshki-ulyanovsk":
            case "legalnye-poroshki-vladimir":
            case "legalnye-poroshki-volgograd":
            case "legalnye-poroshki-vologda":
            case "legalnye-poroshki-volzhskiy":
            case "legalnye-poroshki-yakutsk":
            case "legalnye-poroshki-yaroslavl":
            case "legalnye-smesi":
            case "legalnye-soli-dlya-vann":
            case "legalnyy-jwh":
            case "poroshok-jwh":
            case "poroshok-skorost-kupit":
            case "prodazha-jwh":
            case "reagent-jwh":
            case "reagent-mn-35":
            case "reagent-mn-45":
            case "reagent-mn-55":
            case "skorost-spays-kupit":
            case "spays-cheboksary":
            case "spays-cherepovec":
            case "spays-irkutsk":
            case "spays-kaluga":
            case "spays-komsomolsk-na-amure":
            case "spays-perm":
            case "spays-rostov":
            case "spays-tula":
            case "spays-ulyanovsk":
            case "spice-cheboksary":
              return true;
          }
          break;
        case "traderc":
          switch( doms.pop() ) {
            case "amfietamin-kupit-skorost-ulianovsk":
            case "forum-kupit-spais-gieliendzhik":
            case "forum-kupit-spais-ulianovsk":
            case "ghashish-kupit-sieichas-urai":
            case "ghdie-kupit-amfietamin-balakovo":
            case "ghdie-kupit-ghashish-gieliendzhik":
            case "ghdie-kupit-kuritielnyie-smiesi-bielghorod":
            case "ghdie-kupit-spais-ioshkar-ola":
            case "ghdie-kupit-spais-kirov":
            case "ghdie-mozhno-kupit-spais-saransk":
            case "ghdie-mozhno-kupit-spais-sochi":
            case "jwh-spais-kupit-liantor":
            case "jwh-spais-kupit-tuapsie":
            case "jwh-spaisy-smiesi-rieaghienty-soli-kupit-sol-ilietsk":
            case "khochu-kupit-spais-ivanovo":
            case "kristally-soli-spais-volzhsk":
            case "kupit-amfietamin-stavropol":
            case "kupit-amfietamin-tomsk":
            case "kupit-amfietaminy-spidy-donietsk":
            case "kupit-boshki-bieriezniki":
            case "kupit-boshki-iekatierinburgh":
            case "kupit-boshki-irkutsk":
            case "kupit-boshki-krasnoiarsk":
            case "kupit-boshki-sochi":
            case "kupit-boshki-ulianovsk":
            case "kupit-ghashish-optom-pierm":
            case "kupit-jwh-anapa":
            case "kupit-jwh-gieliendzhik":
            case "kupit-jwh-kyzyl":
            case "kupit-jwh-novorossiisk":
            case "kupit-jwh-pienza":
            case "kupit-jwh-pierm":
            case "kupit-jwh-surghut":
            case "kupit-jwh-tiumien":
            case "kupit-jwh-tuapsie":
            case "kupit-jwh-volzhskii":
            case "kupit-kokain-ulianovsk":
            case "kupit-kuritielnuiu-smies-miks-spais-moskva":
            case "kupit-kuritielnyie-smiesi-rieaghient-anapa":
            case "kupit-kuritielnyie-smiesi-rieaghient-iuriuzan":
            case "kupit-kuritielnyie-smiesi-rieaghient-ivanovo":
            case "kupit-kuritielnyie-smiesi-rieaghient-krasnodar":
            case "kupit-kuritielnyie-smiesi-rieaghient-miass":
            case "kupit-kuritielnyie-smiesi-rieaghient-slaviansk-na-kubani":
            case "kupit-kuritielnyie-smiesi-rieaghient-tambov":
            case "kupit-kuritielnyie-smiesi-spais-1-odintsovo":
            case "kupit-kuritielnyie-smiesi-spais-kiemierovo":
            case "kupit-kuritielnyie-smiesi-spais-komsomolsk-na-amurie":
            case "kupit-kuritielnyie-smiesi-spais-mamadysh":
            case "kupit-kuritielnyie-smiesi-spais-pierm":
            case "kupit-lieghalku-1-biisk":
            case "kupit-lieghalku-1-kalininghrad":
            case "kupit-lieghalku-1-novorossiisk":
            case "kupit-lieghalku-1-otradnyi":
            case "kupit-lieghalku-1-volokolamsk":
            case "kupit-lieghalku-abakan":
            case "kupit-lieghalku-barnaul":
            case "kupit-lieghalku-briansk":
            case "kupit-lieghalku-dmitrov":
            case "kupit-lieghalku-dolghoprudnyi":
            case "kupit-lieghalku-ialta":
            case "kupit-lieghalku-kivi-tuapsie":
            case "kupit-lieghalku-liubiertsy":
            case "kupit-lieghalku-mozhaisk":
            case "kupit-lieghalku-naro-fominsk":
            case "kupit-lieghalku-odintsovo":
            case "kupit-lieghalku-oriekhovo-zuievo":
            case "kupit-lieghalku-podolsk":
            case "kupit-lieghalku-ramienskoie":
            case "kupit-lieghalku-sierpukhov":
            case "kupit-lieghalku-skorost-zhukovskii":
            case "kupit-lieghalku-spais-anapa":
            case "kupit-lieghalku-spais-angharsk":
            case "kupit-lieghalku-spais-arkhanghielsk":
            case "kupit-lieghalku-spais-armavir":
            case "kupit-lieghalku-spais-astrakhan":
            case "kupit-lieghalku-spais-bielghorod":
            case "kupit-lieghalku-spais-domodiedovo":
            case "kupit-lieghalku-spais-gieliendzhik":
            case "kupit-lieghalku-spais-ioshkar-ola":
            case "kupit-lieghalku-spais-irkutsk":
            case "kupit-lieghalku-spais-istra":
            case "kupit-lieghalku-spais-izhievsk":
            case "kupit-lieghalku-spais-kalugha":
            case "kupit-lieghalku-spais-khimki":
            case "kupit-lieghalku-spais-kiemierovo":
            case "kupit-lieghalku-spais-kolomna":
            case "kupit-lieghalku-spais-kostroma":
            case "kupit-lieghalku-spais-kursk":
            case "kupit-lieghalku-spais-mytishchi":
            case "kupit-lieghalku-spais-noghinsk":
            case "kupit-lieghalku-spais-novosibirsk":
            case "kupit-lieghalku-spais-staryi-krym":
            case "kupit-lieghalku-spais-tiumien":
            case "kupit-lieghalku-spais-tuapsie":
            case "kupit-lieghalku-spais-vladivostok":
            case "kupit-lieghalku-spais-volghoghrad":
            case "kupit-lieghalku-spais-volzhskii":
            case "kupit-lieghalku-spais-vorkuta":
            case "kupit-lieghalku-spais-voroniezh":
            case "kupit-lieghalku-vladivostok":
            case "kupit-lieghalnyie-kuritielnyie-smiesi-sarov":
            case "kupit-lieghalnyie-kuritielnyie-smiesi-toliatti":
            case "kupit-rieaghient-dlia-spaisa-2-iekatierinburgh":
            case "kupit-rieaghient-dlia-spaisa-abakan":
            case "kupit-rieaghient-dlia-spaisa-anapa":
            case "kupit-rieaghient-dlia-spaisa-arkhanghielsk":
            case "kupit-rieaghient-dlia-spaisa-astrakhan":
            case "kupit-rieaghient-dlia-spaisa-briansk":
            case "kupit-rieaghient-dlia-spaisa-gieliendzhik":
            case "kupit-rieaghient-dlia-spaisa-iekatierinburgh":
            case "kupit-rieaghient-dlia-spaisa-irkutsk":
            case "kupit-rieaghient-dlia-spaisa-kazan":
            case "kupit-rieaghient-dlia-spaisa-kiemierovo":
            case "kupit-rieaghient-dlia-spaisa-kirov":
            case "kupit-rieaghient-dlia-spaisa-krasnoiarsk":
            case "kupit-rieaghient-dlia-spaisa-mytishchi":
            case "kupit-rieaghient-dlia-spaisa-nizhnii-novghorod":
            case "kupit-rieaghient-dlia-spaisa-nizhnii-taghil":
            case "kupit-rieaghient-dlia-spaisa-novosibirsk":
            case "kupit-rieaghient-dlia-spaisa-riazan":
            case "kupit-rieaghient-dlia-spaisa-rostov-na-donu":
            case "kupit-rieaghient-dlia-spaisa-sankt-pietierburgh":
            case "kupit-rieaghient-dlia-spaisa-surghut":
            case "kupit-rieaghient-dlia-spaisa-taghanrogh":
            case "kupit-rieaghient-dlia-spaisa-vladivostok":
            case "kupit-rieaghient-dlia-spaisa-volzhskii":
            case "kupit-rieaghient-dlia-spaisa-voroniezh":
            case "kupit-soli-miksy-kostroma":
            case "kupit-soli-miksy-ulianovsk":
            case "kupit-spais-kuritielnyi-ioshkar-ola":
            case "kupit-spais-kuritielnyi-solikamsk":
            case "kupit-spais-narkotik-kyzyl":
            case "kupit-spais-niedorogho-tuapsie":
            case "kupit-spais-nomier-tieliefona-moskva":
            case "kupit-spais-soli-miksy-liubiertsy":
            case "kupit-spais-soli-miksy-rostov-na-donu":
            case "kupit-spais-zakladki-pierm":
            case "kupit-spidy-angharsk":
            case "kupit-spidy-maloiaroslaviets":
            case "kupit-spidy-pietrozavodsk":
            case "kupit-spidy-tiumien":
            case "kuritielnyi-spais-solikamsk":
            case "narkotiki-soli-spaisy-pskov":
            case "narkotiki-soli-spaisy-vielikii-novghorod":
            case "prodaiu-spais-sol-astrakhan":
            case "riegha-sol-spais-tiumien":
            case "shishki-boshki-kupit-kazan":
            case "smies-spais-kupit-murmansk":
            case "sol-skorost-ufa":
            case "sol-spais-liubiertsy":
            case "soli-spais-zakladki-ufa":
            case "soli-spais-zakladki-ulianovsk":
            case "spais-kuritielnyie-smiesi-jwh-kupit-izhievsk":
            case "spais-miks-kupit-moskva":
            case "spais-miks-moskva":
            case "spais-miks-rieaghienty-sol-marikhuana-moskva":
            case "spais-miks-rieaghienty-sol-marikhuana-samara":
            case "spais-miks-rieaghienty-sol-riegha-marikhuana-moskva":
            case "spais-miks-rieaghienty-sol-riegha-marikhuana-mozhaisk":
            case "spais-miks-rieaghienty-sol-riegha-marikhuana-mytishchi":
            case "spais-miks-rieaghienty-sol-riegha-marikhuana-ufa":
            case "spais-miks-sol-rieaghient-riegha-balashikha":
            case "spais-miks-sol-rieaghient-riegha-dmitrov":
            case "spais-miks-sol-rieaghient-riegha-dolghoprudnyi":
            case "spais-miks-sol-rieaghient-riegha-domodiedovo":
            case "spais-miks-sol-rieaghient-riegha-gieliendzhik":
            case "spais-miks-sol-rieaghient-riegha-istra":
            case "spais-miks-sol-rieaghient-riegha-ivanovo":
            case "spais-miks-sol-rieaghient-riegha-khimki":
            case "spais-miks-sol-rieaghient-riegha-kolomna":
            case "spais-miks-sol-rieaghient-riegha-liubiertsy":
            case "spais-miks-sol-rieaghient-riegha-moskva":
            case "spais-miks-sol-rieaghient-riegha-naro-fominsk":
            case "spais-miks-sol-rieaghient-riegha-nizhnii-taghil":
            case "spais-miks-sol-rieaghient-riegha-noghinsk":
            case "spais-miks-sol-rieaghient-riegha-norilsk":
            case "spais-miks-sol-rieaghient-riegha-novomoskovsk":
            case "spais-miks-sol-rieaghient-riegha-odintsovo":
            case "spais-miks-sol-rieaghient-riegha-oriekhovo-zuievo":
            case "spais-miks-sol-rieaghient-riegha-otradnoie":
            case "spais-miks-sol-rieaghient-riegha-ramienskoie":
            case "spais-miks-sol-rieaghient-riegha-sierpukhov":
            case "spais-miks-sol-rieaghient-riegha-zhukovskii":
            case "spais-sol-fien-rostov-na-donu":
            case "spais-soli-rieaghienty-kazan":
            case "spaisy-soli-miksy-oktiabrskii":
              return true;
          }
          break;
        case "wcre":
          switch( doms.pop() ) {
            case "jwh-arhangelsk":
            case "jwh-kazan":
            case "jwh-krasnodar":
            case "jwh-kursk":
            case "jwh-magnitogorsk":
            case "jwh-nizhniy-tagil":
            case "jwh-orenburg":
            case "jwh-orl":
            case "jwh-penza":
            case "jwh-saratov":
            case "jwh-stavropol":
            case "jwh-ufa":
            case "jwh-ulyanovsk":
            case "jwh-volzhskiy":
            case "kupit-jwh-arhangelsk":
            case "kupit-jwh-barnaul":
            case "kupit-jwh-cheboksary":
            case "kupit-jwh-habarovsk":
            case "kupit-jwh-kazan":
            case "kupit-jwh-kemerovo":
            case "kupit-jwh-kursk":
            case "kupit-jwh-lipeck":
            case "kupit-jwh-magnitogorsk":
            case "kupit-jwh-murmansk":
            case "kupit-jwh-nizhniy-novgorod":
            case "kupit-jwh-nizhniy-tagil":
            case "kupit-jwh-petrozavodsk":
            case "kupit-jwh-rostov":
            case "kupit-jwh-samara":
            case "kupit-jwh-saransk":
            case "kupit-jwh-saratov":
            case "kupit-jwh-smolensk":
            case "kupit-jwh-stavropol":
            case "kupit-jwh-sterlitamak":
            case "kupit-jwh-surgut":
            case "kupit-jwh-tumen":
            case "kupit-jwh-ufa":
            case "kupit-jwh-ulyanovsk":
            case "kupit-jwh-vladikavkaz":
            case "kupit-jwh-vladivostok":
            case "kupit-jwh-volgograd":
            case "kupit-jwh-vologda":
            case "kupit-jwh-volzhskiy":
            case "kupit-jwh-yakutsk":
            case "kupit-kuritelnye-miksy-barnaul":
            case "kupit-kuritelnye-miksy-komsomolsk-na-amure":
            case "kupit-kuritelnye-miksy-magnitogorsk":
            case "kupit-kuritelnye-miksy-orenburg":
            case "kupit-kuritelnye-miksy-vologda":
            case "kupit-kuritelnye-smesi-kazan":
            case "kupit-kuritelnye-smesi-saratov":
            case "kupit-kuritelnye-smesi-v-lubercah":
            case "kupit-kuritelnye-smesi-volzhskiy":
            case "kupit-reagent-v-moskve":
            case "kupit-spays-arhangelsk":
            case "kupit-spays-astrahan":
            case "kupit-spays-habarovsk":
            case "kupit-spays-ivanovo":
            case "kupit-spays-magnitogorsk":
            case "kupit-spays-nizhniy-novgorod":
            case "kupit-spays-novokuzneck":
            case "kupit-spays-omsk":
            case "kupit-spays-petrozavodsk":
            case "kupit-spays-sochi":
            case "kupit-spays-tomsk":
            case "kupit-spays-ulyanovsk":
            case "kupit-spays-v-biyske":
            case "kupit-spays-v-kaluge":
            case "kupit-spays-v-mytischah":
            case "kupit-spays-v-volgograde":
            case "kupit-spays-vladikavkaz":
            case "kupit-spays-vladivostok":
            case "kupit-spays-volgograd":
            case "kupit-spays-vologda":
            case "kupit-spays-volzhskiy":
            case "kupit-spice-arhangelsk":
            case "kupit-spice-ivanovo":
            case "kupit-spice-omsk":
            case "kupit-spice-sochi":
            case "kupit-spice-sterlitamak":
            case "kupit-spice-ulyanovsk":
            case "kupit-spice-volzhskiy":
            case "kupit-spice-yoshkar-ola":
            case "kuritelnye-miksy-ulyanovsk":
            case "kuritelnye-smesi-arhangelsk":
            case "kuritelnye-smesi-magnitogorsk":
            case "kuritelnye-smesi-optom-v-moskve":
            case "legalnye-kuritelnye-miksy-arhangelsk":
            case "legalnye-kuritelnye-miksy-vologda":
            case "legalnye-kuritelnye-smesi-magnitogorsk":
            case "legalnye-kuritelnye-smesi-novokuzneck":
            case "legalnye-kuritelnye-smesi-tumen":
            case "legalnye-kuritelnye-smesi-ufa":
            case "legalnye-kuritelnye-smesi-vologda":
            case "legalnye-miksy-arhangelsk":
            case "legalnye-miksy-vladivostok":
            case "legalnye-narkotiki-novokuzneck":
            case "legalnye-poroshki-belgorod":
            case "legalnye-poroshki-irkutsk":
            case "legalnye-poroshki-kaluga":
            case "legalnye-poroshki-kirov":
            case "legalnye-poroshki-magnitogorsk":
            case "legalnye-poroshki-naberezhnye-chelny":
            case "legalnye-poroshki-v-rostove":
            case "spays-astrahan":
            case "spays-kazan":
            case "spays-omsk":
            case "spays-v-balashihe":
            case "spays-v-belovo":
            case "spays-v-magnitogorske":
            case "spays-v-novogireevo":
            case "spays-v-zelenograde":
            case "spays-vologda":
            case "spice-arhangelsk":
            case "spice-vologda":
              return true;
          }
          break;
        case "weedhash":
          return doms.pop() === "mail";
        case "x4y":
          switch( doms.pop() ) {
            case "boshkidnepropetrovsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-abakan":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-adler":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-anapa":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-angarsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-arhangelsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-astrahan":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-barnaul":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-belgorod":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-blagoveschensk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-bryansk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-dmitrov":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-ekaterinburg":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-habarovsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-irkutsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-ivanovo":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-kaluga":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-kazan":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-kemerovo":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-kislovodsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-kolomna":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-komsomolsk-na-amure":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-korolev":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-krasnodar":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-kursk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-kyzyl":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-moskva":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-mozhaysk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-mytischi":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-naberezhnye-chelny":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-nahodka":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-norilsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-novogireevo":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-novorossiysk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-omsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-orel":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-pskov":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-ryazan":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-sankt-peterburg":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-saransk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-saratov":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-schelkovo":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-smolensk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-stavropol":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-surgut":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-taganrog":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-tolyatti":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-tuapse":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-tula":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-tumen":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-ufa":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-ulan-ude":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-ulyanovsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-uzhno-sahalinsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-velikiy-novgorod":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-vladimir":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-vladivostok":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-vologda":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-vorkuta":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-voronezh":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-yakutsk":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-yaroslavl":
            case "gde-vzyat-zakazat-nayti-kupit-skorost-mdpv-zelenograd":
            case "kupit-gashish-kazan":
            case "kupit-skorost-mdpv-saratov":
            case "skorost-mdpv-chelyabinsk":
            case "skorost-mdpv-nizhniy-tagil":
            case "skorost-mdpv-ryazan":
            case "skorost-mdpv-rybinsk":
            case "skorost-mdpv-samara":
            case "skorost-mdpv-saransk":
            case "skorost-mdpv-saratov":
            case "skorost-mdpv-sergiev-posad":
            case "skorost-mdpv-serpuhov":
            case "skorost-mdpv-smolensk":
            case "skorost-mdpv-solikamsk":
            case "skorost-mdpv-stavropol":
            case "skorost-mdpv-sterlitamak":
            case "skorost-mdpv-ulyanovsk":
            case "skorost-mdpv-volzhskiy":
              return true;
          }
          break;
      }
      break;
    case "br":
      switch( doms.pop() ) {
        case "com":
          switch( doms.pop() ) {
            case "labdegaragem":
              return true;
            case "blogsexy":
              return doms.pop() === "paraisololicon";
            case "uol":
              if (doms.pop() === "xpg")
                return doms.pop() === "compligticon";
              break;
          }
          break;
        case "metodista":
          return doms.pop() === "encipecom";
      }
      break;
    case "by":
      switch( doms.pop() ) {
        case "casinocity":
        case "elik":
        case "my-hit":
        case "nodeposit":
          return true;
        case "com":
          if (doms.pop() === "blogspot")
            return doms.pop() === "putin-xujlo";
          break;
        case "mogilev":
          return doms.pop() === "bgpek";
        case "prodom":
          return doms.pop() === "ads";
      }
      break;
    case "bz":
      switch( doms.pop() ) {
        case "prava":
        case "remix":
        case "royalrc":
          return true;
      }
      break;
    case "ca":
      switch( doms.pop() ) {
        case "beaverseeds":
        case "bitnest":
        case "blazingcatfur":
        case "momcanada":
        case "pirat":
        case "pirat":
        case "rulet":
          return true;
      }
      break;
    case "cab":
      switch( doms.pop() ) {
        case "semyanich":
          return true;
        case "onion":
          switch( doms.pop() ) {
            case "aegshqxngerfziqq":
            case "buddsz76bq3tmueu":
            case "china2ltxuwdntrl":
            case "dangeru72zvedwtg":
            case "ingebarpfpjqsnn7":
            case "kiediahiyjq2hu63":
            case "learyycucta4zwlg":
            case "legalcymfstivweb":
            case "shiwaggiafnpqxj5":
            case "shops3jckh3dexzy":
            case "zanzibe4e4p4jdh2":
              return true;
          }
          break;
      }
      break;
    case "cafe":
      switch( doms.pop() ) {
        case "2-chru":
        case "2chru":
          return true;
      }
      break;
    case "cc":
      switch( doms.pop() ) {
        case "0chan":
        case "222rc":
        case "brat":
        case "cbilling":
        case "darkmoney":
        case "drugusers":
        case "drugusers":
        case "dublikat":
        case "dublikat":
        case "dutch-seeds":
        case "dutch-seeds":
        case "dutchseeds":
        case "egv":
        case "forparty":
        case "gomel-sat":
        case "gramrc":
        case "growseeds":
        case "igrowye-avtomati":
        case "kokos":
        case "kupi-klad":
        case "kupiklad":
        case "legalrc":
        case "mashki":
        case "molot24":
        case "molot24":
        case "monopolya24":
        case "narkop":
        case "optom":
        case "otsos":
        case "party-shop":
        case "pasport":
        case "ponn":
        case "psylab":
        case "psylab":
        case "redclub":
        case "ruletka":
        case "rumj":
        case "semyanich":
        case "shamarc":
        case "shishkin":
        case "silkroadshop":
        case "silkroadshop":
        case "sota":
        case "superomatic":
        case "swimpool":
          return true;
        case "beznal":
          return doms.pop() === "forum";
        case "cc":
          switch( doms.pop() ) {
            case "aromakharkov":
            case "aromakharkov":
              return true;
          }
          break;
        case "cu":
          return doms.pop() === "4chanarchives";
      }
      break;
    case "cd":
      switch( doms.pop() ) {
        case "burn":
        case "torrent":
          return true;
      }
      break;
    case "center":
      return doms.pop() === "klad";
    case "cf":
      return doms.pop() === "new-rutor";
    case "ch":
      switch( doms.pop() ) {
        case "looo":
          return true;
        case "looo":
          switch( doms.pop() ) {
            case "gay":
            case "lesbo":
              return true;
          }
          break;
      }
      break;
    case "club":
      switch( doms.pop() ) {
        case "akibaaqkikan":
        case "narkoman":
        case "newvulkan":
        case "nkn":
        case "otsos":
        case "pornlife":
        case "semyanich":
        case "vip-krasotki":
        case "vladsex":
          return true;
      }
      break;
    case "cn":
      switch( doms.pop() ) {
        case "gramrc":
        case "wholeally":
          return true;
        case "com":
          return doms.pop() === "dmw";
      }
      break;
    case "co":
      switch( doms.pop() ) {
        case "24klad":
        case "3dslots":
        case "cazino-faraon":
        case "dizilab":
        case "errors-seeds":
        case "forparty":
        case "geiminator":
        case "igrovye-avtomati":
        case "kinodoma":
        case "lazar-shaulov":
        case "lump":
        case "lurkmore":
        case "narkop":
        case "semenarnia":
        case "semyanich":
        case "shturmnovosti":
        case "slotclubcasino":
        case "streamking":
        case "sturmnovosti":
        case "thecannabist":
        case "twistcasino":
        case "vozmezdie":
        case "vulcanwin":
        case "vulkan-bet":
        case "wayaway":
          return true;
        case "buzz-wholesale":
          return doms.pop() === "bg";
        case "edicy":
          return doms.pop() === "buy-seeds";
      }
      break;
    case "com":
      switch( doms.pop() ) {
        case "1-diplom":
        case "1-kino":
        case "1-x-bet":
        case "1-x-bet":
        case "1-x-sport-bet":
        case "1-xbet":
        case "1001casino":
        case "1001diplom":
        case "100diplomov":
        case "100diplomov":
        case "101easy":
        case "18-sexy":
        case "18boyz":
        case "18kitties":
        case "18xgirls":
        case "1channelmovie":
        case "1king":
        case "1king":
        case "1ksam":
        case "1stmarijuanagrowerspage":
        case "1teenporn":
        case "1x-bet":
        case "1xbet":
        case "1xbet1":
        case "1xbet2":
        case "1xbetbk":
        case "2-ndfl":
        case "20khvylyn":
        case "21food":
        case "21nova":
        case "21novacasino":
        case "24-klad":
        case "24-klad":
        case "24klad":
        case "24open-casino":
        case "24playcasino":
        case "24volcano":
        case "24vulcan":
        case "24vulkan":
        case "24vulkan":
        case "2dosug777":
        case "2ndflorg":
        case "2ndflvolg":
        case "2prava":
        case "2shefa":
        case "2zi-gazo":
        case "32red":
        case "32redbingo":
        case "33slots":
        case "33slots":
        case "3dosug777":
        case "3reich-collector":
        case "3tuza":
        case "3tuza":
        case "420magazine":
        case "44x2":
        case "4dosug777":
        case "4emstore":
        case "51educ":
        case "5dosug777":
        case "69xxxtube":
        case "6dosug777":
        case "6hoes":
        case "74diploma":
        case "74girls":
        case "777-avtomaty":
        case "777-freeslots":
        case "777-freeslots":
        case "777dragoncasino":
        case "777planet":
        case "777planet":
        case "777slot777":
        case "777slot777":
        case "777slotsvolcano":
        case "777vulkan":
        case "7red":
        case "7regal":
        case "8-800-555-36-37":
        case "8-800-555-36-37":
        case "888":
        case "888casino":
        case "888media-ru":
        case "888poker":
        case "888poker-ru":
        case "888promos":
        case "888promos":
        case "888realcasino":
        case "888slots":
        case "888sport":
        case "990z":
        case "9nudist":
        case "9taxi":
        case "a-hentai":
        case "aboutyoung":
        case "acemodeling":
        case "activeseeds":
        case "adaltfilm":
        case "adamalla":
        case "adiploms":
        case "adminastbiology":
        case "admiral-games":
        case "admiralcasinogames":
        case "admiralcasinogames":
        case "admiralcc":
        case "admiralcc":
        case "admiralgameslots":
        case "admiralslotclub":
        case "admiralslots":
        case "adultcomicsfan":
        case "adventusvideo":
        case "afunchem":
        case "agenciasic":
        case "aimimichem":
        case "aimoo":
        case "akiba-online":
        case "alco-nadom":
        case "alco-night":
        case "alcobrand":
        case "alcobrelok":
        case "alcodeluxe":
        case "alcoprezent":
        case "alcotown":
        case "alcovozim":
        case "alexshalman":
        case "alhimikus":
        case "aliez":
        case "alisnad":
        case "alive-ua":
        case "alkaloidlife":
        case "alkaloidlife":
        case "alkoclub24":
        case "alkodostavka":
        case "alkodostavka":
        case "alkomig66":
        case "all-diplom":
        case "all-diploms":
        case "all-sms":
        case "allamateurxxx":
        case "allisonzyhrcchem":
        case "alljackpotscasino":
        case "allnaturis":
        case "allrusex":
        case "amateur-amateur":
        case "amazingvirgins":
        case "amnesiaseeds":
        case "amsterdamcannabisseeds":
        case "amsterdammarijuanaseeds":
        case "animatedpornblog":
        case "animelola":
        case "anonimcasino":
        case "anti-shirk":
        case "aolopharm":
        case "apravda":
        case "arbatonline":
        case "argumentua":
        case "argumentua":
        case "aromagood":
        case "aromagood":
        case "aromalyx":
        case "aromasmesi":
        case "aromaticmix":
        case "aromaticmix":
        case "artcriminalist":
        case "artnet":
        case "artvalue":
        case "astrahanvrach":
        case "atavika":
        case "ati-diplom":
        case "atmboa":
        case "auramozga":
        case "auramozga":
        case "automatscasino":
        case "avto-prava":
        case "avtomatiki":
        case "avtomatix":
        case "avtomatixxx":
        case "avtomaty":
        case "avtomaty-admiral":
        case "avtomaty-admiral":
        case "avtomaty-free-play":
        case "avtomaty-free-play":
        case "avtomatybesplatno":
        case "avtomatybesplatno":
        case "avtomatycasino":
        case "avtosales":
        case "avtosales":
        case "axxseedsrasha":
        case "axxseedsrasha":
        case "azarplay":
        case "azart-club":
        case "azart-life":
        case "azart-mania":
        case "azart-play":
        case "azart-play-casino":
        case "azart4you":
        case "azartcasinoplay":
        case "azartcasinos":
        case "azartclub777":
        case "azartgaming":
        case "azartmania":
        case "azartplaay":
        case "azartplace":
        case "azartplay-online":
        case "azartplay-online":
        case "azartplaybet":
        case "azartplaycasinos":
        case "azartplayd":
        case "azartplayg":
        case "azartplays":
        case "azartplayvip":
        case "azartreview":
        case "azartreview":
        case "azartreviews":
        case "azartsplay":
        case "azartsplay":
        case "azcasgame":
        case "azino888":
        case "azino888":
        case "badtorrent":
        case "baltbet":
        case "bathsaltsforsale":
        case "belka96":
        case "benzochemicals":
        case "bepmagazin":
        case "bepmagazin":
        case "berezka":
        case "besplatnye-igrovie-avtomaty":
        case "best-vabank":
        case "best-vabank":
        case "best4play-games":
        case "bestazartplay":
        case "bestforplay":
        case "bestgms":
        case "bestgore":
        case "bestlegalhighs":
        case "bestmaxbet":
        case "bestmaxbet":
        case "bestpasport":
        case "bestvulkan":
        case "bestvulkan":
        case "bestyoungtube":
        case "bet-at-home":
        case "bet365":
        case "betcityru":
        case "betcityru":
        case "betfair":
        case "betmostpoker":
        case "betredkings":
        case "betsbc":
        case "betsson":
        case "betterrcs":
        case "betvictor":
        case "betway":
        case "betway":
        case "betwaygroup":
        case "beyondchronic":
        case "beyondpharmchem":
        case "bifis-i-batthet-all-belarus":
        case "bigbudsmag":
        case "bigheadshop":
        case "bigmaxbet":
        case "bingoday":
        case "biochemlabsupply":
        case "biosynthchem":
        case "bitchonko":
        case "bitofsex":
        case "bk1xbet":
        case "black-torrents":
        case "blosok":
        case "blowthisplease":
        case "boardreader":
        case "bobocasino":
        case "boduar":
        case "body-n-mind":
        case "bolnichnyilist-volgograd":
        case "bonzaseeds":
        case "booloo":
        case "boxwind":
        case "boyester":
        case "boys-hardcore-pics":
        case "boyspics4u":
        case "boyspicz":
        case "boyssperm":
        case "boysteengaysfree":
        case "brainresin":
        case "bramaby":
        case "bramaby":
        case "bratrc":
        case "brorcforum":
        case "bstpoint":
        case "btclabrc":
        case "buenaisla":
        case "bugabooks":
        case "buy-jwh":
        case "buy-jwh":
        case "buyanychem":
        case "buydiplom":
        case "buydutchseeds":
        case "buyhashonline":
        case "buyketaminehydrochloride":
        case "buymadcat":
        case "buysteriodspowders":
        case "buytherc":
        case "buyweedsonline":
        case "bwin":
        case "bwin":
        case "bytrade":
        case "canabyseeds":
        case "canamos":
        case "cannabismoon":
        case "cannabisni":
        case "cannabissativa":
        case "cannabistraininguniversity":
        case "cannabugs":
        case "caribbeancom":
        case "carpathians-seeds":
        case "casino":
        case "casino-automats":
        case "casino-automats":
        case "casino-e":
        case "casino-gmslots":
        case "casino-goldstar":
        case "casino-grandmaster":
        case "casino-igrun":
        case "casino-imperator":
        case "casino-imperator":
        case "casino-khan":
        case "casino-kristal":
        case "casino-messenger":
        case "casino-midas":
        case "casino-mustang":
        case "casino-nirvana":
        case "casino-online":
        case "casino-online-vulkan":
        case "casino-piramida":
        case "casino-private":
        case "casino-ruletka":
        case "casino-russia":
        case "casino-saturn":
        case "casino-sparta":
        case "casino-sparta":
        case "casino-vulcan-online":
        case "casino-vulkan-online":
        case "casino-vulkan-online":
        case "casino-x1":
        case "casino-x1":
        case "casino-x2":
        case "casino-x3":
        case "casino367":
        case "casino367":
        case "casino888":
        case "casinoadmirals":
        case "casinobellini":
        case "casinobellini-russian":
        case "casinobigbank":
        case "casinoby":
        case "casinoclub":
        case "casinoclubadmiral":
        case "casinoclubpoker":
        case "casinodelrio":
        case "casinodiuska":
        case "casinoeuro":
        case "casinoeuro24":
        case "casinofrank":
        case "casinogamecasino":
        case "casinokapkan":
        case "casinokb":
        case "casinoking":
        case "casinokristall":
        case "casinomamba":
        case "casinomix":
        case "casinomonstr":
        case "casinoobzor":
        case "casinooreanda":
        case "casinopus":
        case "casinopus":
        case "casinopuz":
        case "casinoredkings":
        case "casinoroom":
        case "casinoruletka":
        case "casinoruletka":
        case "casinorunet":
        case "casinorussia":
        case "casinosites2014":
        case "casinoslava":
        case "casinosonline":
        case "casinotaboo":
        case "casinotoplay":
        case "casinotropez":
        case "casinotropez-ru":
        case "casinovulkan":
        case "casinovulkan":
        case "caymanchem":
        case "cazino-cristall":
        case "cazino-faraon":
        case "cazino-faraon":
        case "cdpoker":
        case "cekc-cyka":
        case "cekctube":
        case "centrkino":
        case "cerilliant":
        case "cgnbiotech":
        case "charaud":
        case "chaturbatemales":
        case "chechenews":
        case "chechenews":
        case "checheninfo":
        case "chechensinsyria":
        case "checkthis":
        case "chelyabinsk-dip":
        case "chemicalwire":
        case "chemistry-chemists":
        case "chemstore77":
        case "chennaiclassic":
        case "chenrc":
        case "chenrc":
        case "cherrycasino":
        case "chetkiibro":
        case "chetkiibro":
        case "chijolica":
        case "china-cartel":
        case "china-mafia":
        case "china-yaxin":
        case "chinahighqualitymethylonesupplier":
        case "chinareogent":
        case "cinemamir":
        case "cityclubcasino":
        case "classifieds9":
        case "clinicsan":
        case "clitsparadise":
        case "club-jack-pot":
        case "club-millions":
        case "club-millions":
        case "club-pokera":
        case "club-volcano":
        case "club-vu1kan":
        case "club-vulkan-slots":
        case "club-vulkan1":
        case "club-vulkan2":
        case "club-vulkan3":
        case "club-wulkan":
        case "clubgmslots":
        case "clubgmslots":
        case "clubniko":
        case "clubpharaon":
        case "clubvulcan":
        case "colosseumcasino":
        case "columbian-boys":
        case "comeon":
        case "concept420":
        case "condomfish":
        case "conservative-media":
        case "coyote-fly":
        case "cpravka":
        case "craps":
        case "crazygrower":
        case "crazyvegas":
        case "creditsdocs":
        case "crimeaseeds":
        case "cristal-casino":
        case "cristal-palace":
        case "cristal-play":
        case "cristal-play":
        case "cristals-slot":
        case "crowneurope":
        case "cruisenigeria":
        case "crystalcasino":
        case "crystalslot":
        case "crystalslotclub":
        case "crz-monkey":
        case "crz-monkey":
        case "ctrpzo":
        case "d-jackpot":
        case "dadboycinema":
        case "daddyfuckdaughter":
        case "dailybasis":
        case "dailybasis":
        case "dailysmoker":
        case "dajinchemtrade":
        case "daniel19":
        case "danopl":
        case "darkcategories":
        case "daykino":
        case "delay-vblvod":
        case "delux-vulkan":
        case "deluxe-slots":
        case "deluxegmslots":
        case "deluxslots":
        case "demonseeds":
        case "den-rozdeniya":
        case "den-rozdeniya":
        case "densesmoke":
        case "densesmoke":
        case "desadov":
        case "devochki":
        case "devochki1":
        case "devochki2":
        case "devochki3":
        case "devochki4":
        case "devochki5":
        case "devochki6":
        case "devochki7":
        case "devochkicz":
        case "dharmachems":
        case "dickgirls-cartoons":
        case "differentweed":
        case "diler44":
        case "diochan":
        case "dip-krasnodar":
        case "dip-samara":
        case "diphelp":
        case "dipl-kazan":
        case "diplm":
        case "diplom-attestat":
        case "diplom-attestat-spb":
        case "diplom-extern":
        case "diplom-externom":
        case "diplom-externom":
        case "diplom-i-attestat":
        case "diplom-kupi":
        case "diplom-kupit":
        case "diplom-kupit-shop":
        case "diplom-magazin":
        case "diplom-nk":
        case "diplom-original":
        case "diplom-original":
        case "diplom-tm":
        case "diplom-top":
        case "diplom-tut":
        case "diplom-v-moskve":
        case "diplom-xopowista":
        case "diplom1":
        case "diplom2you":
        case "diplom77":
        case "diploma-krasnodar":
        case "diploma-krsk":
        case "diploma-novosib":
        case "diplomag":
        case "diplomhelp":
        case "diplomi-attestati":
        case "diplomi-kupit":
        case "diplomi01":
        case "diplomi777":
        case "diplomirus":
        case "diplomius":
        case "diplomm":
        case "diplommsk":
        case "diplompiter":
        case "diplomru":
        case "diplomru":
        case "diplomrus":
        case "diplomrussia":
        case "diploms-best":
        case "diploms-online":
        case "diplomshelp":
        case "diplomshelp":
        case "diplomtorg":
        case "diplomv-sem":
        case "diplomvip":
        case "diplomvsem":
        case "diplomy":
        case "diplomy":
        case "diplomy-samara":
        case "dipnew":
        case "discofood":
        case "dizifun":
        case "dizilab":
        case "dlsite":
        case "docs-servis":
        case "doctorchelni":
        case "doctorfarm":
        case "doctormig":
        case "doctortumen":
        case "doctorvladidostok":
        case "dokumenthelp":
        case "dokumentik":
        case "domashneeruporno":
        case "domkh":
        case "domknig":
        case "domknig":
        case "dongfan-pharm":
        case "dopingcom":
        case "doska4u":
        case "doska4u":
        case "dostavkanight":
        case "dosug-21":
        case "dosug-22":
        case "dosug-34":
        case "dosug-belgorod":
        case "dosug-kazan":
        case "dosug-site":
        case "dosug-tomsk":
        case "dosug-ufa":
        case "dosug116":
        case "dosug25":
        case "dosug31":
        case "dosug777":
        case "dosug777":
        case "dosugcity":
        case "dosugcx":
        case "dosugsite":
        case "dosugsite":
        case "dosugtime":
        case "dosugworld":
        case "dosugworld":
        case "doubledowncasino":
        case "doumitemo":
        case "download-torrent-now":
        case "dozerhome":
        case "dozerhome":
        case "dreamfilth":
        case "driverlizens":
        case "drocheru":
        case "drugs-plaza":
        case "drugsforsaleonline":
        case "drugspowerstore":
        case "dudeseeds":
        case "dudeseeds":
        case "dudkasmeha":
        case "dudkasmeha":
        case "dudu":
        case "dunes-spb":
        case "dutchfreedom":
        case "dvizhenievmeste":
        case "e-minbar":
        case "eagergay":
        case "eazysmoke":
        case "ebuttube":
        case "ec21":
        case "ecvv":
        case "egflix":
        case "ehorussia":
        case "ejnew":
        case "ejnew":
        case "eldo-club":
        case "eldoradoclub":
        case "eldoradoclub":
        case "elencasino":
        case "elencasino":
        case "elephantos":
        case "ellada-casino":
        case "emaidan":
        case "emmas-free-slots":
        case "emmas-free-slots":
        case "energycasino":
        case "energycasino1":
        case "energyresearchchem":
        case "enteogens":
        case "enteogens":
        case "eolia-seeds":
        case "eoliaseeds":
        case "epassion-club":
        case "era-gold":
        case "ero-pix":
        case "erochronicle":
        case "erogazou-mania":
        case "erogazou-paradise":
        case "erogazoufactory":
        case "erogazowww":
        case "erojima4":
        case "eros-pix":
        case "erowid":
        case "eroxvideos":
        case "errors-seeds":
        case "eu-cas":
        case "eucasino":
        case "eurcas":
        case "eurgambling":
        case "eurocasino":
        case "eurochemicals":
        case "eurodosug":
        case "eurogrand":
        case "eurogrand":
        case "euronudism":
        case "europacasino":
        case "europalace":
        case "europoker":
        case "eventosmcm":
        case "evprczn":
        case "evrbel":
        case "evrotrio":
        case "ex-slots":
        case "exclusiveloader":
        case "exgirlsx":
        case "exoticincenseusa":
        case "extraslot":
        case "extraslot":
        case "extremeincense":
        case "extremetube":
        case "f-slots":
        case "f-slots":
        case "f42community":
        case "failovik":
        case "faithchem":
        case "family-naturism":
        case "fantasiamodel":
        case "faraon-club":
        case "faraon-game":
        case "faraon888":
        case "fartovik":
        case "favaritvideo":
        case "favbet":
        case "fdzeta":
        case "federativmix":
        case "federativmix":
        case "feiportal":
        case "felshtinsky":
        case "fenixclub":
        case "ffffound":
        case "fgulen":
        case "fil-i-gran":
        case "filefap":
        case "filegiver":
        case "fileplaneta":
        case "files-x":
        case "filmelita":
        case "films-hd720":
        case "films-skorpik":
        case "filmsegodnya":
        case "filmvz":
        case "fineslot":
        case "firma-odnodnevka":
        case "first-of-truth":
        case "fishmpegs":
        case "fishmpegs":
        case "fkiev":
        case "forcemixes":
        case "forcemixes":
        case "fortuna-slot":
        case "fortunaplay":
        case "fortus-casino":
        case "fortus-casino":
        case "forumkiev":
        case "forumodua":
        case "forumophilia":
        case "fotogolih":
        case "fotosdmujeres":
        case "fox-chem":
        case "free-azart-slots":
        case "free-cute-boys":
        case "free-play-avtomati":
        case "free-play-avtomaty":
        case "free-play-avtomaty":
        case "free-slot-club":
        case "free-slots-club":
        case "free-vulkan-play":
        case "freebetslots":
        case "freeslotmachines":
        case "freeslots4u":
        case "freewka":
        case "from-ua":
        case "fruitcocktailslots":
        case "fucked-sex":
        case "fucked-tube":
        case "fuckyoungsex":
        case "fugly":
        case "fullhentaimovies":
        case "fullreels":
        case "fulltilt":
        case "fulltiltpoker":
        case "funtorrents":
        case "futuriti":
        case "futuriticasino":
        case "futuriticasino":
        case "galfilm":
        case "galleriesboys":
        case "gamblingobzor":
        case "gameik":
        case "gamemaxbetslots":
        case "gamesslotmachines":
        case "gamethronesonline":
        case "gami2":
        case "gaminator-casino":
        case "gaminator2":
        case "gaminatorplay":
        case "gaminators":
        case "gaminators-club":
        case "gaminators-club":
        case "gaminatorsclub":
        case "gaminatorsclub":
        case "gaminatorslots":
        case "gamingclub":
        case "ganja-forum":
        case "ganjakits":
        case "ganjalive":
        case "ganjateam":
        case "ganjateam":
        case "gavgavee":
        case "gavgavee":
        case "gay-hard-pics":
        case "gayboystube":
        case "gazaza":
        case "gb-casino":
        case "gdediplom":
        case "gdediplom":
        case "ge-ru":
        case "geiminator":
        case "geiminator-besplatno":
        case "gelbooru":
        case "gelbooru":
        case "giantsextube":
        case "girlintim":
        case "girlintim":
        case "girls25":
        case "girlselling":
        case "girlsonstickam":
        case "glavpost":
        case "global-trade-center":
        case "globalresearchchem":
        case "glocsales":
        case "gloffs":
        case "glorybiochem":
        case "gmb-casino":
        case "gms-casino":
        case "gms-club":
        case "gms-deluxe-online":
        case "gmsdeluxe-online":
        case "gmsdeluxecasino":
        case "gmslots-casino-online":
        case "gmslots-casino-online":
        case "gmslots-deluxe":
        case "gmslots24":
        case "gmslots3":
        case "gmslotsdeluxe":
        case "gmslotsonline":
        case "gmslotsplay":
        case "gmslotsplay":
        case "go-krit":
        case "go5linx":
        case "goldencavecasino":
        case "goldencherry":
        case "goldenrc":
        case "goldenrivieracasino":
        case "goldenstar-casino3":
        case "goldfishka":
        case "goldfishka2":
        case "goldfishka2":
        case "goldfishka3":
        case "goldfishka3":
        case "goldfishka4":
        case "goldfishkacasino":
        case "goldfishkacasino":
        case "goliesiski":
        case "golosichkerii":
        case "golosichkerii":
        case "golpas":
        case "gonzastaf":
        case "gonzastaf":
        case "goodbyeusa":
        case "goodjoycasino":
        case "goodlyboys":
        case "gosznak-d":
        case "goteentube":
        case "govnodrom":
        case "govnodrom":
        case "goznak-diplom":
        case "goznak-diplom":
        case "goznak-diploms":
        case "gradus-ekb":
        case "grand-ruletka":
        case "grandhotelcasino":
        case "grandmaster-casino":
        case "greenlightpowders":
        case "greenupload":
        case "grotty-monday":
        case "grow-marijuana":
        case "growhand":
        case "growhills":
        case "growweedeasy":
        case "guromanga":
        case "h-xtreme":
        case "hablpl":
        case "hairynature":
        case "hakujira":
        case "handyhardcore":
        case "happy-porn":
        case "happyua":
        case "harborsidehealthcenter":
        case "hard55":
        case "hardyoungsex":
        case "hartmond":
        case "hashalternatives":
        case "hashish-center":
        case "hbrowse":
        case "hbtongdachem":
        case "hbtongdachem":
        case "hd-porno720":
        case "hdkino-online":
        case "heavy":
        case "hellotrade":
        case "hemp-smoke":
        case "hempseedshop":
        case "hengyixin":
        case "hentai-foundry":
        case "hentai-imperia":
        case "hentai-imperia":
        case "hentai-otaku":
        case "hentai-serie":
        case "hentai-wallpapers":
        case "hentai247":
        case "hentai2read":
        case "hentailolico":
        case "hentaisexslave":
        case "hentaistorage":
        case "hentaithumbnails":
        case "hentaitrench":
        case "herbal-smoke":
        case "herbal-smoke-blend":
        case "herbal-smoke-shop":
        case "herbal-x":
        case "herbalbar":
        case "herbalboss":
        case "herbalincensemix":
        case "herbalincensestore":
        case "herbalsmokemix":
        case "herbalspiceblend":
        case "herblowjob":
        case "herehentai":
        case "heyevent":
        case "hfchitai":
        case "high-stone":
        case "high-stone":
        case "high-stone-forum":
        case "high-supplies":
        case "hightimes":
        case "himdom":
        case "hisupplier":
        case "hizb-russia":
        case "hizb-russia":
        case "hmangasearcher":
        case "hmongzone":
        case "hobomomo":
        case "hohlandseeds":
        case "homesex18":
        case "honestchemical":
        case "horohodubasit":
        case "horohodubasit":
        case "hot-sex-tube":
        case "hotshag":
        case "hotvulkan":
        case "howlrape":
        case "howtogrowmarijuana":
        case "hrendyabliki":
        case "hrizolit":
        case "hunafa":
        case "hunafa":
        case "i-sux":
        case "ice-cazino":
        case "icecasino":
        case "icecasino":
        case "icecasino-games":
        case "icecasino-slots":
        case "icecasino1":
        case "icecasinobet":
        case "icecasinonline":
        case "icecasinoplay":
        case "icecasinoslots":
        case "icecasinowin":
        case "icecazino":
        case "icmag":
        case "icomsex":
        case "idealnude":
        case "igra-prestoloff":
        case "igradom":
        case "igrat-igrovye-avtomaty":
        case "igro-online":
        case "igrolend":
        case "igrovie-avtomati-besplatno":
        case "igrovie-avtomaty-casino":
        case "igrovieavtomati":
        case "igrovieavtomati":
        case "igrovieavtomati-besplatno":
        case "igrovieavtomati-na-dengi":
        case "igrovieavtomationline":
        case "igrovoi-klub":
        case "igrovoy-club-vulkan":
        case "igrovoyzal":
        case "igrovueavtomaty":
        case "igrovye-avtomati":
        case "igrovye-avtomati-besplatno":
        case "igrovye-avtomaty-24":
        case "igrovye-avtomaty-besplatno":
        case "igrovye-avtomaty-gmsdeluxe":
        case "igrovye-avtomaty-online":
        case "igrovye-avtomaty-online":
        case "igrovye-avtomaty-x":
        case "igrovyeavtomaty-vulcan":
        case "igrun":
        case "igrun":
        case "igryavtomati":
        case "iluvtoons":
        case "imagesbox":
        case "imexbb":
        case "immoralteen":
        case "importers":
        case "inarchive":
        case "incenseexpress":
        case "individualki-samara":
        case "individualki-ufa":
        case "intercasino":
        case "internationaloddities":
        case "internet-kazino-777":
        case "intim24-2":
        case "intim24-3":
        case "intim25":
        case "intim34":
        case "intim62":
        case "intim70":
        case "intimamour":
        case "intimamour":
        case "intimatlas":
        case "intimatlas":
        case "intimcity":
        case "intimledi":
        case "intimpitera":
        case "intimpitera":
        case "inzhzh":
        case "irishseedbank":
        case "islamdin":
        case "islamdin":
        case "islamnuri":
        case "islamnuri":
        case "islamvmoldove":
        case "ispovednik":
        case "ispovednik-portal":
        case "issuu":
        case "jabarchives":
        case "jack-pot-casino":
        case "jack-pot-club":
        case "jackpot-cazino":
        case "jackpot-club-slots":
        case "jackpot-klub":
        case "jackpot-klub":
        case "jackpotcity":
        case "jackpotcitybingo":
        case "jackpotcitycasino":
        case "jackpotcitycasino1":
        case "jackpotjoy":
        case "jackpotsinaflash":
        case "jafarov":
        case "jaherat":
        case "jahgrow":
        case "jahseeds":
        case "jahseeds-shop":
        case "jahseeds-shop":
        case "jahstrains":
        case "jahtools":
        case "jerusalem-temple-today":
        case "jetcityorange":
        case "jihadmin":
        case "jjteens":
        case "jnjxapi":
        case "joepawl":
        case "joker-him":
        case "joker-him":
        case "jokerclubrussia":
        case "jokersila":
        case "jokersila":
        case "jonsmokeshop":
        case "joycasino":
        case "joylandcasino":
        case "joyschem":
        case "jpmsk":
        case "jpost":
        case "juliamovies":
        case "junglebetcasino":
        case "jvhshop":
        case "jwh-status":
        case "jzy-researchchemical":
        case "k3drug":
        case "kalashnikov-seeds":
        case "kangfeichemical":
        case "kapitan-flint":
        case "kapitan-flintr":
        case "karamelki72":
        case "karenpharm":
        case "kashtanka-ru":
        case "kavkazcenter":
        case "kavkazcenter":
        case "kavkazjihad":
        case "kavkazjihad":
        case "kavkaznews":
        case "kazino-dengi":
        case "kazino-faraon":
        case "kazino-online":
        case "kazino-vegas":
        case "kazino-vip":
        case "kazinoigrat":
        case "kexinpharm":
        case "kharkovforum":
        case "kichiku-gazouko":
        case "killinfo":
        case "killinfo":
        case "kimibin":
        case "kimibin":
        case "kindgreenbuds":
        case "kingyochem":
        case "kino-bezsms":
        case "kino-reliz":
        case "kino-star":
        case "kinocok":
        case "kinokorol":
        case "kinokrug":
        case "kinovog":
        case "kinutpalku":
        case "kissmybabushka":
        case "kittygfs":
        case "kladovka-smoke":
        case "kladovka-smoke":
        case "kladun":
        case "klear":
        case "klub-volcano":
        case "klub-volcano":
        case "klubnichka-hd":
        case "kniga":
        case "knigivsem":
        case "knigu":
        case "kogorsmes":
        case "kogorsmes":
        case "kolmy":
        case "kolmy":
        case "konachan":
        case "konoply":
        case "korenakim":
        case "korenakim":
        case "kosklad":
        case "kristalslots":
        case "krrb":
        case "kunlichemical":
        case "kupi-magnit":
        case "kupi-sex":
        case "kupisex":
        case "kupisex":
        case "kupit-amfetamin":
        case "kupit-amfetamin":
        case "kupit-diplom":
        case "kupit-diplom-1":
        case "kupit-diplom-attestat":
        case "kupit-diplom-ekb":
        case "kupit-diplom-shop":
        case "kupit-diplom-vuza":
        case "kupit-diplom1":
        case "kupit-diplomi-vuzov":
        case "kupit-ndfl":
        case "kupit-prava":
        case "kupit-prava":
        case "kupit-prava-24":
        case "kupit-spravku":
        case "kupitdiplom":
        case "kupitdiplom-samara":
        case "kupitdiplom-voronezh":
        case "kuplydiplom":
        case "kurim-rus":
        case "kuritelnie":
        case "ladbrokes":
        case "lajsiab":
        case "lamanserlo":
        case "lasvegasslotmachines":
        case "lasvilis":
        case "latestpokerbonuses":
        case "lazar-shaulov":
        case "lazy-z":
        case "lechotube":
        case "legal-empire":
        case "legal-empire":
        case "legal-formula":
        case "legal-formula":
        case "legal-garden":
        case "legal-garden":
        case "legal-kaif":
        case "legal-land":
        case "legal-land":
        case "legal-mafia":
        case "legal-mafia":
        case "legalbuds":
        case "legalherbalbud":
        case "legalherbalshop":
        case "legalhighlabs":
        case "legalki":
        case "legalki":
        case "legalniybiz":
        case "legalniybiz":
        case "legalrcm":
        case "legalrcm":
        case "lekciya":
        case "leninjiv":
        case "leninjiv":
        case "lenkino":
        case "leonbets":
        case "leqalcr":
        case "life4plants":
        case "lifetorrents":
        case "liga-stavok":
        case "ligalitolko":
        case "ligalitolko":
        case "ligastavok":
        case "liketor":
        case "likitoria":
        case "limoncasino":
        case "lionslots":
        case "lirafilm":
        case "list-spb":
        case "listtorrents":
        case "litlikbez":
        case "litlikbez":
        case "live-ruletka":
        case "live-ruletka":
        case "livegames-online":
        case "ljreader":
        case "locoroom":
        case "longschemistry":
        case "lostmoviesarchive":
        case "lotbilet":
        case "loto-wm":
        case "loto-wm":
        case "lotoru":
        case "lotoru":
        case "lotoru-casino":
        case "lotoru-play":
        case "lotosplay":
        case "lototeka":
        case "lovely-virgins":
        case "lovemiks":
        case "lovemiks":
        case "lsresearchchemlab":
        case "luckyacecasino":
        case "luckyacepoker":
        case "luckyemperorcasino":
        case "luckylifecasino":
        case "luckymix2015":
        case "luckynuggetcasino":
        case "lurklurk":
        case "lust-model":
        case "luxorslots":
        case "luxorslots-casino":
        case "luxorslots-casino":
        case "luxorslots-online":
        case "luxtorrent":
        case "luxtorrents":
        case "lygshhg":
        case "m-shulman":
        case "m-shulman":
        case "m4ex":
        case "magaspost":
        case "magic-mushrooms-store":
        case "magnet-stop":
        case "magnetgold":
        case "magnit-na-schetchik":
        case "magnitrc":
        case "magnitrc":
        case "majhost":
        case "malibu-slots":
        case "mandarin-casino":
        case "manezhka":
        case "marathonbet":
        case "marathonsportsbook":
        case "marathonsportsbook":
        case "marijuana-ro":
        case "marijuanagrowing":
        case "marijuanaonline007":
        case "marijuanaseeds-shop":
        case "marijuanatravels":
        case "marketnn24":
        case "maryjanesgarden":
        case "masjid-al-iman":
        case "master-diplomov":
        case "master-docs":
        case "mavrinstudios":
        case "maxbetgame":
        case "maxbetslotsgames":
        case "maxbetslotsplay":
        case "maxbetslotsreal":
        case "maxbetslotswin":
        case "maxcasino":
        case "maxi24-az":
        case "mb-soft":
        case "mdmarulab":
        case "meccabingo":
        case "med812":
        case "medastrahan":
        case "medchelni":
        case "medicvolga":
        case "medikafarm":
        case "mediklist":
        case "medirty":
        case "medkrd":
        case "medtumen":
        case "medulyanovsk":
        case "medvladidostok":
        case "megabathsalts":
        case "megabooru":
        case "megabooru":
        case "megavulkan":
        case "megosales":
        case "mercedesgclass":
        case "metfen":
        case "metodonline":
        case "metodserial":
        case "metro-jack-pot":
        case "million-club-slot":
        case "million-slot-club":
        case "millionb":
        case "millioncelebs":
        case "ministryofcannabis":
        case "miraradi":
        case "miraxanet":
        case "mirpesen":
        case "mirumix":
        case "mirumix":
        case "mirzayanov":
        case "mirzayanov":
        case "mister-x":
        case "mister-x":
        case "mixespowders":
        case "mixespowders":
        case "mixesshop":
        case "mixesshop":
        case "mixestea":
        case "mixpowdershop":
        case "mixpowdershop":
        case "mixstorm":
        case "mixstorm":
        case "mjcabinetseeds":
        case "mjcabinetseeds":
        case "mjguide":
        case "mnogodaqq":
        case "mnogodaw":
        case "mnogosmeha":
        case "mnogosmeha":
        case "models-me":
        case "moivulkan":
        case "momoniji":
        case "moneydaplay":
        case "monkeyslots":
        case "monsterspower":
        case "monsterspower":
        case "mordenar":
        case "mordenar":
        case "moroahedoujin":
        case "mos-girl":
        case "moscow-diploma":
        case "moscowru":
        case "moscowru":
        case "mosintim":
        case "moviedetector":
        case "moyvulkan":
        case "mp3nado":
        case "mp3nado":
        case "mp3shnik":
        case "mp3shnik":
        case "mp3vega":
        case "mrfucks":
        case "msk-diplomat":
        case "msk-diplomat":
        case "msk-dosug":
        case "mskdiploma":
        case "mskputana":
        case "mskspice":
        case "mskspice":
        case "multidiplom":
        case "multigaminatorclub":
        case "multigaminatorsclub":
        case "multigaminatorsclub":
        case "mummysgold":
        case "munkjunk":
        case "music-on-radio":
        case "muslim-library":
        case "mutualart":
        case "muzikkitabi":
        case "muzoblok":
        case "muzogig":
        case "muzokach":
        case "muzonka":
        case "mybestguys":
        case "mychildttracker":
        case "mylazaret":
        case "mylazaret":
        case "mylovedmanga":
        case "mylovedtwinks":
        case "mynnm":
        case "myronchems":
        case "nailyaalexandergallery":
        case "nalbeznal":
        case "namansite":
        case "namethatpornstar":
        case "nano-seeds":
        case "nano-seeds":
        case "narkop":
        case "narkop":
        case "narkopnews":
        case "naturismbare":
        case "naturistfreedom":
        case "naughtyteenvids":
        case "ndfl-2":
        case "ndflekb":
        case "ndflkrd":
        case "ndflspravka":
        case "nedvijimost-ua":
        case "nekurimdudku":
        case "nekurimdudku":
        case "neozard":
        case "nervometrtq":
        case "net-228":
        case "net-228":
        case "netgamecasino":
        case "netslotmachine":
        case "nevidel":
        case "new-legal":
        case "new-redclub":
        case "newbestslot":
        case "newestteenporn":
        case "news-zakon":
        case "newstarchemical":
        case "nextcasino":
        case "nijiero-ch":
        case "nijikoi-img":
        case "nikvesti":
        case "nirvanashop":
        case "nirvanashop":
        case "nitroflare":
        case "nitroflare":
        case "nizi1":
        case "nizierogazou":
        case "nnov24":
        case "nnov24":
        case "noisasal":
        case "nojki":
        case "nomeravbaze":
        case "nomeravbaze":
        case "nordicrc":
        case "nostalgiacasino":
        case "novelactivist":
        case "novosibirsk-2ndfl":
        case "noxwin":
        case "nsk-diplom":
        case "nssukr":
        case "nudegaytwink":
        case "nudeteensphotos":
        case "nudist-top":
        case "nudistfun":
        case "nurru":
        case "nuruddinvideo":
        case "nwbeats":
        case "nwslots":
        case "nymphetsfirsttimesex":
        case "nyople":
        case "obnovi":
        case "obnovi":
        case "obozrevatel":
        case "odea-pharma":
        case "odiplome":
        case "officialbenzofury":
        case "ogoporno":
        case "ohfreesex":
        case "ok-docs":
        case "okvuz":
        case "old-shaman":
        case "oligarhcasino":
        case "ololowka":
        case "olympcasino":
        case "omeglecaptures":
        case "omeglestickam":
        case "onagahardware":
        case "oneuppl":
        case "onlain-kazino":
        case "onlaincasino":
        case "onlaincasinoroyale":
        case "onlaynkazinonadengi":
        case "online-igrovie-avtomati":
        case "online-slot-avtomati":
        case "online-volcano":
        case "onlineazart":
        case "onlineblackjacklearn":
        case "onlinecasinorussia":
        case "onlinecasinosru":
        case "onlinecasinostopru":
        case "onlinecazinosguide":
        case "onlinecazinosguide":
        case "onlinecazinozguide":
        case "onlinemaxbetslots":
        case "onlinepoker66":
        case "onlineslotmachines":
        case "onlinevulkan":
        case "onlinevulkan":
        case "ooo-sex":
        case "optom-sigarety":
        case "ord-ua":
        case "oreandacasino":
        case "original-diplom":
        case "original-diploms":
        case "original-diplomy":
        case "original-diplomy":
        case "oster456":
        case "ostrovcasino":
        case "ostrovplay":
        case "otmorozkov":
        case "otmorozkov":
        case "otsocity":
        case "otsoscz":
        case "otsosru":
        case "otvetyru":
        case "p-gay":
        case "pacificpoker":
        case "paddypower":
        case "pagedoctor":
        case "pakaloco":
        case "palcomix":
        case "palcomix":
        case "papiroscaseeds":
        case "papiroscaseeds":
        case "paradise8":
        case "parimatchru":
        case "partnerearning":
        case "partybets":
        case "partybingo":
        case "partycasino":
        case "partypoker":
        case "partypoker":
        case "pas2doc":
        case "pasport-05":
        case "pasport-servis":
        case "pasportrf":
        case "pass2dok":
        case "passport-trade":
        case "passtodok":
        case "pbooru":
        case "peach-soku4":
        case "peach-soku4":
        case "pendalf999":
        case "percovka":
        case "peterpalacecasino":
        case "petrosmoke":
        case "pharaonclub":
        case "piggscasino":
        case "pigtailsinpaint":
        case "pilotomix":
        case "pilotomix":
        case "pimpandhost":
        case "pin1111":
        case "pingoo":
        case "pinnaclesports":
        case "pintoonsex":
        case "pinvents":
        case "pistoletsklad":
        case "pisuli":
        case "piter-cz":
        case "piter1":
        case "piter2":
        case "pitercz":
        case "pjaterochka":
        case "pjaterochka":
        case "planet7casino":
        case "plantachula":
        case "plantfeedshop":
        case "play-777-slots":
        case "play-casino-x":
        case "play-club-vulkan":
        case "play-dot":
        case "play-faraon":
        case "play-gaminator":
        case "play-gaminator":
        case "play-gmslots":
        case "play-island":
        case "play-jackpot":
        case "play-klub-vulkan":
        case "play-mandarin":
        case "play-maxcasino":
        case "play-ostrov":
        case "play-ostrov":
        case "play-porno":
        case "play-vulkan-casino":
        case "playadmiral":
        case "playboyka":
        case "playfaraon":
        case "playfaraon":
        case "playfortuna":
        case "playfortuna":
        case "playgaminatorslots":
        case "playgms":
        case "playgms":
        case "playithub":
        case "playmaxbetslots":
        case "plusminus1":
        case "plussmes":
        case "plussmes":
        case "pmkupit":
        case "pmognestrel":
        case "podarokmix":
        case "podarokmix":
        case "poiskmuzla":
        case "poiskpravdy":
        case "pokerrash":
        case "pokersovet":
        case "pokerstar":
        case "pokerstars":
        case "pokerstars-online":
        case "pokerstarsonline":
        case "politica-ua":
        case "ponozdre":
        case "pontorez":
        case "ponudim":
        case "popugayseeds":
        case "porn-ok":
        case "pornenthusiast":
        case "pornishka":
        case "porno-lider":
        case "porno-multiki":
        case "porno-onlain-film":
        case "porno-online-film":
        case "porno-rasskazy-sex":
        case "porno-vk":
        case "porno720p":
        case "pornobabushka":
        case "pornobazza":
        case "pornobotinok":
        case "pornobudka":
        case "pornofruit":
        case "pornokivi":
        case "pornoles":
        case "pornoload":
        case "pornolug":
        case "pornoramka":
        case "pornorazvrat":
        case "pornorutube":
        case "pornotigr":
        case "pornoxyu":
        case "pornoxyu":
        case "pornozak":
        case "porntopin":
        case "pornuha24":
        case "pornuhot":
        case "pornvideobook":
        case "prava-auto":
        case "prava-avto":
        case "prestigecasino":
        case "prettynu":
        case "primeassteens":
        case "primecasino":
        case "primeslots":
        case "primorochki":
        case "pro100diplom":
        case "prochan":
        case "prodiplom":
        case "prodiplom":
        case "profit-casino":
        case "pron24":
        case "pronchik":
        case "prostitutki":
        case "prostitutki":
        case "prostitutki-kazani":
        case "prostitutki-moskvy":
        case "prostitutki-tomska":
        case "prostitutki-volgograda":
        case "prostitutki1":
        case "prostitutki1":
        case "prostitutkimsk":
        case "prostitutkixxx":
        case "prostitutkixxx":
        case "ps8318":
        case "ps8318":
        case "psihosmes":
        case "psilohuasca":
        case "pslan":
        case "pslan":
        case "purenudism-lite":
        case "purplexvideos":
        case "pururin":
        case "putana42":
        case "putanastars":
        case "putinhuilo":
        case "putinhuylo":
        case "qmbiopharm":
        case "qoeoq":
        case "quasargaming":
        case "r-islam":
        case "rabotagoda":
        case "rabotaim-onlain":
        case "rapidchems":
        case "rasta-legal":
        case "rasta-legal":
        case "rastafon":
        case "rastafon":
        case "rastamantales":
        case "rastarasha":
        case "ratx":
        case "raunchytwinks":
        case "rc-chemical":
        case "rc-newzhikechem":
        case "rc-wholesaler":
        case "rcbestsell":
        case "rcgidspice":
        case "rchemzandbathsalts":
        case "rclabaratory":
        case "rcnet-chemicals":
        case "rcsynchem":
        case "re-redclub":
        case "reaktivist":
        case "reaktivlive":
        case "real-pump":
        case "realmaxbetslots":
        case "rebrn":
        case "redkings":
        case "redluck":
        case "redstarpoker":
        case "reefclubcasino":
        case "regcanabis":
        case "regpassion":
        case "relax-portal":
        case "relax-russia":
        case "relaxmsk":
        case "reocities":
        case "reogentik":
        case "researchchemc":
        case "researchchemicalsshaw":
        case "resistance88":
        case "resistance88":
        case "rf-lubanka":
        case "rfdiplom":
        case "rightsectorusa":
        case "riobet":
        case "riskni":
        case "riverbellecasino":
        case "robotlibrary":
        case "rosconcert":
        case "roverpl":
        case "rovnyicazak":
        case "royallab-kz":
        case "royalqueenseeds":
        case "royalvegascasino":
        case "ru-credit":
        case "ru-dip":
        case "ru-diploms":
        case "ru-diplomy":
        case "ru-diplomy":
        case "ru-nudist":
        case "ru-nur":
        case "ru-redclub":
        case "ru1spinpalace":
        case "ru3spinpalace":
        case "ru4spinpalace":
        case "ru5spinpalace":
        case "ru6spinpalace":
        case "ruanabol":
        case "ruazart":
        case "rubulk":
        case "rubybingo":
        case "rubyfortune":
        case "rudiploms":
        case "ruhemp":
        case "ruinsex":
        case "rulettka":
        case "rulettka":
        case "rulibs":
        case "rumarijuana":
        case "rumarijuana":
        case "runopl":
        case "rupornotube":
        case "ruprostitutki":
        case "ruriobet":
        case "ruriobet":
        case "rus-diplomy":
        case "rus-sky":
        case "rus-sky":
        case "rusalki":
        case "rusarticles":
        case "ruscasinos":
        case "rusdosug":
        case "rusdosug":
        case "rusgeisha":
        case "rusintim":
        case "ruslots":
        case "ruslots":
        case "rusprostitutki":
        case "russdip":
        case "russerial":
        case "russgo":
        case "russia-talk":
        case "russian-bazaar":
        case "russian-casinobellini":
        case "russian-titan-casino":
        case "russianbare":
        case "russiancasino":
        case "rutinadew":
        case "rutinadew":
        case "rutrackersite":
        case "ryletka":
        case "saidnur":
        case "saigonanswer":
        case "salaf-forum":
        case "sale-of-diplomas":
        case "saleporoh":
        case "saleporoh":
        case "sallertvr":
        case "sallertvr":
        case "salviadragon":
        case "salviaextract":
        case "salviamonster":
        case "sam-diplom":
        case "samara-dip":
        case "samaup":
        case "samecost":
        case "samintim":
        case "sankakucomplex":
        case "santaplantas":
        case "saqofat":
        case "saveilbe":
        case "scritub":
        case "sdtorrent":
        case "seasontor":
        case "sectorpravdy":
        case "see-tube":
        case "seed-city":
        case "seed-extrim":
        case "seed-hemp":
        case "seedjah":
        case "seedskanabis":
        case "seedsman":
        case "seemygf":
        case "segodel":
        case "segodel":
        case "sekssmotretvideo":
        case "seksvideosmotret":
        case "selogon":
        case "selogon":
        case "semena-konopli":
        case "semena-konoplya":
        case "semena-konoplya":
        case "semenarastut":
        case "semenarnia":
        case "semensis":
        case "semerky":
        case "semerky":
        case "semochka":
        case "sensibud":
        case "seoultrademall":
        case "sex-movies-porn":
        case "sexbes":
        case "sexomsk":
        case "sexteenator":
        case "sexualer":
        case "sexvideobaza":
        case "sexy-seeds":
        case "sexybolt":
        case "sexzavtrak":
        case "sfzchem":
        case "sh-chem":
        case "shabakataljahad":
        case "shaman-r":
        case "sharelita":
        case "shayanashop":
        case "sheverchem":
        case "shisharc":
        case "shop-stuff":
        case "shopherbalsmoke":
        case "shopmixes":
        case "shopmixes":
        case "shturmnovosti":
        case "shturmnovosti":
        case "sigaretioptom":
        case "sillacinema":
        case "simonsayscasino":
        case "sincitycasino":
        case "sippu":
        case "siquijoronline":
        case "siriomrc":
        case "sisenok":
        case "sitestatr":
        case "sitterdeppo":
        case "sitterdeppo":
        case "sjzklhg":
        case "skill7":
        case "skill7":
        case "skykingscasino":
        case "slivmail":
        case "slivmail":
        case "slontube":
        case "slot-apparaty-besplatno":
        case "slot-avtomati-besplatno":
        case "slot-avtomaty":
        case "slot-avtomaty":
        case "slot-volcano":
        case "slot78":
        case "slot78":
        case "slotadmiral":
        case "slotclubcasino":
        case "slotclubcasino":
        case "slotforplay":
        case "slotico":
        case "slotland":
        case "slotmachinesss":
        case "slotobank":
        case "slotobar":
        case "slotocash":
        case "slotodom":
        case "slotodomik":
        case "slotogod":
        case "slotoigra":
        case "slotolandia":
        case "slotolandia":
        case "slotoman":
        case "slotosfera":
        case "slotosfera":
        case "slotovoyager":
        case "slotozal":
        case "slotozalcasino":
        case "slotozalgames":
        case "slotozalplay":
        case "slotozalwin":
        case "slots-888":
        case "slots-for-fun":
        case "slotsadmiral":
        case "slotsadmiral":
        case "slotsbox":
        case "slotsbox":
        case "slotsgaminator":
        case "slotsinvegas":
        case "slotsobzor":
        case "slotsoffortune":
        case "slotsok":
        case "slotsok":
        case "slotspapa":
        case "slotvoyadger":
        case "slotvoyagcasino":
        case "slotvoyager4you":
        case "sloty-avtomaty":
        case "small-titties":
        case "smesivsem":
        case "smesivsem":
        case "smesrosip":
        case "smokemixes":
        case "smokemixes":
        case "smokes-moscow":
        case "smokes-moscow":
        case "smokeyschemsite":
        case "smotret-kino":
        case "sogore":
        case "soilek":
        case "soratnik":
        case "sosukraina":
        case "soyoungteens":
        case "spaceincome":
        case "spaceportsingapore":
        case "spbgirls":
        case "spbgirls":
        case "spbintim":
        case "spbintim":
        case "spice4fun":
        case "spicetosmoke":
        case "spinpalace":
        case "sporigribov":
        case "sportingbet":
        case "sports-seeds":
        case "sports-seeds":
        case "sprashivalka":
        case "spravki77":
        case "spravkinet":
        case "spravkiplus":
        case "staff-id":
        case "stargames":
        case "statsie":
        case "stavropol-dosug":
        case "stoneageluck":
        case "stop-sex":
        case "strelaua":
        case "sturmnovosti":
        case "suakabeck":
        case "sugumiru18":
        case "suicide-forum":
        case "sunnahouse":
        case "sunny-seeds":
        case "sunny-seeds":
        case "sunteenies":
        case "sunvegascasino":
        case "superslotsclub":
        case "superteenz":
        case "surgutsex":
        case "suvava":
        case "svs-comics":
        case "svyatorus":
        case "sweet-youngs":
        case "sweetnote":
        case "sweetnudists":
        case "swfchan":
        case "sxwet":
        case "sxzwinc":
        case "syuuchisoku":
        case "taboocasino":
        case "tangfangchem":
        case "tcasgames":
        case "tebe-diplom":
        case "tebe-diplom":
        case "technosotnya":
        case "teen-bin":
        case "teen-funs":
        case "teenageshowoffs":
        case "teenbin":
        case "teenfuckxxx":
        case "teengaydick":
        case "teengaypictures":
        case "teenhardcorevids":
        case "teenhotvids":
        case "teenmandarin":
        case "teenorgytube":
        case "teenpussytv":
        case "teens-list":
        case "teensgetsfucking":
        case "teensinbra":
        case "teenskitten":
        case "teentubeq":
        case "teentubeq":
        case "teenworldtube":
        case "teenxxxass":
        case "teeny-list":
        case "teeny-list":
        case "telkniga":
        case "telkniga":
        case "tentakle":
        case "teonanakatl":
        case "tetrahydronics":
        case "tevropkr":
        case "the-fasol":
        case "the18porn":
        case "thebetwaygroup":
        case "thedoujin":
        case "theofficialk2incense":
        case "theravestijngallery":
        case "thestonerscookbook":
        case "theteengirl":
        case "theweedblog":
        case "thiendia":
        case "thisisvegas":
        case "thumbzilla":
        case "tierneygearon":
        case "tinypinkpussy":
        case "tinytwinks":
        case "titan-casino-russian":
        case "titan-ru-poker":
        case "titanbet":
        case "titanbingo":
        case "titancasino":
        case "titancasinorussian":
        case "titanpoker":
        case "tkkchems":
        case "tnprk":
        case "toons-empire":
        case "top-10-casino":
        case "topfreeslots":
        case "topgms":
        case "topgms":
        case "topufa":
        case "topvulkan":
        case "torbina":
        case "torontovka":
        case "torrent-base":
        case "torrent-kino":
        case "torrent-ok":
        case "torrentino-com":
        case "torrentino-tor":
        case "torrentom":
        case "torrentpoisk":
        case "torrentsline":
        case "torrentsmd":
        case "torrentstock":
        case "torrentszona":
        case "totally-naked":
        case "tprunet":
        case "tradetuber":
        case "tradexshop":
        case "treasuryislandcasino":
        case "trilerjakson":
        case "triobet":
        case "trollvids":
        case "tropezru":
        case "trudbarnaul":
        case "trudcredit":
        case "trudhabarovsk":
        case "trudizhevsk":
        case "trudkrd":
        case "trudlipetsk":
        case "trudorenburg":
        case "trudovaya":
        case "trudovaya-kniga":
        case "trudpenza":
        case "trudryazan":
        case "trudulyanovsk":
        case "trudyarsk":
        case "trydovik":
        case "tsum-rus":
        case "tube-ok":
        case "tube8":
        case "tubetorrent":
        case "tubeyoung":
        case "tumenvrach":
        case "turizmok":
        case "tutdiplom":
        case "tvoiprava":
        case "twinkbfvideos":
        case "twinkbfvids":
        case "twinkporngayboys":
        case "twist-casino":
        case "twistcasino":
        case "twistcasinogames":
        case "twistcasinogames":
        case "twitlonger":
        case "ua-teens":
        case "uapolitics":
        case "uceba":
        case "uceba":
        case "udarsmes":
        case "ufa-dosug":
        case "ufagub":
        case "ufameet":
        case "ukr-online":
        case "ukrainian-sex":
        case "ukrapk":
        case "ukrmedserv":
        case "ukrpolitforum":
        case "ulyanovskvrach":
        case "ummanews":
        case "ummanews":
        case "una-unso":
        case "unibet":
        case "up-redclub":
        case "up-redclub":
        case "up77":
        case "upskirtsforum":
        case "upslots":
        case "upslots":
        case "upslotscasino":
        case "ura-seeds":
        case "ural-legal":
        case "usrearchchemsupplies":
        case "v-vulkan":
        case "v2load":
        case "va-bank-casino":
        case "vabank-klub":
        case "vabank-play":
        case "vabank-super":
        case "vabankklub":
        case "vabankklub":
        case "vabankonline":
        case "vdagestan":
        case "vdagestan":
        case "vegas7casino":
        case "vegascountrycasino":
        case "vegasred":
        case "velcome-club":
        case "velcomeclub":
        case "ventosale":
        case "ventosale":
        case "vertusmes":
        case "vertusmes":
        case "veselizzz":
        case "veselizzz":
        case "vetrinamix":
        case "vetrinamix":
        case "vickyvirgin":
        case "video-one":
        case "videocasinoslot":
        case "videocekc":
        case "videokub":
        case "vidmax":
        case "vidqo":
        case "vidshaker":
        case "villagevoice":
        case "vilovatoe":
        case "vio24":
        case "vip-diplomy":
        case "vip-krasotki":
        case "vip-zona":
        case "vipazartplay":
        case "vipclub-vulkan":
        case "vipgayteens":
        case "vipnetgame":
        case "vipsoski":
        case "vipuslugi":
        case "vipuslugi":
        case "vipvolcano":
        case "virtanica":
        case "virtanica":
        case "virtanika":
        case "virtanika":
        case "vitalya-bro":
        case "vkasino":
        case "vladgirl":
        case "volcano-club-online":
        case "volcano-online":
        case "volcano-slot-club":
        case "volcano-slots-club":
        case "volcano-vip":
        case "volcano-vipclub":
        case "volcanoclub-slots":
        case "volcanoclubs":
        case "volcanoclubslots":
        case "volcanogold":
        case "volcanoslotsclub":
        case "volcanovip":
        case "volcanovip":
        case "volgogradmed":
        case "volgomed":
        case "volutar":
        case "voy":
        case "vozforums":
        case "vozmimp3":
        case "vozmitxt":
        case "vrachmedic":
        case "vsb-cchq":
        case "vse-prava":
        case "vsedlyavsex":
        case "vtraheporn":
        case "vtraxe":
        case "vulcan-cazino":
        case "vulcan-game":
        case "vulcan-igrovoyclub":
        case "vulcan-play":
        case "vulcan-play-casino":
        case "vulcan-portal":
        case "vulcan-slots":
        case "vulcan-slots":
        case "vulcan1":
        case "vulcanclub":
        case "vulcanoclub":
        case "vulcanplay":
        case "vulcanwin":
        case "vulkan-bet":
        case "vulkan-casino":
        case "vulkan-igrovie-avtomaty":
        case "vulkan-online":
        case "vulkan-platinum":
        case "vulkan-play":
        case "vulkandelux":
        case "vulkanigrovieavtomaty":
        case "vulkann":
        case "vulkanoclub":
        case "vulkanplay":
        case "vulkanpremium":
        case "vulkanpremium":
        case "vulkanprize":
        case "vulkanstars1":
        case "vulkanstavka":
        case "vuz-diplom":
        case "vvolcano":
        case "vvolcano2":
        case "vvulcan":
        case "vvulcan":
        case "vvulkan":
        case "vyprchemical":
        case "vzonetv":
        case "vzrivpaket":
        case "wanyouindustrial":
        case "waptiny":
        case "way-to-allah":
        case "webcamxxxvideos":
        case "webslotcasino":
        case "weedporndaily":
        case "weedsthatplease":
        case "wehasporn":
        case "white-no-angel":
        case "white-no-angel":
        case "wholesalercshop":
        case "wildjackcasino":
        case "williamhill":
        case "williamhillcasino":
        case "williamhillcasino":
        case "williamhillcasinoclub":
        case "winazart":
        case "windowscasino":
        case "winn-palace":
        case "winner":
        case "wm-bingo":
        case "wnx7":
        case "work-way":
        case "world-chemical":
        case "worldmedscience":
        case "worldmixes":
        case "worldmixes":
        case "ws-biotechnology":
        case "wulcan-club":
        case "wulcanclub":
        case "wulkanclub":
        case "wulkanoclub":
        case "x-diplom":
        case "x-mafia":
        case "xbetsport":
        case "xbetsports":
        case "xbooru":
        case "xhamster":
        case "xhomovies":
        case "xim-poisk":
        case "xiosin":
        case "xlolitka":
        case "xn-----7kcabhcccv4a7amkvdf3a8bdx8nj":
        case "xn-----8kcrxbkobdccbbklgla2b":
        case "xn----7sbbavay1adhg7ae2b3a3h":
        case "xn----7sbbpcak2aq2c1d":
        case "xn----7sboarlhdkdkbnr":
        case "xnxx":
        case "xpland":
        case "xtubx":
        case "xvideos":
        case "xxsteen":
        case "xxx-ok":
        case "xxx-yes":
        case "xxxteensvids":
        case "xyousex":
        case "yamaspain":
        case "yaoihavenreborn":
        case "yepporn":
        case "you-books":
        case "you-prava":
        case "you-prava":
        case "young-gay-boy-pics":
        case "young-vagina":
        case "younggirlnudists":
        case "younggirls-sex":
        case "younghardsex":
        case "youngheaven":
        case "youngmodelspics":
        case "youngpornhq":
        case "youngs-list":
        case "youngs-list":
        case "youngvidsxxx":
        case "youratetube":
        case "yourepeat":
        case "yourmoneyslots":
        case "youtube":
        case "youtube":
        case "youtubelike":
        case "youxclip":
        case "yuntu-chem":
        case "yxyixiou":
        case "zakazhidiplom":
        case "zakladki24":
        case "zakladru":
        case "zarbuz":
        case "zarenreich":
        case "zeiliri":
        case "zelomix":
        case "zelomix":
        case "zerkalo-redclub":
        case "zerocensorship":
        case "zerunpharma":
        case "zhenfeichem":
        case "zhestkoe":
        case "zipdeuploader":
        case "znakomstvacz":
        case "zodiaccasino":
        case "zolotoi-arbuz":
        case "zombie-legal":
        case "zombie-legal":
        case "zoobrilka":
        case "zps-electronics":
        case "zubromix":
        case "zubromix":
        case "zybiotechnology":
          return true;
        case "3dcartstores":
          return doms.pop() === "dieselspice";
        case "4frc":
          return doms.pop() === "vse";
        case "7thstyle":
          return doms.pop() === "dalian";
        case "8-d":
          return doms.pop() === "n24";
        case "888":
          return doms.pop() === "ru";
        case "888-russia":
          return doms.pop() === "ru";
        case "888casino":
          return doms.pop() === "ru";
        case "928x":
          switch( doms.pop() ) {
            case "jwh-reagent-dlya-spaysairkutsk":
            case "prodavcy-met-sol-skorost-spays-jwh-irkutsk-45":
              return true;
          }
          break;
        case "aimoo":
          return doms.pop() === "forum4";
        case "angelcities":
          return doms.pop() === "lamro";
        case "armuay":
          switch( doms.pop() ) {
            case "upload":
            case "upload":
              return true;
          }
          break;
        case "aufeminin":
          return doms.pop() === "imblog";
        case "aztop":
          return doms.pop() === "forum";
        case "betfair":
          switch( doms.pop() ) {
            case "beta":
            case "casino":
              return true;
          }
          break;
        case "bethschiffer":
          return doms.pop() === "auctions";
        case "betredkings":
          return doms.pop() === "russian";
        case "bilgibende":
          return doms.pop() === "f";
        case "bk-fonbet":
          switch( doms.pop() ) {
            case "bets":
            case "live":
            case "toto":
              return true;
          }
          break;
        case "blog":
          switch( doms.pop() ) {
            case "lickketkthickwalk":
            case "scootobezes":
              return true;
          }
          break;
        case "blogspot":
          return doms.pop() === "azatlyk-vatan";
        case "bridgat":
          return doms.pop() === "b2b";
        case "brightcove":
          return doms.pop() === "link";
        case "bstpoint":
          switch( doms.pop() ) {
            case "5089841":
            case "5099651":
              return true;
          }
          break;
        case "cannabis":
          return doms.pop() === "boards";
        case "casino-ruletka":
          return doms.pop() === "member";
        case "casino440":
          return doms.pop() === "ru";
        case "casinoredkings":
          return doms.pop() === "russian";
        case "cn":
          return doms.pop() === "legalpowder";
        case "crazyvegas":
          return doms.pop() === "ru";
        case "crystalcasino":
          return doms.pop() === "ru";
        case "deadjournal":
          switch( doms.pop() ) {
            case "jessica":
            case "moon":
              return true;
          }
          break;
        case "den-rozdeniya":
          return doms.pop() === "aleksandra-aleksandrovicha";
        case "dentistserver":
          switch( doms.pop() ) {
            case "partypills2015":
            case "syntheticmarijuana2015":
              return true;
          }
          break;
        case "devhub":
          return doms.pop() === "jwhonlineshop";
        case "devochki":
          switch( doms.pop() ) {
            case "chita":
            case "volgograd":
              return true;
          }
          break;
        case "devochkicz":
          return doms.pop() === "belgorod";
        case "diytrade":
          switch( doms.pop() ) {
            case "chinarazor":
            case "fochem":
            case "hbdatongchem":
            case "rcsbroker":
              return true;
          }
          break;
        case "dojin":
          return doms.pop() === "erertic";
        case "dosugcx1":
          return doms.pop() === "www2";
        case "dosugsamara":
          return doms.pop() === "individualki";
        case "dustmitespedia":
          return doms.pop() === "erewfiop6";
        case "ec21":
          switch( doms.pop() ) {
            case "m":
            case "manufacturer":
            case "russian":
              return true;
            case "en":
              return doms.pop() === "hbcngrandway";
          }
          break;
        case "eropuru":
          return doms.pop() === "nizi";
        case "eucasino":
          return doms.pop() === "russian";
        case "eucasino1":
          return doms.pop() === "r2";
        case "eurogrand":
          switch( doms.pop() ) {
            case "aa":
            case "ac":
              return true;
          }
          break;
        case "everychina":
          if (doms.pop() === "sell")
            return doms.pop() === "www-lxpharm-com";
          break;
        case "fc2":
          switch( doms.pop() ) {
            case "blog-imgs-42-origin":
            case "blog-imgs-52":
            case "blog-imgs-60-origin":
            case "blog-imgs-61":
            case "blog-imgs-64":
            case "blog-imgs-65":
            case "blog-imgs-66":
            case "blog-imgs-68":
            case "blog-imgs-70":
            case "blog-imgs-70-origin":
              return true;
            case "blog":
              switch( doms.pop() ) {
                case "nesingazou":
                case "niziirogazou":
                  return true;
              }
              break;
            case "blog133":
              return doms.pop() === "moeimg";
            case "blog16":
              return doms.pop() === "tsvsts";
            case "blog27":
              return doms.pop() === "lolidoujin";
            case "blog89":
              return doms.pop() === "egyptsobaya";
          }
          break;
        case "fifth-zone":
          return doms.pop() === "avtomat";
        case "firstmo":
          return doms.pop() === "yulia";
        case "forumbuild":
          return doms.pop() === "chemicals";
        case "forumcity":
          return doms.pop() === "ru";
        case "forumup":
          return doms.pop() === "minsk";
        case "gaminator2":
          return doms.pop() === "mint";
        case "grasscity":
          return doms.pop() === "forum";
        case "herokuapp":
          return doms.pop() === "guarded-basin-9032";
        case "hisupplier":
          if (doms.pop() === "en")
            return doms.pop() === "chemicalshopltd";
          break;
        case "ilovegrowingmarijuana":
          return doms.pop() === "shop";
        case "insanejournal":
          switch( doms.pop() ) {
            case "john":
            case "redheartedqueen":
              return true;
          }
          break;
        case "intertops":
          return doms.pop() === "casino";
        case "intim66":
          switch( doms.pop() ) {
            case "krasnodar":
            case "kurgan":
              return true;
          }
          break;
        case "itrademarket":
          return doms.pop() === "elishop";
        case "japrodam":
          switch( doms.pop() ) {
            case "ekaterinburg":
            case "ufa":
              return true;
          }
          break;
        case "k-doujin":
          return doms.pop() === "jingai";
        case "kalarupa":
          return doms.pop() === "forum";
        case "ladbrokers":
          return doms.pop() === "vegas";
        case "ladbrokes":
          switch( doms.pop() ) {
            case "casino":
            case "games":
            case "vegas":
              return true;
          }
          break;
        case "lilithezine":
          return doms.pop() === "religion";
        case "livejournal":
          switch( doms.pop() ) {
            case "anatoli-dubnov":
            case "andreeva54":
            case "andrey-lf":
            case "andreychernuhin":
            case "anshakov":
            case "archerss":
            case "baghdad-thief":
            case "basir71":
            case "dao-b":
            case "dims12":
            case "dmitrykogan":
            case "drugoi-nnover":
            case "general-ivanov":
            case "hizbuttahrir":
            case "john-rend":
            case "man-with-dogs":
            case "mr-k-bx":
            case "mr-winker":
            case "na6ludatelb":
            case "nktv1tl":
            case "nordman75":
            case "oleg-leusenko":
            case "oxana-volva":
            case "politician-ru":
            case "prof-eug":
            case "qwerty765":
            case "regularis-news":
            case "ripcska":
            case "ru-nazdem":
            case "russ5":
            case "shiropaev":
            case "shust50":
            case "solveig-54":
            case "t-rurua":
            case "terroritto":
            case "v-n-zb":
            case "yury-nesterenko":
            case "za-chest":
            case "zloy-odessit":
            case "zloy55":
              return true;
          }
          break;
        case "lotoscasinos":
          return doms.pop() === "en";
        case "me-zrh":
          switch( doms.pop() ) {
            case "kupit-jwh-smolensk":
            case "kupit-kuritelnye-miksy-irkutsk":
            case "kupit-kuritelnye-miksy-krasnodar":
            case "kupit-kuritelnye-miksy-magnitogorsk":
            case "kupit-kuritelnye-miksy-novokuzneck":
            case "kupit-kuritelnye-miksy-perm":
            case "kupit-kuritelnye-miksy-sterlitamak":
            case "kupit-kuritelnye-miksy-tomsk":
            case "kupit-kuritelnye-miksy-volzhskiy":
            case "kupit-kuritelnye-smesi-kirov":
            case "kupit-kuritelnye-smesi-krasnodar":
            case "kupit-kuritelnye-smesi-nizhniy-novgorod":
            case "kupit-kuritelnye-smesi-saratov":
            case "kupit-kuritelnye-smesi-sterlitamak":
            case "kupit-kuritelnye-smesi-taganrog":
            case "kupit-kuritelnye-smesi-v-tumeni":
            case "kupit-kuritelnye-smesi-volzhskiy":
            case "kupit-kuritelnye-smesi-voronezh":
            case "kupit-legalnyy-poroshok-v-anape":
            case "kupit-legalnyy-poroshok-v-astrahani":
            case "kupit-legalnyy-poroshok-v-krasnodare":
            case "kupit-legalnyy-poroshok-v-ufe":
            case "kupit-spays-habarovsk":
            case "kupit-spays-kirov":
            case "kupit-spays-kostroma":
            case "kupit-spays-krasnodar":
            case "kupit-spays-murmansk":
            case "kupit-spays-novokuzneck":
            case "kupit-spays-penza":
            case "kupit-spays-sankt-peterburg":
            case "kupit-spays-tambov":
            case "kupit-spays-tula":
            case "kupit-spays-ufa":
            case "kupit-spays-ulyanovsk":
            case "kupit-spays-v-chelyabinske":
            case "kupit-spays-volzhskiy":
            case "kupit-spice-cherepovec":
            case "kuritelnye-smesi-babushkinskaya":
            case "kuritelnye-smesi-kursk":
            case "kuritelnye-smesi-v-samare":
            case "kuritelnye-smesi-v-strogino":
            case "kuritelnye-smesi-volzhskiy":
            case "legalnye-kuritelnye-smesi-lipeck":
            case "legalnye-kuritelnye-smesi-tumen":
            case "legalnye-poroshki-belgorod":
            case "legalnye-poroshki-krasnodar":
            case "legalnye-poroshki-omsk":
            case "legalnye-poroshki-sterlitamak":
            case "legalnye-poroshki-ulyanovsk":
            case "legalnye-poroshki-v-sochi":
            case "legalnye-poroshki-volzhskiy":
            case "spays-barnaul":
            case "spays-orenburg":
            case "spays-v-rostove-na-donu":
            case "spays-volzhskiy":
            case "spays-yoshkar-ola":
            case "zakladki-nikolaev":
              return true;
          }
          break;
        case "mirslovarei":
          return doms.pop() === "otvet";
        case "mirusoft":
          return doms.pop() === "ww";
        case "mixstorm":
          return doms.pop() === "mail";
        case "moemilk":
          return doms.pop() === "doujin";
        case "monsterspower":
          return doms.pop() === "mail";
        case "moreforum":
          return doms.pop() === "novospice";
        case "mypinsk":
          return doms.pop() === "forum";
        case "myregisteredsite":
          if (doms.pop() === "sites")
            return doms.pop() === "1226608";
          break;
        case "naprodazhu":
          return doms.pop() === "novosibirsk";
        case "netbet":
          return doms.pop() === "casino";
        case "nonudeplace":
          switch( doms.pop() ) {
            case "girls":
            case "mixed":
            case "new":
            case "portal":
            case "teddy":
              return true;
          }
          break;
        case "nurrehberi":
          return doms.pop() === "ru";
        case "olybet":
          return doms.pop() === "ee";
        case "overblog":
          return doms.pop() === "kavkaznews";
        case "overcram":
          return doms.pop() === "ru";
        case "panow":
          return doms.pop() === "classifieds";
        case "paradcasino":
          return doms.pop() === "ru";
        case "partycasino":
          return doms.pop() === "ru";
        case "pbooru":
          return doms.pop() === "img";
        case "pbworks":
          return doms.pop() === "spbhack";
        case "pharma-rawmaterial":
          return doms.pop() === "russian";
        case "podarokmix":
          return doms.pop() === "mail";
        case "pokerheaven":
          return doms.pop() === "casino";
        case "porn":
          return doms.pop() === "ru";
        case "pornhub":
          return doms.pop() === "ru";
        case "prestigecasino":
          switch( doms.pop() ) {
            case "aa":
            case "bc":
              return true;
          }
          break;
        case "priv8joker":
          return doms.pop() === "mdmashoprus";
        case "prostitutki":
          switch( doms.pop() ) {
            case "barnaul":
            case "chelyabinsk":
            case "ekb":
            case "irkutsk":
            case "izhevsk":
            case "kazan":
            case "kemerovo":
            case "khabarovsk":
            case "krasnodar":
            case "krasnoyarsk":
            case "msk":
            case "nn":
            case "novokuznetsk":
            case "nsk":
            case "omsk":
            case "orenburg":
            case "perm":
              return true;
          }
          break;
        case "punkchords":
          switch( doms.pop() ) {
            case "ej":
            case "grani":
            case "grani1":
            case "kasparov":
            case "navalny":
              return true;
          }
          break;
        case "rosinstrument":
          return doms.pop() === "x";
        case "rusdosug":
          return doms.pop() === "prostitutki";
        case "russianamerica":
          switch( doms.pop() ) {
            case "classifieds":
            case "forum":
              return true;
          }
          break;
        case "russianboston":
          return doms.pop() === "classifieds";
        case "russiancasino":
          switch( doms.pop() ) {
            case "demo":
            case "demo":
              return true;
          }
          break;
        case "russianchicago":
          return doms.pop() === "classifieds";
        case "russiancleveland":
          return doms.pop() === "classifieds";
        case "russianfrisco":
          return doms.pop() === "classifieds";
        case "russianla":
          return doms.pop() === "classifieds";
        case "russianmiami":
          return doms.pop() === "classifieds";
        case "safe-communication":
          return doms.pop() === "eu";
        case "sankakucomplex":
          switch( doms.pop() ) {
            case "chan":
            case "cs":
              return true;
          }
          break;
        case "sensagent":
          return doms.pop() === "dictionary";
        case "shaman-r":
          return doms.pop() === "kuritelnyye-smesi-miksy-marki-sol-dzhiv-jwh-skorost-zakladki";
        case "shemalespoiledwhore":
          if (doms.pop() === "image")
            return doms.pop() === "cdn1";
          break;
        case "sjzklhg":
          return doms.pop() === "ru";
        case "skykingscasino":
          switch( doms.pop() ) {
            case "aa":
            case "bc":
            case "ru":
              return true;
          }
          break;
        case "slave18":
          return doms.pop() === "hentai-forced-femdoms";
        case "slotsmagic-ru":
          return doms.pop() === "ru";
        case "soupcdn":
          switch( doms.pop() ) {
            case "asset-0":
            case "asset-1":
            case "asset-2":
            case "asset-3":
            case "asset-4":
            case "asset-5":
            case "asset-6":
            case "asset-7":
            case "asset-8":
            case "asset-9":
            case "asset-a":
            case "asset-b":
            case "asset-d":
            case "asset-e":
            case "asset-f":
              return true;
          }
          break;
        case "sportingbet":
          return doms.pop() === "ru";
        case "sportingbeteurope":
          return doms.pop() === "ru";
        case "staticish":
          return doms.pop() === "s-i-net-1";
        case "subirimagenes":
          return doms.pop() === "s2";
        case "supplierlist":
          if (doms.pop() === "en")
            return doms.pop() === "rooney";
          break;
        case "sweetnote":
          return doms.pop() === "board";
        case "telkniga":
          switch( doms.pop() ) {
            case "angarsk":
            case "balagansk":
            case "bayanday":
            case "baykalsk":
            case "bohan":
            case "bratsk":
            case "cheboksari":
            case "chelyabinsk":
            case "cheremhovo":
            case "cherepovec":
            case "chunskiy":
            case "demidov":
            case "desnogorsk":
            case "dorogobuzh":
            case "duhovschina":
            case "eburg":
            case "elanci":
            case "elnya":
            case "ershichi":
            case "gagarin":
            case "glinka":
            case "habarovsk":
            case "hislavichi":
            case "holmzhirkovskiy":
            case "ilimsk":
            case "irkutsk":
            case "ivanovo":
            case "kachug":
            case "kaluga":
            case "kardimovo":
            case "kazan":
            case "kostroma":
            case "krasniy":
            case "krasnodar":
            case "krasnoyarsk":
            case "kutulik":
            case "leninsk":
            case "livni":
            case "monastirschina":
            case "msk":
            case "nikolaevsk":
            case "novgorod":
            case "novodugino":
            case "novonukutskiy":
            case "novosibirsk":
            case "omsk":
            case "ostrov":
            case "pochinok":
            case "roslavl":
            case "rudnya":
            case "safonovo":
            case "samara":
            case "sayansk":
            case "shelehov":
            case "shumyachi":
            case "sludyanka":
            case "smolensk":
            case "spb":
            case "stavropol":
              return true;
          }
          break;
        case "texaschildfind":
          switch( doms.pop() ) {
            case "gde-legalny-narkotiki":
            case "jwh-bryansk":
            case "jwh-kazan":
            case "jwh-petrozavodsk":
            case "jwh-sankt-peterburg":
            case "jwh-taganrog":
            case "jwh-tula":
            case "jwh-ulyanovsk":
            case "jwh-volzhskiy":
            case "kupit-jwh-astrahan":
            case "kupit-jwh-habarovsk":
            case "kupit-jwh-krasnoyarsk":
            case "kupit-jwh-kursk":
            case "kupit-jwh-lipeck":
            case "kupit-jwh-novokuzneck":
            case "kupit-jwh-orl":
            case "kupit-jwh-petrozavodsk":
            case "kupit-jwh-rostov":
            case "kupit-jwh-taganrog":
            case "kupit-jwh-tambov":
            case "kupit-jwh-vladivostok":
            case "kupit-jwh-volzhskiy":
            case "kupit-kuritelnye-miksy-barnaul":
            case "kupit-kuritelnye-miksy-omsk":
            case "kupit-kuritelnye-miksy-perm":
            case "kupit-kuritelnye-miksy-tula":
            case "kupit-kuritelnye-miksy-ulan-ude":
            case "kupit-kuritelnye-smesi":
            case "kupit-kuritelnye-smesi-komsomolsk-na-amure":
            case "kupit-kuritelnye-smesi-tomsk":
            case "kupit-legalnye-kuritelnye-smesi-optom":
            case "kupit-legalnye-narkotiki-v-pitere":
            case "kupit-legalnyy-poroshok-v-ufe":
            case "kupit-reagent-v-moskve":
            case "kupit-spays-belgorod":
            case "kupit-spays-kaliningrad":
            case "kupit-spays-kirov":
            case "kupit-spays-nizhnevartovsk":
            case "kupit-spays-novokuzneck":
            case "kupit-spays-orl":
            case "kupit-spays-ufa":
            case "kupit-spays-v-chelyabinske":
            case "kupit-spays-v-kurske":
            case "kupit-spays-v-mytischah":
            case "kupit-spays-vologda":
            case "kupit-spays-volzhskiy":
            case "kupit-spays-yoshkar-ola":
            case "kupit-spice-kaliningrad":
            case "kupit-spice-kazan":
            case "kupit-spice-kirov":
            case "kupit-spice-komsomolsk-na-amure":
            case "kupit-spice-murmansk":
            case "kupit-spice-tolyatti":
            case "kupit-spice-vologda":
            case "kupit-spice-volzhskiy":
            case "kuritelnye-miksy-ekaterinburg":
            case "kuritelnye-smesi-kupit-v-barnaule":
            case "kuritelnye-smesi-nizhnevartovsk":
            case "kuritelnye-smesi-pervomayskaya":
            case "kuritelnye-smesi-v-balashihe-kupit":
            case "kuritelnye-smesi-volzhskiy":
            case "legalnye-kuritelnye-miksy-kazan":
            case "legalnye-kuritelnye-miksy-ryazan":
            case "legalnye-kuritelnye-miksy-volzhskiy":
            case "legalnye-kuritelnye-miksy-yakutsk":
            case "legalnye-kuritelnye-smesi-volzhskiy":
            case "legalnye-miksy-ryazan":
            case "legalnye-miksy-yakutsk":
            case "legalnye-narkotiki-rostov":
            case "legalnye-narkotiki-saransk":
            case "legalnye-poroshki-novokuzneck":
            case "legalnye-poroshki-v-pitere":
            case "sol-dlya-vann-spb":
            case "spays-v-belovo":
            case "spays-v-voronezhe":
            case "spice-orenburg":
            case "spice-volzhskiy":
            case "zakladki-miass":
            case "zakladki-volzhskiy":
              return true;
          }
          break;
        case "tradebanq":
          return doms.pop() === "ru";
        case "trannyxxxclip":
          if (doms.pop() === "image")
            return doms.pop() === "cdn1";
          break;
        case "tripod":
          switch( doms.pop() ) {
            case "shulhan":
            case "vree":
              return true;
            case "abdulvahab":
              return doms.pop() === "abdullah";
          }
          break;
        case "tumblr":
          switch( doms.pop() ) {
            case "bremser":
            case "citroncollective":
            case "djeain":
            case "gashish-shishki-banan25":
            case "gsaplontai":
            case "iionescophoto":
            case "in-all-of-us-is-hope":
            case "inahill":
            case "jaimepetite":
            case "mavrin":
            case "mediafurat":
            case "psilines":
            case "ratak-monodosico":
            case "reznya":
            case "rusrule34":
            case "silezukuk":
            case "spoleczenstwo-jest-niemile":
            case "stockpilethoughts":
            case "sweetdisposition91":
            case "white-power-org":
              return true;
          }
          break;
        case "ulver":
          return doms.pop() === "valhalla";
        case "unibet":
          switch( doms.pop() ) {
            case "ru":
            case "ru1":
              return true;
          }
          break;
        case "v-teme":
          switch( doms.pop() ) {
            case "kolebcev":
            case "pakovan":
              return true;
          }
          break;
        case "vetrinamix":
          return doms.pop() === "mail";
        case "videosection":
          return doms.pop() === "ru";
        case "vividtranny":
          if (doms.pop() === "image")
            return doms.pop() === "cdn1";
          break;
        case "whgaming":
          return doms.pop() === "casino";
        case "whitereconquista":
          return doms.pop() === "rus";
        case "willfound":
          switch( doms.pop() ) {
            case "crimea":
            case "dp":
            case "kiev":
              return true;
          }
          break;
        case "williamhill":
          switch( doms.pop() ) {
            case "casino":
            case "static":
              return true;
          }
          break;
        case "williamhillcasino":
          switch( doms.pop() ) {
            case "aa":
            case "ru":
              return true;
          }
          break;
        case "winner":
          switch( doms.pop() ) {
            case "casino":
            case "casino":
              return true;
          }
          break;
        case "wintrillions":
          return doms.pop() === "ru";
        case "wnx7":
          switch( doms.pop() ) {
            case "kupit-amfetamin-eyforetik-astrahan":
            case "kupit-amfetamin-eyforetik-bakal":
            case "kupit-amfetamin-eyforetik-cheboksary":
            case "kupit-amfetamin-eyforetik-digora":
            case "kupit-amfetamin-eyforetik-divnogorsk":
            case "kupit-amfetamin-eyforetik-dno":
            case "kupit-amfetamin-eyforetik-dobryanka":
            case "kupit-amfetamin-eyforetik-dolgoprudnyy":
            case "kupit-amfetamin-eyforetik-ekaterinburg":
            case "kupit-amfetamin-eyforetik-himki":
            case "kupit-amfetamin-eyforetik-irkutsk-45":
            case "kupit-amfetamin-eyforetik-istra-1":
            case "kupit-amfetamin-eyforetik-izhevsk":
            case "kupit-amfetamin-eyforetik-kolomna":
            case "kupit-amfetamin-eyforetik-korolev":
            case "kupit-amfetamin-eyforetik-kostroma":
            case "kupit-amfetamin-eyforetik-krasnoyarsk":
            case "kupit-amfetamin-eyforetik-krasnyy-kut":
            case "kupit-amfetamin-eyforetik-lubercy":
            case "kupit-amfetamin-eyforetik-murmansk":
            case "kupit-amfetamin-eyforetik-naro-fominsk":
            case "kupit-amfetamin-eyforetik-noginsk":
            case "kupit-amfetamin-eyforetik-obluche":
            case "kupit-amfetamin-eyforetik-omsk":
            case "kupit-amfetamin-eyforetik-otradnoe":
            case "kupit-amfetamin-eyforetik-perm":
            case "kupit-amfetamin-eyforetik-podolsk":
            case "kupit-amfetamin-eyforetik-ramenskoe":
            case "kupit-amfetamin-eyforetik-reutov":
            case "kupit-amfetamin-eyforetik-ryazan":
            case "kupit-amfetamin-eyforetik-samara":
            case "kupit-amfetamin-eyforetik-schelkovo":
            case "kupit-amfetamin-eyforetik-sterlitamak":
            case "kupit-amfetamin-eyforetik-surgut":
            case "kupit-amfetamin-eyforetik-tambov":
            case "kupit-amfetamin-eyforetik-ufa":
            case "kupit-amfetamin-eyforetik-ulyanovsk":
            case "kupit-amfetamin-eyforetik-ussuriysk":
            case "kupit-amfetamin-eyforetik-vladivostok":
            case "kupit-amfetamin-eyforetik-volokolamsk":
            case "kupit-amfetamin-eyforetik-yoshkar-ola":
            case "kupit-amfetamin-eyforetik-zelenograd":
            case "kupit-amfetamin-eyforetik-zhigulevsk":
            case "kupit-amfetamin-eyforetik-zhukov":
            case "kupit-amfetamin-eyforetik-zhukovka":
            case "kupit-anashu-shishki-natur-gash-kureha-kurevo-sredneuralsk":
            case "kupit-boshki-ekaterinburg":
            case "kupit-boshki-kazan":
            case "kupit-boshki-nizhniy-lomov":
            case "kupit-boshki-nizhniy-novgorod":
            case "kupit-boshki-nizhniy-tagil":
            case "kupit-boshki-novosibirsk":
            case "kupit-boshki-petropavlovsk-kamchatskiy":
            case "kupit-boshki-tomsk":
            case "kupit-boshki-tulun":
            case "kupit-boshki-tumen":
            case "kupit-ekstazi-mdma-pilsy-novocheboksarsk":
            case "kupit-jwh-reagent-dlya-spaysa-abakan":
            case "kupit-jwh-reagent-dlya-spaysa-astrahan":
            case "kupit-jwh-reagent-dlya-spaysa-berdsk":
            case "kupit-jwh-reagent-dlya-spaysa-bryansk":
            case "kupit-jwh-reagent-dlya-spaysa-ekaterinburg":
            case "kupit-jwh-reagent-dlya-spaysa-izhevsk":
            case "kupit-jwh-reagent-dlya-spaysa-kazan":
            case "kupit-jwh-reagent-dlya-spaysa-kemerovo":
            case "kupit-jwh-reagent-dlya-spaysa-kirov":
            case "kupit-jwh-reagent-dlya-spaysa-lipeck":
            case "kupit-jwh-reagent-dlya-spaysa-mozhaysk":
            case "kupit-jwh-reagent-dlya-spaysa-murmansk":
            case "kupit-jwh-reagent-dlya-spaysa-nizhniy-tagil":
            case "kupit-jwh-reagent-dlya-spaysa-orenburg":
            case "kupit-jwh-reagent-dlya-spaysa-perm":
            case "kupit-jwh-reagent-dlya-spaysa-ryazan":
            case "kupit-jwh-reagent-dlya-spaysa-sochi":
            case "kupit-jwh-reagent-dlya-spaysa-vladivostok":
            case "kupit-jwh-reagent-dlya-spaysa-volzhskiy":
            case "kupit-jwh-reagent-dlya-spaysa-vorkuta":
            case "kupit-kokain-kazan":
            case "kupit-kokain-mozhaysk":
            case "kupit-kuritelnye-smesi-kyzyl":
            case "kupit-kuritelnye-smesi-petropavlovsk-kamchatskiy":
            case "kupit-legalnye-poroshki-cheboksary":
            case "kupit-skorost-mdpv-cheboksary":
            case "kupit-skorost-mdpv-irkutsk-45":
            case "kupit-skorost-mdpv-ivanovo":
            case "kupit-skorost-mdpv-lubercy":
            case "kupit-skorost-mdpv-moskva":
            case "kupit-skorost-mdpv-murmansk":
            case "kupit-skorost-mdpv-vladimir":
            case "kupit-skorost-mdpv-volzhskiy":
            case "kupit-spays-anapa":
            case "kupit-spays-arhangelsk":
            case "kupit-spays-bryansk":
            case "kupit-spays-kemerovo":
            case "kupit-spays-kyzyl":
            case "kupit-spays-naberezhnye-chelny":
            case "kupit-spays-petrozavodsk":
            case "kupit-spays-stavropol":
              return true;
          }
          break;
        case "wordpress":
          return doms.pop() === "putinbog";
        case "xhamster":
          switch( doms.pop() ) {
            case "m":
            case "ru":
              return true;
          }
          break;
        case "xusenet":
          return doms.pop() === "archive";
        case "xvideos":
          return doms.pop() === "img100-752";
        case "yolins":
          return doms.pop() === "grow";
        case "youku":
          return doms.pop() === "v";
        case "zelomix":
          return doms.pop() === "mail";
      }
      break;
    case "comundefined":
      switch( doms.pop() ) {
        case "ispovednik":
        case "purposechem":
          return true;
      }
      break;
    case "cx":
      return doms.pop() === "dosug";
    case "cz":
      switch( doms.pop() ) {
        case "alfalife":
        case "devochka":
        case "devochka":
        case "devochki":
        case "devochki":
        case "dosug":
        case "dosug":
        case "naredclub":
        case "otsos":
        case "piter":
        case "piter":
        case "putana":
        case "putana":
        case "redclub":
        case "ufa-znakomstva":
        case "xdosug":
        case "xdosug":
        case "znakomstva":
        case "znakomstva":
        case "znakomstvo":
          return true;
        case "active24":
          if (doms.pop() === "uvds222")
            if (doms.pop() === "com")
              switch( doms.pop() ) {
                case "kuritelnyi-smesi":
                case "kuritelnyi-smesi":
                  return true;
              }
          break;
        case "otsos":
          return doms.pop() === "belgorod";
        case "redclub":
          return doms.pop() === "belgorod";
      }
      break;
    case "de":
      switch( doms.pop() ) {
        case "drugscouts":
        case "drugscouts":
        case "mybrokenheart":
          return true;
      }
      break;
    case "dk":
      switch( doms.pop() ) {
        case "dengodeside":
        case "hizb-ut-tahrir":
        case "pokerstars":
          return true;
      }
      break;
    case "ec":
      if (doms.pop() === "rus")
        return doms.pop() === "torrent";
      break;
    case "ee":
      switch( doms.pop() ) {
        case "pokerstars":
        case "reklama":
          return true;
      }
      break;
    case "email":
      return doms.pop() === "myvulkan";
    case "es":
      switch( doms.pop() ) {
        case "comicsporno":
        case "pokerstars":
          return true;
      }
      break;
    case "eu":
      switch( doms.pop() ) {
        case "afghanincense":
        case "best-prava":
        case "best-prava":
        case "bs9":
        case "bs9":
        case "buy-jwh":
        case "buylegalrc":
        case "buylegalrc":
        case "captaincookscasino":
        case "casino-classic":
        case "forparty":
        case "freecaucasus":
        case "get-tune":
        case "im9":
        case "itvmovie":
        case "jwh-klad":
        case "jwh-klad":
        case "jwh-sklad":
        case "jwh-sklad":
        case "legrb":
        case "legrf":
        case "musichallcasino":
        case "playerspalacecasino":
        case "pokerstars":
        case "pokertime":
        case "redstarcasino":
        case "redstarsports":
        case "researchchemicalswebshop":
        case "rurikon":
        case "speedsu":
        case "utka":
        case "vdownload":
        case "virtualcitycasino":
        case "winadaycasino":
        case "yukongoldcasino":
          return true;
        case "pinkplay":
          switch( doms.pop() ) {
            case "mdmashoprus":
            case "mdmashoprus":
              return true;
          }
          break;
        case "poisk24":
          return doms.pop() === "doska";
        case "ru-music":
          return doms.pop() === "sanja";
      }
      break;
    case "fi":
      if (doms.pop() === "nn")
        return doms.pop() === "parazite";
      break;
    case "fm":
      switch( doms.pop() ) {
        case "last":
        case "prostitutki":
        case "prostitutki":
          return true;
      }
      break;
    case "fr":
      switch( doms.pop() ) {
        case "pokerstars":
          return true;
        case "free":
          return doms.pop() === "picalin";
      }
      break;
    case "ga":
      switch( doms.pop() ) {
        case "bestcomputershop":
        case "dawlah":
        case "legal45":
        case "nele":
          return true;
      }
      break;
    case "gaundefined":
      return doms.pop() === "dawlah";
    case "gd":
      if (doms.pop() === "oo")
        return doms.pop() === "rastasibirsk";
      break;
    case "ge":
      return doms.pop() === "myvideo";
    case "gg":
      return doms.pop() === "blizzard";
    case "hu":
      switch( doms.pop() ) {
        case "gau":
          return doms.pop() === "lajli";
        case "jjsoft":
          return doms.pop() === "toti";
      }
      break;
    case "id":
      if (doms.pop() === "or")
        return doms.pop() === "hizbut-tahrir";
      break;
    case "ie":
      return doms.pop() === "drugs";
    case "il":
      if (doms.pop() === "co")
        switch( doms.pop() ) {
          case "newspress":
            return true;
          case "blogspot":
            return doms.pop() === "holocaustrevisionism";
        }
      break;
    case "im":
      switch( doms.pop() ) {
        case "6nw":
        case "errors-seeds":
        case "slotocash":
        case "winpalace":
          return true;
      }
      break;
    case "in":
      switch( doms.pop() ) {
        case "101chan":
        case "cocoshop":
        case "dokument":
        case "erofilm":
        case "errors-seeds":
        case "euromaydan":
        case "fappchan":
        case "futuriticasino":
        case "golovin":
        case "mdlboys":
        case "nelegala":
        case "nn-angels":
        case "normafilm":
        case "psb4ukr":
        case "rabidshare":
        case "redchan":
        case "shishkin":
        case "smotri":
        case "srost":
        case "topnews":
        case "verotikehd":
        case "wholicab":
          return true;
        case "nikopol":
          return doms.pop() === "forum";
      }
      break;
    case "info":
      switch( doms.pop() ) {
        case "18chan":
        case "2-ndfl":
        case "2ndfl":
        case "777slot":
        case "888poker":
        case "adult-village":
        case "agentalco1":
        case "akhbarshaam":
        case "akhbarshaam":
        case "akhbarsham":
        case "astralman":
        case "avtomaty-igrovye":
        case "avtomaty-igrovye":
        case "azartmania":
        case "best-counter":
        case "best-counter":
        case "bigmedicine":
        case "blackblocg":
        case "blackblocg":
        case "bodytomind":
        case "bratstvo":
        case "bratstvo":
        case "casino-land":
        case "casinofreedom":
        case "cheerful-stars":
        case "diplomgos":
        case "diplomoff":
        case "discreetshop":
        case "dobroslav":
        case "doll-dreams":
        case "doll-dreams":
        case "doskaplus":
        case "drugscomru":
        case "drugspace":
        case "e-lib":
        case "ebala":
        case "elleayat":
        case "esdaratreturn":
        case "exploders":
        case "externat-diplom":
        case "extraslot":
        case "extraslot":
        case "fedspisok":
        case "fedspisok":
        case "fisyria":
        case "free-doks":
        case "free-play-avtomati":
        case "furat":
        case "g-klimov":
        case "genshtab":
        case "germaniaru":
        case "germaniaru":
        case "golden-game":
        case "golden-game":
        case "goldenmed":
        case "grand-game-casino":
        case "gribo4ek":
        case "gribo4ek":
        case "growerland":
        case "gruzia4u":
        case "gruzia4u":
        case "gumer":
        case "halifat":
        case "high-stone":
        case "high-stone-forum":
        case "hizb-russia":
        case "hizb-russia":
        case "hizb-ut-tahrir":
        case "htmedia":
        case "hunafa":
        case "hunafa":
        case "hyperlab":
        case "ichkeria":
        case "ichkeria":
        case "igrovie-avtomati":
        case "igrovieavtomati-besplatno":
        case "igrovye-avtomaty":
        case "igrovye-avtomaty-besplatno":
        case "infoforum":
        case "isayhello":
        case "islam-book":
        case "jwh11":
        case "kancolle-ero":
        case "kavkazcenter":
        case "kazakhstan4u":
        case "kazakhstan4u":
        case "kidala":
        case "kramatorsk":
        case "krasnomed":
        case "lazar-shaulov":
        case "legal64":
        case "legaliz":
        case "legalizer":
        case "legalizer":
        case "liga-12":
        case "loliland":
        case "lsmodelclub":
        case "lustrabazann":
        case "maxxsite":
        case "medcannabis":
        case "medsprav":
        case "medvrach":
        case "megajack":
        case "megajack":
        case "misanthropic":
        case "misanthropic":
        case "mister-x":
        case "moinomer":
        case "moinomer":
        case "moldova4u":
        case "mosali":
        case "mosali":
        case "myphone":
        case "myphone":
        case "myreadingmanga":
        case "nemaloknig":
        case "new-passport":
        case "news-city":
        case "nn-girls":
        case "nth-nhx":
        case "nude-twinks":
        case "nuruddin":
        case "occupacii-karelii-net":
        case "onlajn-kazino":
        case "onlajn-kazino":
        case "online-club":
        case "osnova21vek":
        case "otchizna":
        case "otli4no":
        case "otsos":
        case "pal-tahrir":
        case "phao":
        case "pirotek":
        case "pokerstars":
        case "porncomics":
        case "pravyysektor":
        case "prostitutki-krasnodara":
        case "prostitutki-vladivostoka":
        case "ps-zahid":
        case "ps-zahid":
        case "psylabseeds":
        case "pszak":
        case "putinhuilo":
        case "putinhuylo":
        case "reibert":
        case "roriland":
        case "ru-casino":
        case "ruprava":
        case "rusimperia":
        case "rusimperia":
        case "rusnsn":
        case "rusprava":
        case "rustorrents":
        case "sandoctor":
        case "sawab":
        case "sawab":
        case "shalavi":
        case "shockmodel":
        case "shockmodels":
        case "shturmnovosti":
        case "sigarety-optom":
        case "slot-avtomat":
        case "sodiqlar":
        case "sodiqlar":
        case "spacefisherbiz":
        case "speedsmiks":
        case "speedsmiks":
        case "spice-forum":
        case "spice-forum":
        case "spice23":
        case "sprotyv":
        case "stomahin":
        case "stomahin":
        case "svoim":
        case "tahrir":
        case "tauhid":
        case "tauhid":
        case "tfile":
        case "tinex":
        case "tiny-girls":
        case "uamedia":
        case "uanova":
        case "ukraina4u":
        case "ukraina4u":
        case "una-unso":
        case "uploo":
        case "uraseeds":
        case "vdagestan":
        case "vedi-ra":
        case "vedi-ra":
        case "vklade":
        case "vklade":
        case "vse-pro-vseh":
        case "vseprovseh":
        case "vuz":
        case "warstar":
        case "weedhashbiz":
        case "worldangels":
        case "worldangels":
        case "xguru":
        case "yeghiazaryan":
        case "zagovor":
        case "zagovor":
        case "zapretno":
        case "zargacum":
          return true;
        case "agrobirzha":
          return doms.pop() === "ishhan";
        case "complife":
          return doms.pop() === "yun";
        case "graniru":
          switch( doms.pop() ) {
            case "mirror":
            case "mirror1":
            case "mirror10":
            case "mirror100":
            case "mirror101":
            case "mirror102":
            case "mirror103":
            case "mirror104":
            case "mirror105":
            case "mirror106":
            case "mirror107":
            case "mirror108":
            case "mirror109":
            case "mirror11":
            case "mirror110":
            case "mirror111":
            case "mirror112":
            case "mirror113":
            case "mirror114":
            case "mirror115":
            case "mirror116":
            case "mirror117":
            case "mirror118":
            case "mirror119":
            case "mirror12":
            case "mirror120":
            case "mirror121":
            case "mirror122":
            case "mirror123":
            case "mirror124":
            case "mirror125":
            case "mirror126":
            case "mirror127":
            case "mirror128":
            case "mirror129":
            case "mirror13":
            case "mirror130":
            case "mirror131":
            case "mirror132":
            case "mirror133":
            case "mirror134":
            case "mirror135":
            case "mirror136":
            case "mirror137":
            case "mirror138":
            case "mirror139":
            case "mirror14":
            case "mirror140":
            case "mirror141":
            case "mirror142":
            case "mirror143":
            case "mirror144":
            case "mirror146":
            case "mirror147":
            case "mirror148":
            case "mirror149":
            case "mirror15":
            case "mirror150":
            case "mirror151":
            case "mirror152":
            case "mirror153":
            case "mirror154":
            case "mirror155":
            case "mirror156":
            case "mirror157":
            case "mirror158":
            case "mirror159":
            case "mirror16":
            case "mirror160":
            case "mirror161":
            case "mirror162":
            case "mirror163":
            case "mirror164":
            case "mirror165":
            case "mirror166":
            case "mirror167":
            case "mirror168":
            case "mirror169":
            case "mirror17":
            case "mirror170":
            case "mirror171":
            case "mirror172":
            case "mirror173":
            case "mirror174":
            case "mirror175":
            case "mirror176":
            case "mirror177":
            case "mirror178":
            case "mirror179":
            case "mirror18":
            case "mirror180":
            case "mirror181":
            case "mirror182":
            case "mirror183":
            case "mirror184":
            case "mirror185":
            case "mirror186":
            case "mirror187":
            case "mirror188":
            case "mirror189":
            case "mirror19":
            case "mirror190":
            case "mirror191":
            case "mirror192":
            case "mirror193":
            case "mirror194":
            case "mirror195":
            case "mirror196":
            case "mirror197":
            case "mirror198":
            case "mirror199":
            case "mirror2":
            case "mirror20":
            case "mirror200":
            case "mirror201":
            case "mirror202":
            case "mirror203":
            case "mirror204":
            case "mirror205":
            case "mirror206":
            case "mirror207":
            case "mirror208":
            case "mirror209":
            case "mirror21":
            case "mirror210":
            case "mirror211":
            case "mirror212":
            case "mirror213":
            case "mirror214":
            case "mirror215":
            case "mirror216":
            case "mirror217":
            case "mirror218":
            case "mirror219":
            case "mirror22":
            case "mirror220":
            case "mirror221":
            case "mirror222":
            case "mirror223":
            case "mirror224":
            case "mirror225":
            case "mirror226":
            case "mirror227":
            case "mirror228":
            case "mirror229":
            case "mirror23":
            case "mirror230":
            case "mirror231":
            case "mirror232":
            case "mirror233":
            case "mirror234":
            case "mirror235":
            case "mirror236":
            case "mirror237":
            case "mirror238":
            case "mirror239":
            case "mirror24":
            case "mirror240":
            case "mirror241":
            case "mirror242":
            case "mirror243":
            case "mirror245":
            case "mirror246":
            case "mirror247":
            case "mirror248":
            case "mirror249":
            case "mirror25":
            case "mirror250":
            case "mirror251":
            case "mirror252":
            case "mirror253":
            case "mirror254":
            case "mirror255":
            case "mirror256":
            case "mirror257":
            case "mirror258":
            case "mirror26":
            case "mirror261":
            case "mirror262":
            case "mirror263":
            case "mirror264":
            case "mirror265":
            case "mirror266":
            case "mirror268":
            case "mirror269":
            case "mirror27":
            case "mirror270":
            case "mirror271":
            case "mirror272":
            case "mirror273":
            case "mirror274":
            case "mirror276":
            case "mirror277":
            case "mirror278":
            case "mirror279":
            case "mirror28":
            case "mirror280":
            case "mirror281":
            case "mirror284":
            case "mirror285":
            case "mirror286":
            case "mirror288":
            case "mirror289":
            case "mirror29":
            case "mirror290":
            case "mirror291":
            case "mirror292":
            case "mirror293":
            case "mirror294":
            case "mirror296":
            case "mirror297":
            case "mirror298":
            case "mirror299":
            case "mirror3":
            case "mirror30":
            case "mirror300":
            case "mirror301":
            case "mirror302":
            case "mirror303":
            case "mirror304":
            case "mirror305":
            case "mirror306":
            case "mirror307":
            case "mirror309":
            case "mirror31":
            case "mirror310":
            case "mirror311":
            case "mirror312":
            case "mirror313":
            case "mirror314":
            case "mirror315":
            case "mirror316":
            case "mirror317":
            case "mirror319":
            case "mirror32":
            case "mirror321":
            case "mirror322":
            case "mirror324":
            case "mirror325":
            case "mirror326":
            case "mirror328":
            case "mirror329":
            case "mirror33":
            case "mirror330":
            case "mirror332":
            case "mirror334":
            case "mirror335":
            case "mirror337":
            case "mirror338":
            case "mirror34":
            case "mirror340":
            case "mirror341":
            case "mirror342":
            case "mirror343":
            case "mirror345":
            case "mirror346":
            case "mirror347":
            case "mirror349":
            case "mirror35":
            case "mirror350":
            case "mirror351":
            case "mirror357":
            case "mirror359":
            case "mirror36":
            case "mirror361":
            case "mirror362":
            case "mirror367":
            case "mirror368":
            case "mirror369":
            case "mirror37":
            case "mirror370":
            case "mirror372":
            case "mirror373":
            case "mirror374":
            case "mirror375":
            case "mirror376":
            case "mirror377":
            case "mirror378":
            case "mirror379":
            case "mirror38":
            case "mirror381":
            case "mirror382":
            case "mirror383":
            case "mirror384":
            case "mirror385":
            case "mirror386":
            case "mirror387":
            case "mirror388":
            case "mirror389":
            case "mirror39":
            case "mirror390":
            case "mirror391":
            case "mirror392":
            case "mirror393":
            case "mirror394":
            case "mirror395":
            case "mirror396":
            case "mirror398":
            case "mirror399":
            case "mirror4":
            case "mirror40":
            case "mirror400":
            case "mirror401":
            case "mirror402":
            case "mirror403":
            case "mirror404":
            case "mirror405":
            case "mirror406":
            case "mirror407":
            case "mirror408":
            case "mirror409":
            case "mirror41":
            case "mirror410":
            case "mirror411":
            case "mirror412":
            case "mirror42":
            case "mirror420":
            case "mirror421":
            case "mirror422":
            case "mirror423":
            case "mirror424":
            case "mirror425":
            case "mirror426":
            case "mirror427":
            case "mirror428":
            case "mirror429":
            case "mirror43":
            case "mirror430":
            case "mirror431":
            case "mirror432":
            case "mirror433":
            case "mirror434":
            case "mirror435":
            case "mirror436":
            case "mirror437":
            case "mirror438":
            case "mirror439":
            case "mirror44":
            case "mirror440":
            case "mirror441":
            case "mirror442":
            case "mirror443":
            case "mirror444":
            case "mirror445":
            case "mirror446":
            case "mirror447":
            case "mirror448":
            case "mirror449":
            case "mirror45":
            case "mirror450":
            case "mirror451":
            case "mirror452":
            case "mirror453":
            case "mirror454":
            case "mirror455":
            case "mirror456":
            case "mirror457":
            case "mirror458":
            case "mirror459":
            case "mirror46":
            case "mirror460":
            case "mirror461":
            case "mirror462":
            case "mirror463":
            case "mirror464":
            case "mirror465":
            case "mirror466":
            case "mirror467":
            case "mirror468":
            case "mirror469":
            case "mirror47":
            case "mirror470":
            case "mirror471":
            case "mirror472":
            case "mirror473":
            case "mirror474":
            case "mirror475":
            case "mirror476":
            case "mirror477":
            case "mirror478":
            case "mirror479":
            case "mirror48":
            case "mirror480":
            case "mirror481":
            case "mirror482":
            case "mirror483":
            case "mirror484":
            case "mirror485":
            case "mirror486":
            case "mirror487":
            case "mirror488":
            case "mirror489":
            case "mirror49":
            case "mirror490":
            case "mirror491":
            case "mirror492":
            case "mirror493":
            case "mirror494":
            case "mirror495":
            case "mirror496":
            case "mirror497":
            case "mirror498":
            case "mirror499":
            case "mirror5":
            case "mirror50":
            case "mirror500":
            case "mirror501":
            case "mirror503":
            case "mirror504":
            case "mirror505":
            case "mirror506":
            case "mirror507":
            case "mirror508":
            case "mirror509":
            case "mirror51":
            case "mirror510":
            case "mirror511":
            case "mirror512":
            case "mirror513":
            case "mirror515":
            case "mirror516":
            case "mirror517":
            case "mirror52":
            case "mirror520":
            case "mirror521":
            case "mirror522":
            case "mirror523":
            case "mirror524":
            case "mirror525":
            case "mirror527":
            case "mirror528":
            case "mirror529":
            case "mirror53":
            case "mirror530":
            case "mirror531":
            case "mirror534":
            case "mirror535":
            case "mirror536":
            case "mirror537":
            case "mirror538":
            case "mirror539":
            case "mirror54":
            case "mirror540":
            case "mirror541":
            case "mirror542":
            case "mirror543":
            case "mirror544":
            case "mirror547":
            case "mirror548":
            case "mirror549":
            case "mirror55":
            case "mirror550":
            case "mirror551":
            case "mirror552":
            case "mirror553":
            case "mirror555":
            case "mirror557":
            case "mirror56":
            case "mirror561":
            case "mirror562":
            case "mirror563":
            case "mirror564":
            case "mirror565":
            case "mirror57":
            case "mirror570":
            case "mirror571":
            case "mirror58":
            case "mirror59":
            case "mirror6":
            case "mirror60":
            case "mirror61":
            case "mirror62":
            case "mirror63":
            case "mirror64":
            case "mirror65":
            case "mirror66":
            case "mirror67":
            case "mirror68":
            case "mirror69":
            case "mirror7":
            case "mirror70":
            case "mirror71":
            case "mirror72":
            case "mirror73":
            case "mirror74":
            case "mirror75":
            case "mirror77":
            case "mirror78":
            case "mirror79":
            case "mirror8":
            case "mirror80":
            case "mirror81":
            case "mirror82":
            case "mirror83":
            case "mirror84":
            case "mirror85":
            case "mirror86":
            case "mirror87":
            case "mirror88":
            case "mirror89":
            case "mirror9":
            case "mirror90":
            case "mirror91":
            case "mirror92":
            case "mirror93":
            case "mirror94":
            case "mirror95":
            case "mirror96":
            case "mirror97":
            case "mirror98":
            case "mirror99":
              return true;
          }
          break;
        case "individualki":
          return doms.pop() === "ufa";
        case "legalizer":
          return doms.pop() === "by";
        case "nijie":
          return doms.pop() === "pic02";
        case "portall":
          return doms.pop() === "vitrina";
        case "pravyysektor":
          return doms.pop() === "old";
        case "railwayclub":
          return doms.pop() === "forum";
        case "zagovor":
          return doms.pop() === "shop";
      }
      break;
    case "it":
      switch( doms.pop() ) {
        case "pokerstars":
        case "shishkin":
          return true;
        case "blogspot":
          return doms.pop() === "putin-xujlo";
        case "unipr":
          return doms.pop() === "aai";
      }
      break;
    case "jo":
      if (doms.pop() === "edu")
        return doms.pop() === "ammanu";
      break;
    case "jp":
      switch( doms.pop() ) {
        case "gazouko":
        case "lose":
        case "mirusoft":
        case "nicovideo":
        case "sharecams":
          return true;
        case "2chblog":
          return doms.pop() === "nijigazo";
        case "blog":
          switch( doms.pop() ) {
            case "2doppai":
            case "busha2d":
            case "chibarei":
            case "eac2":
            case "erodouzip":
            case "kuronekoplus":
            case "pfch":
            case "ponponpon":
            case "roemojini":
            case "roricon":
              return true;
          }
          break;
        case "blogimg":
          return doms.pop() === "livedoor";
        case "blogstation":
          return doms.pop() === "anime-gazou";
        case "co":
          switch( doms.pop() ) {
            case "dmm":
              return true;
            case "dmm":
              return doms.pop() === "pics";
          }
          break;
        case "dip":
          return doms.pop() === "pusyaaa";
        case "doorblog":
          switch( doms.pop() ) {
            case "bitokemono":
            case "eim4":
            case "fafkajofj654654":
            case "minna":
            case "nijigen-allways":
            case "nyan-nyan-times":
            case "okazupickup":
            case "oniityanhamahoutukai":
            case "sehusehuauto":
              return true;
          }
          break;
        case "l8er":
          if (doms.pop() === "imgsrc")
            return doms.pop() === "media";
          break;
        case "ldblog":
          switch( doms.pop() ) {
            case "d-eropon":
            case "futasoku":
            case "oneshota":
            case "pinkgazoussouko":
            case "technobreak":
              return true;
          }
          break;
        case "livedoor":
          return doms.pop() === "blog";
        case "mods":
          return doms.pop() === "apple";
        case "ne":
          if (doms.pop() === "sakura")
            switch( doms.pop() ) {
              case "akkoid":
              case "gunblade":
              case "jyujiro":
                return true;
            }
          break;
        case "publog":
          return doms.pop() === "nakadashi";
        case "sblo":
          return doms.pop() === "tetefrag";
        case "twipple":
          return doms.pop() === "p";
      }
      break;
    case "kg":
      switch( doms.pop() ) {
        case "megatorrents":
        case "torrent":
          return true;
      }
      break;
    case "kz":
      switch( doms.pop() ) {
        case "alco24":
        case "asteria":
        case "asteza":
        case "cbo":
        case "cwtube":
        case "kinopod":
        case "kinowka":
        case "legalmarket":
        case "mytv":
        case "namba":
        case "olimp":
        case "rubrika":
        case "slider":
        case "street":
          return true;
        case "afftor":
          return doms.pop() === "cat";
        case "nur":
          return doms.pop() === "video";
        case "prodom":
          switch( doms.pop() ) {
            case "ads":
              return true;
            case "goods":
              if (doms.pop() === "kznwww")
                if (doms.pop() === "prodom")
                  return doms.pop() === "ads";
              break;
            case "jumeke":
              if (doms.pop() === "kznwww")
                if (doms.pop() === "prodom")
                  return doms.pop() === "ads";
              break;
            case "mebel":
              if (doms.pop() === "kznwww")
                if (doms.pop() === "prodom")
                  return doms.pop() === "ads";
              break;
          }
          break;
        case "promail":
          return doms.pop() === "music";
      }
      break;
    case "la":
      switch( doms.pop() ) {
        case "hitomi":
          return true;
        case "hitomi":
          return doms.pop() === "g";
      }
      break;
    case "legal":
      return doms.pop() === "acme";
    case "link":
      return doms.pop() === "urislog";
    case "lv":
      switch( doms.pop() ) {
        case "boomtime":
        case "islam":
          return true;
        case "tvnet":
          return doms.pop() === "rus";
      }
      break;
    case "ly":
      if (doms.pop() === "biz")
        return doms.pop() === "lega";
      break;
    case "md":
      switch( doms.pop() ) {
        case "555":
        case "gmgeast":
        case "lit":
        case "see":
          return true;
      }
      break;
    case "me":
      switch( doms.pop() ) {
        case "bild":
        case "casinoz":
        case "casinoz":
        case "classycoin":
        case "diplom4":
        case "estetico":
        case "indecent":
        case "infoclub":
        case "kinoman":
        case "kinop":
        case "kupisex":
        case "locopanda":
        case "mamoon":
        case "mhunt":
        case "mister-x":
        case "narkop":
        case "otsos":
        case "pornosex":
        case "powders":
        case "powders":
        case "redclub":
        case "semenarnia":
        case "semyanich":
        case "shungamato":
        case "tinex":
        case "torrentdownloads":
        case "tvids":
        case "videokub":
        case "vuku":
        case "zargacum":
          return true;
        case "awwni":
          return doms.pop() === "cdn";
        case "loveisover":
          return doms.pop() === "archive";
        case "otsos":
          return doms.pop() === "krasnodar";
      }
      break;
    case "ml":
      return doms.pop() === "cpvls";
    case "mn":
      switch( doms.pop() ) {
        case "lib":
        case "lib":
        case "thepiratebay":
          return true;
      }
      break;
    case "mobi":
      switch( doms.pop() ) {
        case "fmusic":
        case "myporno":
        case "narkop":
        case "trava":
          return true;
      }
      break;
    case "ms":
      switch( doms.pop() ) {
        case "errors-seeds":
        case "flint":
        case "klad":
          return true;
      }
      break;
    case "mu":
      switch( doms.pop() ) {
        case "semyanich":
        case "semyanich":
          return true;
      }
      break;
    case "mx":
      return doms.pop() === "narkop";
    case "my":
      return doms.pop() === "casino";
    case "name":
      switch( doms.pop() ) {
        case "azartcasino":
        case "kinofilms":
        case "narkop":
        case "pizda":
        case "right-to-love":
        case "right-to-love":
        case "tellmemore":
        case "tracker":
        case "xn--c1aej":
          return true;
        case "boyarka":
          return doms.pop() === "news";
      }
      break;
    case "net":
      switch( doms.pop() ) {
        case "10-casino":
        case "100casino":
        case "100casino":
        case "16model":
        case "18chan":
        case "1torrent":
        case "2-chru":
        case "222rc":
        case "24volcano":
        case "24vulkan":
        case "2chru":
        case "2ndflvolg":
        case "2porno":
        case "3tuza":
        case "4smoking":
        case "5pocket":
        case "5up":
        case "777-online-gambling":
        case "777-onlineslots":
        case "888poker":
        case "8ch":
        case "911-truth":
        case "911-truth":
        case "99torrents":
        case "ad-bg":
        case "admister":
        case "agender":
        case "alarabiya":
        case "alcotrast":
        case "aleibar":
        case "alkomig72":
        case "all-diplom":
        case "all-diploms":
        case "allfuckteens":
        case "anude":
        case "asporno":
        case "azarius":
        case "azartclub":
        case "azartgaming":
        case "azartmaniya":
        case "azartplaycasino":
        case "azartplaycasino":
        case "azglobus":
        case "azino888":
        case "azzammedia":
        case "balloff":
        case "balloff":
        case "bareworld":
        case "barug":
        case "beauty-dolls":
        case "beautynudism":
        case "belochki-su":
        case "belsharing":
        case "benzo-fury":
        case "bespredelov":
        case "best-maza":
        case "best-maza":
        case "bestforplay":
        case "bestteensex":
        case "bestteensex":
        case "bestvulkan":
        case "betinhell":
        case "bezsms":
        case "bigcinema-tv":
        case "bizinspector":
        case "bizinspector":
        case "blackseanews":
        case "blackseanews":
        case "blizzardkid":
        case "bobbie-model":
        case "bobfilm-torrents":
        case "bookbet":
        case "buhidoh":
        case "cannabis-indoor":
        case "cannabis-outdoor":
        case "cannabits":
        case "cartoon-hentai":
        case "casino-all":
        case "casino-besplatno":
        case "casino-e":
        case "casino-e":
        case "casino-eldorado":
        case "casino-imperator":
        case "casino-korona":
        case "casino-korona":
        case "casino-ostrov":
        case "casino-ruletka":
        case "casinofaraon":
        case "casinokb":
        case "casinokristal":
        case "casinovulkan":
        case "cbilling":
        case "cbilling":
        case "censoru":
        case "censuri":
        case "cgfilm":
        case "chaplevideo":
        case "chaplingames":
        case "chaplingames":
        case "charming-models":
        case "chemicalservices":
        case "chemlegal":
        case "chenrc":
        case "chetkiibro":
        case "china-powder":
        case "club-vulkan":
        case "club-vulkan1":
        case "club-vulkan2":
        case "cool-torrent":
        case "corrupcia":
        case "creditsdocs":
        case "cristal-slots":
        case "cristalslots":
        case "csbilling":
        case "cserv1":
        case "cserv10":
        case "cserv11":
        case "cserv12":
        case "cserv13":
        case "cserv14":
        case "cserv15":
        case "cserv16":
        case "cserv17":
        case "cserv18":
        case "cserv19":
        case "cserv2":
        case "cserv20":
        case "cserv3":
        case "cserv4":
        case "cserv6":
        case "cserv7":
        case "cserv8":
        case "cserv9":
        case "dancelist":
        case "daymohk":
        case "daymohk":
        case "desfilm":
        case "dessert-models":
        case "desuchan":
        case "devchonki":
        case "devchonki":
        case "devids":
        case "dip4k":
        case "dipkupit":
        case "diplatt":
        case "diplom-vuz":
        case "diplom-vuz":
        case "docsmaker":
        case "doctorfarm":
        case "doctormag":
        case "dom-film":
        case "domachnyi-metode":
        case "dosug-cz-ru":
        case "dosug02":
        case "dosug25":
        case "dosug34":
        case "dosug36":
        case "dosug63":
        case "drupich":
        case "dublikat":
        case "dumpxxx":
        case "dwar-war":
        case "e621":
        case "ekstazi-kruglye-yeshki-eksta-eks-ti-si-tapki-bubly-pilsy-eyfor":
        case "erofolder":
        case "excluzive":
        case "extorrent":
        case "fame-girls":
        case "fapstory":
        case "faraon-bet":
        case "faraon-play":
        case "faraon-slots":
        case "file-tracker":
        case "film-torrent":
        case "filmodrom":
        case "filmoff":
        case "films-tram":
        case "films3":
        case "finechems":
        case "firebit":
        case "flibusta":
        case "flyrcstore":
        case "forparty":
        case "fotofap":
        case "free-boys-pics":
        case "freemp3now":
        case "freetinygirls":
        case "freetinygirls":
        case "frefilms":
        case "fstreker":
        case "fuckhome":
        case "gayteenvideo":
        case "gcwcc":
        case "gigamir":
        case "gigporno":
        case "girls25":
        case "girlspussies":
        case "gold-rain":
        case "goldenmed":
        case "gomel-sat":
        case "grafomanam":
        case "grandhdcns":
        case "growerland":
        case "habklad":
        case "halifat":
        case "hdmore":
        case "hdtubes":
        case "hentaibedta":
        case "hentaidib":
        case "hentaika":
        case "high-stone":
        case "highstore":
        case "homemadedrugs":
        case "hvylya":
        case "iaslotx":
        case "icqrovnieskype":
        case "ifidermig":
        case "igra-prestoloff":
        case "igrovie-avtomati-besplatno":
        case "igrovie-avtomati-casino":
        case "igrovie-avtomati-online":
        case "igrovieavtomati-besplatno":
        case "igrovieavtomativulkan":
        case "igrovye-avtomaty-online":
        case "igry-na-dengi":
        case "iieshiryoudesu":
        case "imageporn":
        case "imperia-of-hentai":
        case "individualki-samara":
        case "inkbunny":
        case "intcasino":
        case "intim24-su":
        case "intim27":
        case "intimsite":
        case "invivio":
        case "ipserv1":
        case "ipserv2":
        case "ipserv3":
        case "ipserv4":
        case "ipserv5":
        case "ipvnews":
        case "irkintim":
        case "islam-center":
        case "islamumma":
        case "jahfunny":
        case "jahnews":
        case "jkforum":
        case "jw-media":
        case "kavkazcenter":
        case "kavkazcenter":
        case "kind-girls":
        case "kino-fox":
        case "kinobolt":
        case "kinodok":
        case "kinodoma":
        case "kinofishka":
        case "kinogb":
        case "kinogo-hd":
        case "kinogohd":
        case "kinoklad":
        case "kinokot":
        case "kinoluvr":
        case "kinomagnit":
        case "kinopull":
        case "kinotub":
        case "kinotv":
        case "kinozavrov":
        case "kisok":
        case "kisok":
        case "kitty-kats":
        case "knigian":
        case "knigian":
        case "kokotki":
        case "komapz":
        case "kommynalki":
        case "kristalplay":
        case "kristalplay":
        case "krokodilow":
        case "kunstkamera":
        case "kupitpasport":
        case "kuri-nekuri":
        case "kyrnyt":
        case "kyrtizanki":
        case "labrc":
        case "legal-hash":
        case "legalrus":
        case "leqalrc":
        case "letitbit-files":
        case "letseks":
        case "libatriam":
        case "librius":
        case "litzona":
        case "live-ruletka":
        case "livextube":
        case "lurkmore":
        case "luscious":
        case "mangazochannel":
        case "mari-juana":
        case "medvolga":
        case "metodika-zarabotka":
        case "miloman":
        case "miniporno":
        case "minjust":
        case "mister-x":
        case "miwotsukushi":
        case "mjnovosti":
        case "mne14":
        case "mod-site":
        case "moeimg":
        case "moneydaplay":
        case "morkovki":
        case "moyblog":
        case "mp3pm":
        case "mreadz":
        case "msk-diplomat":
        case "mtorrents":
        case "mukola":
        case "musvid":
        case "muzofun":
        case "mz-tracker":
        case "narkop":
        case "narkop":
        case "nelegala":
        case "nelegala":
        case "new-torrent":
        case "new-torrents":
        case "neweurasia":
        case "newlib":
        case "nhentai":
        case "nikportal":
        case "nitki2":
        case "nk-team":
        case "nn-forum":
        case "nocorruption":
        case "nocorruption":
        case "nomorelyrics":
        case "nopantsu":
        case "nowere":
        case "nude-boy":
        case "nudiland":
        case "nudiplanet":
        case "nudismblog":
        case "nudiworld":
        case "numizmatov":
        case "nxtcomics":
        case "nymphetomania":
        case "ogoporno":
        case "onlain-kazino":
        case "onlain-porno":
        case "onlainfilms":
        case "orabote":
        case "orabote":
        case "original-diplom":
        case "ostrovbet":
        case "ostrovbet":
        case "otrava":
        case "papaseeds":
        case "pasports-rf":
        case "perdos":
        case "petkd":
        case "pfslots":
        case "pixiv":
        case "pixivrank":
        case "planetmj":
        case "play-faraon":
        case "play-online-roulette":
        case "play-wz":
        case "podsos":
        case "ponudim":
        case "poringa":
        case "porn1xa":
        case "porno-720hd":
        case "porno-vk":
        case "porno220":
        case "porno911":
        case "pornofag":
        case "pornokaif":
        case "pornokol":
        case "pornolenta":
        case "pornolug":
        case "pornomage":
        case "pornomania":
        case "pornonice":
        case "pornopizda":
        case "pornorutube":
        case "pornosklad":
        case "pornosklad":
        case "pornosok":
        case "pornozvezda":
        case "pornula":
        case "pravda24":
        case "premiumhentai":
        case "preteengirls":
        case "pronchik":
        case "prostitutki-volgograda":
        case "prostitutki-volgograda":
        case "prostitutkimoskva":
        case "prostitutkixxx":
        case "prostitutkixxx":
        case "prosto24":
        case "prosto24":
        case "prostoporno":
        case "ptvtube":
        case "purechemicals":
        case "putinizm":
        case "rabota-vseti":
        case "rapetub":
        case "rasoulallah":
        case "rcseller":
        case "rechemco":
        case "rejimu":
        case "relaxmsk":
        case "rio-club":
        case "rivernilecasino":
        case "rl-team":
        case "roovee":
        case "roulette-gambling":
        case "royalrc":
        case "royalrc":
        case "rule34hentai":
        case "rulinux":
        case "rumarijuana":
        case "ruprostitutki":
        case "rus-diploms":
        case "rus-diploms":
        case "rusensi":
        case "rushplay-club":
        case "ruslit":
        case "russkie-seriali":
        case "russkoetv":
        case "russocasino":
        case "russocasino":
        case "rutorg-torrents":
        case "saintrow":
        case "samintim":
        case "scteam":
        case "seedstrade":
        case "seezam":
        case "semenarnia":
        case "serialonline":
        case "sex-baby":
        case "sex54":
        case "sexfotki":
        case "sexkaif":
        case "sexkompas":
        case "sexkompas":
        case "sexoid":
        case "sextut":
        case "sexzavtrak":
        case "shalavi":
        case "shaman-r":
        case "sharlet":
        case "shopk9":
        case "shotaboy":
        case "simply-models":
        case "sinporno":
        case "skidows":
        case "skidows":
        case "skrewdriver":
        case "skyperovnoicq":
        case "skyperovnoicq":
        case "slotofun":
        case "slotolandia":
        case "slotomania-online":
        case "slotsok":
        case "slotspapa":
        case "slotvoyagercasino":
        case "slotx":
        case "slotx":
        case "sloty-avtomaty":
        case "softatom":
        case "spermotube":
        case "spravkaru":
        case "spravkaru":
        case "stationpirat":
        case "stockchem":
        case "stopotkat":
        case "streamking":
        case "sweetboom":
        case "tebe-diplom":
        case "tedfilms":
        case "teen-ok":
        case "teenorama":
        case "teens-sins":
        case "teeny-angels":
        case "temporarylink":
        case "tfilms":
        case "topvoyeur":
        case "tor4ru":
        case "torentor":
        case "torrent-films":
        case "torrent-kino":
        case "torrent-shara":
        case "torrentfilm":
        case "torrentkino":
        case "torrentline":
        case "torrento":
        case "torrentor2":
        case "torrentreactor":
        case "torrents-load":
        case "tovern":
        case "tovern":
        case "tracker32":
        case "trottla":
        case "trottla":
        case "trudcredit":
        case "trudovoistazh":
        case "tunec":
        case "tvids":
        case "tvpult":
        case "twentypercentcooler":
        case "twinkvideotube":
        case "uabb":
        case "uaclub":
        case "uatracker":
        case "uffuff":
        case "ukr-biz":
        case "ukrmarket":
        case "ukrpravda":
        case "uploaded":
        case "urodok":
        case "va-bank-casino":
        case "vabank-klub":
        case "videogid":
        case "viebal":
        case "vip-torrents":
        case "vip-zona":
        case "vip23":
        case "virtanica":
        case "virvoyeur":
        case "vkporn":
        case "vladsex":
        case "volutar":
        case "voyeurist":
        case "vredy":
        case "vtorge":
        case "vulcan-casino":
        case "vulcan-cazino":
        case "vulcanoclub":
        case "vulcanwin":
        case "vulkan-bet":
        case "vulkan24":
        case "vulkanstavka":
        case "web-films":
        case "whitecasino":
        case "wm-bingo":
        case "wm-bingo":
        case "wmc-online":
        case "wmc-online":
        case "worldanalysis":
        case "wulkanclub":
        case "xn-----8kcrxbkobdccbbklgla2b":
        case "xutor":
        case "xxxgig":
        case "xxxslot":
        case "youngmodelsclub":
        case "youngrussian":
        case "youngtwinkstube":
        case "your-models":
        case "youth-and-beauty":
        case "zakladki24":
        case "zakladki24":
        case "zekov":
        case "zhestkoe":
        case "zolotoi-arbuz":
        case "zserial":
          return true;
        case "2chan":
          switch( doms.pop() ) {
            case "sep":
            case "zip":
              return true;
          }
          break;
        case "777-online-gambling":
          return doms.pop() === "ru";
        case "autoua":
          return doms.pop() === "forum";
        case "bahhar":
          return doms.pop() === "ads";
        case "bigmir":
          return doms.pop() === "news";
        case "brutalshemales":
          if (doms.pop() === "image")
            return doms.pop() === "cdn1";
          break;
        case "cwahi":
          return doms.pop() === "world-seeds";
        case "desuchan":
          return doms.pop() === "archive";
        case "dlsite":
          if (doms.pop() === "b")
            return doms.pop() === "pregposer";
          break;
        case "e926":
          return doms.pop() === "static1";
        case "ecplaza":
          if (doms.pop() === "en")
            switch( doms.pop() ) {
              case "biosynthchem":
              case "chinayfkj":
              case "cngrandwaybio":
              case "drugspowerstore":
              case "finetechchem":
              case "jinzhongyanchem":
              case "sourcedoublegreen":
              case "yoyo0410":
                return true;
            }
          break;
        case "facdn":
          return doms.pop() === "d";
        case "fairspice":
          switch( doms.pop() ) {
            case "conf":
            case "forum":
              return true;
          }
          break;
        case "favita":
          return doms.pop() === "moskva";
        case "furholt":
          return doms.pop() === "biohazard";
        case "hizb-turkiston":
          return doms.pop() === "ru";
        case "iillii":
          return doms.pop() === "aoaou";
        case "inzt":
          return doms.pop() === "forum";
        case "islamicpublishing":
          return doms.pop() === "kaynak";
        case "kpitv":
          return doms.pop() === "ru";
        case "kriminala":
          return doms.pop() === "forum";
        case "legalspice":
          switch( doms.pop() ) {
            case "conf":
            case "forum2":
            case "forum3":
              return true;
          }
          break;
        case "magix":
          return doms.pop() === "vladikshibanov";
        case "marsho":
          switch( doms.pop() ) {
            case "antiempire":
            case "rko":
            case "soprotivlenie":
            case "soprotivlenie":
              return true;
          }
          break;
        case "mksat":
          return doms.pop() === "4fun";
        case "moeimg":
          return doms.pop() === "img";
        case "moyblog":
          switch( doms.pop() ) {
            case "amphetamin":
            case "mdmamsk":
            case "mdmashoprus":
              return true;
          }
          break;
        case "nihonomaru":
          return doms.pop() === "forum";
        case "overbetting":
          switch( doms.pop() ) {
            case "casino-online":
            case "internet-casino":
            case "online-casino":
            case "onlinecasino":
              return true;
          }
          break;
        case "ovh":
          return doms.pop() === "vps96847";
        case "partypoker":
          return doms.pop() === "ru";
        case "saiin":
          return doms.pop() === "haruka";
        case "sexros":
          switch( doms.pop() ) {
            case "chita":
            case "volgograd":
              return true;
          }
          break;
        case "shaman-r":
          return doms.pop() === "s-s";
        case "smokedforum":
          switch( doms.pop() ) {
            case "zakaz":
            case "zakaz-samara":
              return true;
          }
          break;
        case "thruhere":
          return doms.pop() === "hentai-foundry";
        case "trannydemon":
          if (doms.pop() === "image")
            return doms.pop() === "cdn1";
          break;
        case "true-false":
          switch( doms.pop() ) {
            case "kemerovo":
            case "krasnodar":
              return true;
          }
          break;
        case "uaclub":
          return doms.pop() === "board";
        case "ukrhome":
          switch( doms.pop() ) {
            case "blogs":
            case "board":
              return true;
          }
          break;
        case "ukrmisto":
          return doms.pop() === "doneck";
        case "urlgalleries":
          return doms.pop() === "amateurvoyeur";
        case "xyo":
          return doms.pop() === "br";
        case "zargacum":
          return doms.pop() === "billing";
      }
      break;
    case "ninja":
      switch( doms.pop() ) {
        case "kupitspidivpitere":
        case "psb4ukr":
        case "sweetmodels":
          return true;
      }
      break;
    case "nl":
      switch( doms.pop() ) {
        case "dutch-passion":
        case "euroseeds":
        case "geenstijl":
        case "green-submarine":
        case "greenhouseseeds":
        case "grower":
        case "hizb-ut-tahrir":
        case "intimciti":
        case "intimcity":
        case "jahnews":
        case "kyritelnie-smesi":
        case "kyritelnie-smesi":
        case "narkop":
        case "narkop":
        case "psyfairy":
        case "rcseller":
        case "rcseller":
        case "somaseeds":
        case "spliffseeds":
        case "tatanka":
          return true;
        case "blogspot":
          return doms.pop() === "fraya18";
        case "intimcity":
          return doms.pop() === "msk";
      }
      break;
    case "no":
      switch( doms.pop() ) {
        case "diaspora":
        case "osloby":
          return true;
        case "blogg":
          return doms.pop() === "chill420";
      }
      break;
    case "nu":
      switch( doms.pop() ) {
        case "intimcity":
        case "losos":
        case "sweden4rus":
        case "x-torrents":
          return true;
        case "onion":
          switch( doms.pop() ) {
            case "ashanrst35hkgliu":
            case "china2ltxuwdntrl":
            case "choosfr3itga63a4":
            case "ctsxciusuws3yxch":
            case "defenzfatgdqaxjs":
            case "diamouwksmsuquw7":
            case "diaspbclj4sgc2fy":
            case "dikznmk6qhislhhq":
            case "emers2vscspkbocj":
            case "fantavsxivmoli6n":
            case "frankk4lwkgnrnhk":
            case "hard2ccg5dihzgor":
            case "hempudpjbonzdylx":
            case "ilona4rkjw65hw6t":
            case "jekkos46s6x4sm7d":
            case "johnbnjymol2kzfu":
            case "jungsr6vy7zvya2u":
            case "learyycucta4zwlg":
            case "lefffynje52zfapp":
            case "luxembn2i2c6hlrd":
            case "luxluxxof56rwt7x":
            case "silvan3z4lm6wvyc":
              return true;
            case "shops3jckh3dexzy":
              switch( doms.pop() ) {
                case "araguiel":
                case "director":
                case "lavkachudes":
                case "weed4people":
                  return true;
              }
              break;
          }
          break;
      }
      break;
    case "org":
      switch( doms.pop() ) {
        case "144chan":
        case "24kino":
        case "24vulkan":
        case "2ndfl":
        case "4ertik":
        case "666-games":
        case "7-ka":
        case "777-slot":
        case "7chan":
        case "a-class":
        case "adult-forum":
        case "al-wayi":
        case "alhassanain":
        case "alphachan":
        case "amfetaminsaler":
        case "anarhia":
        case "antimatrix":
        case "archive":
        case "ataviko":
        case "automotodrive":
        case "awake-eu":
        case "azartplay":
        case "babe18":
        case "baka-tsuki":
        case "bananaslots":
        case "bananaslots":
        case "baraban":
        case "best-models":
        case "besttorrents":
        case "bestvulkan":
        case "bigfangroup":
        case "bigmedicine":
        case "bit-tracker":
        case "bit2bit":
        case "bitvin":
        case "booksss":
        case "bookzz":
        case "boyclub":
        case "boywiki":
        case "buy-amf":
        case "cannabay":
        case "cannado":
        case "cannakitchen":
        case "carbonpoker":
        case "casino-automats":
        case "casino-automats":
        case "casino-e":
        case "casino-land":
        case "casino-land":
        case "casino-rating":
        case "casino-rating":
        case "casinoruletka":
        case "casinorunet":
        case "chemicalcowboys":
        case "chitay":
        case "clarionproject":
        case "clubgrow":
        case "coalitionagainstcuts":
        case "coekpg":
        case "cpravki":
        case "crazy-models":
        case "crimeforum":
        case "cutechan":
        case "dancelist":
        case "daymohk":
        case "daymohk":
        case "detalka":
        case "devochka":
        case "diamond777":
        case "digiartistsdomain":
        case "dinafem":
        case "diplom-at":
        case "diplom4u":
        case "diplom4u":
        case "diplomkupit":
        case "diploms":
        case "diploms-best":
        case "dizilab":
        case "djsort":
        case "dope":
        case "dosug-ufa":
        case "dosug24":
        case "dosug25":
        case "dosug70":
        case "dpni":
        case "dpni":
        case "drugpolicy":
        case "dublikat":
        case "dvelo":
        case "ecstasydata":
        case "elmanara":
        case "equestriaafterdark":
        case "erowid":
        case "f-slots":
        case "falundafa":
        case "fartuna":
        case "fedspisok":
        case "fedspisok":
        case "film-online":
        case "filmrutor":
        case "find-book":
        case "forparty":
        case "forumua":
        case "frankcasino":
        case "freedomrussia":
        case "freekino":
        case "freemp3now":
        case "freepoker":
        case "freepornteen":
        case "frutor":
        case "fsell":
        case "fungrow":
        case "funny-culture":
        case "funplant":
        case "funsmoke":
        case "fxtorrent":
        case "ganjalive":
        case "ganjalive":
        case "ganjaseeds":
        case "ganjatime":
        case "gayru":
        case "gfilms":
        case "goodbyekavkaz":
        case "goodbyekavkaz":
        case "greenyline":
        case "growclub":
        case "growerz":
        case "growerzshop":
        case "growfair":
        case "guitar-max":
        case "habar":
        case "habar":
        case "halifat":
        case "hdreactor":
        case "headshoponline":
        case "help-docs":
        case "hentaifromhell":
        case "high-stone":
        case "high-stone":
        case "hitkino":
        case "hizb-turkiye":
        case "hizb-turkiye":
        case "hizb-ut-tahrir":
        case "hizb-ut-tahrir":
        case "hollandseeds":
        case "hot-torrent":
        case "hotbase":
        case "ibaza":
        case "ibaza":
        case "ichan":
        case "igra-prestoloff":
        case "igrovie-avtomati-besplatno":
        case "igrovie-avtomati-online":
        case "igrovye-avtomaty-online":
        case "igrovye-avtomaty-online":
        case "igrovyeavtomatyvulkan":
        case "ihentai":
        case "ilovenonude":
        case "inach":
        case "ingtor":
        case "ingushetiyaru":
        case "ingushetiyaru":
        case "ipvnews":
        case "ipvnews":
        case "ironmarch":
        case "islamannur":
        case "islaminsesi":
        case "jackpot-klub":
        case "jackpot-klub":
        case "jahforum":
        case "jailbaitgirls":
        case "jblover":
        case "jehovantodistajat":
        case "jihadwatch":
        case "jointpoint":
        case "just-magnet":
        case "jw":
        case "jw":
        case "jw-georgia":
        case "kasparov":
        case "kasparov":
        case "kazino-igri":
        case "khilafa":
        case "kinoshlak":
        case "kinotrek":
        case "klad24":
        case "klad24":
        case "knigger":
        case "knigibro":
        case "knigibro":
        case "krskmixmax":
        case "krutor":
        case "kupidiplom":
        case "kupisex":
        case "kupit-attestat":
        case "kuxnya":
        case "legal-market":
        case "legalmix":
        case "legalmix":
        case "legalrcshop":
        case "legalrcshop":
        case "lindex-ru":
        case "logr":
        case "ls-magazine":
        case "maidanua":
        case "maidmaidmaid":
        case "manytorrents":
        case "marcs":
        case "masterchan":
        case "matanga":
        case "mediapapa":
        case "mega-torrent":
        case "megapeer":
        case "memri":
        case "memritv":
        case "metelyk":
        case "metodon":
        case "mikportal":
        case "mirazarta":
        case "mirazarta":
        case "mister-x":
        case "molodezhka":
        case "moskvichki":
        case "moskvichki":
        case "mufakerhur":
        case "multbarboskiny":
        case "muvix":
        case "narkop":
        case "nationalism":
        case "nationalism":
        case "naturism-nudism":
        case "ndfl-2":
        case "ndfl2":
        case "neuschwabenland":
        case "newseasonvarik":
        case "newtorr":
        case "night-flower":
        case "nikorupciji":
        case "nomer":
        case "nomer":
        case "nudim":
        case "nudim":
        case "nudism-life":
        case "nudism-naturism":
        case "nudiworld":
        case "olkpeace":
        case "one-tracker":
        case "online-igrovie-avtomati":
        case "online-igrovye-avtomaty":
        case "opensharing":
        case "ostro":
        case "padonki":
        case "pbrus":
        case "phrack":
        case "planetjuly":
        case "platzdarm":
        case "platzdarm":
        case "pornk":
        case "porno-2012":
        case "premiumgirls":
        case "premiumhentai":
        case "pritoc":
        case "prostitutki":
        case "prostitutki":
        case "prostitutki-belgoroda":
        case "prostitutki-samara":
        case "prostitutki-surguta":
        case "prostitutki-volgograda":
        case "prostitutki-voronezha":
        case "prostitutki1":
        case "psb4ukr":
        case "pse3zub":
        case "psyplants":
        case "qiqru":
        case "r-g-d":
        case "r-g-d":
        case "radioislam":
        case "rastishki":
        case "rc-market":
        case "realincest":
        case "relax-portal":
        case "resistance88":
        case "resistance88":
        case "riobet":
        case "roadcontrol":
        case "ruckp":
        case "rufei":
        case "rumarijuana":
        case "rusensi":
        case "rusforce":
        case "russia-talk":
        case "rustorrents":
        case "ruvit":
        case "samintim":
        case "satanbaal":
        case "seedb":
        case "seedskanabis":
        case "semenarnia":
        case "sexuslugi":
        case "sexyrank":
        case "shefdostal":
        case "shefdostal":
        case "shop-rc":
        case "shop-rc":
        case "shoutussalam":
        case "showbody":
        case "sibseeds":
        case "sisenok":
        case "skotobaza":
        case "skotobaza":
        case "slot-casino":
        case "sloty-avtomaty-online":
        case "sodiqlar":
        case "sodiqlar":
        case "soski":
        case "spalili":
        case "speedspice":
        case "sport-television":
        case "streamzone":
        case "sunny-seeds":
        case "svitua":
        case "sythe":
        case "szona":
        case "taxi-bar":
        case "taxi-bar":
        case "tayna-net":
        case "tbib":
        case "tbib":
        case "teen-tube":
        case "tesak":
        case "testigosdejehova":
        case "thefileroom":
        case "tltklad":
        case "torchok":
        case "torrent-files":
        case "torrent-shara":
        case "torrentszona":
        case "torrpeda":
        case "troe-v-goa":
        case "trudcredit":
        case "trudovaya":
        case "trudsaratov":
        case "trudsib":
        case "trueinvest":
        case "trueinvest":
        case "tto4ka":
        case "turkiyevilayeti":
        case "tv-torrent":
        case "tvgid":
        case "twistcasino":
        case "uafilm":
        case "uainfo":
        case "umqoub":
        case "unaunso":
        case "unaunso":
        case "uraseeds":
        case "va-bank":
        case "vaynah":
        case "vchan":
        case "vegas-slot":
        case "vipsoski":
        case "vklade":
        case "vklade24":
        case "voditelskoe-udostoverenie":
        case "volcanovip":
        case "volcanovip":
        case "vp-zone":
        case "vseuznaem":
        case "waronline":
        case "waronline":
        case "warosu":
        case "watchtower":
        case "world-beauty":
        case "worldnudism":
        case "x-torrents":
        case "xteentube":
        case "xvideos-jp":
        case "yabeda":
        case "yabeda":
        case "youngrussianmodels":
        case "youtor":
        case "zepic":
          return true;
        case "azov-power":
          return doms.pop() === "radio";
        case "booru":
          switch( doms.pop() ) {
            case "allgirl":
            case "anythinguncensored":
            case "furry":
            case "guro":
            case "ii":
            case "img":
            case "simpsonsonly":
              return true;
          }
          break;
        case "cdun":
          switch( doms.pop() ) {
            case "kupit-kuritelnye-miksy-ufa":
            case "kupit-spays-ufa":
            case "kupit-spays-ulyanovsk":
            case "kupit-spays-v-volgograde":
            case "kupit-spays-volzhskiy":
            case "spays-kupit-v-koroleve":
              return true;
          }
          break;
        case "clarionproject":
          return doms.pop() === "media";
        case "cyberpe":
          return doms.pop() === "trancefm";
        case "dosug":
          return doms.pop() === "forum";
        case "dreamwidth":
          switch( doms.pop() ) {
            case "an-gry":
            case "cruzader":
            case "deilf":
            case "muslim-site":
            case "muslim-site":
            case "stervozzinka":
              return true;
          }
          break;
        case "drugfreeworld":
          return doms.pop() === "ru";
        case "falundafa":
          return doms.pop() === "uk";
        case "gimsy":
          return doms.pop() === "almaty";
        case "inach":
          return doms.pop() === "1chan";
        case "ipvnews":
          return doms.pop() === "gulag";
        case "khpg":
          return doms.pop() === "library";
        case "mashina":
          return doms.pop() === "er";
        case "myfreeforum":
          switch( doms.pop() ) {
            case "5chka":
            case "liga429":
            case "spice":
            case "tmn2015":
              return true;
          }
          break;
        case "noblogs":
          switch( doms.pop() ) {
            case "bannedavtonom":
            case "fromrussiawithlove":
            case "xavtnmx":
              return true;
          }
          break;
        case "rdccmaud":
          return doms.pop() === "rchemicals";
        case "rightsectorusa":
          return doms.pop() === "uk";
        case "rossia":
          return doms.pop() === "lj";
        case "rufei":
          switch( doms.pop() ) {
            case "belgorod":
            case "chita":
              return true;
          }
          break;
        case "shest":
          switch( doms.pop() ) {
            case "mu":
            case "xn--80aqdbkhej":
              return true;
          }
          break;
        case "swfchan":
          return doms.pop() === "get";
        case "turbopic":
          return doms.pop() === "s2";
        case "vho":
          switch( doms.pop() ) {
            case "hedrook":
            case "velesova-sloboda":
              return true;
          }
          break;
      }
      break;
    case "pe":
      return doms.pop() === "errors-seeds";
    case "pics":
      return doms.pop() === "niji";
    case "pk":
      if (doms.pop() === "com")
        if (doms.pop() === "samaa")
          return doms.pop() === "videos";
      break;
    case "pl":
      switch( doms.pop() ) {
        case "darkwarez":
        case "kzgpr":
        case "nekomaru":
          return true;
        case "org":
          return doms.pop() === "rutor";
      }
      break;
    case "pn":
      return doms.pop() === "news";
    case "pro":
      switch( doms.pop() ) {
        case "cloudzoom":
        case "cocoshop":
        case "gamehouse":
        case "growblog":
        case "growtools":
        case "wulkan":
        case "zakladki":
        case "zakladki":
          return true;
      }
      break;
    case "pw":
      switch( doms.pop() ) {
        case "abonenty-chast1":
        case "abonenty-chast1":
        case "abonenty-chast2":
        case "abonenty-chast2":
        case "abonenty-chast3":
        case "abonenty-chast3":
        case "amourangels":
        case "candydolls":
        case "cutemodel":
        case "diplom-v-moskve":
        case "errors-seeds":
        case "golden-star":
        case "guro":
        case "habklad":
        case "irkklad":
        case "jbpussy":
        case "jwh-store":
        case "krsk24":
        case "kyritelnye-mix":
        case "kyritelnye-mix":
        case "legal-rc":
        case "legal-rc":
        case "legal76":
        case "legalnyi":
        case "legalnyi":
        case "liketeen":
        case "mdma":
        case "mdma":
        case "mytv":
        case "nelegala":
        case "nelegala":
        case "nonudegirls":
        case "pwicq":
        case "shop-rc":
        case "shop-rc":
        case "skbar":
        case "spice-zk":
        case "spice-zk":
        case "spice74":
        case "vse-diplomi":
        case "vse-prava":
        case "zakladka":
        case "zakladki-tyt":
        case "zakladki-tyt":
          return true;
      }
      break;
    case "re":
      switch( doms.pop() ) {
        case "lurkmo":
        case "sanitar":
          return true;
        case "lurkmo":
          return doms.pop() === "ipv6";
      }
      break;
    case "review":
      if (doms.pop() === "tobacco-online24-smoking-blends-powders-pilsen-salt")
        if (doms.pop() === "powders-sexystar-cristalius-jwh-jaguar-skorost-a9-4-fa")
          if (doms.pop() === "kupit-smesi-ak47-afghan-sacramento-jahrush-blackmamba")
            return doms.pop() === "tobacco-online24-review";
      break;
    case "ro":
      return doms.pop() === "apropotv";
    case "ru":
      switch( doms.pop() ) {
        case "03magnet":
        case "123reklama":
        case "12sex":
        case "1prostitutka":
        case "1prostitutka":
        case "1tourism":
        case "2molotka":
        case "2ndfl-perm":
        case "4musik":
        case "51slot":
        case "69e":
        case "7ba":
        case "888poker":
        case "888poker":
        case "a-mks":
        case "a4x":
        case "absolyutnii":
        case "acola":
        case "adaltfilm":
        case "adklighting":
        case "advice-me":
        case "agrotorgkazan":
        case "agrotorgkazan":
        case "akak":
        case "aktivnordwest":
        case "aktivnordwest":
        case "alcmsk":
        case "alco-24":
        case "alco-night":
        case "alco-torg":
        case "alco63-24":
        case "alco63-24":
        case "alcobut":
        case "alcogol-nochyu":
        case "alcoholnsk":
        case "alcojet":
        case "alcojet":
        case "alcomsk":
        case "alconight":
        case "alcopaty":
        case "alcopoker":
        case "alcoprofy":
        case "alcotown":
        case "alcotown":
        case "aleksandrit-show":
        case "aleksandrit-show":
        case "alko-43":
        case "alko61":
        case "alkobaron":
        case "alkobutik24":
        case "alkoclub24":
        case "alkodostavka24":
        case "alkodoz":
        case "alkogol-nochju":
        case "alkokirov":
        case "alkoru":
        case "alkostakan":
        case "alkotime66":
        case "allbestcasino":
        case "allruletka":
        case "allserialus":
        case "anime-mob":
        case "antipriziv":
        case "anyinf":
        case "apresksps":
        case "aptekaopen":
        case "arbion":
        case "armada-plus":
        case "aromatmn":
        case "aromatmn":
        case "artarus":
        case "artarus":
        case "asemankello":
        case "autovodi":
        case "avtobar59":
        case "avtopas":
        case "azart-cash":
        case "azartreview":
        case "azcasplay":
        case "baratro":
        case "basa25":
        case "basa25":
        case "bashtan":
        case "behage":
        case "belgdiplom":
        case "belgorod-dip":
        case "belgorod-indi":
        case "believejustin":
        case "bengalscat":
        case "bengalscat":
        case "besplatnyje-objavlenija":
        case "best-casino":
        case "best-prava":
        case "best-prava":
        case "bestlifeforyour001":
        case "bestpokerrooms":
        case "bestprava":
        case "betbureau":
        case "betbureau":
        case "bez-posrednukov":
        case "bitvaekstrasensov":
        case "bjalfi":
        case "bobfilm-online":
        case "bolnichny-list-ulyanovsk":
        case "bonestv":
        case "bonus-poker":
        case "bordpro":
        case "bronzalib":
        case "bronzalib":
        case "bukmekerskiekontory":
        case "buzespices":
        case "cafeshka-hd":
        case "cardsharing-server":
        case "cardsharing-server":
        case "cashslot":
        case "cashslot":
        case "casino":
        case "casino-zeon":
        case "casino360":
        case "casinoclassic":
        case "casinoclub":
        case "casinojack":
        case "casinojack":
        case "casinomidas":
        case "casinos-top":
        case "casinosbonusami":
        case "casinotoplists":
        case "casinotown":
        case "casinoz":
        case "ccrkazan":
        case "cekc-cyka":
        case "chelny-mix":
        case "chemister":
        case "chitadiploma":
        case "clubtorrent":
        case "coinside":
        case "coinside":
        case "collection-films":
        case "comilfo-men":
        case "continent-irk":
        case "continent-irk":
        case "creampievideo":
        case "creditin":
        case "cuteboys":
        case "damcekca":
        case "damcekca":
        case "daters":
        case "daystruny":
        case "detoxx":
        case "detoxxx":
        case "didfotu":
        case "din-islam":
        case "dip-lom-rus":
        case "dip-lom-rus":
        case "dip-rf":
        case "dip-top":
        case "dip178":
        case "dipl-saratov":
        case "dipl-ufa":
        case "dipl-vladivostok":
        case "dipl-volgograd":
        case "diplom-77":
        case "diplom-externom":
        case "diplom-kuplyu":
        case "diplom-sale":
        case "diplom281":
        case "diploma5":
        case "diploma5":
        case "diploma63":
        case "diploma72":
        case "diplomguru":
        case "diplomnizhnov":
        case "diplomoff":
        case "diplompty":
        case "diplompty":
        case "diplomy86":
        case "diplomyplus":
        case "djamaat-soft":
        case "dl-prava":
        case "dnprostory":
        case "do-vl":
        case "dobyshop":
        case "doc-best":
        case "doconline":
        case "dodip":
        case "dom-eknig":
        case "domsexa":
        case "donburenie":
        case "dostavkapokazani":
        case "dosug-intim-v-rossii":
        case "dosug-intim-v-rossii":
        case "dosug38":
        case "dosugtvoi":
        case "dosugufa":
        case "dotu":
        case "dreamstories":
        case "e-nijnevartovsk":
        case "e-nijnevartovsk":
        case "ej":
        case "ej":
        case "eldoradoclub":
        case "eliczy":
        case "eliczy":
        case "elitci":
        case "elitci":
        case "elite-drinks":
        case "energe-hit":
        case "entheoworld":
        case "epassion":
        case "epassion":
        case "erome":
        case "eroplatinum":
        case "escort4you":
        case "escort4you":
        case "euro-casino":
        case "euro-casino":
        case "euromillionslotto":
        case "euromotors-v":
        case "euromotors-v":
        case "evil-islands":
        case "evtanaziya":
        case "ex-serials":
        case "exelentdoc":
        case "fank":
        case "fgrupp":
        case "film-torrent":
        case "filmku":
        case "filmoserial":
        case "filmu2014":
        case "first-laddy":
        case "fkk-nudism":
        case "footblogger":
        case "for-um":
        case "forum-tvs":
        case "free-filmy":
        case "free-slot":
        case "freeapteka":
        case "freeloto":
        case "freeruletka":
        case "freescancar":
        case "freezee":
        case "ftpby":
        case "full-hd-kino":
        case "fx4life":
        case "fxgamer":
        case "fxhot":
        case "g4pets":
        case "gamethrones":
        case "gamewinner":
        case "ganja-market":
        case "ganjamarket":
        case "gardenq":
        case "gardenq":
        case "garmoshkin":
        case "gazetakontakt":
        case "gazetakontakt":
        case "gdenews":
        case "getspravochnik":
        case "gfilm":
        case "gimdm":
        case "gimdm":
        case "gloria-penza":
        case "go-fo":
        case "go2kino":
        case "gogo-music":
        case "goldads":
        case "goldads":
        case "goldengamess":
        case "goldengamess":
        case "goldenroulette":
        case "goldslot":
        case "goodhashshop":
        case "goodhashstore":
        case "goplays":
        case "goplays":
        case "grandcasino":
        case "grani":
        case "grani":
        case "hanty-mansiysk-indi":
        case "happycorussia":
        case "haus777":
        case "hdpicture":
        case "hellywood":
        case "help-2ndfl":
        case "helpprava":
        case "helpprava":
        case "henes-plus":
        case "hentaime":
        case "hentaime":
        case "hentaipics":
        case "hfexpo":
        case "hfexpo":
        case "hikky":
        case "hip-hop":
        case "hkhats":
        case "hkhats":
        case "honestcasinos":
        case "hostenkov":
        case "hot-klip":
        case "hottelka":
        case "igrovie-avtomati-online":
        case "igrovoi-klub":
        case "igrovoi-klub":
        case "igrovyesloty":
        case "igrovyesloty":
        case "individualki-volgograda":
        case "intersrc":
        case "intim-devki":
        case "intim-devki":
        case "intimdoska":
        case "intpharm":
        case "irrm":
        case "isdarat":
        case "islam-books":
        case "israboard":
        case "ivetor":
        case "japan-bar":
        case "jarmarok":
        case "jetem":
        case "jeybiz":
        case "judokusakura":
        case "judokusakura":
        case "juristlib":
        case "jusar":
        case "justgoodhash":
        case "justgoodhash":
        case "k-shkaf":
        case "karamelki-spb":
        case "karapin":
        case "karedu":
        case "kase5":
        case "kasparov":
        case "kazinoigra":
        case "kazinovabank":
        case "kazinovulcan":
        case "kikujiro":
        case "kino-free":
        case "kino-nada":
        case "kino-trend":
        case "kinodub":
        case "kinogo-net-2016":
        case "kinolentin":
        case "kinomagik":
        case "kinoshka-hd":
        case "kinoszka":
        case "kirovtut":
        case "klipos":
        case "klubvulkan":
        case "klubvulkan":
        case "kmovie":
        case "kopipasta":
        case "krasivinabordevushek":
        case "krasview":
        case "krutobolka":
        case "krutobolka":
        case "krutoisex":
        case "kskoranienbaum":
        case "kstatida":
        case "kupi--prava":
        case "kupidokument":
        case "kupit-diplom-vysshee":
        case "kupit-diplomrf":
        case "kupit-diplomrf":
        case "kupitediplom":
        case "kupitndfl":
        case "kupitpravaynas":
        case "kupno":
        case "kupno":
        case "kypexa":
        case "kyrtizanki":
        case "kyrtizanki":
        case "ladydosug":
        case "lechimcistit":
        case "lechimcistit":
        case "leftdocs":
        case "legal-mixes":
        case "legal2015":
        case "legal2015":
        case "legal777":
        case "legalhash":
        case "legally-forum":
        case "lekarstvo-is-kitaya":
        case "lekarstvo-iz-kitaya":
        case "leonbets":
        case "life-casino":
        case "lifekiski":
        case "likesgirls":
        case "litru":
        case "live-ruletka":
        case "livetv":
        case "lookszone":
        case "lostfllms":
        case "lotterymaster":
        case "lottostore":
        case "lottoteka":
        case "love-prosti":
        case "love-prosti":
        case "loveartmaster":
        case "lovesexprost":
        case "luxe-drive":
        case "magicjournal":
        case "magicjournal":
        case "magnetgold":
        case "magnetself":
        case "magnit-i-schetchik":
        case "magnit-pro":
        case "magnit02":
        case "magniti-na-schetchik":
        case "magnitmos":
        case "magnitnaschetchik":
        case "marketta":
        case "mashki":
        case "mastaibeliy":
        case "mastaibeliy":
        case "masterporn":
        case "maxcasino":
        case "meb-2-life":
        case "meb-2-life":
        case "meditail":
        case "medknigka74":
        case "mega-porno":
        case "megalottery":
        case "methoxetamine":
        case "metod-serial":
        case "metodon":
        case "metodon":
        case "metodonline":
        case "mgporno":
        case "midora":
        case "milfporn":
        case "mir-kasino":
        case "mirpopok":
        case "mnogomagnitov":
        case "mobi-prof":
        case "mobkiss":
        case "mobmas":
        case "mokriishelki":
        case "mokriishelki":
        case "molodejca":
        case "moscow-diploma":
        case "moscow777":
        case "moscowspice":
        case "moscowspice":
        case "moskva4u":
        case "moskva4u":
        case "moskvatut":
        case "mosneomagnit":
        case "mosspravki":
        case "movie-hd":
        case "movieshok":
        case "moviki":
        case "moyznamensk":
        case "mp3-4-all":
        case "mp3klab":
        case "muscle-pharma":
        case "music-all-play":
        case "music-all-play":
        case "musicwords":
        case "muz-lyrics":
        case "muzonkin":
        case "mvt-m":
        case "my888":
        case "myami":
        case "myami":
        case "myliloo":
        case "myrumix":
        case "n-tehnologies":
        case "naberezhnye-chelny-dip":
        case "nadosuge21":
        case "namapos":
        case "naparupalok":
        case "narkops":
        case "naturism-nudism":
        case "ncsmedia":
        case "ncsmedia":
        case "netzamku":
        case "news-good":
        case "newtorent":
        case "nightpivo":
        case "nirvana-seed":
        case "nn-magnit":
        case "nnovgorodtut":
        case "no-sites":
        case "no-sites":
        case "noblock":
        case "notall":
        case "nov-diplom":
        case "novosibirsktut":
        case "novospice":
        case "nr2":
        case "nude18":
        case "nudipeople":
        case "nudist-naturist":
        case "nudist-photo":
        case "nudist-premium":
        case "nudist-world":
        case "nudiworld":
        case "nurr":
        case "obozrevatel":
        case "obozrevatel":
        case "obzorkazino":
        case "oceanvideo":
        case "ochen-krasivo":
        case "ochen-krasivo":
        case "odejda-1":
        case "odejda-1":
        case "odna-doma":
        case "office-lokator":
        case "office-lokator":
        case "ogorodotvet":
        case "one-mp3":
        case "onfillm":
        case "onlain-porno-site":
        case "online-film-smotret":
        case "online-novinka":
        case "onlinecasinogame":
        case "onlinecasinoreports":
        case "onlinecasinos":
        case "onlinecasinosguide":
        case "onlinefilm720hd":
        case "onlinekazino":
        case "onlinepokerinfo":
        case "onlinepornomir":
        case "orenburg-dip":
        case "ostanovi-schetchik":
        case "otdihsnimfokiskami":
        case "ozppnn":
        case "pantherinfoxic":
        case "pasportnik":
        case "pasportoff":
        case "pasportoff":
        case "paymusic":
        case "perdos":
        case "pes-game":
        case "petitegirl":
        case "ph-portal":
        case "pharmlider":
        case "pharmretail":
        case "phonedanger1":
        case "play-goldenstar":
        case "play-slots":
        case "playalbum":
        case "playazart":
        case "playkazino":
        case "playpopsa":
        case "plushko":
        case "pokerlistings":
        case "pokernadengy":
        case "pokersell":
        case "pokerturniri":
        case "porno-2015":
        case "porno-720hd":
        case "porno-cola":
        case "pornotext":
        case "pornozavrr":
        case "portpoteh":
        case "power-lepow":
        case "power-lepow":
        case "pozitron":
        case "prava-na-spectehniku":
        case "prava343":
        case "pravanadom":
        case "pravaru":
        case "pravaru":
        case "pravarus":
        case "pravax":
        case "prazdnikam5":
        case "prazdnikam5":
        case "premium-games":
        case "principiel":
        case "pritorg":
        case "problem-netu":
        case "prodavaiika":
        case "prodazha-diplomov":
        case "prodbazar":
        case "prosti-voronej":
        case "prostigirls":
        case "prostitutka":
        case "prostitutka":
        case "prostitutki-novosibirska":
        case "prostitutki-rostova":
        case "prostitutki-v-rossii":
        case "prostitutki46":
        case "prostitutkipiter":
        case "prostitutkipiter":
        case "prostitutkishop":
        case "purenudist":
        case "putanimira":
        case "qp-cctv":
        case "qp-cctv":
        case "rakegenerator":
        case "rbyoga":
        case "rcgoto":
        case "readporno":
        case "readporno":
        case "realmoneypoker":
        case "redskins":
        case "redstarsports":
        case "reduce-fat-fast":
        case "remont21":
        case "roman-maslennikov":
        case "roman-maslennikov":
        case "ros-prostitutki":
        case "rosapteca":
        case "rospesni":
        case "roulettenburg":
        case "roulettewheel":
        case "royalqueenseeds":
        case "ruchemodan":
        case "ruletka-system":
        case "run-mp3":
        case "rus-gai":
        case "rus-gai":
        case "rus-prava":
        case "russian-pasport":
        case "russiangambling":
        case "rustalking":
        case "rutracker":
        case "ryletka":
        case "safe42":
        case "sale-of-diplomas":
        case "samgrl":
        case "sashalavrova":
        case "satpic":
        case "schetchik-m":
        case "schuster":
        case "sdevkoy":
        case "sec-zone":
        case "semeister":
        case "seoiweb":
        case "seoporn":
        case "serial-one":
        case "setmagnet":
        case "sex-centr":
        case "sex-empire":
        case "sex-okean":
        case "sex-perm":
        case "sex34":
        case "sexengine":
        case "sexgerl72":
        case "sexkompas":
        case "sexkompas":
        case "sexkonfetki":
        case "sexmodeli":
        case "sexoroll":
        case "sexosamara":
        case "sexosurgut":
        case "sexoufa":
        case "sexovolg":
        case "sexovoronezh":
        case "sexpermi":
        case "sextalk":
        case "sextutla":
        case "sexxxfoto":
        case "sexywhores":
        case "shabalintm":
        case "shabalintm":
        case "shaman-r":
        case "shaman-r":
        case "shansuspeha":
        case "sharesoft3":
        case "shopbiysk":
        case "shopbiysk":
        case "simopia":
        case "skidka-ekb":
        case "skidows":
        case "slotgid":
        case "slotgid":
        case "slotigra":
        case "slotigra":
        case "slotika":
        case "slotionline":
        case "slotobzor":
        case "slotomaniya":
        case "slotsdoc":
        case "slotwinner":
        case "smoke-mixes":
        case "smokemixes":
        case "smokemixes":
        case "smoking-mixes":
        case "smokingmix":
        case "smokingmixes":
        case "smotri-filmu":
        case "soblazn72":
        case "song5":
        case "sosnovo-land":
        case "specapteka":
        case "specpharm":
        case "spice-online24":
        case "sportingbet":
        case "sportlandia112b":
        case "spravka-chita":
        case "spravka-ulyanovsk":
        case "spravka-v-chelnah":
        case "spravki-tuymene":
        case "spravki72":
        case "spravkinadom":
        case "spytome":
        case "spyway":
        case "standart-magnit":
        case "stavropoltut":
        case "steroid":
        case "steroid":
        case "stop-magnit":
        case "stroibud":
        case "sweet-drinks":
        case "sweet-drinks":
        case "tabachok":
        case "talkfriday":
        case "talkfriday":
        case "tdsmds":
        case "techmarket-41":
        case "techmarket-41":
        case "thelotter":
        case "tiltplanet":
        case "tiltplanet":
        case "tinyfamily":
        case "titanpoker":
        case "tksmag":
        case "toldiplom":
        case "top-10-casino":
        case "top-50":
        case "torentkino":
        case "torrent5":
        case "torrtilla":
        case "tosyalove":
        case "totaldosug":
        case "totorent":
        case "tracker":
        case "tranklukator":
        case "traxery":
        case "treeffy":
        case "triprostitutki":
        case "trudanet":
        case "trudovayaknizhka":
        case "trudovayasostagem":
        case "trudpom":
        case "trudstag":
        case "trudstazh":
        case "trudwork":
        case "true-detective-tv":
        case "trydovayaknizhka":
        case "trydovik":
        case "tutchelyabinsk":
        case "tutkrasnodar":
        case "ufalux":
        case "ufimki":
        case "uniformporno":
        case "univerno":
        case "uraxhayer":
        case "urbantv":
        case "v7ved":
        case "vabank-casino":
        case "vandime":
        case "vandime":
        case "varkapiva":
        case "varkapiva":
        case "vduvateli":
        case "vepisode":
        case "vera-lshop":
        case "videoslotsonline":
        case "vipcompanion":
        case "vipdosugperm":
        case "vipkab":
        case "vipprava":
        case "vkho":
        case "vlegale":
        case "vlgintim":
        case "voborote":
        case "vopesni":
        case "vremianazad":
        case "vremya-alkogol":
        case "vsalvia-divinorum":
        case "vsebarahlo":
        case "vsemania":
        case "vsepropoker":
        case "wap01":
        case "watchcine":
        case "way2fly":
        case "wayauway":
        case "wayauway":
        case "webazart":
        case "world-nudism":
        case "x-strana":
        case "xlaguna":
        case "xpe":
        case "xrutor":
        case "xsalvia-divinorum":
        case "xseeds":
        case "xslot":
        case "xtext":
        case "xxx-ufa":
        case "xxx-video24":
        case "xxxgig":
        case "xxxonlinevideo":
        case "zakaz-prav":
        case "zakaz-prav":
        case "zakazdok":
        case "zargacum":
        case "zoo4u":
        case "zoo4u":
          return true;
        case "4local":
          return doms.pop() === "media";
        case "adsbox":
          switch( doms.pop() ) {
            case "arhangl-obl":
            case "kamchatsk-kry":
            case "kirovsk-obl":
              return true;
            case "permsk-kry":
              return doms.pop() === "kungur";
            case "ryazansk-obl":
              return doms.pop() === "ryazan";
            case "tambovsk-obl":
              return doms.pop() === "michurinsk";
          }
          break;
        case "alkodostavka24":
          return doms.pop() === "1";
        case "baaza":
          switch( doms.pop() ) {
            case "board":
            case "board":
              return true;
          }
          break;
        case "bezgazet":
          return doms.pop() === "prodam";
        case "blogspot":
          switch( doms.pop() ) {
            case "100boicov":
            case "al-wayi":
            case "al-wayi":
            case "banksystreet":
            case "hizbua":
            case "icavalieridellatavolarotonda":
            case "kavkazcentre":
            case "maidanua":
            case "manual-pro":
            case "maydan-news":
            case "milli-mejlis":
            case "minotauryda":
            case "petsanimalsvovagromov":
            case "putin-xujlo":
            case "putinhuylo":
            case "ros-boloto":
            case "tatar-centr":
            case "tatar-centr":
            case "una-unso-cv":
            case "xenudism":
              return true;
          }
          break;
        case "complife":
          return doms.pop() === "yun";
        case "deall":
          if (doms.pop() === "ru")
            switch( doms.pop() ) {
              case "mmgp":
              case "mmgp":
                return true;
            }
          break;
        case "donkiz":
          return doms.pop() === "prodayu";
        case "ej":
          return doms.pop() === "123";
        case "ettochno":
          return doms.pop() === "cinema";
        case "gordoski":
          return doms.pop() === "nizhniy-novgorod";
        case "ironyproduction":
          return doms.pop() === "cocaine";
        case "kazino-moskva":
          return doms.pop() === "babki9";
        case "marketre":
          return doms.pop() === "moskva";
        case "mobik":
          return doms.pop() === "dem";
        case "msk":
          return doms.pop() === "kupit-diplom";
        case "myrbs":
          return doms.pop() === "ufa";
        case "net":
          return doms.pop() === "gigawatts";
        case "org":
          return doms.pop() === "rpczmoskva";
        case "pickup":
          return doms.pop() === "forum";
        case "primlive":
          return doms.pop() === "bolshoj-kamen";
        case "prodom":
          switch( doms.pop() ) {
            case "ads":
              return true;
            case "goods":
              if (doms.pop() === "runwww")
                if (doms.pop() === "prodom")
                  return doms.pop() === "ads";
              break;
            case "rudled":
              if (doms.pop() === "prodom")
                return doms.pop() === "ads";
              break;
            case "rupalladin":
              if (doms.pop() === "prodom")
                return doms.pop() === "ads";
              break;
            case "rurusholding":
              if (doms.pop() === "prodom")
                return doms.pop() === "ads";
              break;
          }
          break;
        case "reagenty-kuritelnyye-smesi-eyfor-miffi-md-skorost-lsd-mdma-jwh":
          if (doms.pop() === "legalnyye-narkotiki-sol-dlya-vann-dzhiviash")
            switch( doms.pop() ) {
              case "biz":
                switch( doms.pop() ) {
                  case "legpills":
                  case "legpills":
                    return true;
                }
                break;
              case "com":
                return doms.pop() === "shaman-r";
            }
          break;
        case "region-gdo":
          switch( doms.pop() ) {
            case "arkhangelsk":
            case "volgograd":
              return true;
          }
          break;
        case "ruletka-na-rubli":
          return doms.pop() === "cabinet9";
        case "rusbiz":
          switch( doms.pop() ) {
            case "company-directory":
            case "e-catalog":
            case "trade-leads":
              return true;
          }
          break;
        case "san-okt":
          return doms.pop() === "casino";
        case "sexy-stories":
          return doms.pop() === "m";
        case "shaman-r":
          return doms.pop() === "s-s";
        case "socworks":
          return doms.pop() === "casino";
        case "sosbb":
          return doms.pop() === "freya";
        case "spb":
          return doms.pop() === "dipzakaz";
        case "tukuli":
          return doms.pop() === "anapa";
        case "webzone":
          return doms.pop() === "peroun";
        case "xrutor":
          return doms.pop() === "ww";
      }
      break;
    case "sc":
      return doms.pop() === "mafia";
    case "science":
      switch( doms.pop() ) {
        case "adressnaya-knizechka":
        case "adressnaya-knizechka":
          return true;
      }
      break;
    case "se":
      switch( doms.pop() ) {
        case "encyclopediadramatica":
        case "thepiratebay":
        case "youtube1":
          return true;
        case "blogspot":
          return doms.pop() === "novozhilovcase";
        case "nyaa":
          return doms.pop() === "sukebei";
      }
      break;
    case "sexy":
      return doms.pop() === "spree";
    case "sh":
      return doms.pop() === "books";
    case "site":
      return doms.pop() === "ozpp";
    case "sk":
      switch( doms.pop() ) {
        case "rc-chemicals":
          return true;
        case "host":
          return doms.pop() === "dkg-club";
      }
      break;
    case "so":
      switch( doms.pop() ) {
        case "dosug":
        case "lurkmore":
          return true;
      }
      break;
    case "space":
      switch( doms.pop() ) {
        case "forumqrc":
        case "forumrc":
        case "forumsrc":
        case "stuffshop":
          return true;
      }
      break;
    case "st":
      if (doms.pop() === "anarxi")
        return doms.pop() === "grey";
      break;
    case "su":
      switch( doms.pop() ) {
        case "alko24":
        case "belochki":
        case "casinojack":
        case "casinojack":
        case "casinovulkan":
        case "casinoz":
        case "cinemas":
        case "fotoporno":
        case "gmslots":
        case "hottelka":
        case "intim24":
        case "latestcasinobonuses":
        case "legpills":
        case "londongrad":
        case "matchtv":
        case "mobtor":
        case "narcotics":
        case "onegai":
        case "prostitutki-moskva":
        case "rclab":
        case "rpi":
        case "seedb":
        case "shockmodels":
        case "softwarez":
        case "toth":
        case "trah":
        case "tvtorrent":
        case "videosearch":
        case "zakonanet":
        case "zakonanet":
          return true;
      }
      break;
    case "sx":
      switch( doms.pop() ) {
        case "klad":
        case "liverutv":
        case "livesport":
        case "livetv":
        case "livetvru":
        case "livetvsport":
        case "narkop":
        case "sportlivetv":
          return true;
      }
      break;
    case "tc":
      switch( doms.pop() ) {
        case "hentai":
        case "tide":
          return true;
      }
      break;
    case "tk":
      switch( doms.pop() ) {
        case "destroyrussia":
        case "destroyrussia":
        case "dosug-24":
        case "narkombiz":
        case "online-kinodom":
        case "urallegal":
          return true;
      }
      break;
    case "to":
      switch( doms.pop() ) {
        case "celebforum":
        case "demotivators":
        case "dump":
        case "get-rc":
        case "lurkmore":
        case "monkey":
        case "vipergirls":
        case "vredy":
          return true;
        case "na":
          return doms.pop() === "sexibl";
        case "onion":
          switch( doms.pop() ) {
            case "adrenlfztn4zuk7k":
            case "china2ltxuwdntrl":
            case "choosfr3itga63a4":
            case "ctsxciusuws3yxch":
            case "curea7apy2f66zpb":
            case "diamouwksmsuquw7":
            case "diaspbclj4sgc2fy":
            case "dobrohk3i4g6kbp6":
            case "emers2vscspkbocj":
            case "flab76zhspqagjko":
            case "garryjjdc7ctki6q":
            case "hempudpjbonzdylx":
            case "justdgiwa7ofknsl":
            case "learyycucta4zwlg":
            case "levoz36toa6sivuu":
            case "lux2c33o5cppbk6f":
            case "luxdezjnop7f2udi":
            case "luxembn2i2c6hlrd":
            case "mouse4tb7qr4fqqq":
            case "oldschsitzdwg73l":
            case "orang6jelula4o4d":
            case "parabpf4rbfwohre":
            case "prtboob54itakssb":
            case "silvan3z4lm6wvyc":
            case "starbqh2vfi64nzx":
            case "tgkoolxrpybhtt5y":
            case "weedukluew7c7fz6":
            case "wlandoi5pk574duz":
            case "zubrrotzdg2m2uy7":
              return true;
          }
          break;
        case "ribbon":
          return doms.pop() === "red";
      }
      break;
    case "today":
      switch( doms.pop() ) {
        case "manga":
        case "myislam":
          return true;
      }
      break;
    case "top":
      switch( doms.pop() ) {
        case "kazino":
        case "orb1ta":
          return true;
      }
      break;
    case "tr":
      switch( doms.pop() ) {
        case "com":
          switch( doms.pop() ) {
            case "risaleinur":
              return true;
            case "blogspot":
              switch( doms.pop() ) {
                case "putin-xujlo":
                case "xaybar":
                  return true;
              }
              break;
          }
          break;
        case "gen":
          switch( doms.pop() ) {
            case "nur":
            case "plak":
              return true;
          }
          break;
      }
      break;
    case "tv":
      switch( doms.pop() ) {
        case "5xxx":
        case "abur":
        case "aliez":
        case "allfon":
        case "ansar":
        case "best-serials":
        case "daykino":
        case "debilizator":
        case "eafilm":
        case "ebal":
        case "enature":
        case "enature":
        case "esdarat":
        case "growhd":
        case "herehentai":
        case "hugesex":
        case "isdarat":
        case "iserver1":
        case "iserver2":
        case "iserver3":
        case "iserver4":
        case "kavkaz":
        case "kavkaz":
        case "killinfo":
        case "kino-v-online":
        case "kino-zal":
        case "kinomafia":
        case "kinomix":
        case "kinopanda":
        case "kinoradiomagia":
        case "kinoray":
        case "mega-porno":
        case "morefilms":
        case "myhardarchive":
        case "mylovehidden":
        case "narkom":
        case "on-video":
        case "onlain-porno":
        case "only-sport":
        case "pisuli":
        case "pollystreaming":
        case "pornk":
        case "porno911":
        case "pornofaza":
        case "pornoincest":
        case "pornosok":
        case "pornozak":
        case "pornvidos":
        case "postfilm":
        case "pust-govoryat":
        case "pust-govoryat":
        case "ru-porn":
        case "ruporn":
        case "ruskoe":
        case "sex-abc":
        case "sexhome":
        case "shara":
        case "shara":
        case "showday":
        case "smotrisport":
        case "sota":
        case "sportsboom":
        case "stillporn":
        case "teen-gay-porn":
        case "thailandproperty":
        case "tracktor":
        case "traher":
        case "trahun":
        case "traxer":
        case "tuthd":
        case "tvids":
        case "vkino":
        case "vtrahe":
        case "vufel":
        case "vuku":
        case "waaw":
        case "xlolitka":
        case "zalip":
          return true;
        case "cserver":
          switch( doms.pop() ) {
            case "aex1vipi":
            case "dd028":
            case "dd205":
            case "dd578":
            case "dd602":
            case "iexufoh3":
            case "phu9tami":
            case "zuu9ieth":
              return true;
          }
          break;
        case "dyndns":
          switch( doms.pop() ) {
            case "key888":
            case "sproua":
            case "stone63":
            case "wave88":
            case "zombi909":
              return true;
          }
          break;
      }
      break;
    case "tw":
      return doms.pop() === "primewire";
    case "ua":
      switch( doms.pop() ) {
        case "az":
        case "delo":
        case "dou":
        case "ex":
        case "ex":
        case "focus":
        case "glavcom":
        case "glavnoe":
        case "podrobnosti":
        case "politiko":
        case "tao":
        case "umma":
        case "voborote":
          return true;
        case "biz":
          return doms.pop() === "gorlovka";
        case "cn":
          switch( doms.pop() ) {
            case "ecity":
            case "gorod":
              return true;
          }
          break;
        case "co":
          return doms.pop() === "lib";
        case "com":
          switch( doms.pop() ) {
            case "24open":
            case "agro-kompas":
            case "anons":
            case "anons":
            case "antiraid":
            case "berdoska":
            case "blowgrow":
            case "bonline":
            case "bud-inform":
            case "buysell":
            case "canna-seeds":
            case "caylerandsons":
            case "city-nikopol":
            case "diagram":
            case "diletant":
            case "errors-seeds":
            case "favor":
            case "filt-tec":
            case "freead":
            case "freeseller":
            case "hollandseeds":
            case "igrovyeavtomaty":
            case "ijr":
            case "kinoplay":
            case "kult-u-ra":
            case "lenta":
            case "lib":
            case "litsa":
            case "mclub":
            case "mihailov":
            case "mjgrowers":
            case "motilek":
            case "nevsedoma":
            case "nr2":
            case "ord-ua":
            case "pic":
            case "politikan":
            case "posovesti":
            case "ps-shop":
            case "psmk":
            case "psyplants":
            case "qww":
            case "rang":
            case "seriali":
            case "shop-paradise":
            case "superseeds":
            case "tolkay":
            case "ukraine-today":
            case "vidoser":
            case "zavtra":
              return true;
            case "milla":
              switch( doms.pop() ) {
                case "don":
                  return doms.pop() === "donietsk";
                case "if":
                  return doms.pop() === "vierboviets";
              }
              break;
            case "motilek":
              return doms.pop() === "forum";
            case "myclienty":
              return doms.pop() === "vinogradnoe";
            case "poiskuha":
              switch( doms.pop() ) {
                case "board":
                case "board":
                  return true;
              }
              break;
            case "pravda":
              return doms.pop() === "forum";
            case "prommetiz":
              return doms.pop() === "board";
            case "xolodok":
              return doms.pop() === "otveti";
          }
          break;
        case "comments":
          return doms.pop() === "forum";
        case "dn":
          switch( doms.pop() ) {
            case "hi":
            case "top":
              return true;
          }
          break;
        case "dp":
          switch( doms.pop() ) {
            case "nikopol":
            case "pdrs":
            case "port2all":
            case "rightsector":
            case "veda":
            case "warning":
              return true;
            case "gorod":
              return doms.pop() === "forum";
          }
          break;
        case "foto":
          return doms.pop() === "journal";
        case "gazeta":
          return doms.pop() === "video";
        case "good":
          switch( doms.pop() ) {
            case "krim":
            case "r1":
              return true;
          }
          break;
        case "hochu":
          return doms.pop() === "forum";
        case "i":
          switch( doms.pop() ) {
            case "blog":
            case "music":
              return true;
          }
          break;
        case "in":
          switch( doms.pop() ) {
            case "555slot":
            case "allmir":
            case "crystalius":
            case "fantazy":
            case "mediastore":
            case "mixstyle":
            case "playpoker":
            case "razkumar":
            case "research-chemicals":
            case "tema":
            case "una-unso":
            case "unso":
            case "unso":
            case "videofan":
            case "worldcannabis":
              return true;
          }
          break;
        case "kh":
          if (doms.pop() === "bezgazet")
            return doms.pop() === "prodazha";
          break;
        case "kiev":
          switch( doms.pop() ) {
            case "botanika":
            case "forum":
            case "qs":
            case "rights":
            case "vprave":
              return true;
            case "0day":
              return doms.pop() === "tracker";
            case "2108":
              return doms.pop() === "forum";
            case "misto":
              return doms.pop() === "lib";
          }
          break;
        case "kontrakty":
          return doms.pop() === "job";
        case "lg":
          return doms.pop() === "w3";
        case "mediaport":
          return doms.pop() === "forum";
        case "mk":
          return doms.pop() === "hopstopia";
        case "natali":
          return doms.pop() === "forum";
        case "net":
          switch( doms.pop() ) {
            case "censor":
            case "e-gbo":
            case "grower":
            case "grower":
            case "izberg":
            case "sled":
            case "x-line":
              return true;
            case "ostrov":
              switch( doms.pop() ) {
                case "forum":
                case "relay":
                  return true;
              }
              break;
          }
          break;
        case "od":
          switch( doms.pop() ) {
            case "board":
            case "ero":
            case "odessa-tour":
            case "pravyysektor":
              return true;
          }
          break;
        case "org":
          switch( doms.pop() ) {
            case "banderivec":
            case "banderivec":
            case "banderivets":
            case "biblioteka":
            case "hizb":
            case "hizb":
            case "hollandseeds":
            case "investigator":
            case "kyxar":
            case "noborders":
            case "nsportal":
            case "samfail":
            case "schooler":
            case "teraze":
            case "una-unso":
            case "wanderer":
            case "worms":
            case "zarodinu":
              return true;
            case "broadband":
              return doms.pop() === "job";
            case "maidan":
              return doms.pop() === "forum";
          }
          break;
        case "pp":
          switch( doms.pop() ) {
            case "doctrines":
            case "tolko-pravda":
            case "torrentz":
            case "worldmedscience":
              return true;
            case "j2skga":
              return doms.pop() === "besellik";
          }
          break;
        case "spravka":
          switch( doms.pop() ) {
            case "cristaliustorg":
            case "lego-rc":
            case "mephedrone":
            case "miks-ukr":
            case "news":
              return true;
          }
          break;
        case "sumy":
          return doms.pop() === "forums";
        case "tut":
          return doms.pop() === "board";
        case "v":
          switch( doms.pop() ) {
            case "board":
            case "board":
              return true;
          }
          break;
        case "vdome":
          switch( doms.pop() ) {
            case "novosti":
            case "vse":
            case "vse":
              return true;
          }
          break;
        case "zp":
          if (doms.pop() === "bezgazet")
            return doms.pop() === "uslugi";
          break;
      }
      break;
    case "uk":
      switch( doms.pop() ) {
        case "co":
          switch( doms.pop() ) {
            case "bitcoinhighs":
            case "buythegram":
            case "casino-tips":
            case "chemicalpowdershop":
            case "dope-smoker":
            case "dosug":
            case "freeslotsnodeposits":
            case "globalweekends":
            case "goldenseed":
            case "herbal-spice-666":
            case "herbalheadshoponline":
            case "iceheadshop":
            case "ideala":
            case "randomrocker":
            case "salviaonline":
              return true;
            case "blogspot":
              switch( doms.pop() ) {
                case "abusalima770":
                case "cannabisfun":
                case "prioratos":
                  return true;
              }
              break;
          }
          break;
        case "org":
          return doms.pop() === "kavkaz";
      }
      break;
    case "us":
      switch( doms.pop() ) {
        case "donmai":
        case "donmai":
        case "doujin-moe":
        case "e38":
        case "fapfap":
        case "forparty":
        case "indomp3z":
        case "legal76":
        case "miraida":
        case "phreaker":
        case "vktube":
        case "werwolf":
          return true;
        case "blidoo":
          return doms.pop() === "afton";
        case "donmai":
          return doms.pop() === "danbooru";
        case "onlinehome":
          return doms.pop() === "s301407763";
      }
      break;
    case "uz":
      switch( doms.pop() ) {
        case "omadlotto":
        case "superbazar":
          return true;
        case "islom":
          return doms.pop() === "forum";
      }
      break;
    case "website":
      return doms.pop() === "toplegal";
    case "ws":
      switch( doms.pop() ) {
        case "annett":
        case "bestfolders":
        case "diplomas":
        case "errors-seeds":
        case "extasy":
        case "extasy":
        case "filebase":
        case "gamefox":
        case "imageweb":
        case "ipga":
        case "leporno":
        case "livefootball":
        case "loveread":
        case "megafile":
        case "multimed":
        case "narkop":
        case "ns-wp":
        case "projectfreetv":
        case "ruletka":
        case "ruletka":
        case "rutracker":
        case "semenarnia":
        case "semyanich":
        case "shishkin":
        case "torrentdownload":
        case "wildcritters":
          return true;
        case "hanf":
          return doms.pop() === "cannabisculture";
        case "poltava":
          return doms.pop() === "repres";
      }
      break;
    case "xn--80asehdb":
      return doms.pop() === "xn----dtbgen1agbfbm";
    case "xn--p1ai":
      switch( doms.pop() ) {
        case "xn-----6kcbnpreslnc8cjg2fc":
        case "xn----24-53dan9br4ccmxl2l":
        case "xn----7sbj1aecpebd3hqce2a":
        case "xn----otbahsfhfekbamf":
        case "xn----otbaxkccfdp4h5a":
        case "xn---2--8cdjgaef5avqcxtcf5azr2a5o":
        case "xn--54-6kcm8afcwb5l":
        case "xn--54-6kcm8afcwb5l":
        case "xn--66-6kcmylgjr":
        case "xn--80abmmyfua2c":
        case "xn--80auacqa3e":
        case "xn--90aasoobcqkjk":
        case "xn--n1aeew":
          return true;
        case "xn--80abmmyfua2c":
          return doms.pop() === "xn--80aatcn";
      }
      break;
    case "xxx":
      switch( doms.pop() ) {
        case "ibsearch":
        case "manporn":
        case "pornozvezda":
        case "ptichki":
        case "putany":
        case "rule34":
        case "vuku":
        case "xxx5":
        case "yongporntube":
          return true;
        case "dosug":
          return doms.pop() === "ladies";
        case "putany":
          switch( doms.pop() ) {
            case "belgorod":
            case "khanty-mansiysk":
            case "krasnoyarsk":
              return true;
          }
          break;
        case "rule34":
          return doms.pop() === "cloud";
      }
      break;
    case "xyz":
      switch( doms.pop() ) {
        case "vulkan":
        case "vulkan-club":
        case "vulkan-club":
          return true;
        case "topnn":
          return doms.pop() === "models";
      }
      break;
  }

    return false;
  })(host) ? viaProxy : 'DIRECT';
}