const exp = require("express")
const userApp = exp.Router()    
// const { use } = require("express/lib/router")
const expressErrorHandler = require("express-async-handler")

//get users
userApp.get('/get-users', expressErrorHandler( async (req, res) => {

    console.log("inside get user api")
    //get usercollection object from req
    let userCollectionObject = req.app.get("userCollectionObject")
    //get users data from usercollection and pack into array
    let users = await userCollectionObject.find().toArray()
    //send response
    res.send({ message: "list of users", payload: users })
}))

//update user
userApp.put('/update-user',expressErrorHandler(async (req, res) => {
    let userCollectionObject = req.app.get("userCollectionObject")
    let modifiedUserObj = req.body
    console.log(req.body)
    let result =await userCollectionObject.updateOne({userid: modifiedUserObj.userid},{$set:{...modifiedUserObj}})

    if (result.acknowledged == true) {
        res.send({message:"product modified successfully", payload:result})
    } else {
        res.send({message:"Error occured"})
    }
}))

module.exports = userApp
