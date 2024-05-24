import { useState } from 'react'
import { evaluate } from 'mathjs'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [total, setTotal] = useState(0)
  const [operation, setOperation] = useState('')

  const numbers = Array(10)
    .fill(0)
    .map((n, i) => i.toString())
  numbers.push('.')

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
    <>
      <div>
        <input value={input} />
        {numbers.map((n) => {
          return <button onClick={() => handleInput(n)}>{n}</button>
        })}

        {['+', '-', '/', 'x', '='].map((op) => (
          <button onClick={() => handleOperation(op)}>{op}</button>
        ))}
        <button onClick={handleDelete}>DEL</button>
        <button onClick={handleClear}>CLEAR</button>
      </div>

      <div>
        <span>{total !== 0 && total + ' ' + operation}</span>
      </div>
    </>
  )
}

export default App
