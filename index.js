const { request } = require("express")
const express= require("express")
const app=express()


app.use(express.json())

students=[
    {id:1 , name:'selva'},
    {id:2 , name:"mari"},
    {id:3 , name:"siva"},
]

app.get("/",(req,res)=>{
    res.send("welcome to student db")
})

app.get("/students",(req,res)=>{
    res.send(students)
})

app.get("/students/:id",(req,res)=>{
    const student=students.find(s=>s.id==parseInt(req.params.id));
    if(!student) res.status(404).send("The student with the given id not found")
    res.send(student)
})
app.put("/students/:id",(req,res)=>{
    const student=students.find(s=>s.id==parseInt(req.params.id));
    if(!student) res.status(404).send("The student with the given id not found")
    if(!req.body.name || req.body.length <3){
        res.status(400).send("Name is required and min 3 char")
        return
    }
    student.name=req.body.name
    res.send(student)
})

app.post("/students",(req,res)=>{
    if(!req.body.name || req.body.length <3){
        res.status(400).send("Name is required and min 3 char")
        return
    }
    const student={
        id:students.length + 1,
        name:req.body.name
    }
    students.push(student)
    res.send(student)
})
app.delete("/students/:id",(req,res)=>{
    const student=students.find(s=>s.id==parseInt(req.params.id));
    if(!student) res.status(404).send("The student with the given id not found")

    const index=students.indexOf(student)
    students.splice(index,1)

    res.send(student)
})
app.listen(3000)