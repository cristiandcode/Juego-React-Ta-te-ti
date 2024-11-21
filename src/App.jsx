import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({ children, IsSelected, updateBoard, index}) =>{
  const className = `square ${IsSelected ? 'is-selected': ''}`

  const handleClick = () =>{
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn,setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{
    //revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    // Si no hay ganador
    return null
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const updateBoard = (index) =>{
    // No actualizamos esta posicion
    // Si ya tiene algo
    if (board[index] || winner) return
    //Actualizar el tablero
    const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }
  }

  return (
    <main className="board">
      <h1>Ta te ti</h1>
      <button onClick={resetGame}>Reset del juego</button>
    <section className="game">
      {
        board.map((_, index) =>{
          return(
           <Square
           key ={index}
           index={index}
           updateBoard={updateBoard}
           >
            {board[index]}
           </Square>
          )
        })
      }
    </section>
    <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
          </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
          </Square>
    </section>
      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                  {
                    winner === false
                    ? 'Empate'
                    : 'Ganó'
                  }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }

    </main>
  )
}

export default App
