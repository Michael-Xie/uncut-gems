import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, bool = false) => {
    setMode(() => newMode)
    setHistory(value => [...history, newMode])
    if (bool) {
      setHistory(() => [initial])
    }
  }

  const back = () => {
    if (history.length > 1) {
      history.pop()
      setHistory(() => [...history])
      setMode(() => history[history.length -1])
    } else {
      setMode(() => history[0])
    }
  }

  return {mode, transition, back};
}
