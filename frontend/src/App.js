import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className='py-3'>
          <h1>School Data</h1>
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
