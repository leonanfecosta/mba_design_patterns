-- Enable UUID generation (uuid-ossp provides uuid_generate_v4)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP SCHEMA IF EXISTS design_patterns CASCADE;
CREATE SCHEMA IF NOT EXISTS design_patterns;

CREATE TABLE design_patterns.contract (
  id_contract uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  description text,
  amount numeric,
  periods integer,
  date timestamp
);

CREATE TABLE design_patterns.payment (
  id_payment uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  id_contract uuid REFERENCES design_patterns.contract(id_contract),
  amount numeric,
  date timestamp
);

INSERT INTO design_patterns.contract (id_contract, description, amount, periods, date) VALUES
  ('77ea3849-92a5-4045-a382-23eee492d7bd', 'Prestação de serviços escolares', 6000, 12, '2022-01-01T00:00:00Z');

INSERT INTO design_patterns.payment (id_payment, id_contract, amount, date) VALUES
  ('dd3844ae-cf0a-477a-813d-c3233bc3389e', '77ea3849-92a5-4045-a382-23eee492d7bd', 6000, '2022-02-01T00:00:00Z');
