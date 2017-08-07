const readability=require("../utils/readability");
const mailer=require("../utils/mailer");
const scrape=require("../utils/scraper");
const controller={
  send:(req,res)=>{
    res.json({url:req.params.url})
    scrape.download(req.params.url).then(_result=>{
      console.log("==>", _result)
      readability.process(_result).then(result=>{
        console.log("HERE", result)

      })
    })
    // readability.process(req.params.url).then(result=>{
    //   console.log("HERE", result)
    //   mailer.sendEmail({
    //     subject:result.article.title,
    //     html:result.article.content,
    //     attachments:[
    //       {
    //         path:result.path
    //       }
    //     ]
    //   })
    // })
  }
}


module.exports=controller;
