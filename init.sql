create database nexplore_test;

create table duty_list (
    id UUID DEFAULT gen_random_uuid(),
    name text,
    create_date timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
)
