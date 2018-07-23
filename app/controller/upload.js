const BaseController=require('./base');
class UploadController extends BaseController{
    async uploadimg(){
        let {ctx}=this;
        let data=ctx.request.body;
        console.log(data);
    }
};
module.exports=UploadController;