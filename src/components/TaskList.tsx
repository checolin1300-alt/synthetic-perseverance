import { useState } from 'react';
import { Plus, Trash2, Check, Circle } from 'lucide-react';
import './TaskList.css';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const task: Task = {
            id: crypto.randomUUID(),
            text: newTask,
            completed: false,
        };

        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="task-list-container">
            <h2>Tasks</h2>

            <form onSubmit={addTask} className="task-input-form">
                <input
                    type="text"
                    placeholder="What are you working on?"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="task-input"
                />
                <button type="submit" className="add-task-btn" disabled={!newTask.trim()}>
                    <Plus size={20} />
                </button>
            </form>

            <div className="tasks-scroll">
                {tasks.length === 0 && (
                    <div className="empty-state">
                        <p>No tasks yet. Add one to get started!</p>
                    </div>
                )}

                {tasks.map((task) => (
                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <button className="check-btn" onClick={() => toggleTask(task.id)}>
                            {task.completed ? <Check size={18} color="white" /> : <Circle size={18} />}
                        </button>
                        <span className="task-text">{task.text}</span>
                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
