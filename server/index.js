import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRoutes from './routes/user/userRoutes.js';
import foodRoutes from './routes/food/foodRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('uploads/'))
app.use(express.json());

app.use(cors({
    credentials: true
}));


app.use('/api/user', userRoutes);
app.use('/api/donation', foodRoutes);

app.listen(PORT, () => {
    console.log(`App started successfully on port --> ${PORT}`);
});