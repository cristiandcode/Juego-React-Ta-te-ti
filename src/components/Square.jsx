export const Square = ({ children, IsSelected, updateBoard, index}) =>{
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