-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quantityAlert" INTEGER NOT NULL DEFAULT 5,
    "visible" BOOLEAN NOT NULL,
    "SKU" TEXT[],
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Produits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Produits_name_key" ON "Produits"("name");

-- AddForeignKey
ALTER TABLE "Produits" ADD CONSTRAINT "Produits_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
