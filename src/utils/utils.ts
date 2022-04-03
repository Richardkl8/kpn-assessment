// eslint-disable-next-line import/prefer-default-export
export function getImagePath(imageId: number): string {
  return imageId
    // eslint-disable-next-line
    ? require(`@/assets/product_${imageId}_main.webp`)
    // eslint-disable-next-line global-require
    : require('@/assets/no_picture_available.png');
}
