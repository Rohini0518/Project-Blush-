import AllLinksNavbar from './components/AllLinksNavbar'
import Navbar from './components/Navbar'
import { useTabTitleChange } from './hooks/useTabTitleChange';

function App() {
useTabTitleChange(
    ["Come back 👀", "Miss you 💖", "Cart is waiting 🛒"],
    2000
  );  return (
    <div style={{padding:"2px",margin:"2px"}}>
      <Navbar/>
      <AllLinksNavbar/>
    </div>
  )
}

export default App;
