const BaseController = require('./base');
const pump = require('mz-modules/pump');
const fs = require('fs');
const path = require('path');

class UploadController extends BaseController {
    async uploadimg() {
        const stream = await this.ctx.getFileStream();
        try {
            const filename = encodeURIComponent(stream.fieldname) + path.extname(stream.filename).toLowerCase();
            const target = path.join(this.config.baseDir, 'app/public/image', filename);
            const writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);
            //sthis.ctx.redirect('/public/' + filename);
            this.success({url:'http://127.0.0.1:7001/public/image/'+filename});
        } catch (error) {
            this.error(error);
        }
    }
};
module.exports = UploadController;