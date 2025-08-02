create table public.guest - stock (
  created_at timestamp with time zone not null default now(),
  "guestId" bigint not null,
  "stockId" bigint not null,
  constraint guest - stock_pkey primary key ("guestId", "stockId"),
  constraint guest - stock_guestId_fkey foreign KEY ("guestId") references guest (id),
  constraint guest - stock_stockId_fkey foreign KEY ("stockId") references stock (id)
) TABLESPACE pg_default;

INSERT INTO "public"."guest-stock" ("created_at", "guestId", "stockId") VALUES ('2025-08-01 23:16:12.838745+00', '3', '1'), ('2025-08-01 23:12:31.937358+00', '3', '3'), ('2025-08-01 23:16:10.548506+00', '3', '4');