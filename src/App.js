import { useState, useEffect } from 'react'
import {
  Routes, Route,
  Navigate
} from 'react-router-dom'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const [notification, setNotification] = useState('')

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then((newAnecdote) => {
      setAnecdotes(anecdotes.concat(newAnecdote))
      setNotification(`a new anecdote '${anecdote.content}' created!`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    })
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={notification === '' ? <CreateNew addNew={addAnecdote} /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App