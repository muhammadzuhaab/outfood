import express from 'express'

import {
    addFood,
    getFoodHeader,
    getSingleFood
} from '../../controllers/food/foodFetchController.js';

import {
    userTokenValidation 
} from '../../middleware/jwtVerification.js';

const routes = express.Router();

routes.post('/get-food-header', getFoodHeader);
routes.post('/addfood', userTokenValidation, addFood);
routes.post('/get-single-food', getSingleFood);

export default routes