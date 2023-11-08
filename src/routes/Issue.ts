import express from 'express';
import controller from '../controllers/Issue';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.issue.create), controller.createIssue);
router.get('/:issueId', controller.readIssue);
router.put('/:userId', ValidateSchema(Schemas.user.update), controller.updateIssue);

export = router;
