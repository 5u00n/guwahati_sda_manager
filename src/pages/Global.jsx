import React from 'react';
import { useDatabase } from '../store/database';
import { useEffect } from 'react';
import { Label, TextInput, Button, Textarea } from 'flowbite-react';
import { useFormik } from 'formik';

function Global() {
  const { database, readDatabase, setDataToFirebase } = useDatabase((state) => ({
    database: state.database,
    readDatabase: state.readDatabase,
    setDataToFirebase: state.setDataToFirebase,
  }));

  useEffect(() => {
    readDatabase();
  }, [readDatabase]);


  let globalForm = useFormik({
    initialValues: {
      aboutChurch: '',
      phone1: '',
      phone2: '',
      email: ''
    },
    onSubmit: values => {
      const newData = { ...database, ...values };
      console.log(newData);
      setDataToFirebase(newData);

    },
  });

  useEffect(() => {
    if (database) {
      globalForm.setValues({
        aboutChurch: database.aboutChurch || '',
        phone1: database.phone1 || '',
        phone2: database.phone2 || '',
        email: database.email || '',
      });
    }
  }, [database]);



  return (
    <React.Fragment>
      <div>
        <form
          onSubmit={(e) => { e.preventDefault(); globalForm.handleSubmit(); }}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 lg:w-1/3 mx-auto'
        >
          <h1 className=' text-3xl'>
            Global Information of the page
          </h1>
          <p className='text-red-600'>* Please save after finalization only.</p>

          <div className='mb-4'>
            <div className="mb-2 block mt-4">
              <Label htmlFor="aboutChurch" value="Edit About Church Description in the footer." />
            </div>
            <Textarea className=' h-[100px]' id="aboutChurch" type="text" sizing="sm"
              onChange={globalForm.handleChange}
              onBlur={globalForm.handleBlur}
              defaultValue={globalForm.values.aboutChurch}
              name='aboutChurch'

            />
          </div>

          <div className='mb-4'>
            <div className="mb-2 block mt-4">
              <Label htmlFor="phone1" value="Edit Phone number 1" />
            </div>
            <TextInput id="phone1" type="text" sizing="sm" name="phone1"
              onChange={globalForm.handleChange}
              onBlur={globalForm.handleBlur}
              defaultValue={globalForm.values.phone1}

            />
          </div>


          <div className='mb-4'>
            <div className="mb-2 block mt-4">
              <Label htmlFor="phone2" value="Edit Phone Number 2." />
            </div>
            <TextInput id="phone2" type="text" sizing="sm" name='phone2'
              onChange={globalForm.handleChange}
              onBlur={globalForm.handleBlur}
              defaultValue={globalForm.values.phone2}
            />
          </div>

          <div className='mb-4'>
            <div className="mb-2 block mt-4">
              <Label htmlFor="email" value="Edit Church Email." />
            </div>
            <TextInput id="email" type="text" sizing="sm" name='email'
              onChange={globalForm.handleChange}
              onBlur={globalForm.handleBlur}
              defaultValue={globalForm.values.email}
            />
          </div>


          <Button type='submit' >Save</Button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Global