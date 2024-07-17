import React, { createContext, useContext, ReactNode } from 'react';
import { useFetchData } from '../hooks/useFetchData';

//interface representing the context 
interface DataContextType {
  data: any[]; //fetched data
  loading: boolean; // indicate if loadig
  error: string | null; // will contain an error if there's one
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
//create the context
const DataContext = createContext<DataContextType | undefined>(undefined);
const DATA_URL = 'https://swapi.dev/api/people/?format=json';

//the data Provided fetches the data and passes it to the children
export const DataProvider = ({ children }: { children: ReactNode }) => {
  // use the custom hook to etch the data
  const { data, loading, error, currentPage, setCurrentPage } = useFetchData(DATA_URL);

  return (
    //provide the fetced data to the context
    <DataContext.Provider value={{ data, loading, error, currentPage, setCurrentPage }}>
      {children}
    </DataContext.Provider>
  );
};

//used a custom hook to get the data context
export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
