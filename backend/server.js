const express = require("express");
require("dotenv").config();

// express app
const app = express();
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

//routes
app.use("/api/workouts" ,workoutRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listen for requests
    const PORT = process.env.PORT || 5000; 

    app.listen( PORT, () => {
        console.log(`connected to db and Server started on port ${PORT}`);
});

})
.catch((err)=>{
    console.log(err)
});


