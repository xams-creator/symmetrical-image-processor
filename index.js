const Jimp = require('jimp');
const args = require('minimist')(process.argv.slice(2));
console.log(args);
// 读取原始图片
Jimp.read(args.path, (err, image) => {
    if (err) throw err;

    // 获取图片的宽度和高度
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // 创建一个新的Jimp对象，用于存储对称的图片
    const symmetricalImage = new Jimp(width * 2, height, (err, symmetricalImage) => {
        if (err) throw err;

        // 将原始图片绘制到对称图片的左侧
        symmetricalImage.blit(image, 0, 0);

        // 对原始图片进行水平翻转，然后绘制到对称图片的右侧
        image.mirror(true, false);
        symmetricalImage.blit(image, width, 0);

        // 保存对称的图片
        symmetricalImage.write('symmetrical_image.jpg', err => {
            if (err) throw err;
            console.log('Symmetrical image created');
        });
    });
});
