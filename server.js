const exp = require("express")
const path = require("path")

const app = exp();

app.use(exp.static(path.join(__dirname,'./dist/demo')))
app.use(exp.json())

const mongoClient = require("mongodb").MongoClient;
const dbURL ="mongodb+srv://projectTeam:projectTeam@cluster0.wn8wd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoClient.connect(dbURL)
.then((client) => {
    let databaseObject = client.db("projectTeam");

    let userCollectObject = databaseObject.collection("usercollection");

    app.set("userCollectionObject", userCollectObject);
    console.log("database connected");
})
.catch((error)=>console.log("error occured", error))

const userApp = require("./backend/APIs/userApi");

app.use('/user',userApp)


app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/demo/index.html'), err=> {
        if (err) {
           next(err)
        }
    })
})

//handling invalid path
app.use((req,res,next)=>{
    res.status(200).send({message:`the path ${req.url} does not exist`})
})

app.use((err,req,res,next) => {
    res.send({message:err.message})
})

let PORT = 4200 ;
app.listen(PORT, console.log(`HTTP port listening to ${PORT}`))
