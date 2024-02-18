import moonIcon from "../images/icon-moon.svg"
import sunIcon from "../images/icon-sun.svg"

function Header({ lightTheme, onToggleTheme }) {
  return (
    <header className='header'>
      <div className='container'>
        <h1>TODO</h1>
        <img
          src={`${lightTheme ? moonIcon : sunIcon}`}
          onClick={onToggleTheme}
        />
      </div>
    </header>
  )
}

export default Header
