-- CreateTable
CREATE TABLE "Ro" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permitions" TEXT[],

    CONSTRAINT "Ro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ro_name_key" ON "Ro"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Ro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
