import { AppError } from './appError';

export class DatabaseError extends AppError {
  constructor(message = 'Database error occurred') {
    super(message, 500);
  }
}
