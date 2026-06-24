import { useState } from 'react';
import './App.css';

const initialStudents = [
  { name: "CVR", age: 20, grade: "S" }, 
  { name: "Harshu", age: 21, grade: "A" },
  { name: "Hema", age: 23, grade: "S" }
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ name: "", age: "", grade: "" });
  const [ascending, setAscending] = useState(true);

  const handleAdd = () => {
    if (!formData.name) return;
    setStudents([...students, formData]);
    setFormData({ name: "", age: "", grade: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (studentToDelete) => {
    const updatedStudents = students.filter((s) => s.name !== studentToDelete.name);
    setStudents(updatedStudents);
  };

  const handleEdit = (student) => {
    const originalIndex = students.findIndex((s) => s.name === student.name);
    setEditIndex(originalIndex);
    setFormData(student);
  };
  
  const handleUpdate = () => {
    const updatedStudents = students.map((s, i) => i === editIndex ? formData : s);
    setStudents(updatedStudents);
    setEditIndex(null);
    setFormData({ name: "", age: "", grade: "" });
  };

  const processedStudents = students
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const compare = a.name.localeCompare(b.name);
      return ascending ? compare : -compare;
    });

  return (
    <div className="App container mt-4">
      <input 
        className="form-control mb-3" 
        name="search"  
        placeholder='Type to search...' 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="form border p-3 mb-4 bg-light">
        <h2>{editIndex === null ? "Add Student" : "Edit Student"}</h2>
        <input className="form-control m-2" name="name" value={formData.name} onChange={handleChange} placeholder='Name' />
        <input className="form-control m-2" name="age" value={formData.age} onChange={handleChange} placeholder='Age' />
        <input className="form-control m-2" name="grade" value={formData.grade} onChange={handleChange} placeholder='Grade' />
        
        {editIndex === null ? (
          <button className="btn btn-info m-2" onClick={handleAdd}>Add Student</button>
        ) : (
          <button className="btn btn-success m-2" onClick={handleUpdate}>Update Student</button>
        )}
      </div>

      <h2>Students List</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => setAscending(!ascending)}>
              Name {ascending ? '▲' : '▼'}
            </th>
            <th>Age</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processedStudents.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.grade}</td>
              <td>
                <button className='btn btn-primary btn-sm m-1' onClick={() => handleEdit(s)}>Edit</button>
                <button className='btn btn-danger btn-sm m-1' onClick={() => handleDelete(s)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;