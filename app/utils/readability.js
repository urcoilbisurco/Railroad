
var read = require('node-readability');


module.exports={
  read:function(url){
    return new Promise((resolve, reject)=>{
      read(url, function(err, article, meta) {
        if(err){
          return reject({error:err})
        }
        let out={
          title:article.title,
          content:article.content
        }
        console.log("closing...")
        // Close article to clean up jsdom and prevent leaks
        article.close();
        return resolve(out)
      });
    })

  }
}
