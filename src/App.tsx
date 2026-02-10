import './App.css'
import Timer from './components/Timer'
import TaskList from './components/TaskList'
import ThemeToggle from './components/ThemeToggle'
import FontSelect from './components/FontSelect'

function App() {
  return (
    <div className="app-container">
      <ThemeToggle />
      <FontSelect />
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
