set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."plans" (
	"planId" serial NOT NULL,
	"userId" integer NOT NULL,
	"date" TEXT NOT NULL,
	"planName" TEXT NOT NULL,
  "pictureUrl" TEXT,
	CONSTRAINT "plans_pk" PRIMARY KEY ("planId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."activities" (
	"activityId" serial NOT NULL,
  "activityName" TEXT NOT NULL,
	"planId" integer NOT NULL,
	"details" TEXT NOT NULL,
	"location" TEXT,
	"amount" integer NOT NULL,
	CONSTRAINT "activities_pk" PRIMARY KEY ("activityId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "plans" ADD CONSTRAINT "plans_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");


ALTER TABLE "activities" ADD CONSTRAINT "activities_fk0" FOREIGN KEY ("planId") REFERENCES "plans"("planId");
