const {Controller}=require('egg');
module.exports=class BaseController extends Controller{
    get user(){
        return this.ctx.session.user;
    }
    success(data){
        this.ctx.body={
            code:0,
            data
        }
    }
    error(error){
        
        this.ctx.body={
            code:1,
            error:error.toString()
        }
    }
}