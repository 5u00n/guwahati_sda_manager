import React from "react";
import { useDatabase } from "../store/database";
import { useEffect } from "react";
import { Label, TextInput, Button, Textarea } from "flowbite-react";
import { useFormik } from "formik";

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
            aboutChurch: "",
            phone1: "",
            phone2: "",
            email: "",
            address: "",
            timings: "",
        },
        onSubmit: (values) => {
            const newData = { ...database, ...values };
            //console.log(newData);
           setDataToFirebase(newData);
        },
    });

    useEffect(() => {
        if (database) {
            globalForm.setValues({
                aboutChurch: database.aboutChurch || "",
                phone1: database.phone1 || "",
                phone2: database.phone2 || "",
                email: database.email || "",
                address: database.address || "",
                timings: database.timings || "",
            });
        }
    }, [database]);

    return (
        <React.Fragment>
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        globalForm.handleSubmit();
                    }}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 lg:w-1/3 mx-auto"
                >
                    <h1 className=" text-3xl">Global Information of the page</h1>
                    <p className="text-red-600">* Please save after finalization only.</p>

                    <div className="mb-4">
                        <div className="mb-2 block mt-4">
                            <Label htmlFor="aboutChurch" value="Edit About Church Description in the footer." />
                        </div>
                        <Textarea
                            className=" h-[100px]"
                            id="aboutChurch"
                            type="text"
                            sizing="sm"
                            onChange={globalForm.handleChange}
                            onBlur={globalForm.handleBlur}
                            defaultValue={globalForm.values.aboutChurch}
                            name="aboutChurch"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="mb-2 block mt-4">
                            <Label htmlFor="phone1" value="Edit Phone number 1" />
                        </div>
                        <TextInput id="phone1" type="text" sizing="sm" name="phone1" onChange={globalForm.handleChange} onBlur={globalForm.handleBlur} defaultValue={globalForm.values.phone1} />
                    </div>

                    <div className="mb-4">
                        <div className="mb-2 block mt-4">
                            <Label htmlFor="phone2" value="Edit Phone Number 2." />
                        </div>
                        <TextInput id="phone2" type="text" sizing="sm" name="phone2" onChange={globalForm.handleChange} onBlur={globalForm.handleBlur} defaultValue={globalForm.values.phone2} />
                    </div>

                    <div className="mb-4">
                        <div className="mb-2 block mt-4">
                            <Label htmlFor="email" value="Edit Church Email." />
                        </div>
                        <TextInput id="email" type="text" sizing="sm" name="email" onChange={globalForm.handleChange} onBlur={globalForm.handleBlur} defaultValue={globalForm.values.email} />
                    </div>

                    <div className="mb-4">
                        <div className="mb-2 block mt-4">
                            <Label htmlFor="address" value="Edit Church Address." />
                        </div>
                        <Textarea
                            className=" h-[100px]"
                            id="address"
                            type="text"
                            sizing="sm"
                            onChange={globalForm.handleChange}
                            onBlur={globalForm.handleBlur}
                            defaultValue={globalForm.values.address}
                            name="address"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="mb-2 block mt-4">
                            <Label htmlFor="timing" value="Edit Church Timing." />
                            <Button type="button" onClick={() => globalForm.setFieldValue(`timings.${Object.keys(globalForm.values.timings).length}`, "")}>
                                Add Timing
                            </Button>
                        </div>
                        {database &&
                            globalForm.values.timings &&
                            Object.values(globalForm.values.timings).map((timing, index) => {
                                return (
                                    <div key={index} className="flex items-center">
                                        <TextInput
                                            id={`timings.${index}`}
                                            type="text"
                                            className=" w-2/3"
                                            name={`timings.${index}`}
                                            onChange={globalForm.handleChange}
                                            onBlur={globalForm.handleBlur}
                                            defaultValue={timing}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                const newTimings = { ...globalForm.values.timings };
                                                delete newTimings[index];
                                                globalForm.setFieldValue("timings", newTimings);
                                            }}
                                            color="failure"
                                            className="ml-2 my-2 w-1/3"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                );
                            })}
                    </div>

                    <Button type="submit" color="blue" >Save Global Information</Button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Global;
