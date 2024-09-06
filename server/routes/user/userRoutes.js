import express from 'express'
import userAuthRoutes from './userAuthRoutes.js'

const routes = express.Router();

routes.use('/auth', userAuthRoutes);

export default routes