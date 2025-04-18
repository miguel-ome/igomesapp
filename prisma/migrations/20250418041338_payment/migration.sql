/*
  Warnings:

  - Made the column `idPaymentMethod` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idPaymentMethod" TEXT NOT NULL,
    "idNf" TEXT,
    "dueDate" DATETIME NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "receivedDate" DATETIME,
    "value" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Payment_idPaymentMethod_fkey" FOREIGN KEY ("idPaymentMethod") REFERENCES "PaymentMethod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_idNf_fkey" FOREIGN KEY ("idNf") REFERENCES "Nfe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("createdAt", "dueDate", "emissionDate", "id", "idNf", "idPaymentMethod", "receivedDate", "updatedAt", "value") SELECT "createdAt", "dueDate", "emissionDate", "id", "idNf", "idPaymentMethod", "receivedDate", "updatedAt", "value" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
