import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Hello from './components/Hello';
import Home from './components/Home';
import Menu from './components/Menu';
import Student from './components/Student';



const App = () => {


    return (
        <div>
            app
            <Menu/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/tudent/:id' element={<Student/>}/>
                <Route path='about' element={<About/>} >
                    <Route path='hello' element={<Hello/>} />
                </Route>
                
            </Routes>
        </div>
    );
};

export default App;
