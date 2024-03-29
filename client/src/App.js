import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//We're bringing the PrivateRoute

import PrivateRoute from './components/routing/PrivateRoute';

//We're bringing the screen components

import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

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
