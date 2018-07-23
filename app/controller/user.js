const BaseController=require('./base');
class UserController extends BaseController{
    async signup(){
        let {ctx}=this;
        let user =ctx.request.body;
        try {
            user=await ctx.service.user.create(user);
            this.success({user});
        } catch (error) {
            this.error(error);
        }
    }
    async signin(){
        let {ctx}=this;
        let user=ctx.request.body;
        try {
            let doc=await ctx.model.User.findOne(user);
            if(doc){
                ctx.session.user=doc;
                this.success({user:doc});
            }else{
                this.error('用户名或密码错误！')
            }
        } catch (error) {
            this.error(error);
        }   
    }

    async signout(){
        let {ctx}=this;
        ctx.session.user=null;
        this.success('已退出！');
    }
}
module.exports=UserController;