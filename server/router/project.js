import express from 'express';
import upload from '../middlewares/upload.js';
import { createProject, getAllProjects } from '../controller/project.js';
import { authMiddleware } from '../middlewares/auth.js';


const projectRouter = express.Router();

projectRouter.post('/project/new', authMiddleware, upload.single("logo"), createProject);
projectRouter.get('/get-projects', authMiddleware, getAllProjects);

export default projectRouter;