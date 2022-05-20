-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingPreference" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ShoppingPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnShoppingPreference" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shoppingPreferenceId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnShoppingPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnShoppingPreference" ADD CONSTRAINT "UsersOnShoppingPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnShoppingPreference" ADD CONSTRAINT "UsersOnShoppingPreference_shoppingPreferenceId_fkey" FOREIGN KEY ("shoppingPreferenceId") REFERENCES "ShoppingPreference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
