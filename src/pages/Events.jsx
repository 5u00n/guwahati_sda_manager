import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDatabase } from "../store/database";
import { Button, Label, TextInput, Textarea, FileInput, Modal } from "flowbite-react";

function Events() {
    const { database, setEventsDataToFirebase } = useDatabase((state) => ({
        database: state.database,
        setEventsDataToFirebase: state.setEventsDataToFirebase,
    }));

    const [eventsData, setEventsData] = React.useState(database.event.events);
    const [modalAddEvent, setModalAddEvent] = React.useState(false);

    useEffect(() => {
        if (database.event.events) {
            setEventsData(database.event.events);
        }
    }, [database.event.events]);

    //-----------------------------------------------------------
    // Upload Image for events section
    //-----------------------------------------------------------

    let eventForm = useFormik({
        initialValues: {
            title: "",
            description: "",
            location: "",
            date: "",
            time: "",
            image: "",
            imageFile: [],
            id: "",
        },
        onSubmit: (values) => {
            // Convert date and time to timestamp
            const dateTimeString = `${values.date}T${values.time}:00`;
            const eventTimestamp = new Date(dateTimeString).getTime();

            values.id = "event_" + eventTimestamp;

            //if eventsData is equal to three then remove the element with the lowest timestamp else add the new event
            if (eventsData && Object.keys(eventsData).length === 3) {
                let lowestId = Object.keys(eventsData).reduce((a, b) => {
                    const aTimestamp = new Date(`${eventsData[a].date}T${eventsData[a].time}:00`).getTime();
                    const bTimestamp = new Date(`${eventsData[b].date}T${eventsData[b].time}:00`).getTime();
                    return aTimestamp < bTimestamp ? a : b;
                });
                console.log("lowestId", lowestId);
                let newEventsData = { ...eventsData };
                delete newEventsData[lowestId];
                //setEventsData(newEventsData);
                const newEvent = { ...newEventsData, [values.id]: values }; // Create a copy of the object

                setEventsData(newEvent); // Update the state with the new object

                //console.log("newEvent", newEvent);
            } else {
                const newEvent = { ...eventsData, [values.id]: values }; // Create a copy of the object

                setEventsData(newEvent); // Update the state with the new object

                console.log("newEvent", newEvent);
            }
            setModalAddEvent(false); // Close the modal
        },
    });

    const handleEventFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            eventForm.setValues({
                ...eventForm.values,
                image: reader.result,
                imageFile: file,
            });
        };
        console.log(eventForm.values);
        reader.readAsDataURL(file);
    };

    console.log("eventsData", eventsData);

    const handleEventInputChange = (id, key, value) => {
        setEventsData((prevData) => {
            const updatedData = { ...prevData };
            if (updatedData[id]) {
                updatedData[id][key] = value;
            }
            return updatedData;
        });
        console.log(eventsData);
    };

    const convertTo24HourFormat = (time12h) => {
        const [time, modifier] = time12h.split(" ");
        let [hours, minutes] = time.split(":");

        if (hours === "12") {
            hours = "00";
        }

        if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    };

    return (
        <React.Fragment>
            <div id="eventSection" className="mb-2 block mt-12">
                <Label>Add / Remove Events</Label>
                <Button className=" inline-flex mx-10" onClick={() => setModalAddEvent(!modalAddEvent)}>
                    Add Event
                </Button>
                <div className="mt-2 flex flex-row gap-4 sm:flex-wrap  md:flex-nowrap">
                    {eventsData &&
                        (eventsData[0] !== undefined || eventsData !== undefined) &&
                        Object.values(eventsData).map((ev) => {
                            return (
                                <div className="md:basis-1/3 sm:basis-full shadow-md rounded bg-[#8BBB9F4F] p-4" key={ev.id}>
                                    <img src={ev.image ? ev.image : "path/to/placeholder-image.jpg"} alt={ev.image ? "Event image" : "Placeholder image"} className="w-full h-36 object-cover" />
                                    <div className="mb-1 block mt-2 p-2">
                                        <Label>Title</Label>
                                        <TextInput id="title" name="title" type="text" defaultValue={ev.title} onChange={(e) => handleEventInputChange(ev.id, "title", e.target.value)} />
                                    </div>

                                    <div className="mb-1 block p-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            type="text"
                                            defaultValue={ev.description}
                                            onChange={(e) => handleEventInputChange(ev.id, "description", e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-1 block p-2">
                                        <Label>Location</Label>
                                        <TextInput id="location" name="location" type="text" defaultValue={ev.location} onChange={(e) => handleEventInputChange(ev.id, "location", e.target.value)} />
                                    </div>

                                    <div className="mb-1 block p-2">
                                        <Label>Date</Label>
                                        <TextInput id="date" name="date" type="date" defaultValue={ev.date} onChange={(e) => handleEventInputChange(ev.id, "date", e.target.value)} />
                                    </div>
                                    <div className="mb-1 block p-2">
                                        <Label>Time</Label>
                                        <TextInput
                                            id="time"
                                            name="time"
                                            type="time"
                                            defaultValue={ev?.time ? convertTo24HourFormat(ev?.time) : ""}
                                            onChange={(e) => handleEventInputChange(ev.id, "time", e.target.value)}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <Button className="mt-4" onClick={() => setEventsDataToFirebase(eventsData )} disabled={eventsData?false:true}> Save Events</Button>
            </div>
            <Modal show={modalAddEvent} size="md" popup onClose={() => setModalAddEvent(false)}>
                <Modal.Header>Add Event</Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            eventForm.handleSubmit();
                        }}
                    >
                        <img src={eventForm.values.image} alt="event-image" className="w-full" />
                        <FileInput className=" mt-2 mb-2" id="file-upload-helper-text" helperText="Upload JPG Files only (MAX. 800x400px)." onChange={(e) => handleEventFileChange(e)} />
                        <div className="mb-1 block mt-2 p-2">
                            <Label>Title</Label>
                            <TextInput id="title" name="title" type="text" onChange={eventForm.handleChange} value={eventForm.values.title} />
                        </div>

                        <div className="mb-1 block p-2">
                            <Label>Description</Label>
                            <Textarea id="description" name="description" type="text" onChange={eventForm.handleChange} value={eventForm.values.description} />
                        </div>

                        <div className="mb-1 block p-2">
                            <Label>Location</Label>
                            <TextInput id="location" name="location" type="text" onChange={eventForm.handleChange} value={eventForm.values.location} />
                        </div>

                        <div className="mb-1 block p-2">
                            <Label>Date</Label>
                            <TextInput id="date" name="date" type="date" onChange={eventForm.handleChange} value={eventForm.values.date} />
                        </div>
                        <div className="mb-1 block p-2">
                            <Label>Time</Label>
                            <TextInput id="time" name="time" type="time" onChange={eventForm.handleChange} value={eventForm.values.time} />
                        </div>
                        <Button className="mt-4" type="submit">
                            Save
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default Events;
