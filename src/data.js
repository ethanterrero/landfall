// name|iso|continent|subregion|capital|lat|lng|area km²|pop (thousands)|languages
const RAW=`Algeria|DZ|Africa|North Africa|Algiers|36.75|3.06|2381741|46800|Arabic/Berber
Angola|AO|Africa|Central Africa|Luanda|-8.84|13.23|1246700|37900|Portuguese
Benin|BJ|Africa|West Africa|Porto-Novo|6.5|2.6|114763|14500|French
Botswana|BW|Africa|Southern Africa|Gaborone|-24.65|25.91|581730|2500|English/Tswana
Burkina Faso|BF|Africa|West Africa|Ouagadougou|12.37|-1.52|274200|23500|French
Burundi|BI|Africa|East Africa|Gitega|-3.43|29.93|27834|14000|Kirundi/French
Cape Verde|CV|Africa|West Africa|Praia|14.93|-23.51|4033|520|Portuguese
Cameroon|CM|Africa|Central Africa|Yaoundé|3.87|11.52|475442|29100|French/English
Central African Republic|CF|Africa|Central Africa|Bangui|4.39|18.56|622984|5300|French/Sango
Chad|TD|Africa|Central Africa|N'Djamena|12.13|15.06|1284000|20300|French/Arabic
Comoros|KM|Africa|East Africa|Moroni|-11.7|43.26|1862|870|Comorian/French/Arabic
DR Congo|CD|Africa|Central Africa|Kinshasa|-4.32|15.31|2344858|109300|French
Republic of the Congo|CG|Africa|Central Africa|Brazzaville|-4.26|15.24|342000|6300|French
Ivory Coast|CI|Africa|West Africa|Yamoussoukro|6.82|-5.28|322463|31900|French
Djibouti|DJ|Africa|East Africa|Djibouti|11.59|43.15|23200|1200|French/Arabic
Egypt|EG|Africa|North Africa|Cairo|30.04|31.24|1002450|116500|Arabic
Equatorial Guinea|GQ|Africa|Central Africa|Malabo|3.75|8.78|28051|1900|Spanish/French/Portuguese
Eritrea|ER|Africa|East Africa|Asmara|15.32|38.93|117600|3500|Tigrinya/Arabic/English
Eswatini|SZ|Africa|Southern Africa|Mbabane|-26.31|31.14|17364|1200|Swazi/English
Ethiopia|ET|Africa|East Africa|Addis Ababa|9.03|38.74|1104300|132100|Amharic
Gabon|GA|Africa|Central Africa|Libreville|0.39|9.45|267668|2500|French
Gambia|GM|Africa|West Africa|Banjul|13.45|-16.58|11295|2800|English
Ghana|GH|Africa|West Africa|Accra|5.6|-0.19|238533|34400|English
Guinea|GN|Africa|West Africa|Conakry|9.64|-13.58|245857|14800|French
Guinea-Bissau|GW|Africa|West Africa|Bissau|11.86|-15.6|36125|2200|Portuguese
Kenya|KE|Africa|East Africa|Nairobi|-1.29|36.82|580367|56400|Swahili/English
Lesotho|LS|Africa|Southern Africa|Maseru|-29.31|27.48|30355|2300|Sesotho/English
Liberia|LR|Africa|West Africa|Monrovia|6.3|-10.8|111369|5600|English
Libya|LY|Africa|North Africa|Tripoli|32.89|13.19|1759540|7400|Arabic
Madagascar|MG|Africa|East Africa|Antananarivo|-18.88|47.51|587041|32000|Malagasy/French
Malawi|MW|Africa|East Africa|Lilongwe|-13.96|33.79|118484|21700|English/Chichewa
Mali|ML|Africa|West Africa|Bamako|12.64|-8|1240192|24500|Bambara/French
Mauritania|MR|Africa|West Africa|Nouakchott|18.08|-15.98|1030700|5200|Arabic
Mauritius|MU|Africa|East Africa|Port Louis|-20.16|57.5|2040|1300|English/French
Morocco|MA|Africa|North Africa|Rabat|34.02|-6.83|446550|38100|Arabic/Berber
Mozambique|MZ|Africa|Southern Africa|Maputo|-25.97|32.57|801590|34600|Portuguese
Namibia|NA|Africa|Southern Africa|Windhoek|-22.56|17.08|825615|3000|English
Niger|NE|Africa|West Africa|Niamey|13.51|2.11|1267000|27000|French/Hausa
Nigeria|NG|Africa|West Africa|Abuja|9.08|7.4|923768|232700|English/Hausa
Rwanda|RW|Africa|East Africa|Kigali|-1.94|30.06|26338|14300|Kinyarwanda/French/English/Swahili
São Tomé and Príncipe|ST|Africa|Central Africa|São Tomé|0.34|6.73|964|230|Portuguese
Senegal|SN|Africa|West Africa|Dakar|14.72|-17.47|196722|18500|French/Wolof
Seychelles|SC|Africa|East Africa|Victoria|-4.62|55.45|459|130|English/French
Sierra Leone|SL|Africa|West Africa|Freetown|8.48|-13.23|71740|8600|English
Somalia|SO|Africa|East Africa|Mogadishu|2.05|45.32|637657|19000|Somali/Arabic
South Africa|ZA|Africa|Southern Africa|Pretoria|-25.75|28.19|1221037|64000|English/Zulu/Afrikaans
South Sudan|SS|Africa|East Africa|Juba|4.86|31.57|619745|11900|English
Sudan|SD|Africa|North Africa|Khartoum|15.5|32.56|1886068|50400|Arabic/English
Tanzania|TZ|Africa|East Africa|Dodoma|-6.16|35.75|947303|68600|Swahili/English
Togo|TG|Africa|West Africa|Lomé|6.13|1.22|56785|9500|French
Tunisia|TN|Africa|North Africa|Tunis|36.81|10.18|163610|12300|Arabic
Uganda|UG|Africa|East Africa|Kampala|0.35|32.58|241038|50000|English/Swahili
Zambia|ZM|Africa|Southern Africa|Lusaka|-15.39|28.32|752612|21300|English
Zimbabwe|ZW|Africa|Southern Africa|Harare|-17.83|31.05|390757|16600|English/Shona
Afghanistan|AF|Asia|South Asia|Kabul|34.53|69.17|652230|42600|Pashto/Dari
Armenia|AM|Asia|Caucasus|Yerevan|40.18|44.51|29743|3000|Armenian
Azerbaijan|AZ|Asia|Caucasus|Baku|40.41|49.87|86600|10300|Azerbaijani
Bahrain|BH|Asia|Middle East|Manama|26.23|50.59|786|1600|Arabic
Bangladesh|BD|Asia|South Asia|Dhaka|23.81|90.41|147570|173600|Bengali
Bhutan|BT|Asia|South Asia|Thimphu|27.47|89.64|38394|790|Dzongkha
Brunei|BN|Asia|Southeast Asia|Bandar Seri Begawan|4.9|114.94|5765|460|Malay
Cambodia|KH|Asia|Southeast Asia|Phnom Penh|11.56|104.92|181035|17600|Khmer
China|CN|Asia|East Asia|Beijing|39.9|116.4|9596961|1419300|Chinese
Georgia|GE|Asia|Caucasus|Tbilisi|41.72|44.79|69700|3800|Georgian
India|IN|Asia|South Asia|New Delhi|28.61|77.21|3287263|1450900|Hindi/English
Indonesia|ID|Asia|Southeast Asia|Jakarta|-6.21|106.85|1904569|283500|Indonesian
Iran|IR|Asia|Middle East|Tehran|35.69|51.39|1648195|91600|Persian
Iraq|IQ|Asia|Middle East|Baghdad|33.31|44.36|438317|46000|Arabic/Kurdish
Israel|IL|Asia|Middle East|Jerusalem|31.77|35.21|22072|9400|Hebrew/Arabic
Japan|JP|Asia|East Asia|Tokyo|35.68|139.69|377975|123800|Japanese
Jordan|JO|Asia|Middle East|Amman|31.95|35.93|89342|11600|Arabic
Kazakhstan|KZ|Asia|Central Asia|Astana|51.17|71.45|2724900|20600|Kazakh/Russian
Kuwait|KW|Asia|Middle East|Kuwait City|29.38|47.99|17818|4900|Arabic
Kyrgyzstan|KG|Asia|Central Asia|Bishkek|42.87|74.59|199951|7200|Kyrgyz/Russian
Laos|LA|Asia|Southeast Asia|Vientiane|17.98|102.63|236800|7800|Lao
Lebanon|LB|Asia|Middle East|Beirut|33.89|35.5|10452|5800|Arabic/French
Malaysia|MY|Asia|Southeast Asia|Kuala Lumpur|3.14|101.69|330803|35600|Malay/English
Maldives|MV|Asia|South Asia|Malé|4.18|73.51|300|530|Dhivehi
Mongolia|MN|Asia|East Asia|Ulaanbaatar|47.89|106.91|1564116|3500|Mongolian
Myanmar|MM|Asia|Southeast Asia|Naypyidaw|19.76|96.07|676578|54500|Burmese
Nepal|NP|Asia|South Asia|Kathmandu|27.72|85.32|147181|29700|Nepali
North Korea|KP|Asia|East Asia|Pyongyang|39.04|125.76|120538|26500|Korean
Oman|OM|Asia|Middle East|Muscat|23.59|58.41|309500|5300|Arabic
Pakistan|PK|Asia|South Asia|Islamabad|33.68|73.05|881913|251300|Urdu/English
Philippines|PH|Asia|Southeast Asia|Manila|14.6|120.98|300000|115800|Filipino/English
Qatar|QA|Asia|Middle East|Doha|25.29|51.53|11586|3000|Arabic
Saudi Arabia|SA|Asia|Middle East|Riyadh|24.71|46.68|2149690|34000|Arabic
Singapore|SG|Asia|Southeast Asia|Singapore|1.35|103.82|734|5800|English/Malay/Chinese/Tamil
South Korea|KR|Asia|East Asia|Seoul|37.57|126.98|100210|51700|Korean
Sri Lanka|LK|Asia|South Asia|Sri Jayawardenepura Kotte|6.9|79.92|65610|23100|Sinhala/Tamil
Syria|SY|Asia|Middle East|Damascus|33.51|36.29|185180|24700|Arabic
Taiwan|TW|Asia|East Asia|Taipei|25.03|121.57|36197|23100|Chinese
Tajikistan|TJ|Asia|Central Asia|Dushanbe|38.56|68.79|143100|10600|Tajik/Russian
Thailand|TH|Asia|Southeast Asia|Bangkok|13.76|100.5|513120|71700|Thai
Timor-Leste|TL|Asia|Southeast Asia|Dili|-8.56|125.57|14874|1400|Tetum/Portuguese
Turkey|TR|Asia|Middle East|Ankara|39.93|32.86|783562|87500|Turkish
Turkmenistan|TM|Asia|Central Asia|Ashgabat|37.96|58.33|488100|7500|Turkmen/Russian
United Arab Emirates|AE|Asia|Middle East|Abu Dhabi|24.45|54.38|83600|11000|Arabic
Uzbekistan|UZ|Asia|Central Asia|Tashkent|41.3|69.24|448978|36400|Uzbek/Russian
Vietnam|VN|Asia|Southeast Asia|Hanoi|21.03|105.85|331212|101000|Vietnamese
Yemen|YE|Asia|Middle East|Sanaa|15.37|44.19|527968|40600|Arabic
Albania|AL|Europe|Southern Europe|Tirana|41.33|19.82|28748|2800|Albanian
Andorra|AD|Europe|Southern Europe|Andorra la Vella|42.51|1.52|468|81|Catalan
Austria|AT|Europe|Central Europe|Vienna|48.21|16.37|83871|9100|German
Belarus|BY|Europe|Eastern Europe|Minsk|53.9|27.57|207600|9100|Belarusian/Russian
Belgium|BE|Europe|Western Europe|Brussels|50.85|4.35|30528|11800|Dutch/French/German
Bosnia and Herzegovina|BA|Europe|Southern Europe|Sarajevo|43.86|18.41|51197|3200|Bosnian/Serbian/Croatian
Bulgaria|BG|Europe|Eastern Europe|Sofia|42.7|23.32|110879|6800|Bulgarian
Croatia|HR|Europe|Southern Europe|Zagreb|45.81|15.98|56594|3900|Croatian
Cyprus|CY|Europe|Southern Europe|Nicosia|35.17|33.36|9251|1400|Greek/Turkish
Czech Republic|CZ|Europe|Central Europe|Prague|50.08|14.44|78871|10700|Czech
Denmark|DK|Europe|Northern Europe|Copenhagen|55.68|12.57|42933|6000|Danish
Estonia|EE|Europe|Northern Europe|Tallinn|59.44|24.75|45228|1400|Estonian
Finland|FI|Europe|Northern Europe|Helsinki|60.17|24.94|338424|5600|Finnish/Swedish
France|FR|Europe|Western Europe|Paris|48.86|2.35|551695|66500|French
Germany|DE|Europe|Central Europe|Berlin|52.52|13.4|357022|84600|German
Greece|GR|Europe|Southern Europe|Athens|37.98|23.73|131957|10000|Greek
Hungary|HU|Europe|Central Europe|Budapest|47.5|19.04|93028|9700|Hungarian
Iceland|IS|Europe|Northern Europe|Reykjavík|64.15|-21.94|103000|390|Icelandic
Ireland|IE|Europe|Western Europe|Dublin|53.35|-6.26|70273|5300|English/Irish
Italy|IT|Europe|Southern Europe|Rome|41.9|12.5|301340|59300|Italian
Latvia|LV|Europe|Northern Europe|Riga|56.95|24.11|64589|1900|Latvian
Liechtenstein|LI|Europe|Central Europe|Vaduz|47.14|9.52|160|40|German
Lithuania|LT|Europe|Northern Europe|Vilnius|54.69|25.28|65300|2900|Lithuanian
Luxembourg|LU|Europe|Western Europe|Luxembourg|49.61|6.13|2586|670|Luxembourgish/French/German
Malta|MT|Europe|Southern Europe|Valletta|35.9|14.51|316|540|Maltese/English
Moldova|MD|Europe|Eastern Europe|Chișinău|47.01|28.86|33846|2400|Romanian
Monaco|MC|Europe|Western Europe|Monaco|43.74|7.42|2|39|French
Montenegro|ME|Europe|Southern Europe|Podgorica|42.44|19.26|13812|630|Montenegrin/Serbian
Netherlands|NL|Europe|Western Europe|Amsterdam|52.37|4.9|41850|18200|Dutch
North Macedonia|MK|Europe|Southern Europe|Skopje|42|21.43|25713|1800|Macedonian/Albanian
Norway|NO|Europe|Northern Europe|Oslo|59.91|10.75|385207|5600|Norwegian
Poland|PL|Europe|Central Europe|Warsaw|52.23|21.01|312696|38500|Polish
Portugal|PT|Europe|Southern Europe|Lisbon|38.72|-9.14|92212|10400|Portuguese
Romania|RO|Europe|Eastern Europe|Bucharest|44.43|26.1|238397|19000|Romanian
Russia|RU|Europe|Eastern Europe|Moscow|55.76|37.62|17098246|144800|Russian
San Marino|SM|Europe|Southern Europe|San Marino|43.94|12.45|61|34|Italian
Serbia|RS|Europe|Southern Europe|Belgrade|44.79|20.45|77474|6700|Serbian
Slovakia|SK|Europe|Central Europe|Bratislava|48.15|17.11|49035|5500|Slovak
Slovenia|SI|Europe|Central Europe|Ljubljana|46.06|14.51|20273|2100|Slovene
Spain|ES|Europe|Southern Europe|Madrid|40.42|-3.7|505990|47900|Spanish
Sweden|SE|Europe|Northern Europe|Stockholm|59.33|18.07|450295|10600|Swedish
Switzerland|CH|Europe|Central Europe|Bern|46.95|7.45|41285|8900|German/French/Italian
Ukraine|UA|Europe|Eastern Europe|Kyiv|50.45|30.52|603550|37900|Ukrainian
United Kingdom|GB|Europe|Western Europe|London|51.51|-0.13|243610|69100|English
Vatican City|VA|Europe|Southern Europe|Vatican City|41.9|12.45|0.49|0.5|Italian/Latin
Antigua and Barbuda|AG|North America|Caribbean|St. John's|17.12|-61.85|442|94|English
Bahamas|BS|North America|Caribbean|Nassau|25.05|-77.35|13943|400|English
Barbados|BB|North America|Caribbean|Bridgetown|13.1|-59.62|430|280|English
Belize|BZ|North America|Central America|Belmopan|17.25|-88.77|22966|420|English/Spanish
Canada|CA|North America|Northern America|Ottawa|45.42|-75.7|9984670|39700|English/French
Costa Rica|CR|North America|Central America|San José|9.93|-84.08|51100|5100|Spanish
Cuba|CU|North America|Caribbean|Havana|23.11|-82.37|109884|11000|Spanish
Dominica|DM|North America|Caribbean|Roseau|15.3|-61.39|751|66|English
Dominican Republic|DO|North America|Caribbean|Santo Domingo|18.49|-69.93|48671|11400|Spanish
El Salvador|SV|North America|Central America|San Salvador|13.69|-89.22|21041|6300|Spanish
Grenada|GD|North America|Caribbean|St. George's|12.06|-61.75|344|120|English
Guatemala|GT|North America|Central America|Guatemala City|14.63|-90.51|108889|18400|Spanish
Haiti|HT|North America|Caribbean|Port-au-Prince|18.54|-72.34|27750|11800|French/Haitian Creole
Honduras|HN|North America|Central America|Tegucigalpa|14.07|-87.19|112492|10800|Spanish
Jamaica|JM|North America|Caribbean|Kingston|18.02|-76.8|10991|2800|English
Mexico|MX|North America|Northern America|Mexico City|19.43|-99.13|1964375|130900|Spanish
Nicaragua|NI|North America|Central America|Managua|12.11|-86.24|130373|7000|Spanish
Panama|PA|North America|Central America|Panama City|8.98|-79.52|75417|4500|Spanish
Saint Kitts and Nevis|KN|North America|Caribbean|Basseterre|17.3|-62.72|261|47|English
Saint Lucia|LC|North America|Caribbean|Castries|14.01|-60.99|616|180|English
Saint Vincent and the Grenadines|VC|North America|Caribbean|Kingstown|13.16|-61.22|389|100|English
Trinidad and Tobago|TT|North America|Caribbean|Port of Spain|10.65|-61.51|5128|1500|English
United States|US|North America|Northern America|Washington, D.C.|38.9|-77.04|9833520|345400|English
Argentina|AR|South America|South America|Buenos Aires|-34.6|-58.38|2780400|45700|Spanish
Bolivia|BO|South America|South America|Sucre|-19.04|-65.26|1098581|12400|Spanish/Quechua
Brazil|BR|South America|South America|Brasília|-15.79|-47.88|8515767|211900|Portuguese
Chile|CL|South America|South America|Santiago|-33.45|-70.67|756102|19800|Spanish
Colombia|CO|South America|South America|Bogotá|4.71|-74.07|1141748|52900|Spanish
Ecuador|EC|South America|South America|Quito|-0.18|-78.47|283561|18100|Spanish
Guyana|GY|South America|South America|Georgetown|6.8|-58.16|214969|830|English
Paraguay|PY|South America|South America|Asunción|-25.26|-57.58|406752|6900|Spanish/Guarani
Peru|PE|South America|South America|Lima|-12.05|-77.04|1285216|34200|Spanish/Quechua
Suriname|SR|South America|South America|Paramaribo|5.85|-55.2|163820|630|Dutch
Uruguay|UY|South America|South America|Montevideo|-34.9|-56.16|176215|3400|Spanish
Venezuela|VE|South America|South America|Caracas|10.49|-66.88|916445|28400|Spanish
Australia|AU|Oceania|Australia and New Zealand|Canberra|-35.28|149.13|7692024|26700|English
Fiji|FJ|Oceania|Melanesia|Suva|-18.14|178.44|18274|930|English/Fijian/Hindi
Kiribati|KI|Oceania|Micronesia|South Tarawa|1.45|173.03|811|130|English/Gilbertese
Marshall Islands|MH|Oceania|Micronesia|Majuro|7.09|171.38|181|38|Marshallese/English
Micronesia|FM|Oceania|Micronesia|Palikir|6.92|158.16|702|110|English
Nauru|NR|Oceania|Micronesia|Yaren|-0.55|166.92|21|12|Nauruan/English
New Zealand|NZ|Oceania|Australia and New Zealand|Wellington|-41.29|174.78|268021|5200|English/Māori
Palau|PW|Oceania|Micronesia|Ngerulmud|7.5|134.62|459|18|Palauan/English
Papua New Guinea|PG|Oceania|Melanesia|Port Moresby|-9.44|147.18|462840|10600|English/Tok Pisin
Samoa|WS|Oceania|Polynesia|Apia|-13.83|-171.77|2842|220|Samoan/English
Solomon Islands|SB|Oceania|Melanesia|Honiara|-9.43|159.95|28896|820|English
Tonga|TO|Oceania|Polynesia|Nukuʻalofa|-21.14|-175.2|747|100|Tongan/English
Tuvalu|TV|Oceania|Polynesia|Funafuti|-8.52|179.2|26|9.6|Tuvaluan/English
Vanuatu|VU|Oceania|Melanesia|Port Vila|-17.73|168.32|12189|330|Bislama/English/French`;

