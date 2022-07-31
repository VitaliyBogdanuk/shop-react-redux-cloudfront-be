create table if not exists products (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    image text,
    price integer   
);

create table if not exists stocks (
    id uuid primary key default uuid_generate_v4(),
    product_id uuid,
    count integer,
    foreign key ("product_id") references "products" ("id")
);

create extension if not exists "uuid-ossp";