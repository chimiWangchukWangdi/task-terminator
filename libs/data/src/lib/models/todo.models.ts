/**
 * Interface for a Todo item
 */
export interface TodoModel {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: string;
  completed: string;
}

/**
 * Interface for a category of Todo items
 */
export interface Category {
  key: string;
  priority: string[];
  completed: string[];
}

/**
 * Object representing the completion status of a Todo item
 */
export const TodoCompleted = {
  YES: 'Completed',
  NO: 'In-Progress',
};
