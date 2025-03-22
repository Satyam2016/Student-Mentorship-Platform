const mongoose =require('mongoose');

const uri = `mongodb://localhost:27017/SMP`;

const connectingDatabase = async () => {
     try {
       await mongoose.connect(uri, {
         // Add this option if you're using a version of the MongoDB Node.js driver that requires it.
       });
       console.log('Database is connected');
     } catch (error) {
       console.error('Error connecting to the database:', error.message);
     }
};

module.exports=  connectingDatabase;

