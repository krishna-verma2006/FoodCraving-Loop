import app from './src/app.js';
import { configDotenv } from 'dotenv';

configDotenv();

const PORT = 3000;

console.log("I AM RUNNING THIS SERVER.JS");
console.log("PORT =", PORT);

app.listen(PORT, () => {
    console.log("server is running on port",`${PORT}`);
});