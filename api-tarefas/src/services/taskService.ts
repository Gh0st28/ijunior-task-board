interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [];

export function getAllTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(title: string): Task {
  const task: Task = {
    id: String(Math.floor(Math.random() * 1000000)),
    title,
    completed: false,
  };
  tasks.push(task);
  return task;
}

export function updateTask(id: string, title?: string, completed?: boolean): Task | undefined {
  const task = tasks.find((t) => t.id === id);
  if (!task) return undefined;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  return task;
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}