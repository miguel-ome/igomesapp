-- CreateTable
CREATE TABLE "Nfe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numberNf" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "urlDanfe" TEXT,
    "chaveNfe" TEXT NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "recipientCNPJ" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "totValue" DECIMAL NOT NULL,
    "totICMS" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
