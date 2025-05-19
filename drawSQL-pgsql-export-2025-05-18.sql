CREATE TABLE "venue"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "site" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "schema" GEOMETRY(MULTIPOLYGON) NOT NULL,
    "regionId" SMALLINT NOT NULL,
    "districtId" SMALLINT NOT NULL
);
ALTER TABLE
    "venue" ADD PRIMARY KEY("id");
CREATE TABLE "venue_photo"(
    "id" BIGINT NOT NULL,
    "venueId" BIGINT NOT NULL,
    "url" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "venue_photo" ADD PRIMARY KEY("id");
CREATE TABLE "venue_types"(
    "id" BIGINT NOT NULL,
    "venueId" BIGINT NOT NULL,
    "typeId" BIGINT NOT NULL
);
ALTER TABLE
    "venue_types" ADD PRIMARY KEY("id");
CREATE TABLE "seat"(
    "id" BIGINT NOT NULL,
    "sector" SMALLINT NOT NULL,
    "row_number" SMALLINT NOT NULL,
    "number" SMALLINT NOT NULL,
    "venue_id" BIGINT NOT NULL,
    "seat_type_id" SMALLINT NOT NULL,
    "location_in_schema" GEOMETRY(POLYGON) NOT NULL
);
ALTER TABLE
    "seat" ADD PRIMARY KEY("id");
CREATE TABLE "ticket"(
    "id" BIGINT NOT NULL,
    "event_id" BIGINT NOT NULL,
    "seat_id" BIGINT NOT NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "service_fee" DECIMAL(8, 2) NOT NULL,
    "status_id" SMALLINT NOT NULL,
    "ticket_type" SMALLINT NOT NULL
);
ALTER TABLE
    "ticket" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "ticket"."ticket_type" IS 'Name ->Elektron chipta,
Color -> sariq';
CREATE TABLE "event"(
    "id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "start_date" DATE NOT NULL,
    "start_time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "finish_date" DATE NOT NULL,
    "finish_time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "info" TEXT NOT NULL,
    "event_type_id" BIGINT NOT NULL,
    "human_category_id" BIGINT NOT NULL,
    "venue_id" BIGINT NOT NULL,
    "lang_id" SMALLINT NOT NULL,
    "release_date" DATE NOT NULL
);
ALTER TABLE
    "event" ADD PRIMARY KEY("id");
CREATE TABLE "customer"(
    "id" BIGINT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "birth_date" DATE NOT NULL,
    "gender" SMALLINT NOT NULL,
    "lang_id" SMALLINT NOT NULL,
    "hashed_refresh_token" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "customer" ADD PRIMARY KEY("id");
CREATE TABLE "event_type"(
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parent_event_type_id" SMALLINT NOT NULL
);
ALTER TABLE
    "event_type" ADD PRIMARY KEY("id");
CREATE TABLE "human_category"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "start_age" SMALLINT NOT NULL,
    "finish_age" SMALLINT NOT NULL,
    "gender" VARCHAR(255) CHECK
        ("gender" IN('')) NOT NULL
);
ALTER TABLE
    "human_category" ADD PRIMARY KEY("id");
CREATE TABLE "seat_type"(
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "seat_type" ADD PRIMARY KEY("id");
CREATE TABLE "cart"(
    "id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "fineshedAt" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "status_id" SMALLINT NOT NULL
);
ALTER TABLE
    "cart" ADD PRIMARY KEY("id");
CREATE TABLE "customer_address"(
    "id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country_id" SMALLINT NOT NULL,
    "region_id" SMALLINT NOT NULL,
    "district_id" SMALLINT NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "house" VARCHAR(255) NOT NULL,
    "flat" SMALLINT NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "post_index" VARCHAR(255) NOT NULL,
    "info" TEXT NOT NULL
);
ALTER TABLE
    "customer_address" ADD PRIMARY KEY("id");
CREATE TABLE "customer_card"(
    "id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "number" VARCHAR(255) NOT NULL,
    "year" CHAR(255) NOT NULL,
    "month" CHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "is_main" BOOLEAN NOT NULL
);
ALTER TABLE
    "customer_card" ADD PRIMARY KEY("id");
CREATE TABLE "booking"(
    "id" BIGINT NOT NULL,
    "cart_id" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "fineshed" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        "payment_method_id" SMALLINT NOT NULL,
        "delivery_method_id" SMALLINT NOT NULL,
        "discount_coupon_id" BIGINT NOT NULL,
        "status_id" SMALLINT NOT NULL
);
ALTER TABLE
    "booking" ADD PRIMARY KEY("id");
CREATE TABLE "admin"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "is_creator" BOOLEAN NOT NULL,
    "hashed_refresh_token" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "admin" ADD PRIMARY KEY("id");
CREATE TABLE "district"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "regionId" BIGINT NOT NULL
);
ALTER TABLE
    "district" ADD PRIMARY KEY("id");
CREATE TABLE "region"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "region" ADD PRIMARY KEY("id");
CREATE TABLE "types"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "types" ADD PRIMARY KEY("id");
CREATE TABLE "lang"(
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "lang" ADD PRIMARY KEY("id");
CREATE TABLE "ticket_status"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "ticket_status" ADD PRIMARY KEY("id");
CREATE TABLE "cart_item"(
    "id" BIGINT NOT NULL,
    "ticket_id" BIGINT NOT NULL,
    "cart_id" BIGINT NOT NULL
);
ALTER TABLE
    "cart_item" ADD PRIMARY KEY("id");
CREATE TABLE "delivery_method"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "delivery_method" ADD PRIMARY KEY("id");
CREATE TABLE "payment_method"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "payment_method" ADD PRIMARY KEY("id");
ALTER TABLE
    "ticket" ADD CONSTRAINT "ticket_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "event"("id");
ALTER TABLE
    "seat" ADD CONSTRAINT "seat_venue_id_foreign" FOREIGN KEY("venue_id") REFERENCES "venue"("id");
ALTER TABLE
    "event_type" ADD CONSTRAINT "event_type_parent_event_type_id_foreign" FOREIGN KEY("parent_event_type_id") REFERENCES "event_type"("id");
ALTER TABLE
    "customer_address" ADD CONSTRAINT "customer_address_customer_id_foreign" FOREIGN KEY("customer_id") REFERENCES "customer"("id");
ALTER TABLE
    "booking" ADD CONSTRAINT "booking_cart_id_foreign" FOREIGN KEY("cart_id") REFERENCES "cart"("id");
ALTER TABLE
    "customer_address" ADD CONSTRAINT "customer_address_customer_id_foreign" FOREIGN KEY("customer_id") REFERENCES "customer"("id");
ALTER TABLE
    "event" ADD CONSTRAINT "event_lang_id_foreign" FOREIGN KEY("lang_id") REFERENCES "lang"("id");
ALTER TABLE
    "cart_item" ADD CONSTRAINT "cart_item_cart_id_foreign" FOREIGN KEY("cart_id") REFERENCES "cart"("id");
ALTER TABLE
    "booking" ADD CONSTRAINT "booking_payment_method_id_foreign" FOREIGN KEY("payment_method_id") REFERENCES "payment_method"("id");
ALTER TABLE
    "ticket" ADD CONSTRAINT "ticket_seat_id_foreign" FOREIGN KEY("seat_id") REFERENCES "seat"("id");
ALTER TABLE
    "district" ADD CONSTRAINT "district_regionid_foreign" FOREIGN KEY("regionId") REFERENCES "region"("id");
ALTER TABLE
    "venue" ADD CONSTRAINT "venue_districtid_foreign" FOREIGN KEY("districtId") REFERENCES "district"("id");
ALTER TABLE
    "ticket" ADD CONSTRAINT "ticket_status_id_foreign" FOREIGN KEY("status_id") REFERENCES "ticket_status"("id");
ALTER TABLE
    "ticket" ADD CONSTRAINT "ticket_seat_id_foreign" FOREIGN KEY("seat_id") REFERENCES "seat"("id");
ALTER TABLE
    "event" ADD CONSTRAINT "event_event_type_id_foreign" FOREIGN KEY("event_type_id") REFERENCES "event_type"("id");
ALTER TABLE
    "seat" ADD CONSTRAINT "seat_seat_type_id_foreign" FOREIGN KEY("seat_type_id") REFERENCES "seat_type"("id");
ALTER TABLE
    "cart_item" ADD CONSTRAINT "cart_item_ticket_id_foreign" FOREIGN KEY("ticket_id") REFERENCES "ticket"("id");
ALTER TABLE
    "event" ADD CONSTRAINT "event_human_category_id_foreign" FOREIGN KEY("human_category_id") REFERENCES "human_category"("id");
ALTER TABLE
    "venue_photo" ADD CONSTRAINT "venue_photo_venueid_foreign" FOREIGN KEY("venueId") REFERENCES "venue"("id");
ALTER TABLE
    "venue_types" ADD CONSTRAINT "venue_types_venueid_foreign" FOREIGN KEY("venueId") REFERENCES "venue"("id");
ALTER TABLE
    "cart" ADD CONSTRAINT "cart_customer_id_foreign" FOREIGN KEY("customer_id") REFERENCES "customer"("id");
ALTER TABLE
    "venue_types" ADD CONSTRAINT "venue_types_typeid_foreign" FOREIGN KEY("typeId") REFERENCES "types"("id");
ALTER TABLE
    "customer_card" ADD CONSTRAINT "customer_card_customer_id_foreign" FOREIGN KEY("customer_id") REFERENCES "customer"("id");
ALTER TABLE
    "event" ADD CONSTRAINT "event_venue_id_foreign" FOREIGN KEY("venue_id") REFERENCES "venue"("id");
ALTER TABLE
    "customer_card" ADD CONSTRAINT "customer_card_customer_id_foreign" FOREIGN KEY("customer_id") REFERENCES "customer"("id");
ALTER TABLE
    "booking" ADD CONSTRAINT "booking_delivery_method_id_foreign" FOREIGN KEY("delivery_method_id") REFERENCES "delivery_method"("id");
ALTER TABLE
    "venue" ADD CONSTRAINT "venue_regionid_foreign" FOREIGN KEY("regionId") REFERENCES "region"("id");