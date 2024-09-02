import React from "react";
import { useDatabase } from "../store/database";
import { useEffect } from "react";
import { Label, TextInput, Button, Textarea } from "flowbite-react";
import { useFormik } from "formik";
import { data } from "autoprefixer";


const convertTo24HourFormat = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
      hours = '00';
  }

  if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};



function Home() {
    const { database, readDatabase, setDataToFirebase } = useDatabase((state) => ({
        database: state.database,
        readDatabase: state.readDatabase,
        setDataToFirebase: state.setDataToFirebase,
    }));

    let homeForm = useFormik({
        initialValues: {
            image1: "",
            image2: "",
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
            const newData = { ...database };

            newData.home.aboutUs = aboutCardsData;

            console.log(newData);
            //setDataToFirebase(newData);
        },
    });

    const [aboutCardsData, setAboutCardsData] = React.useState([database?.home?.aboutUs]);
    const [eventsData, setEventsData] = React.useState([database.event.events]);

    const handleInputChange = (id, key, value) => {
        setAboutCardsData(prevData => {
            const updatedData = { ...prevData };
            if (updatedData[id]) {
                updatedData[id][key] = value;
            }
            return updatedData;
        });
        console.log(aboutCardsData);
    };

    const handleUploadImage = (id) => {
        console.log(id);
    }


    const handleEventInputChange = (id, key, value) => {
        setEventsData(prevData => {
            const updatedData = { ...prevData };
            if (updatedData[id]) {
                updatedData[id][key] = value;
            }
            return updatedData;
        });
        console.log(eventsData);
    }


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
            setEventsData(database.event.events);
        }
    }, [database]);

    console.log(aboutCardsData);

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
                        <div className="mb-4 flex flex-row gap-12">
                            <div className="basis-1/2">
                            <img src={homeForm.values.image1} alt="image1" className="w-full" />
                                <div className="mb-2 block mt-4">
                                    <Label>Image 1</Label>
                                    <TextInput id="image1" name="image1" type="text" onChange={homeForm.handleChange} value={homeForm.values.image1} />
                                </div>

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
                                <div className="mb-2 block mt-4">
                                    <Label>Image 2</Label>
                                    <TextInput id="image2" name="image2" type="text" onChange={homeForm.handleChange} value={homeForm.values.image2} />
                                </div>
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

                        <div className="mb-2 block mt-4">
                            <Label>About Cards</Label>
                            <div className="mt-2 flex flex-row gap-4 sm:flex-wrap  md:flex-nowrap">
                                {aboutCardsData &&
                                    Object.values(aboutCardsData).map((data) => {
                                        return (
                                            <div className="md:basis-1/3 sm:basis-full shadow-md rounded bg-[#C6D4DD4F] p-4" key={data.id}>
                                                <img src={data.image} alt="about-image" className="w-full"  onClick={()=>handleUploadImage("aboutUS",data.id)} />
                                                <div className="mb-1 block mt-2 p-2">
                                                    <Label>Title</Label>
                                                    <TextInput id="image1" name="image1" type="text" defaultValue={data.title}  onChange={(e) => handleInputChange(data.id, 'title', e.target.value)} />
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Description</Label>
                                                    <Textarea id="description" name="description" type="text" defaultValue={data.description}  onChange={(e) => handleInputChange(data.id, 'description', e.target.value)} />
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Button Text</Label>
                                                    <TextInput id="buttonText" name="buttonText" type="text" defaultValue={data.buttonText}  onChange={(e) => handleInputChange(data.id, 'buttonText', e.target.value)}/>
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Button Link</Label>
                                                    <TextInput id="buttonLink" name="buttonLink" type="text" defaultValue={data.buttonLink}  onChange={(e) => handleInputChange(data.id, 'buttonLink', e.target.value)}/>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="mb-2 block mt-8">
                            <Label>Add/ Remove Events</Label> <Button >Add Event</Button>
                            <div className="mt-2 flex flex-row gap-4 sm:flex-wrap  md:flex-nowrap">
                                {eventsData &&
                                    Object.values(eventsData).map((ev) => {
                                        return (
                                            <div className="md:basis-1/3 sm:basis-full shadow-md rounded bg-[#8BBB9F4F] p-4" key={data.id}>
                                                <img src={ev.image} alt="event-image" className="w-full"  onClick={()=>handleUploadImage("events",ev.id)} />
                                                <div className="mb-1 block mt-2 p-2">
                                                    <Label>Title</Label>
                                                    <TextInput id="title" name="title" type="text" defaultValue={ev.title} onChange={(e)=>handleEventInputChange(ev.id,"title",e.target.value)} />
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Description</Label>
                                                    <Textarea id="description" name="description" type="text" defaultValue={ev.description}  onChange={(e)=>handleEventInputChange(ev.id,"description",e.target.value)}/>
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Location</Label>
                                                    <TextInput id="location" name="location" type="text" defaultValue={ev.location} onChange={(e)=>handleEventInputChange(ev.id,"location",e.target.value)}/>
                                                </div>

                                                <div className="mb-1 block p-2">
                                                    <Label>Date</Label>
                                                    <TextInput id="date" name="date" type="date" defaultValue={ev.date} onChange={(e)=>handleEventInputChange(ev.id,"date",e.target.value)} />
                                                </div>
                                                <div className="mb-1 block p-2">
                                                    <Label>Time</Label>
                                                    <TextInput id="time" name="time" type="time" defaultValue={ev?.time?convertTo24HourFormat(ev?.time):""} onChange={(e)=>handleEventInputChange(ev.id,"time",e.target.value)}/>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <Button type="submit">Save</Button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Home;
