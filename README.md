# falco-geo

## Description

Appenin spatial data repository
## Usage

```

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
