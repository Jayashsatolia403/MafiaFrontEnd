import Home from './Home/Home.js'
import { BrowserRouter, Route } from 'react-router-dom'
import FetchData from './fetchData.js';
import Register from './User/Register.js';
import Login from './User/Login.js';
import Play from './Play/Play.js';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/fetch' exact component={FetchData} />
      <Route path='/register/' exact component={Register} />
      <Route path='/login/' exact component={Login} />
      <Route path='/play/' exact component={Play} />
    </BrowserRouter>
  );
}

export default App;