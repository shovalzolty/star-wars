import { useState, useEffect } from 'react';

export const useFetchData = (initialUrl: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // trigger data fetch 
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // set loading to true before fetching data
        setLoading(true);
        let allData: any[] = [];
        let nextUrl = initialUrl;
        //iterate over all pages
        while (nextUrl) {  // 'nextUrl' can be found in the response, it's the data of the following page
          const response = await fetch(nextUrl);
          if (!response.ok) {
            setError('Response was not ok, please try again');
            throw new Error('Response was not ok, please try again');
          }
          const result = await response.json();
          //add fetched data to allData array
          allData = [...allData, ...result.results];
          //set nextUrl to the next page URL 
          nextUrl = result.next;
        }
        setData(allData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [initialUrl]); // re-render if the intial URL changes
  // return the  state and functions so the component who use the context will have access to the context values
  return { data, loading, error, currentPage, setCurrentPage };
};
