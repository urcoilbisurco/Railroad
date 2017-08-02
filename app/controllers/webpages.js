const readability=require("../utils/readability");


const controller={
  send:(req,res)=>{
    res.json({url:req.params.url})
    readability.read(req.params.url).then(article=>{
      console.log("DONE", article)

      //TODO: add here send email to kindle
    })
  },
}


module.exports=controller;
