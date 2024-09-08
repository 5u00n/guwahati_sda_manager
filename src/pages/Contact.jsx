import React, { useEffect } from "react";
import { Textarea, FileInput } from "flowbite-react";
import { useDatabase } from "../store/database";
import { useFormik } from "formik";

function Contact() {
    const { contactDatabase, setContactDataToFirebase } = useDatabase((state) => ({ contactDatabase: state.database.contact, setContactDataToFirebase: state.setContactDataToFirebase }));

    const contactForm = useFormik({
        initialValues: {
            contactMessage: "",
            image: "",
            imageFile: "",
            mapUrl: "",
            mapUrlHTML: "",
        },
        onSubmit: (values) => {
            setContactDataToFirebase(values);
        },
    });

    useEffect(() => {
        if (contactDatabase) {
            contactForm.setFieldValue("contactMessage", contactDatabase.contactMessage);
            contactForm.setFieldValue("mapUrlHTML", contactDatabase.mapUrlHTML);
            contactForm.setFieldValue("mapUrl", contactDatabase.mapUrl);
            contactForm.setFieldValue("image", contactDatabase.image);
            contactForm.setFieldValue("imageFile", contactDatabase.imageFile);
            contactForm.setFieldValue("mapUrlHTML", contactDatabase.mapUrlHTML);
        }
    }, [contactDatabase]);

    const extractIframeSrc = (htmlString) => {
        const match = htmlString.match(/src="([^"]+)"/);
        const mapUrl = match ? match[1] : "";

        contactForm.setFieldValue("mapUrl", mapUrl);
        contactForm.setFieldValue("mapUrlHTML", htmlString);
    };

    return (
        <React.Fragment>
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-2/3 mx-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                    contactForm.handleSubmit();
                }}
            >
                <h2 className="text-2xl text-center font-bold">Contact Page</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Contact Image
                    </label>
                    <img src={contactForm.values.image} alt="Contact" className="w-full" />
                    <FileInput
                        id="image"
                        name="image"
                        className=" mt-2 mb-2"
                        helperText="Upload JPG Files only (MAX. 800x400px)."
                        accept="image/jpeg"
                        onChange={(e) => {
                            contactForm.setFieldValue("image", URL.createObjectURL(e.target.files[0]));
                            contactForm.setFieldValue("imageFile", e.target.files[0]);
                        }}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactMessage">
                        Contact Message
                    </label>
                    <Textarea id="contactMessage" placeholder="Enter your message here"
                        value={contactForm.values.contactMessage}
                        onChange={contactForm.handleChange}
                        onBlur={contactForm.handleBlur}
                        name="contactMessage"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mapUrl">
                        Map URL HTML
                    </label>
                    <input
                        id="mapUrlHTML"
                        name="mapUrlHTML"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Google Maps embed URL"
                        value={contactForm.values.mapUrlHTML}
                        onChange={(e) => {
                            extractIframeSrc(e.target.value);
                        }}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mapUrl">
                        {" "}
                        Map Preview{" "}
                    </label>
                    <iframe src={contactForm.values.mapUrl} height="450" style={{ border: "0", width: "100%" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default Contact;
