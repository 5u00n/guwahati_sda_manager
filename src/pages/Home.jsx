import React from "react";
import { useDatabase } from "../store/database";
import { useEffect } from "react";
import { Label, TextInput, Button, Textarea, FileInput } from "flowbite-react";
import { useFormik } from "formik";

function Home() {
    const { database, setHomeDataToFirebase } = useDatabase((state) => ({
        database: state.database,
        setHomeDataToFirebase: state.setHomeDataToFirebase,
    }));

    let homeForm = useFormik({
        initialValues: {
            image1: "",
            image2: "",
            image1File: [],
            image2File: [],
            scripture1: "",
            scripture2: "",
            chapterName1: "",
            chapterName2: "",
            imageText1: "",
            imageText2: "",
            aboutUs: "",
            events: "",
            imageText1T1: "",
            imageText1T2: "",
            imageText2T1: "",
            imageText2T2: "",
        },
        onSubmit: (values) => {
            console.log("Home Form Data", values);
            const homeData={
                hero: {
                    image1: values.image1,
                    image2: values.image2,
                    image1File: values.image1File?values.image1File:"",
                    image2File: values.image2File?values.image2File:"",
                    scripture1: values.scripture1,
                    scripture2: values.scripture2,
                    chapterName1: values.chapterName1,
                    chapterName2: values.chapterName2,
                    imageText1: {
                        t1: values.imageText1T1,
                        t2: values.imageText1T2,
                    },
                    imageText2: {
                        t1: values.imageText2T1,
                        t2: values.imageText2T2,
                    },
                },
                aboutUs: aboutCardsData,
            }

            

            //newData.home.aboutUs = aboutCardsData;

            console.log(homeData);
            setHomeDataToFirebase(homeData);
        },
    });

    const [aboutCardsData, setAboutCardsData] = React.useState([database?.home?.aboutUs]);

    const handleInputChange = (id, key, value) => {
        setAboutCardsData((prevData) => {
            const updatedData = { ...prevData };
            if (updatedData[id]) {
                updatedData[id][key] = value;
            }
            return updatedData;
        });
        console.log(aboutCardsData);
    };

    useEffect(() => {
        if (database) {
            homeForm.setValues({
                image1: database.home.hero.image1 || "",
                image2: database.home.hero.image2 || "",
                scripture1: database.home.hero.scripture1 || "",
                scripture2: database.home.hero.scripture2 || "",
                chapterName1: database.home.hero.chapterName1 || "",
                chapterName2: database.home.hero.chapterName2 || "",
                imageText1: database.home.hero.imageText1 || "",
                imageText2: database.home.hero.imageText2 || "",
                imageText1T1: database.home.hero.imageText1.t1 || "",
                imageText1T2: database.home.hero.imageText1.t2 || "",
                imageText2T1: database.home.hero.imageText2.t1 || "",
                imageText2T2: database.home.hero.imageText2.t2 || "",
                aboutUs: database.home.aboutUs || "",
                events: database.event.events || "",
            });

            setAboutCardsData(database.home.aboutUs);
        }
    }, [database]);

    //-----------------------------------------------------------
    // Upload Image for hero section
    //-----------------------------------------------------------
    const handleUploadHeroImage = (e, numb) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            homeForm.setValues({
                ...homeForm.values,
                [`image${numb}`]: reader.result,
                [`image${numb}File`]: file,
            });
        };
        //console.log(homeForm.values);
        reader.readAsDataURL(file);
    };

    //-----------------------------------------------------------
    // Upload Image for about us section
    //-----------------------------------------------------------
    const handleUploadAboutUsImage = (e, id) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            setAboutCardsData((prevData) => {
                const updatedData = { ...prevData };
                if (updatedData[id]) {
                    updatedData[id].image = reader.result;
                    updatedData[id].imageFile = file;
                }
                return updatedData;
            });
        };
        console.log(aboutCardsData);
        reader.readAsDataURL(file);
    };

    return (
        <React.Fragment>
            <div>
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-2/3 mx-auto"
                    onSubmit={(e) => {
                        e.preventDefault();
                        homeForm.handleSubmit();
                    }}
                >
                    <h1 className=" text-3xl">Home Page Information</h1>
                    <p className="text-red-600">* Please save after finalization only.</p>

                    <div className="mb-4">
                        <div id="heroSection" className="mb-4 flex flex-row gap-12">
                            <div className="basis-1/2">
                                <img src={homeForm.values.image1} alt="image1" className="w-full" />
                                <div className="mb-4 block mt-4">
                                    <Label>Image 1</Label>
                                    <TextInput id="image1" name="image1" type="text" onChange={homeForm.handleChange} value={homeForm.values.image1} />
                                    <FileInput
                                        className=" mt-2 mb-2"
                                        id="file-upload-helper-text"
                                        helperText="Upload JPG Files only (MAX. 800x400px)."
                                        accept="image/jpeg"
                                        onChange={(e) => handleUploadHeroImage(e, "1")}
                                    />
                                </div>

                                <hr />

                                <div className="mb-2 block mt-4">
                                    <Label>Scripture 1</Label>
                                    <Textarea id="scripture1" name="scripture1" type="text" className="h-40" onChange={homeForm.handleChange} value={homeForm.values.scripture1} />
                                </div>
                                <div className="mb-2 block mt-1">
                                    <Label>Chapter Name 1</Label>
                                    <TextInput id="chapterName1" name="chapterName1" type="text" onChange={homeForm.handleChange} value={homeForm.values.chapterName1} />
                                </div>
                                <div className="mt-4">
                                    <Label>Text for First Slide</Label>
                                    <div className="mt-2">
                                        <TextInput id="imageText1T1" name="imageText1T1" type="text" onChange={homeForm.handleChange} value={homeForm.values.imageText1T1} />
                                    </div>
                                    <div className="mt-1">
                                        <TextInput id="imageText1T2" name="imageText1T2" type="text" onChange={homeForm.handleChange} value={homeForm.values.imageText1T2} />
                                    </div>
                                </div>
                            </div>

                            <div className="basis-1/2">
                                <img src={homeForm.values.image2} alt="image2" className="w-full" />
                                <div className="mb-4 block mt-4">
                                    <Label>Image 2</Label>
                                    <TextInput id="image2" name="image2" type="text" onChange={homeForm.handleChange} value={homeForm.values.image2} />

                                    <FileInput
                                        className=" mt-2 mb-2"
                                        id="file-upload-helper-text"
                                        helperText="Upload JPG Files only (MAX. 800x400px)."
                                        accept="image/jpeg"
                                        onChange={(e) => handleUploadHeroImage(e, "2")}
                                    />
                                </div>
                                <hr />
                                <div className="mb-2 block mt-4">
                                    <Label>Scripture 2</Label>
                                    <Textarea id="scripture2" name="scripture2" type="text" className="h-40" onChange={homeForm.handleChange} value={homeForm.values.scripture2} />
                                </div>
                                <div className="mb-2 block mt-1">
                                    <Label>Chapter Name 2</Label>
                                    <TextInput id="chapterName2" name="chapterName2" type="text" onChange={homeForm.handleChange} value={homeForm.values.chapterName2} />
                                </div>
                                <div className="mb-2 block mt-4">
                                    <Label>Text for Second Slide</Label>
                                    <div className="mt-2">
                                        <TextInput id="imageText2T1" name="imageText2T1" type="text" onChange={homeForm.handleChange} value={homeForm.values.imageText2T1} />
                                    </div>
                                    <div className="mt-1">
                                        <TextInput id="imageText2T2" name="imageText2T2" type="text" onChange={homeForm.handleChange} value={homeForm.values.imageText2T2} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="aboutSection" className="mb-2 block mt-4">
                            <Label>About Cards</Label>
                            <div className="mt-2 flex flex-row gap-4 sm:flex-wrap md:flex-nowrap">
                                {aboutCardsData &&
                                    Object.values(aboutCardsData).map((about, index) => {
                                        return (
                                            <div className="md:basis-1/3 sm:basis-full shadow-md rounded bg-[#C6D4DD4F] p-4" key={`${about.id}-${index}`}>
                                                <img src={about.image} alt="about-image" className="w-full" />
                                                <FileInput
                                                    className="mt-2 mb-2"
                                                    id="file-upload-helper-text"
                                                    helperText="Upload JPG Files only (MAX. 800x400px)."
                                                    accept="image/jpeg"
                                                    onChange={(e) => handleUploadAboutUsImage(e, about.id)}
                                                />
                                                <div className="mb-1 block mt-2 p-2">
                                                    <Label>Title</Label>
                                                    <TextInput
                                                        id="image1"
                                                        name="image1"
                                                        type="text"
                                                        defaultValue={about.title}
                                                        onChange={(e) => handleInputChange(about.id, "title", e.target.value)}
                                                    />
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Description</Label>
                                                    <Textarea
                                                        id="description"
                                                        name="description"
                                                        type="text"
                                                        defaultValue={about.description}
                                                        onChange={(e) => handleInputChange(about.id, "description", e.target.value)}
                                                    />
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Button Text</Label>
                                                    <TextInput
                                                        id="buttonText"
                                                        name="buttonText"
                                                        type="text"
                                                        defaultValue={about.buttonText}
                                                        onChange={(e) => handleInputChange(about.id, "buttonText", e.target.value)}
                                                    />
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Button Link</Label>
                                                    <TextInput
                                                        id="buttonLink"
                                                        name="buttonLink"
                                                        type="text"
                                                        defaultValue={about.buttonLink}
                                                        onChange={(e) => handleInputChange(about.id, "buttonLink", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <Button className=" mt-14" type="submit">
                        Save All Data{" "}
                    </Button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Home;
