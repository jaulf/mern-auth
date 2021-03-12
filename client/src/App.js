import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//We're bringing the PrivateRoute

import PrivateRoute from './components/routing/PrivateRoute';

//We're bringing the screen components

import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/Loginscreen';
import RegisterScreen from './components/screens/Registerscreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordscreen';
import ResetPasswordScreen from './components/screens/ResetPasswordscreen';

const App = () => {
  return (
     <Router>
       <div className='App'>
         <Switch>
          <PrivateRoute exact path='/' component={PrivateScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/forgotpassword' component={ForgotPasswordScreen} />
          <Route exact path='/passwordreset/:resetToken' component={ResetPasswordScreen} />
         </Switch>
       </div>
     </Router>
  );
}

export default App;
