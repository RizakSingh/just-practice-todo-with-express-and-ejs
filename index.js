import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';


const app = express();

// Fix dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // <-- Important

// Routes
app.get("/", (req, res) => {
  fs.readdir('./files',(err,files)=>{
 
    res.render('task',{files:files})
  })
});
app.post("/create",(req,res)=>{
 const {title,description}=req.body;
 fs.writeFile(`./files/${title.split(" ").join("")}.txt`,description ,(err)=>{
  if(err){
    console.log(err) }
  })
  res.redirect('/')
})
app.get("/description/:title",(req,res)=>{
  fs.readFile(`./files/${req.params.title}`,"utf-8",(err,filedata)=>{
    if(err){
      console.log(err)
    }
res.render('description',{title:req.params.title,filedata:filedata})
  })

})
// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
