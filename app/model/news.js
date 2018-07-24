module.exports=app=>{
    let mongoose=app.mongoose;
    let Schema=mongoose.Schema;
    let NewsSchema=new Schema({
        articleTitle:String,
        editorContent:String,
        newsAutor:String,
        newsType:String,
        publishTime:String
    });

    const News=mongoose.model('News',NewsSchema);
    return News;
}