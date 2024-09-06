import express from 'express'
import FoodFetchRoutes from './foodfetchRoutes.js'

const routes = express.Router();

routes.use('/food', FoodFetchRoutes);

export default routes