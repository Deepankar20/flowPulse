-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "language" TEXT,
ADD COLUMN     "path" TEXT,
ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "screenHeight" INTEGER,
ADD COLUMN     "screenWidth" INTEGER,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "userAgent" TEXT,
ALTER COLUMN "properties" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Event_event_projectId_timestamp_idx" ON "Event"("event", "projectId", "timestamp");

-- CreateIndex
CREATE INDEX "Event_path_projectId_timestamp_idx" ON "Event"("path", "projectId", "timestamp");

-- CreateIndex
CREATE INDEX "Event_url_projectId_timestamp_idx" ON "Event"("url", "projectId", "timestamp");
