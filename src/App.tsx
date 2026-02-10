import './App.css'
import Timer from './components/Timer'
import TaskList from './components/TaskList'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="app-container">
      <ThemeToggle />
      <header className="app-header">
        <h1>Flow</h1>
        <p>Focus on what matters.</p>
      </header>

      <main className="app-content">
        <Timer />
        <TaskList />
      </main>
    </div>
  )
}

export default App
