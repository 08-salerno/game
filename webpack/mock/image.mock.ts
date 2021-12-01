// eslint-disable-next-line import/no-mutable-exports
let ImageMock;

if (typeof Image === 'function') {
  ImageMock = Image;
} else {
  ImageMock = class Image {};
}

export default ImageMock;
