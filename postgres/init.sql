DROP TABLE IF EXISTS data;
DROP TABLE IF EXISTS city;

CREATE TABLE city
(
    id BIGSERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO city(name) VALUES ('Москва'), ('Омск'), ('Саратов');

CREATE TABLE data
(
    id BIGSERIAL PRIMARY KEY,
    city_id BIGINT REFERENCES city(id),
    profiling_date DATE,
    c_1  INT2,
    c_2  INT,
    c_3  INT2,
    c_4  INT2,
    c_5  INT,
    c_6  INT2,
    c_7  INT,
    c_8  INT2,
    c_9  INT2,
    c_10 INT2,
    c_11 INT,
    c_12 DOUBLE PRECISION,
    c_13 INT2,
    c_14 INT,
    c_15 INT,
    c_16 INT2,
    c_17 DOUBLE PRECISION,
    c_18 INT2,
    c_19 INT,
    c_20 INT2,
    c_21 INT,
    c_22 INT2,
    c_23 DOUBLE PRECISION,
    c_24 DOUBLE PRECISION,
    c_25 INT2,
    c_26 INT,
    c_27 INT2,
    c_28 INT2,
    c_29 INT2,
    c_30 INT,
    c_31 INT2,
    c_32 INT,
    c_33 INT2,
    c_34 INT2,
    c_35 INT2,
    c_36 INT,
    c_37 INT2,
    c_38 INT2,
    c_39 INT,
    c_40 INT2,
    c_41 INT,
    c_42 INT2,
    c_43 INT,
    c_44 INT2,
    c_45 INT,
    c_46 DOUBLE PRECISION,
    c_47 DOUBLE PRECISION
);
