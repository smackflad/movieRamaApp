import { createContext } from 'react';

const AppContext = createContext({
    handleButtonClick: () => {},
});

export default AppContext;