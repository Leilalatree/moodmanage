const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://@127.0.0.1:27017/mood', { useNewUrlParser: true },
        (err)=>{
            if (err){
                console.log('Connection Error:' + err)
            }else{
                console.log('Connection success!')
            }
        }
    );
}