export const C = RAW.trim().split("\n").map(l=>{ const [name,iso,cont,sub,cap,lat,lng,area,pop,lang]=l.split("|");
  return {name,iso,cont,sub,cap,lat:+lat,lng:+lng,area:+area,pop:+pop,langs:lang.split("/")}; });

export const ALIASES={"United States":["usa","us","america","united states of america"],"United Kingdom":["uk","britain","great britain","england"],"DR Congo":["drc","democratic republic of the congo","congo kinshasa"],"Republic of the Congo":["congo","congo brazzaville"],"Ivory Coast":["cote divoire"],"Czech Republic":["czechia"],"Myanmar":["burma"],"Eswatini":["swaziland"],"Cape Verde":["cabo verde"],"Timor-Leste":["east timor"],"Vatican City":["vatican","holy see"],"United Arab Emirates":["uae"],"Turkey":["turkiye"],"South Korea":["korea"],"North Korea":["dprk"],"Bosnia and Herzegovina":["bosnia"],"North Macedonia":["macedonia"],"Gambia":["the gambia"],"Netherlands":["holland"],"São Tomé and Príncipe":["sao tome"]};

export const POOL="Laos,Ecuador,Kenya,Ghana,Chile,Portugal,Morocco,Mongolia,Nepal,Cambodia,Bolivia,Croatia,Finland,Senegal,Peru,Madagascar,Jordan,Kazakhstan,Sri Lanka,Cuba,Hungary,Tanzania,Uruguay,Oman,Malaysia,Namibia,Greece,Guatemala,Uzbekistan,Ireland,Ethiopia,Paraguay,Vietnam,Iceland,Zambia,Georgia,Tunisia,Costa Rica,Bangladesh,Poland,Angola,New Zealand,Jamaica,Myanmar,Romania,Colombia,Botswana,Iraq,Switzerland,Philippines,Cameroon,Panama,Norway,Armenia,Mozambique,Venezuela,Thailand,Belgium,Uganda,Austria,Papua New Guinea,Honduras,Algeria,Azerbaijan,Denmark,Fiji,Argentina,Ukraine,Pakistan,Egypt".split(",");
