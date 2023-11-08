import mongoose, { Document, Schema } from 'mongoose';

import { IUser } from './User'; 

export interface IIssue {
  title: string;
  description: string; 
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'closed';
  reportedBy: IUser;
}

export interface IIssueModel extends IIssue, Document {}

const IssueSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: { type: String, enum: ['open','closed'], required: true },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);

export default mongoose.model<IIssueModel>('Issue', IssueSchema);
