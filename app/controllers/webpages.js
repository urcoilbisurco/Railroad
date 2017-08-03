const readability=require("../utils/readability");
const mailer=require("../utils/mailer");

const controller={
  send:(req,res)=>{
    res.json({url:req.params.url})
    readability.read(req.params.url).then(article=>{
      mailer.sendEmail({
        subject:article.title,
        html:article.content,
        attachments:[
          {
            filename:article.title+".html",
            content:article.content
          }
        ]
      })
    })
  },
}


module.exports=controller;
