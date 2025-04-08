import React, { useEffect } from 'react'
import RouterPages from './RouterPages'
import { getProfile } from './api/user.api';

const App = () => {
  return (
    <div>
      <RouterPages />
    </div>
  );
}

export default App