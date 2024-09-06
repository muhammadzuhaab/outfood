import ExpressAsyncHandler from 'express-async-handler'
import dbConnection from '../../helper/dbConnection.js'

export const getFoodHeader = ExpressAsyncHandler( (req, res)=> {
    const { availability, limit } = req.body;
    const sql = `SELECT users.user_username, food.food_id, food.food_title, food.food_description, food.food_location, food.food_image, food.food_quantity_left, food.food_expiry, food.food_type from food INNER JOIN users ON food.food_donated_by=users.user_id WHERE food.food_status='${availability}' LIMIT ${limit};`;

    dbConnection.query(sql, (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            return res.status(200).json({status: true, data: result});
        }
    })
});

export const addFood = ExpressAsyncHandler( (req, res)=> {
    const { FoodTitle, FoodDescription, FoodQuantity, FoodCategory, FoodExpiryDate, FoodLocation, _id } = req.body;
    const sql = `INSERT INTO food (food_status, food_title, food_description, food_quantity, food_quantity_left, food_expiry, food_type, food_location, food_donated_by) VALUES ('true', '${FoodTitle}', '${FoodDescription}', '${FoodQuantity}', '${FoodQuantity}', '${FoodExpiryDate}', '${FoodCategory}', '${FoodLocation}', ${_id});`;

    dbConnection.query(sql, (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            return res.status(200).json({status: true, data: result});
        }
    })
});

export const getSingleFood = ExpressAsyncHandler( (req, res)=> {
    const { food_id } = req.body;
    const sql = `SELECT * FROM food WHERE food_id=${food_id}`;

    dbConnection.query(sql, (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            return res.status(200).json({status: true, data: result});
        }
    })
});

