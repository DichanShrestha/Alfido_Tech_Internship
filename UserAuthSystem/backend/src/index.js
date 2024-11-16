import connectDB from "./db/index.js"
connectDB()
    .then(() => {
        app.listen(8000, () => {
            console.log(`Server connected at 8000`);
            app.on("error", (error) => {
                console.log("ERROR:", error);
                throw error;
            });
        })
    })
    .catch(err => {
        console.log("DB connection FAILED: ", err);
    })