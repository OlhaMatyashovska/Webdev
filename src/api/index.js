import {Router} from "express";

const apiRouter=new Router();

let data=[
    {
       id:1,
       company:"Google",
       workercount:100000,
       technlogies:"Web",
       countriesAllies:"Great Britain"
    },
    {
        id:2,
        company:"Facebook",
        workercount:90000,
        technlogies:"Social media services",
        countriesAllies:"China"
    },
    {
        id:3,
        company:"Tesla motors",
        workercount:10000,
        technlogies:"Car production",
        countriesAllies:"Germany"
    }
];
apiRouter.get("/",(req,res)=>{
    res.send(data);
});

apiRouter.get("/:id",(req,res)=>{
    let company=data.find(x=>x.id==req.params.id);
    if(company)
    res.send(company);
    else
    res.status(404).send("Not found");
});
apiRouter.get("/about/:workercount",(req,res)=>{
    let newData=data.filter(y=>y.workercount>req.params.workercount&&y.workercount<(req.params.workercount*100));
    res.send(newData);
});
apiRouter.post("/",(req,res)=>{
    data.push(req.body);
    res.send(data);
});
apiRouter.patch('/:id', function(req,res){
    const{company,workercount,technologies,countriesAllies}=req.body;
    const usertobeUpdated=data.find(d=>d.is=req.params.id);
    if(company){
        usertobeUpdated.company=company;
    }
    if(workercount){
        usertobeUpdated.workercount=workercount;
    }
    if(company){
        usertobeUpdated.technologies=technologies;
    }
    if(company){
        usertobeUpdated.countriesAllies=countriesAllies;
    }
      res.send(data);
  });
  apiRouter.post("/add", (req, res) =>{
    if(Array.isArray(req.body))
    {
        data.push(...req.body);
    }
    else
    {
        data.push(req.body);
    }
    res.send(data);
});
  apiRouter.put("/replace/:id", (req, res) =>{
    let name = data.find(name=>name.id==req.params.id);
    //if(req.body.name!=null)
    //{
       // name.name=req.body.name;
    //}
    if(req.body.company!=null)
    {
        name.company=req.body.company;
    }
    if(req.body.workercount!=null)
    {
        name.workercount=req.body.workercount;
    }
    if(req.body.technologies!=null)
    {
        name.technologies=req.body.technologies;
    }
    if(req.body.countriesAllies!=null)
    {
        name.countriesAllies=req.body.countriesAllies;
    }
    res.send(data);
});
apiRouter.delete('/:id', function (req, res) {
    let id = parseInt(req.params.id);
    data=data.filter(z=>z.id !== id);
     res.send(data);
   });


    

    

export default apiRouter;
