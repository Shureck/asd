DROP TABLE IF EXISTS data;
DROP TABLE IF EXISTS city;

CREATE TABLE city
(
    id   BIGSERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO city(name)
VALUES ('Москва'),
       ('Омск'),
       ('Саратов');

CREATE TABLE data
(
    id             BIGSERIAL PRIMARY KEY,
    city_id        BIGINT REFERENCES city (id),
    profiling_date DATE,
    c_1            INT2,
    c_2            INT2,
    c_3            INT2,
    c_4            INT2,
    c_5            INT2,
    c_6            INT2,
    c_7            INT2,
    c_8            INT2,
    c_9            INT2,
    c_10           INT2,
    c_11           INT2,
    c_12           INT2,
    c_13           INT2,
    c_14           DOUBLE PRECISION,
    c_15           DOUBLE PRECISION,
    c_16           INT2,
    c_17           INT2,
    c_18           INT2,
    c_19           INT2,
    c_20           INT2,
    c_21           INT2,
    c_22           INT2,
    c_23           INT2,
    c_24           INT2,
    c_25           INT2,
    c_26           INT2,
    c_27           DOUBLE PRECISION,
    c_28           DOUBLE PRECISION,
    c_29           INT2,
    c_30           DOUBLE PRECISION,
    c_31           DOUBLE PRECISION,
    c_32           INT2,
    c_33           INT2,
    c_34           INT2,
    c_35           INT2,
    c_36           DOUBLE PRECISION,
    c_37           DOUBLE PRECISION,
    c_38           DOUBLE PRECISION,
    c_39           DOUBLE PRECISION,
    c_40           INT2,
    c_41           DOUBLE PRECISION,
    c_42           DOUBLE PRECISION,
    c_43           INT2,
    c_44           INT2,
    c_45           INT2,
    c_46           INT2,
    c_47           INT2,
    c_48           INT2,
    c_49           INT2,
    c_50           INT2,
    c_51           INT2,
    c_52           INT2,
    c_53           DOUBLE PRECISION,
    c_54           DOUBLE PRECISION,
    c_55           INT2,
    c_56           INT2,
    c_57           INT2,
    c_58           INT2,
    c_59           INT2,
    c_60           DOUBLE PRECISION,
    c_61           DOUBLE PRECISION,
    c_62           INT2,
    c_63           INT2,
    c_64           INT2,
    c_65           DOUBLE PRECISION,
    c_66           INT2,
    c_67           INT2,
    c_68           INT2,
    c_69           INT2,
    c_70           INT2,
    c_71           INT2,
    c_72           DOUBLE PRECISION,
    c_73           DOUBLE PRECISION,
    c_74           INT2,
    c_75           INT2,
    c_76           INT2,
    c_77           INT2,
    c_78           INT2,
    c_79           INT2,
    c_80           INT2,
    c_81           INT2,
    c_82           INT2,
    c_83           INT2,
    c_84           INT2,
    c_85           INT2,
    c_86           INT2,
    c_87           INT2,
    c_88           INT2,
    c_89           DOUBLE PRECISION,
    c_90           DOUBLE PRECISION,
    c_91           INT2,
    c_92           INT2,
    c_93           INT2,
    c_94           INT2,
    c_95           DOUBLE PRECISION,
    c_96           DOUBLE PRECISION,
    c_97           INT2,
    c_98           INT2,
    c_99           INT2,
    c_100          INT2,
    c_101          INT2,
    c_102          INT2,
    c_103          INT2,
    c_104          INT2,
    c_105          INT2,
    c_106          INT2,
    c_107          INT2,
    c_108          INT2,
    c_109          DOUBLE PRECISION,
    c_110          DOUBLE PRECISION,
    c_111          INT2,
    c_112          INT2,
    c_113          INT2,
    c_114          INT2,
    c_115          INT2,
    c_116          INT2,
    c_117          DOUBLE PRECISION,
    c_118          DOUBLE PRECISION,
    c_119          INT2,
    c_120          INT2,
    c_121          INT2,
    c_122          INT2,
    c_123          INT2,
    c_124          INT2,
    c_125          DOUBLE PRECISION,
    c_126          DOUBLE PRECISION,
    c_127          INT2,
    c_128          INT2,
    c_129          DOUBLE PRECISION,
    c_130          DOUBLE PRECISION,
    c_131          INT2,
    c_132          INT2,
    c_133          DOUBLE PRECISION,
    c_134          DOUBLE PRECISION,
    c_135          DOUBLE PRECISION,
    c_136          DOUBLE PRECISION,
    c_137          DOUBLE PRECISION,
    c_138          DOUBLE PRECISION
);

