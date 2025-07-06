export async function imageFileToUint8(imageFile: File): Promise<Uint8Array> {
  const buffer = await imageFile.arrayBuffer();
  return new Uint8Array(buffer);
}
