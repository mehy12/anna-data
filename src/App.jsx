import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = () => <h1>Home</h1>;
const AboutUs = () => <h1>About Us</h1>;
const Login = () => <h1>Login</h1>;
const Signup = () => <h1>Signup</h1>;
const Dashboard = () => <h1>Dashboard</h1>;
const Marketplace = () => <h1>Marketplace</h1>;
const Weather = () => <h1>Weather</h1>;
const Schemes = () => <h1>Schemes</h1>;
const Profile = () => <h1>Profile</h1>;

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={AboutUs} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/weather" component={Weather} />
        <Route path="/schemes" component={Schemes} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;