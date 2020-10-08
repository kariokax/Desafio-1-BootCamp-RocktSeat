const express = require('express');

const server  = express();

server.use(express.json());

const projects = [];

server.use((req,res,next)=>{
   console.count("Requisições");
   next();
});

function checkIdExists(req,res,next){
  const project = projects.find(p => p.id == req.params.id);

  if(!project)
    return res.status(400).json({error: 'Project doesn´t exists'}); 

    req.id = project.id;
    return next();
}

server.get('/projects', (req,res)=>{
  return res.json(projects);
});

server.post('/projects', (req,res)=>{
  const {id, title} = req.body;
  const project = {
      id,
      title,
      tasks:[]
  }

  projects.push(project); 

  return res.json(projects);
});

  server.put('/projects/:id', checkIdExists, (req,res)=>{
    const {id} = req.params;
    const {title} = req.body;
   
    const project = projects.find(p => p.id == id);
    project.title = title;
    return res.json(project);
  });

server.delete('/projects/:id', checkIdExists, (req,res)=>{
const index =   projects.findIndex(p => p.id == req.id);
  projects.splice( index,1);
 return res.send("Sucess");
});

server.post('/project/:id/task', checkIdExists, (req,res)=>{
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(title);
  return res.json(project);
});

server.listen(3000);