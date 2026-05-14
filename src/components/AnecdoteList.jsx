import { Link } from 'react-router-dom';
import { useAnecdotes } from '../hooks'


const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  const handleDelete = (id) => {
    if (window.confirm(`Remove anecdote with id: ${id}?`)) {
      deleteAnecdote(id)
    }
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          <button onClick={() => handleDelete(anecdote.id)}>delete</button>
        </li>)}
    </ul>
  </div>
)}

export default AnecdoteList