import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!running) return

    const timer = setInterval(() => {
      setTime((oldTime) => {
        if (oldTime <= 1) {
          setRunning(false)
          setMessage('Время вышло!')
          return 0
        }
        return oldTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [running])

  function startTimer() {
    if (running) return

    if (time > 0) {
      setRunning(true)
      setMessage('')
      return
    }

    const min = Number(minutes)
    const sec = Number(seconds)
    const total = min * 60 + sec

    if (minutes === '' && seconds === '') {
      setMessage('Введите минуты или секунды')
      return
    }

    if (min < 0 || sec < 0 || sec > 59 || total <= 0 || !Number.isFinite(total)) {
      setMessage('Введите правильное время')
      return
    }

    setTime(total)
    setMessage('')
    setRunning(true)
  }

  function resetTimer() {
    setRunning(false)
    setTime(0)
    setMinutes('')
    setSeconds('')
    setMessage('')
  }

  const min = Math.floor(time / 60)
  const sec = time % 60

  return (
    <div className="app">
      <h1>Будильник</h1>
      <div className="timer">{String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}</div>

      <div className="inputs">
        <label>
          Минуты
          <input type="number" min="0" value={minutes} onChange={(e) => setMinutes(e.target.value)} disabled={running} />
        </label>
        <label>
          Секунды
          <input type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(e.target.value)} disabled={running} />
        </label>
      </div>

      <div className="buttons">
        <button onClick={startTimer}>Старт</button>
        <button onClick={() => setRunning(false)}>Стоп</button>
        <button onClick={resetTimer}>Сброс</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  )
}

export default App
