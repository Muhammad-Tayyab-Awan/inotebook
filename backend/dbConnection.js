import mongoose from 'mongoose';
function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/inotebook').then(() => {
        console.log("Connected To DB");
    });
}
export default main;