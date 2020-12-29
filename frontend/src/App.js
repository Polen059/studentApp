import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import LoginScreen from './screens/LoginScreen';
import DataDashboard from './screens/DataDashboard';
import ParentDashboard from './screens/ParentDashboard';
import ReportScreen from './screens/ReportScreen';
import SearchScreen from './screens/SearchScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/* <h1>School Data</h1> */}

        <Container>
          <Route path='/login' component={LoginScreen} /> {/*   */}
          {/* <Route path='/dashboard' component={DataDashboard} />{' '} */}
          {/* Currently nothing */}
          <Route path='/parent' component={ParentDashboard} />
          {/* Currently only works for parents. Add student  */}
          <Route path='/report/:id' component={ReportScreen} />
          {/* Contains single student report should be available to all but protected  */}
          {/* Teacher screen for finding student reports */}
          <Route path='/findstudent' component={SearchScreen} />
          {/* Single subject */}
          {/* Single report */}
          {/* Add parent */}
          {/* Edit parent */}
          {/* Delete Parent */}
          {/* Add student */}
          {/* Delete Student */}
          {/* Edit Student */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
