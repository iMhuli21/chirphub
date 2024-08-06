import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: { maxFileSize: '2MB', maxFileCount: 4 },
  }).onUploadComplete(async () => {
    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { success: true };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
