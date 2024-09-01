import React from 'react';
import { useDatabase } from '../store/database';
import { useEffect } from 'react';

function Global() {
  const { database, readDatabase, setDataToFirebase } = useDatabase((state) => ({
    database: state.database,
    readDatabase: state.readDatabase,
    setDataToFirebase: state.setDataToFirebase,
  }));

  useEffect(() => {
    readDatabase();
  }, [readDatabase]);

  const handleUpdateData = () => {
    const newData = [...database, { id: database.length + 1, name: 'New Item' }];
    setDataToFirebase(newData);
  };


  return (
    <React.Fragment>
      <div>
        <h1>Database Content</h1>
        <pre>{JSON.stringify(database, null, 2)}</pre>
        <button onClick={handleUpdateData}>Update Data</button>
      </div>
    </React.Fragment>
  )
}

export default Global