import { useState } from 'react'
import { useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useReset = (fields) => {
  const reset = () => {
    fields.forEach(field => field.onChange({ target: { value: '' } }))
  }

  return reset
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = (anecdote) => {
    anecdoteService.create(anecdote).then(newAnecdote => {
      setAnecdotes(anecdotes.concat(newAnecdote))
    })
  }

  const deleteAnecdote = (id) => {
    anecdoteService.deleteAnecdote(id).then(() => {
      setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
    })
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}
