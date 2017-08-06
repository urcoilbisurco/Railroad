const readability=require("../utils/readability");
const mailer=require("../utils/mailer");

const controller={
  send:(req,res)=>{
    res.json({url:req.params.url})
    readability.process(req.params.url).then(result=>{
      console.log("HERE", result)
      mailer.sendEmail({
        subject:result.article.title,
        html:result.article.content,
        attachments:[
          {
            path:result.path
          }
        ]
      })
    })
  }
}


module.exports=controller;
