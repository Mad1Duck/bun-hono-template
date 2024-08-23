import sharp from 'sharp';

export const toWebp = async ({ file }: { file: ArrayBuffer; }) => {
  const buffer = Buffer.from(file);

  return await sharp(buffer)
    .webp()
    .toBuffer();
};