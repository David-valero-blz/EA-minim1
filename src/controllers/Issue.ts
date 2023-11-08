import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Issue from '../models/Issue';

const createIssue = (req: Request, res: Response, next: NextFunction) => {

  const { title, description, priority, status, reportedBy } = req.body;

  const issue = new Issue({
    _id: new mongoose.Types.ObjectId(),    
    title,
    description, 
    priority,
    status,
    reportedBy
  });

  return issue.save()
    .then(issue => res.status(201).json(issue)) 
    .catch(error => res.status(500).json({error}));

};

const readIssue = (req: Request, res: Response, next: NextFunction) => {
  
  const issueId = req.params.issueId;

  return Issue.findById(issueId)
    .then(issue => issue ? res.status(200).json(issue) : res.status(404).json({message: 'Not found'}))
    .catch(error => res.status(500).json({error}));

};

const updateIssue = (req: Request, res: Response, next: NextFunction) => {

  const issueId = req.params.issueId;

  return Issue.findById(issueId)
    .then(issue => {
      if(!issue) {
        return res.status(404).json({message: 'Issue not found'});
      }

      issue.set(req.body);
      
      return issue.save() 
        .then(updatedIssue => {
           res.status(200).json(updatedIssue);
        })
        .catch(error => {
           res.status(500).json({error});
        });
    })
    .catch(error => {
      res.status(500).json({error}); 
    });

};


//const readAllIssues = (req: Request, res: Response, next: NextFunction) => {

  // Código para obtener todos los issues

//};


export default {
  createIssue,
  readIssue,
 updateIssue}
