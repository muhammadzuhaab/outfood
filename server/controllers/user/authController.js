import ExpressAsyncHandler from 'express-async-handler'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dbConnection from '../../helper/dbConnection.js'
import { validationResult } from 'express-validator';

export const registerAccount = ExpressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ status: false, error: errors.array() });
    }

    const { SignupName, SignupEmail, SignupContact, SignupID, SignupPassword } = req.body;
    const encryptPassword = await bycrypt.hash(SignupPassword, 10);
    let created_at = new Date();

    const sql_user_available = `SELECT COUNT(*) AS no_of_rows FROM users WHERE user_username='${SignupID}' OR user_contact='${SignupContact}'`;
    dbConnection.query(sql_user_available, (err, result) => {
        if (err) {
            return res.status(200).json({ status: false, message: err });
        }
        else {
            if (result[0]['no_of_rows'] !== 0) {
                return res.status(200).json({ status: false, message: "User already exist with this username or contact" });
            }
            else {
                const sql = `INSERT INTO users (user_name, user_email, user_contact, user_username, user_password, user_created_at) VALUES ('${SignupName}', '${SignupEmail}', '${SignupContact}', '${SignupID}', '${encryptPassword}', '${created_at}')`;

                dbConnection.query(sql, (err, result) => {
                    if (err) {
                        return res.status(200).json({ status: false, message: err });
                    }
                    else {
                        return res.status(200).json({
                            status: true,
                            message: 'Record inserted successfully',
                            result: result
                        });
                    }
                });
            }
        }
    });
})

export const loginAccount = ExpressAsyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { LoginID, LoginPassword } = req.body;

    const sql = `SELECT * FROM users WHERE user_username='${LoginID}'`;
    dbConnection.query(sql, async (err, result) => {
        if (err) {
            return res.status(200).json({ status: false, message: err });
        }
        else {
            const userAvailable = result;
            if (userAvailable[0]) {
                const passwordMatch = await bycrypt.compare(LoginPassword, userAvailable[0].user_password);
                if (passwordMatch) {
                    const accessToken = jwt.sign({
                        _id: userAvailable[0].user_id.toString()
                    }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

                    let tokenObjectData = {
                        token: accessToken,
                        signedAt: Date.now().toString()
                    };

                    return res.status(200).json({ status: true, 'tokenData': tokenObjectData });

                } else {
                    return res.status(200).json({ status: false, message: 'Wrong Password!' })
                }

            } else {
                return res.status(404).json({ status: false, message: 'Wrong UserID! Try with authenticate UserID' })
            }
        }
    });
});

export const usernameAvailability = ExpressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    }

    const { SignupID } = req.body;

    const sql = `SELECT COUNT(*) AS no_of_rows FROM users WHERE user_username='${SignupID}'`;

    dbConnection.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ status: false, message: err });
        }
        else {
            let rows = result[0]['no_of_rows'];
            if (rows === 0) {
                res.status(200).json({
                    status: true,
                    availability: true,
                    message: 'Username Available',
                    result: result
                });
            }
            else {
                res.status(200).json({
                    status: true,
                    availability: false,
                    message: 'Username Already taken',
                    result: result
                });
            }
        }
    });
})

export const getuser = ExpressAsyncHandler( (req, res)=> {
    const userId = req.body._id;
    
    const sql = `SELECT * FROM users WHERE user_id='${userId}'`;

    dbConnection.query(sql, (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            return res.status(200).json({status: true, data: result});
        }
    })
});

export const updateUser = ExpressAsyncHandler(async (req, res) => {
    const userId = req.body._id;
    const { ProfileEditName, ProfileEditDOB, ProfileEditEmail } = req.body;

    const sql = `UPDATE users SET user_name='${ProfileEditName}', user_email='${ProfileEditEmail}', user_dob='${ProfileEditDOB}' WHERE users.user_id=${userId}`;

    dbConnection.query(sql, (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            return res.status(200).json({status: true, data: result});
        }
    })
})

export const validatePassword = ExpressAsyncHandler(async (req, res) => {
    const userId = req.body._id;
    const { validatePassword } = req.body;

    const sql = `SELECT user_password FROM users WHERE user_id='${userId}'`;
    
    await dbConnection.query(sql, async (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            const matchPassword = await bycrypt.compare(validatePassword, result[0].user_password);
            if(matchPassword) {
                return res.status(200).json({status: true, message: 'Password Match!'});
            }
            else {
                return res.status(200).json({status: false, message: 'Invalid Password! Please Enter Correct Credential.'});
            }
        }
    })
})

export const updateUsername = ExpressAsyncHandler(async (req, res) => {
    const userId = req.body._id;
    const { UpdatedUsername } = req.body;

    const sql = `UPDATE users SET user_username='${UpdatedUsername}' WHERE users.user_id=${userId}`;

    dbConnection.query(sql, (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            return res.status(200).json({status: true, data: result});
        }
    })
})

export const updatePassword = ExpressAsyncHandler(async (req, res) => {
    const userId = req.body._id;
    const { UpdatedPassword } = req.body;
    const encryptPassword = await bycrypt.hash(UpdatedPassword, 10);

    const sql = `UPDATE users SET user_password='${encryptPassword}' WHERE users.user_id=${userId}`;

    dbConnection.query(sql, (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            return res.status(200).json({status: true, data: result});
        }
    })
})

export const updateAccountType = ExpressAsyncHandler(async (req, res) => {
    const userId = req.body._id;
    const { data } = req.body;

    const sql = `UPDATE users SET user_acc_type='${data}' WHERE users.user_id=${userId}`;

    dbConnection.query(sql, (error, result)=>{
        if(error) {
            return res.status(200).json({status: false, message: error});
        }
        else {
            return res.status(200).json({status: true, data: result});
        }
    })
})

export const profileImageUpload = ExpressAsyncHandler(async (req, res) => {
    // const userId = req.body._id;
    // const { data } = req.body;

    // const sql = `UPDATE users SET user_acc_type='${data}' WHERE users.user_id=${userId}`;

    // dbConnection.query(sql, (error, result)=>{
    //     if(error) {
    //         return res.status(200).json({status: false, message: error});
    //     }
    //     else {
    //         return res.status(200).json({status: true, data: result});
    //     }
    // })

    console.log(req.body.image)
    return res.status(200).json({status: false, message: 'kjhasf kjashfkas'});
})