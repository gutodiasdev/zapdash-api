-- CreateTable
CREATE TABLE "RefeshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RefeshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefeshToken_userId_key" ON "RefeshToken"("userId");

-- AddForeignKey
ALTER TABLE "RefeshToken" ADD CONSTRAINT "RefeshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
