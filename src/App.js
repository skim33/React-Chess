import React, { useEffect, useState } from 'react'
import './App.css'
import { gameSubject, initGame, resetGame, undoTurn } from './Game'  
import Board from './Board'

function App() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameover] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()

  useEffect(()=> {
    initGame()
    const subscribe = gameSubject.subscribe(game => {
      setBoard(game.board)
      setIsGameover(game.isGameOver)
      setResult(game.result)
      setTurn(game.turn)
    })
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <>
      <div className="container">
        {isGameOver && (
          <h2 className="vertical-text"> GAME OVER
            <button onClick={resetGame}>
              <span>
                NEW GAME
              </span>
            </button>
          </h2>
        )}
        <div className="board-container">
          <Board board={board} turn={turn}/>
        </div>
        {result && <p className="vertical-text">{result}</p>}   
      </div>

      <div className="button-container">
        {!isGameOver && (<h2 className="turn">{turn === "w" ? "Turn: White" : "Turn: Black"}</h2>)}
        {!isGameOver && (<button className="restart" onClick={resetGame}>RESTART</button>)}
        {!isGameOver && (<button className="undo" onClick={undoTurn}>Undo</button>)}     
      </div>
    </>
  );
}

export default App;
