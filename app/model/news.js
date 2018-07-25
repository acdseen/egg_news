module.exports=app=>{
    let mongoose=app.mongoose;
    let Schema=mongoose.Schema;
    let NewsSchema=new Schema({
        articleTitle:{type:String},
        editorContent:{type:String},
        newsAutor:{type:String},
        newsType:{type:Number},
        newsLabel:{type:String},
        publishTime:{type:String}
    });

    const News=mongoose.model('News',NewsSchema);
    return News;
}