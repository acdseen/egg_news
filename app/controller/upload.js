const BaseController = require('./base');
const pump = require('mz-modules/pump');
const fs = require('fs');
const path = require('path');

class UploadController extends BaseController {
    async uploadimg() {
        const stream = await this.ctx.getFileStream();
        this.success(stream);
        //console.log(stream.fields.name);
        const filename = encodeURIComponent(stream.fieldname) + path.extname(stream.fields.filename).toLowerCase();
        const target = path.join(this.config.baseDir, 'app/public', filename);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        this.ctx.redirect('/public/' + filename);
        
    }
};
module.exports = UploadController;