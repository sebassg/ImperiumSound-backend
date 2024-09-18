import express from "express"
const app = express()


app.get("/",(req,res)=>{
res.send("hola")
})

app.use("/",()=>{

})


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})