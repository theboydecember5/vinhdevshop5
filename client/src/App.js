import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider, GlobalState } from './GlobalState';
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Pages'
import Footer from './components/footer/Footer';


function App() {

  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
      <Footer />
    </DataProvider>
  );
}

export default App;
