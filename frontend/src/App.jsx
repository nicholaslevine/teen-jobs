const {Routes, Route, Navigate} = require('react-router');
const {Toaster} = require('react-hot-toast');
function App() {

  return (
    <div>
      <Routes>
        <Route path="/user" />
        <Route path="/provider" />
      </Routes>
    </div>
  )
}

export default App
