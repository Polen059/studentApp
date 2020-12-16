import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import LoginScreen from './screens/LoginScreen';
import DataDashboard from './screens/DataDashboard';
import ParentDashboard from './screens/ParentDashboard';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/* <h1>School Data</h1> */}

        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/dashboard' component={DataDashboard} />
          <Route path='/parent' component={ParentDashboard} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
