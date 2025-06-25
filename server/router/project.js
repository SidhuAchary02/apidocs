import express from 'express';
import upload from '../middlewares/upload.js';
import { createProject } from '../controller/project.js';
import { authMiddleware } from '../middlewares/auth.js';


const projectRouter = express.Router();

projectRouter.post('/project/new', authMiddleware, upload.single("logo"), createProject);

export default projectRouter;