import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Accordion, ListGroup, Spinner } from 'react-bootstrap';
import { checkToken, LoggedInData, addBlogItems, getBlogItems, getBlogItemsByUserId, updateBlogItems } from '../Services/DataService';
import { useNavigate } from 'react-router-dom';

function DashboardComponent() {
    let navigate = useNavigate();
    useEffect(() => {
        //on load the useEffect is the first thing to be fired.
        //Put any on load logic in here.
        //Will only fire once if nothing is inside the dependency array, or elese if there is something in the array when the state of that value changes the useEffect will fire again.
        if (!checkToken()) {
            navigate("/Login");
        } else {
            setTimeout(async () => {
                let loggedInData = LoggedInData();
                setUserId(loggedInData.userId);
                setPublisherName(loggedInData.publisherName);
                console.log(loggedInData);
                let userBlogItems = await getBlogItemsByUserId(loggedInData.userId);
                setBlogItems(userBlogItems);
                console.log(userBlogItems);
                setIsLoading(false);
            }, 1000)
        }

    }, [])




    const [blogItems, setBlogItems] = useState([]);

    // const [blogItems, setBlogItems] = useState([{
    //     Id: 1,
    //     Title: "Growing Tomatos",
    //     Publisher: "Walaa AlSalmi",
    //     Date: "01-12-2022",
    //     Text: "Devote a prime, sunny spot to growing tomatoes. Tomatoes need at least 6 to 8 hours of sun to bring out their best flavors. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants, then add that support directly after planting. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants.",
    //     Image:
    //         "https://www.almanac.com/sites/default/files/styles/landscape/public/image_nodes/tomatoes_helios4eos_gettyimages-edit.jpeg?itok=m9c3T-XV",
    //     published: false
    // },

    // {
    //     Id: 2,
    //     Title: "Growing Peppers",
    //     Date: "01-06-2022",
    //     Publisher: "Tom Finland",
    //     Text: "Set pepper plant seedlings out after the last spring frost. They grow well in raised beds, containers, and in-ground gardens. Plant them 18 to 24 inches apart in a sunny, well-drained spot. Pepper plants need at least 6-8 hours of sunlight per day. They grow well in raised beds, containers, and in-ground gardens. Plant them 18 to 24 inches apart in a sunny, well-drained spot. Pepper plants need at least 6-8 hours of sunlight per day.",
    //     Image:
    //         "https://www.farmersalmanac.com/wp-content/uploads/2020/11/Planting-Guide-Bell-Peppers-A105431708.jpg",
    //     published: true
    // },
    // {
    //     Id: 3,
    //     Title: "Growing Eggplants",
    //     Publisher: "Sam Bilton",
    //     Date: "12-24-2021",
    //     Text: "Start eggplant seeds indoors up to 10 weeks before the last frost date. Plant the seeds 1/4inch deep, water after planting and cover loosely with plastic to retain moisture. Transplant the seedlings to the garden when soil temperatures reach 60 degrees. Transplant the seedlings to the garden when soil temperatures reach 60 degrees.",
    //     Image:
    //         "https://cleangreensimple.com/wp-content/uploads/2020/05/growing-eggplant.jpg",
    //     published: false

    // },
    // {
    //     Id: 4,
    //     Title: "Growing Zucchinis",
    //     Publisher: "Tina Freedman",
    //     Date: "12-15-2021",
    //     Text: "Zucchini needs full sun (at least 6 to 8 hours) and consistently moist soil that is high in organic matter. Some zucchini varieties are vining types that require a trellis or a lot of room to sprawl. There are also bush types suitable for container gardening and small space gardening. There are also bush types suitable for container gardening and small space gardening.",
    //     Image:
    //         "https://greenhouseemporium.com/wp-content/uploads/2020/02/How_to_Grow_Zucchini_2.jpg",
    //     published: true
    // }]);



    //LoggedInUSer
    //Form
    const [blogId, setBlogId] = useState(0);
    const [blogUserId, setUserId] = useState(0);
    const [blogPublisherName, setPublisherName] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogTags, setBlogTags] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogIsDeleted, setIsDeleted] = useState(false);
    const [blogIsPublished, setIsPublished] = useState(false);
    //Form
    //Bools
    const [show, setShow] = useState(false);
    const [editBool, setEditBool] = useState(false);
    const [isLoading, setIsLoading] = useState(true); //the very first thing you want to do is load!

    //Functions Modal
    const handleClose = () => setShow(false);
    const handleShow = (e, { id, userId, publisherName, title, image, description, category, tags, isDeleted, isPublished }) => {
        setShow(true);
        if (e.target.textContent == "Add Blog Item") {
            setEditBool(false);
        } else {
            setEditBool(true);
        }

        setBlogId(id);
        setUserId(userId);
        setPublisherName(publisherName);
        setBlogTitle(title);
        setBlogImage(image);
        setBlogDescription(description);
        setBlogCategory(category);
        setBlogTags(tags);
        setIsDeleted(isDeleted);
        setIsPublished(isPublished);

    };
    //Modal
    //Save with publishing
    const handleSave = async ({ target: { textContent } }) => {
        console.log()
        const Published = {
            Id: blogId,
            UserId: blogUserId,
            PublisherName: blogPublisherName,
            Title: blogTitle,
            Image: blogImage,
            Description: blogDescription,
            Date: new Date(),
            Category: blogCategory,
            Tags: blogTags,
            IsDeleted: false,
            isPublished: textContent === "Save" || textContent === "Save Changes" ? false : true
        }
        console.log(Published);
        handleClose();
        let result = false;
        if (editBool) {
            result = await updateBlogItems(Published);

        } else {
            result = await addBlogItems(Published);
        }

        if (result) {
            let userBlogItems = await getBlogItemsByUserId(blogUserId);
            setBlogItems(userBlogItems);
            console.log(userBlogItems);
        } else {
            alert(`Blog item not ${editBool ? "Updated" : "Added"}`);
        }
    }

    const handlePublish = async (item) => {
        item.isPublished = !item.isPublished;
        let result = await updateBlogItems(item);
        if (result) {
            let userBlogItems = await getBlogItemsByUserId(blogUserId);
            setBlogItems(userBlogItems);
            console.log(userBlogItems);
        } else {
            alert(`Blog item not ${editBool ? "Updated" : "Added"}`);
        }
    }

    const handleDelete = async (item) => {
        item.isDeleted = !item.isDeleted;
        let result = await updateBlogItems(item);
        if (result) {
            let userBlogItems = await getBlogItemsByUserId(blogUserId);
            console.log(userBlogItems);
            setBlogItems(userBlogItems);
            console.log(userBlogItems);
        } else {
            alert(`Blog item not ${editBool ? "Updated" : "Added"}`);
        }
    }

    //Images
    const handleImage = async (event) => {
        let file = (event.target.files[0]);
        const reader = new FileReader(file);
        reader.onloadend = () => {
            // console.log(reader.result);
            setBlogImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    //Add/edit
    // const handleAddItem = () => setEdit(false);
    // const handleSetEdit = () => setEdit(true);

    //set text field
    // const handleSetTitle = () => setBlogTitle(e.target.value);
    // onChange={(e) => setBlogTitle(e.target.value)} on the onChange itself JSX

    //onchange is an event function 

    return (

        <Container fluid>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header className="d-flex justify-content-center">
                    <Row>
                        <Modal.Title>{editBool ? "Edit" : "Add"} Blog Item</Modal.Title>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={3}>
                            <Form>
                                <Form.Group className="mb-1" controlId="Title">
                                    <Form.Control type="text" placeholder="Blog's title!" onChange={(e) => setBlogTitle(e.target.value)} value={blogTitle} />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="Category">
                                <Form.Select aria-label="Pick a Category" value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)}>
                                    <option>Open this select menu</option>
                                    <option value="Food">Food</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Sports">Sports</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form>
                                <Form.Group className="mb-1" controlId="Tags">
                                    <Form.Control type="text" placeholder="Enter tags separated by commas!" value={blogTags} onChange={({ target: { value } }) => setBlogTags(value)} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="" controlId="Image">
                                <Form.Label>Pick an Image</Form.Label>
                                <Form.Control type="File" accept="image/png, image/jpg" placeholder="Pick an Image" onChange={handleImage} ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Blog Description</Form.Label>
                                    <Form.Control as="textarea" placeholder="Enter a description here!" rows={15} value={blogDescription} onChange={(e) => setBlogDescription(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>{editBool ? "Save Changes" : "Save"}</Button>
                    <Button onClick={handleSave}>{editBool ? "Save Changes" : "Save"} and Publish</Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col className="d-flex justify-content-start mt-4 mx-5" md={8}>
                    <Button variant="primary" onClick={(e) => handleShow(e, { id: 0, userId: blogUserId, publisherName: blogPublisherName, title: "", image: "", description: "", category: "", tags: "", isDeleted: false, isPublished: false })}>Add Blog Item</Button>
                    {/* <Button variant="primary" onClick={handleShow}>Edit Blog Item</Button> */}

                </Col>
            </Row>
            <Row className="d-flex justify-content-center" >
                <Col md={9} className="mt-5">
                    {
                        isLoading ?
                            //Loading screen here
                            <h1>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>Loading...</h1>
                            :
                            blogItems.length === 0 ?
                                <h1>No Blog Items. Add Blog Item Above</h1>
                                :
                                <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Published</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                {
                                                    blogItems.map((item, i) => {
                                                        return (
                                                            <>
                                                                {
                                                                    item.isPublished && !item.isDeleted ?
                                                                        <ListGroup.Item key={i}>
                                                                            <Col>
                                                                                {item.title}
                                                                            </Col>
                                                                            <Col>
                                                                                <Button variant="danger" onClick={() => handleDelete(item)}>Delete</Button>
                                                                                <Button variant="primary" onClick={(e) => handleShow(e, item)}>Edit</Button>
                                                                                <Button variant="warning" onClick={() => handlePublish(item)}>Unpublish</Button>
                                                                            </Col>
                                                                        </ListGroup.Item>
                                                                        :
                                                                        null
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Unpublished</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                {
                                                    blogItems.map((item, i) => {
                                                        return (
                                                            <>
                                                                {
                                                                    !item.isPublished && !item.isDeleted ?
                                                                        <ListGroup.Item key={i}>
                                                                            <Col>
                                                                                {item.title}
                                                                            </Col>
                                                                            <Col>
                                                                                <Button variant="danger" onClick={() => handleDelete(item)}>Delete</Button>
                                                                                <Button variant="primary" onClick={(e) => handleShow(e, item)}>Edit</Button>
                                                                                <Button variant="warning" onClick={() => handlePublish(item)}>Publish</Button>
                                                                            </Col>
                                                                        </ListGroup.Item>
                                                                        :
                                                                        null
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                    }
                </Col>
            </Row>
        </Container>

    )
}

export default DashboardComponent