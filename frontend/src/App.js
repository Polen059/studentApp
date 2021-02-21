import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import LoginScreen from './screens/LoginScreen';
import DataDashboard from './screens/DataDashboard';
import ParentDashboard from './screens/ParentDashboard';
import ReportScreen from './screens/ReportScreen';
import SearchScreen from './screens/SearchScreen';
import SubjectReportScreen from './screens/SubjectReportScreen';
import SingleReportScreen from './screens/SingleReportScreen';
import HomeScreen from './screens/HomeScreen';

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
          <Route exact path='/student/:id' component={ReportScreen} />
          {/* Contains single student report should be available to all but protected  */}
          {/* Teacher screen for finding student reports */}
          <Route path='/findstudent' component={SearchScreen} />
          {/* Single subject */}
          <Route
            path='/student/:id/subject/:subject'
            // path='/report/subject/:subject'
            component={SubjectReportScreen}
          />
          {/* Single report */}
          <Route
            path='/student/:id/report/:reportId'
            component={SingleReportScreen}
          />
          <Route exact path='/' component={HomeScreen} />
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
