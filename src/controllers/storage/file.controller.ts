import { isEmpty } from "lodash";
import { catchAsync } from "../../utils/catchAsync";
import { registerSchemaType } from "../../utils/validator/auth.validator";
import { join } from "path";
import { writeFile } from "fs/promises";
import { utapi } from "../../utils/uploadthing";


export const upload = catchAsync(async (c) => {
  const { file }: any = await c.req.parseBody();
  const publicPath = join(process.cwd(), 'public');

  if (file instanceof File) {
    const buffer = await file?.arrayBuffer();
    const filename = `${file.name}`;

    const filepath = join(publicPath, filename);

    await writeFile(filepath, Buffer.from(buffer));

    return c.json({ data: publicPath, file: filename });
  }

  return c.json({ data: publicPath });

});


export const uploadThing = catchAsync(async (c) => {
  const { file }: any = await c.req.parseBody();
  const response = await utapi.uploadFiles([file]);


  return c.json({ data: response });

});

