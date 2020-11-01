import SubReddit from './components/index'
import Post from './components/Post'
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import SubDetail from './components/SubDetail'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const subName = "backpain"
  return (
    <div className="App">
      <Router>
        <Header subName={subName}/>
        <SubDetail title={`r/${subName}`} displayName="Back Pain" />
        <Switch>
          <Route  path="/home">
            <SubReddit subName={subName}/>
          </Route>
          <Route exact path="/post/:id" component={Post} />
          <Route path="*">
            <SubReddit subName={subName}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
