const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
console.log('MONOGODB CONNECTED')
}).catch((err)=>{
    console.log(err)
})