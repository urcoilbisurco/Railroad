
//const read = require('node-readability');
const read = require('read-art');
const fs = require('fs');
const fsPath = require('fs-path');
const kindlegen = require('./kindlegen');
const template= body=>{
  return "<html><head><meta charset='UTF-8'><meta name='cover' content='https://www.w3schools.com/css/trolltunga.jpg'></head><body>"+body+"</body></html>"
}
const folder=appRoot+"/tmp/articles/"
const createName= (title, format="html") =>{
  return title.split(" ").join("_")+"."+format
}
var m={
  saveArticle:function(article){
    return new Promise((resolve, reject)=>{
      let path=folder+createName(article.title)
      fsPath.writeFile(path, template(article.content), (err) => {
        if(err) { return console.log(err);}
        resolve(path)
      })
    })
  },
  process:function(url){
    return new Promise((resolve, reject)=>{
      m.read(url).then(article=>{
        //save html file to path, then call kindlegen
        m.saveArticle(article).then(path=>{
          console.log("path:", path)
          console.log("..:>", fs.readFileSync(path))
          kindlegen(fs.readFileSync(path), (error, mobi) => {
            let path=folder+createName(article.title, "mobi")
            fsPath.writeFile(path, mobi, (err)=>{
              resolve({ path, article})
            })
          });
        })
      })
    })
  },
  read:function(url){
    return new Promise((resolve, reject)=>{

      read({
        uri:url,
        imgFallback: true
      }, (err, art, options, resp)=>{
        if(err){
          return reject({error:err})
        }
        var title = art.title,      // title of article
            content = art.content,  // content of article
            html = art.html;        // whole original innerHTML
        let out={
          title:art.title,
          content:art.content
        }
        return resolve(out);
//        console.log('[STATUS CODE]', resp && resp.statusCode);
      });
    })

  }
}

module.exports=m;
