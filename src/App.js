import PathFindingVisualizer from './pages/PathFindingVisualizer/PathFindingVisualizer'
import Header from './components/Header/Header'
import { Switch, Route } from 'react-router-dom'
import About from './pages/About/About'



function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact component={PathFindingVisualizer} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
  );
}

export default App;
