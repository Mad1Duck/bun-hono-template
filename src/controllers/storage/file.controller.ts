import { isEmpty } from "lodash";
import { catchAsync } from "../../utils/catchAsync";
import *  as httpStatus from "http-status";
import { join } from "path";
import { writeFile } from "fs/promises";
import { utapi } from "../../utils/uploadthing";
import { toWebp } from "../../services/image.service";
import { fileTypeFromBuffer } from "file-type";


export const upload = catchAsync(async (c) => {
  const { file }: any = await c.req.parseBody();
  const publicPath = join(process.cwd(), 'public');

  if (file instanceof File) {
    const filename = `${file.name}`;
    const buffer = await file?.arrayBuffer();
    const convertedBuffer = await toWebp({ file: buffer });

    const originalName = file.name.split('.').slice(0, -1).join('.');
    const type = await fileTypeFromBuffer(convertedBuffer);
    const newFilename = `${originalName}.${type?.ext}`;

    const filepath = join(publicPath, newFilename);

    await writeFile(filepath, Buffer.from(buffer));

    return c.json({ data: publicPath, file: filename });
  }

  return c.json({ data: publicPath });

});


export const uploadThing = catchAsync(async (c) => {
  const { file }: any = await c.req.parseBody();

  if (file instanceof File) {
    const buffer = await file?.arrayBuffer();

    // convert to webp
    const convertedBuffer = await toWebp({ file: buffer });
    const type = await fileTypeFromBuffer(convertedBuffer);
    const originalName = file.name.split('.').slice(0, -1).join('.');
    const newFilename = `${originalName}.${type?.ext}`;

    const fileWithNewName = new File([convertedBuffer], newFilename, {
      type: type?.mime,
    });

    const response = await utapi.uploadFiles([fileWithNewName]);


    return c.json({ data: response });
  }
  return c.json({ data: {}, message: httpStatus["415_MESSAGE"] });

});

