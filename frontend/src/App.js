import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import LoginScreen from './screens/LoginScreen';
import DataDashboard from './screens/DataDashboard';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/* <h1>School Data</h1> */}
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/dashboard' component={DataDashboard} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
