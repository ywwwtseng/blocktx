-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "trading_pair" VARCHAR(10) NOT NULL,
    "fng" INTEGER NOT NULL,
    "details" JSON,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
