-- Demo example — a small bookings database schema in SQL.
-- Illustrative example only, not product code.

create table if not exists tours (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('tour', 'transfer', 'activity')),
  price_aed integer not null,
  seats_left integer not null default 0,
  rating numeric(2, 1) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references tours (id),
  customer_name text not null,
  guests integer not null check (guests > 0),
  booking_date date not null,
  total_aed integer not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Example rows
insert into tours (title, type, price_aed, seats_left, rating) values
  ('Desert Safari Evening', 'tour', 150, 8, 4.8),
  ('Dubai Airport Transfer', 'transfer', 80, 20, 4.9),
  ('Dhow Cruise Dinner', 'activity', 120, 5, 4.7);

-- Confirmed bookings per tour
select
  t.title,
  count(b.id) as confirmed_bookings,
  sum(b.total_aed) as revenue_aed
from tours t
left join bookings b
  on b.tour_id = t.id
  and b.status = 'confirmed'
group by t.title
order by revenue_aed desc;
