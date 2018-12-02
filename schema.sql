

-- Ensure the extensions are available and loaded:

-- http://postgis.net/docs/postgis_installation.html
-- from within psql prompt, after creating the database:
-- \i /Users/yourusername/path/to/pgsetupscript.sql 


-- \c dm

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
-- CREATE EXTENSION IF NOT EXISTS postgis_sfcgal;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
-- CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
-- CREATE EXTENSION IF NOT EXISTS address_standardizer_data_us;
-- CREATE EXTENSION IF NOT EXISTS address_standardizer;
-- CREATE EXTENSION IF NOT EXISTS pgrouting;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

SELECT postgis_full_version();
-- SELECT pgr_version();


-- Create the table:

DROP TABLE IF EXISTS waze2018;
CREATE TABLE waze2018
(
EVENT_ID          varchar(32)   DEFAULT NULL,
EVENT_STATE       varchar(9)    DEFAULT NULL,
EVENT_CLASS       varchar(10)   DEFAULT NULL,
EVENT_TYPE        varchar(128)  DEFAULT NULL,
FACILITY_NAME     varchar(120)   DEFAULT NULL,
DIRECTION         varchar(12)   DEFAULT NULL,
ARTICLE_CODE      text DEFAULT NULL,
FROM_LOC_POINT    text DEFAULT NULL,
TO_LOC_POINT      text DEFAULT NULL,
CREATE_TIME       TIMESTAMP,
LAST_UPDATE       TIMESTAMP,
CLOSE_TIME        TIMESTAMP,
EVENT_DESCRIPTION text          DEFAULT NULL,
CITY              varchar(64)   DEFAULT NULL,
COUNTY            varchar(32)   DEFAULT NULL,
STATE             varchar(2)    DEFAULT 'TX',
LAT               double precision,
LON               double precision,
TO_LAT            double precision,
TO_LON            double precision,
START_DATE        TIMESTAMP,
END_DATE          TIMESTAMP,
INCIDENT_IMPACT   text DEFAULT NULL,
UPDATE_NUMBER     int,
WAZE_EVENT_ID     text DEFAULT NULL
);

--\copy waze2018  FROM '/Users/dm/github/techmill/api_hackntx/data.tsv' DELIMITERS '\t' CSV HEADER;
-- \copy waze2018  FROM '/tmp/data.tsv' DELIMITERS '\t' CSV HEADER;


-- add a geometry column:
SELECT AddGeometryColumn('waze2018', 'geom', 4326, 'POINT', 2);
SET geom = ST_GeomFromText('POINT(' || LON || ' ' || LAT || ')',
4326);
