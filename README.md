# falco-geo

## Description

Appenin spatial data repository
test = http://localhost:3000/getAll/75107_8909_00020&75107&@48.85049165036697,2.308362857670213
https://dev.geo.appenin.fr/codeInsee:75107/idBan:75107_8909_00020/coords:@48.85049165036697,2.308362857670213/?query=flood-risk,buildings-50m,buildings-500m,living-standard,year-of-construction,robbery-index,distance-to-monument
## Usage

```
➜ curl https://geo.appenin.fr/coordonnees/@43.5665322,4.1913854?query=insee-iris,flood-risk,drought-risk,buildings-50m,buildings-100m,buildings-200m,buildings-500m,niveau-de-vie,densite-des-menages,qpv,zsp,part-des-appartements-construits-avant-1945
{
  "code_insee": "30003",
  "code_iris": "300030101",
  "nom_com": "Aigues-Mortes",
  "nom_iris": "Centre Ville",
  "flood_risk": 2,
  "drought_risk": 0,
  "buildings_50m": 73,
  "buildings_100m": 224,
  "buildings_200m": 700,
  "buildings_500m": 1741,
  "living_standard": 20941.23,
  "household_density": 4272,
  "locate_in_qpv": 0,
  "locate_in_zsp": 0,
  "part_of_flat_built_before_1945": 0.21
}

# You can omit any dataset of the query
# If no query provided, the request will only return insee-iris

➜ curl https://geo.appenin.fr/insee-iris/@43.5188,4.1827303

{"code_insee":"30003",
 "code_iris":"300030101",
 "nom_com":"Aigues-Mortes",
 "nom_iris":"Centre Ville"}

➜ curl https://geo.appenin.fr/flood-risk/@43.5188,4.1827303

{"flood_risk":3}

➜ curl https://geo.appenin.fr/drought-risk/@44.623865,-0.4427293

{"drought_risk":3}

➜ curl https://geo.appenin.fr/buildings-50m/@43.5665322,4.1913854

{ "count":"73"}

➜ curl https://geo.appenin.fr/buildings-100m/@43.5665322,4.1913854

{"count":"224"}

➜ curl https://geo.appenin.fr/buildings-200m/@43.5665322,4.1913854

{"count":"478"}

➜ curl https://geo.appenin.fr/buildings-500m/@43.5665322,4.1913854

{"count":"1254"}
```

```
➜ curl https://geo.appenin.fr/@code_insee:75056?query=firehouse-count,fire-forest,robbery-index,urban-typology,urban-unit
{
  "firehouses": 1,
  "exposed_to_forest_fire": false,
  "crime_index_per_thousand_inhabitant": 0,
  "code_urban_typology": 1,
  "lib_urban_typology": "Dense urban",
  "code_urban_unit": 1,
  "lib_urban_unit": "City centre"
}
```


```
➜ curl https://geo.appenin.fr/@id_ban:75107_8909_00021?query=height,electrical-consumption,distance-monument,heating-system,year-of-construction,presence-of-balcony
{
  "height_m": 22,
  "residential_electrical_consumption": 3925.547,
  "distance_to_nearest_historical_monument": 213,
  "heating_system_type": "individuel",
  "year_of_construction": 1910,
  "presence_of_balcony": null
}
```


## Data sources

### insee-iris

source: IGN / INSEE IRIS... GE 2021

download: [https://geoservices.ign.fr/irisge](https://geoservices.ign.fr/irisge)

### drought-risk

source: [https://infoterre.brgm.fr/page/alea-retrait-gonflement](https://infoterre.brgm.fr/page/alea-retrait-gonflement)

download: [https://www.georisques.gouv.fr/donnees/bases-de-donnees/retrait-gonflement-des-argiles](https://www.georisques.gouv.fr/donnees/bases-de-donnees/retrait-gonflement-des-argiles)

### buildings-100m, buildings-200m & buildings-500m

source: IGN BDTOPO 2020-12-15 ("batiment" table)

download: [https://geoservices.ign.fr/bdtopo#telechargementsqlfra](https://geoservices.ign.fr/bdtopo#telechargementsqlfra)
