import './App.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {LoginPage} from "./LoginPages/Components/login-page";
import {ProtectedRoute} from "./Utils/protected-route";
import {Profile} from "./StudentPages/Components/profile";
import {StudentDashboard} from "./StudentPages/Components/student-dashboard";
import {ColaborareAcceptata} from "./StudentPages/Components/colaborare-acceptata";
import {TemePropuse} from "./StudentPages/Components/teme-propuse";
import {ListaProfesori} from "./StudentPages/Components/lista-profesori";
import {ProfLoginPage} from "./LoginPages/Components/prof-login-page";
import {ProfesorDashboard} from "./ProfesorPages/Components/profesor-dashboard";
import {Colaborari} from "./ProfesorPages/Components/colaborari";
import {ListaDomeniiPersonale} from "./ProfesorPages/Components/lista-domenii-personale";
import {TemePersonale} from "./ProfesorPages/Components/teme-personale";
import {ColaborareRevizuire} from "./StudentPages/Components/colaborare-revizuire";
import {ColaborariRefuzate} from "./StudentPages/Components/colaborari-refuzate";
import {ColaborariRefuzateProfesor} from "./ProfesorPages/Components/colaborari-refuzate-profesor";
import {ColaborariRevizuireProfesor} from "./ProfesorPages/Components/colaborari-revizuire-profesor";

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/loginprof" component={ProfLoginPage}/>
        <ProtectedRoute exact path="/student" component={StudentDashboard}/>
        <ProtectedRoute exact path="/student/colaborare" component={ColaborareAcceptata}/>
        <ProtectedRoute exact path="/student/teme" component={TemePropuse}/>
        <ProtectedRoute exact path="/student/profile" component={Profile}/>
        <ProtectedRoute exact path="/student/listaprofesori" component={ListaProfesori}/>
        <ProtectedRoute exact path="/student/revizuire" component={ColaborareRevizuire}/>
        <ProtectedRoute exact path="/student/refuzate" component={ColaborariRefuzate}/>
        <ProtectedRoute exact path="/profesor" component={ProfesorDashboard}/>
        <ProtectedRoute exact path="/profesor/colaborari" component={Colaborari}/>
        <ProtectedRoute exact path="/profesor/colaborari/revizuire" component={ColaborariRevizuireProfesor}/>
        <ProtectedRoute exact path="/profesor/colaborari/refuzate" component={ColaborariRefuzateProfesor}/>
        <ProtectedRoute exact path="/profesor/domeniipersonale" component={ListaDomeniiPersonale}/>
        <ProtectedRoute exact path="/profesor/teme" component={TemePersonale}/>
        <Route exact path="*" component={()=>"404 NOT FOUND"}/>
      </Switch>
    </div>
  );
}

export default App;
