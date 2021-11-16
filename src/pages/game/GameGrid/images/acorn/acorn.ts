import acorn from './acorn.png';

// todo [sitnik] Image is not a constructor
//  можно попробовать поменять создание через document
//  и замокать сам документ как в примере практикума
const acornImg = new Image();
acornImg.src = acorn;

export default acornImg;
