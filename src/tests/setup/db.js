import mongoose from "mongoose";

module.exports = {
     setupDB() {

        beforeAll( () => {

            mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
                          
        })
        
    }
}

      



