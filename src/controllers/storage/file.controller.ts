import { catchAsync } from "@/utils/catchAsync";
import *  as httpStatus from "http-status";
import { join } from "path";
import { writeFile } from "fs/promises";
import { utapi } from "@/utils/uploadthing";
import { toWebp } from "@/services/image.service";
import { fileUtils } from "@/utils/fileUtils";


export const upload = catchAsync(async (c) => {
  const { file }: any = await c.req.parseBody();
  const publicPath = join(process.cwd(), 'public');

  if (file instanceof File) {
    const buffer = await file?.arrayBuffer();
    const { convertedBuffer, type } = await toWebp({ file: buffer });
    const { originalName } = fileUtils(file);

    const newFilename = `${originalName}.${type?.ext}`;
    const filepath = join(publicPath, newFilename);

    await writeFile(filepath, Buffer.from(convertedBuffer));

    return c.json({ data: filepath, file: originalName });
  }

  return c.json({ data: {}, message: httpStatus.default["415_MESSAGE"] });

});


export const uploadThing = catchAsync(async (c) => {
  const { file }: any = await c.req.parseBody();

  if (file instanceof File) {
    const buffer = await file?.arrayBuffer();

    // convert to webp
    const { convertedBuffer, type } = await toWebp({ file: buffer });
    const { originalName } = fileUtils(file);
    const newFilename = `${originalName}.${type?.ext}`;

    const fileWithNewName = new File([convertedBuffer], newFilename, {
      type: type?.mime,
    });

    const response = await utapi.uploadFiles([fileWithNewName]);


    return c.json({ data: response });
  }
  return c.json({ data: {}, message: httpStatus.default["415_MESSAGE"] });

});

