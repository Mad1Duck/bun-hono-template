import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';

export const toWebp = async ({ file }: { file: ArrayBuffer; }) => {
  const buffer = Buffer.from(file);
  const type = await fileTypeFromBuffer(buffer);

  const convertedBuffer = await sharp(buffer)
    .webp()
    .toBuffer();

  return { convertedBuffer, type };
};