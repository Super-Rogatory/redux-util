import './App.css';
import Posts from './components/Posts';
import PostForm from './components/Postform';

function App() {
  return (
    <div className="App">
      <PostForm />
      <hr />
      <Posts />
    </div>
  );
}

export default App;
