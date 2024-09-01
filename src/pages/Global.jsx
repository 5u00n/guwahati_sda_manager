import React from 'react';
import { useDatabase } from '../store/database';
import { useEffect } from 'react';
import { Label, TextInput, Button } from 'flowbite-react';

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
        <form >
          <h1 className=' text-3xl'>
            Global Information of the page
          </h1>
          <p className='text-red-600'>* Please save after finalization only.</p>
         
          <div className='mb-4'>
            <div className="mb-2 block mt-4">
              <Label htmlFor="aboutChurch" value="Edit About Church Description in the footer." />
            </div>
            <TextInput id="aboutChurch" type="text" sizing="sm" />
          </div>

          <div className='mb-4'>
            <div className="mb-2 block mt-4">
              <Label htmlFor="phone1" value="Edit Phone number 1" />
            </div>
            <TextInput id="phone1" type="text" sizing="sm" name="phone1" />
          </div>


          <div className='mb-4'>
            <div className="mb-2 block mt-4">
              <Label htmlFor="phone2" value="Edit Phone Number 2." />
            </div>
            <TextInput id="phone2" type="text" sizing="sm" />
          </div>

          <div className='mb-4'>
            <div className="mb-2 block mt-4">
              <Label htmlFor="email" value="Edit Church Email." />
            </div>
            <TextInput id="aboutChurch" type="text" sizing="sm" />
          </div>


          <Button type='submit' onClick={() => handleUpdateData()} >Save</Button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Global