-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "messageChannelId" TEXT;

-- CreateIndex
CREATE INDEX "Notification_messageChannelId_createdAt_idx" ON "Notification"("messageChannelId", "createdAt");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_messageChannelId_fkey" FOREIGN KEY ("messageChannelId") REFERENCES "MessageChannel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
