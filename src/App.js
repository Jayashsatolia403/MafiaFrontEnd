import Home from './Home/Home.js'
import { BrowserRouter, Route } from 'react-router-dom'
import FetchData from './fetchData.js';
import Register from './User/Register.js';
import Login from './User/Login.js';
import Play from './Play/Play.js';
import StartGame from './Play/StartGame.js';
import CountDown from './Play/CountDown.js';
import PlayClass from './Play/PlayClass.js';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/fetch' exact component={FetchData} />
      <Route path='/register/' exact component={Register} />
      <Route path='/login/' exact component={Login} />
      <Route path='/play/' exact component={Play} />
      <Route path='/startedGame/' exact component={StartGame} />
      <Route path='/countDown/' exact component={CountDown} />
      <Route path='/playc/' exact component={PlayClass} />
    </BrowserRouter>
  );
}

export default App;