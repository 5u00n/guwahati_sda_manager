import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDatabase } from "../store/database";
import { FileInput, Textarea, TextInput } from "flowbite-react";

function About() {
    const { aboutDatabase, setAboutDataToFirebase } = useDatabase((state) => ({ aboutDatabase: state.database.about, setAboutDataToFirebase: state.setAboutDataToFirebase }));

    const aboutForm = useFormik({
        initialValues: {
            aboutChurch: {},
            image: "",
            imageFile: "",
            history: "",
            infoCards: [],
            leaders: [],
        },
        onSubmit: (values) => {
            setAboutDataToFirebase(values);
            //console.log(values);
        },
    });

    useEffect(() => {
        if (aboutDatabase) {
            aboutForm.setValues(aboutDatabase);
        }
    }, [aboutDatabase]);

    return (
        <React.Fragment>
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-2/3 mx-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                    aboutForm.handleSubmit();
                }}
            >
                <h2 className="text-2xl text-center font-bold">About Page</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image for About Page
                    </label>
                    <img src={aboutForm.values.image} alt="About" className="w-full" />
                    <FileInput
                        id="image"
                        name="image"
                        className=" mt-2 mb-2"
                        helperText="Upload JPG Files only (MAX. 800x400px)."
                        accept="image/jpeg"
                        onChange={(e) => {
                            aboutForm.setFieldValue("imageFile", e.currentTarget.files[0]);
                            aboutForm.setFieldValue("image", URL.createObjectURL(e.currentTarget.files[0]));
                        }}
                    />
                </div>

                <hr className="mb-4 mt-4" />
                <h2 className=" text-2xs block text-gray-700 font-bold mb-4" htmlFor="aboutChurch">
                    ABOUT CHURCH INFORMATION
                </h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold " htmlFor="title">
                        Title for About Church
                    </label>
                    <TextInput id="title" name="aboutChurch.title" placeholder="Title" onChange={aboutForm.handleChange} value={aboutForm.values.aboutChurch.title} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold " htmlFor="description">
                        Description for About Church
                    </label>
                    <Textarea
                        className="h-[120px]"
                        id="description"
                        name="aboutChurch.description"
                        placeholder="Description"
                        onChange={aboutForm.handleChange}
                        value={aboutForm.values.aboutChurch.description}
                    />
                </div>

                <hr className="mb-4 mt-4" />
                <h2 className=" text-2xs block text-gray-700 font-bold mb-4" htmlFor="infoCards">
                    INFO CARDS
                </h2>
                <div className="mb-4">
                    <div className="mt-2 flex flex-row gap-4 sm:flex-wrap md:flex-nowrap">
                        {aboutDatabase &&
                            aboutForm.values.infoCards &&
                            Object.values(aboutForm.values.infoCards).map((infoCard, index) => (
                                <div className="md:basis-1/3 sm:basis-full shadow-md rounded bg-[#C6D4DD4F] p-4" key={infoCard.id}>
                                    <h4 className="  block text-gray-700  mb-4" htmlFor={`infoCards.${index}`}>
                                        INFO CARD {index + 1}
                                    </h4>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`infoCards.${infoCard.id}.title`}>
                                            Title
                                        </label>
                                        <TextInput
                                            id={`infoCards.${infoCard.id}.title`}
                                            name={`infoCards.${infoCard.id}.title`}
                                            placeholder="Title"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`infoCards.${infoCard.id}.title`, e.currentTarget.value);
                                            }}
                                            value={infoCard.title}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`infoCards.${infoCard.id}.description`}>
                                            Description
                                        </label>
                                        <Textarea
                                            className="h-[120px]"
                                            id={`infoCards.${index}.description`}
                                            name={`infoCards.${index}.description`}
                                            placeholder="Description"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`infoCards.${infoCard.id}.description`, e.currentTarget.value);
                                            }}
                                            value={infoCard.description}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <hr className="mb-4 mt-4" />
                <h2 className=" text-2xs block text-gray-700 font-bold mb-4" htmlFor="leaders">
                    LEADERS
                </h2>

                <div className="mb-4">
                    <div className="mt-2 flex flex-row gap-4 sm:flex-wrap md:flex-nowrap">
                        {aboutDatabase &&
                            aboutForm.values.leaders &&
                            Object.values(aboutForm.values.leaders).map((leader, index) => (
                                <div className="md:basis-1/3 sm:basis-full shadow-md rounded bg-[#C6D4DD4F] p-4" key={index}>
                                    <h4 className="  block text-gray-700  mb-4" htmlFor={`leaders.${index}`}>
                                        LEADER {index + 1}
                                    </h4>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`leaders.${index}.image`}>
                                            Image
                                        </label>
                                        <img src={leader.image} alt="Leader" className="w-full" />
                                        <FileInput
                                            id={`leaders.${index}.image`}
                                            name={`leaders.${index}.image`}
                                            className=" mt-2 mb-2"
                                            helperText="Upload JPG Files only (MAX. 800x400px)."
                                            accept="image/jpeg"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`leaders.${leader.id}.imageFile`, e.currentTarget.files[0]);
                                                aboutForm.setFieldValue(`leaders.${leader.id}.image`, URL.createObjectURL(e.currentTarget.files[0]));
                                            }}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`leaders.${index}.name`}>
                                            Name
                                        </label>
                                        <TextInput
                                            id={`leaders.${index}.name`}
                                            name={`leaders.${index}.name`}
                                            placeholder="Name"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`leaders.${leader.id}.name`, e.currentTarget.value);
                                            }}
                                            value={leader.name}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`leaders.${index}.title`}>
                                            Title
                                        </label>
                                        <TextInput
                                            id={`leaders.${index}.title`}
                                            name={`leaders.${index}.title`}
                                            placeholder="Title"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`leaders.${leader.id}.title`, e.currentTarget.value);
                                            }}
                                            value={leader.title}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`leaders.${index}.phone`}>
                                            Phone
                                        </label>
                                        <TextInput
                                            id={`leaders.${index}.phone`}
                                            name={`leaders.${index}.phone`}
                                            placeholder="Phone"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`leaders.${leader.id}.phone`, e.currentTarget.value);
                                            }}
                                            value={leader.phone}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`leaders.${index}.email`}>
                                            Email
                                        </label>
                                        <TextInput
                                            id={`leaders.${index}.email`}
                                            name={`leaders.${index}.email`}
                                            placeholder="Email"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`leaders.${leader.id}.email`, e.currentTarget.value);
                                            }}
                                            value={leader.email}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <hr className="mb-4 mt-4 hidden" />
                <h2 className=" text-2xs block text-gray-700 font-bold mb-4 hidden" htmlFor="history">
                    HISTORY
                </h2>
                <div className="mb-4 hidden">
                    <div className="mt-2 flex flex-row gap-4 sm:flex-wrap md:flex-nowrap">
                        {aboutDatabase &&
                            aboutForm.values.history &&
                            Object.values(aboutForm.values.history).map((history, index) => (
                                <div className="md:basis-1/3 sm:basis-full shadow-md rounded bg-[#C6D4DD4F] p-4" key={index}>
                                    <h4 className="  block text-gray-700  mb-4" htmlFor={`history.${index}`}>
                                        HISTORY {index + 1}
                                    </h4>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`history.${index}.title`}>
                                            Title
                                        </label>
                                        <TextInput
                                            id={`history.${index}.title`}
                                            name={`history.${index}.title`}
                                            placeholder="Title"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`history.${history.id}.title`, e.currentTarget.value);
                                            }}
                                            value={history.title}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor={`history.${index}.description`}>
                                            Description
                                        </label>
                                        <Textarea
                                            className="h-[120px]"
                                            id={`history.${index}.description`}
                                            name={`history.${index}.description`}
                                            placeholder="Description"
                                            onChange={(e) => {
                                                aboutForm.setFieldValue(`history.${history.id}.description`, e.currentTarget.value);
                                            }}
                                            value={history.description}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Save All Changes
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default About;
