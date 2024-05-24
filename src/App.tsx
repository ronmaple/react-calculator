import { useState } from 'react'
import { evaluate } from 'mathjs'
import './App.css'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { KEYS } from './constants'

function App() {
  const [input, setInput] = useState('')
  const [total, setTotal] = useState(0)
  const [operation, setOperation] = useState('')

  const handleInput = (n: string) => {
    if (input === '0' && n !== '.') {
      setInput(n)
    } else if (n === '.' && !input.includes('.')) {
      setInput(input + n)
    } else if (n !== '.') {
      setInput(input + n)
    }

    if (operation === '') {
      setTotal(0)
    }
  }

  const handleDelete = () => {
    if (input.length === 0) {
      setInput('0')
    } else {
      const str = input.substring(0, input.length - 1)
      setInput(str)
    }
  }

  const handleClear = () => {
    setInput('')
    setTotal(0)
  }

  const handleOperation = (op) => {
    if (input.length && input !== '0') {
      let newTotal = total

      switch (op) {
        case '+':
        case '-':
        case '/':
        case 'x':
          if (operation) {
            newTotal = evaluate(`${newTotal}${operation}${input}`)
          } else {
            newTotal = parseFloat(input)
          }
          setOperation(op)
          break

        case '=':
          if (operation) {
            newTotal = evaluate(`${newTotal}${operation}${input}`)
          } else {
            newTotal = parseFloat(input)
          }
          setOperation('')
          break

        default:
          break
      }

      setTotal(newTotal)
      setInput('0')
    }
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 300, margin: '0 auto' }}>
      <Box mb={2} color={'grey'}>
        <Typography variant="h5" sx={{ textAlign: 'right' }}>
          {input || '0'}
        </Typography>
        <Typography variant="body2" sx={{ flexGrow: 1, textAlign: 'right' }}>
          {total === 0 ? '0' : total + operation}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {KEYS.map((n) => (
          <Grid item xs={4} key={n}>
            <Button
              onClick={() => handleInput(n)}
              variant="contained"
              fullWidth
            >
              {n}
            </Button>
          </Grid>
        ))}

        <Grid item xs={4}>
          <Button
            onClick={() => handleOperation('=')}
            variant="contained"
            fullWidth
          >
            =
          </Button>
        </Grid>
        {['+', '-', '/', 'x'].map((op) => (
          <Grid item xs={3} key={op}>
            <Button
              onClick={() => handleOperation(op)}
              variant="contained"
              fullWidth
            >
              {op}
            </Button>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Button onClick={handleClear} variant="contained" fullWidth>
            C
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleDelete} variant="contained" fullWidth>
            DEL
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default App
