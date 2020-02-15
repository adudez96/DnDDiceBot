import * as mongoose from 'mongoose';

const uri: string = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/local";

export function initDb(): Promise<mongoose.Mongoose> {
    return mongoose.connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err: any) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Successfully Connected!");
        }
    });
};
