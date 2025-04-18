-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idPaymentMethod" TEXT,
    "idNf" TEXT,
    "dueDate" DATETIME NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "receivedDate" DATETIME,
    "value" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Payment_idPaymentMethod_fkey" FOREIGN KEY ("idPaymentMethod") REFERENCES "PaymentMethod" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Payment_idNf_fkey" FOREIGN KEY ("idNf") REFERENCES "Nfe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
