import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar1';
import ExerciseList from './components/ExerciseList';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
function App() {
  return (
    <div className="App">
      <h1 style={{ marginTop: '15px', marginBottom: '20px', width: '100%', textAlign: "center" }}>Exercise Tracker</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<ExerciseList />} />
        <Route path="/update/:id" element={<EditExercise />} />
        <Route path="/create" element={<CreateExercise />} />
        <Route path="/user" element={<CreateUser />} />


      </Routes>


    </div>
  );
}

export default App;
