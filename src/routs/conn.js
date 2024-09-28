import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/studentsapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successful');
}).catch((e) => {
    console.error('No connection:', e); // Use console.error for error logging
});

export default mongoose;
