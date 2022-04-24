import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Carousel, Spinner } from 'react-bootstrap';
import { getPublishedBlogItems } from '../Services/DataService';
//import my image for the carousel
import CarouselImg from '../Assets/CarouselImage.jpg';

function ViewBlogItemsComponent() {
    const [blogItems, setBlogItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        let publishedItems = await getPublishedBlogItems();
        console.log(publishedItems);
        setBlogItems(publishedItems);
        setIsLoading(false);
    }, [])


    // const [blogItems, setBlogItems] = useState([{
    //     Id: 1,
    //     Title: "Growing Tomatos",
    //     Publisher: "Walaa AlSalmi",
    //     Date: "01-12-2022",
    //     Text: "Devote a prime, sunny spot to growing tomatoes. Tomatoes need at least 6 to 8 hours of sun to bring out their best flavors. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants, then add that support directly after planting. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants.",
    //     Image:
    //         "https://www.almanac.com/sites/default/files/styles/landscape/public/image_nodes/tomatoes_helios4eos_gettyimages-edit.jpeg?itok=m9c3T-XV",
    //     published: true
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
    //     published: true

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
    return (
        <div>
            <Container className="mt-5">
                <Row>
                {
                    isLoading? 
                         <h1>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>Loading...
                            </h1>
                            :
                    <Col>
                        {
                            blogItems.map((item, i) => {
                                return (
                                    <>
                                        {
                                            i % 2 === 0
                                                ?
                                                <>
                                                    <Row key={i}>
                                                        <Col md={6}>
                                                            <Row>
                                                                <Col md={12} className="d-flex justify-content-center">
                                                                    <h2>{item.title}</h2>
                                                                </Col>
                                                                <Col md={12}>
                                                                    <Row>
                                                                        <Col md={6} className="d-flex justify-content-center">
                                                                            <h2>{item.publisherName}</h2>
                                                                        </Col>
                                                                        <Col md={6} className="d-flex justify-content-center">
                                                                            <h3>{item.date}</h3>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={12} className="d-flex justify-content-center">
                                                                    <img src={item.image} width="350px" height="200px" />
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={6} className="d-flex justify-content-center">
                                                            <h4>{item.description}</h4>
                                                        </Col>
                                                    </Row>
                                                </>
                                                :
                                                <>
                                                    <Row key={i}>
                                                        <Col md={6} className="d-flex justify-content-center">
                                                            <h4>{item.description}</h4>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Row>
                                                                <Col md={12} className="d-flex justify-content-center">
                                                                    <h2>{item.title}</h2>
                                                                </Col>
                                                                <Col md={12}>
                                                                    <Row>
                                                                        <Col md={6} className="d-flex justify-content-center">
                                                                            <h2>{item.publisherName}</h2>
                                                                        </Col>
                                                                        <Col md={6} className="d-flex justify-content-center">
                                                                            <h3>{item.date}</h3>

                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={12} className="d-flex justify-content-center">
                                                                    <img src={item.image} width="350px" height="200px"/>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </>
                                        }
                                    </>
                                )
                            })
                        }
                    </Col>
                }
                </Row>
            </Container>





            {/* Jesse's LayOut! */}
            {/* <Container fluid>
                <Row>
                    <Col className="p-0" md={12}>
                        <Carousel>
                            <Carousel.Item interval={5000}>
                                <img
                                    className="d-block w-100"
                                    src={CarouselImg}
                                    height="500vh"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={5000}>
                                <img
                                    className="d-block w-100"
                                    src={CarouselImg}
                                    height="500vh"
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={5000}>
                                <img
                                    className="d-block w-100"
                                    src={CarouselImg}
                                    height="500vh"
                                    alt="Third slide"
                                />
                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={6}>
                        <Row>
                            <Col className="d-flex justify-content-center" md={12}><h3>Title of The Blog Item</h3></Col>
                            <Row>
                                <Col className="d-flex justify-content-center" md={4}><h4>Publisher Name</h4></Col>
                                <Col className="d-flex justify-content-start" md={4}><h4>Date</h4></Col>
                                <Row className="mt-3">
                                    <img
                                        src={CarouselImg}
                                        height="500px"
                                        alt="Blog Img"
                                    />
                                </Row>
                            </Row>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <p className="BlogDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur nec velit et scelerisque. Fusce convallis auctor mi ut blandit. Sed vitae dapibus nisl. Fusce massa ipsum, iaculis sit amet egestas rhoncus, pharetra a urna. Phasellus euismod, orci eget tempor rhoncus, nibh elit aliquet risus, et dapibus arcu lorem vel leo. Ut quis facilisis nulla. Nam elementum non dui quis efficitur. Praesent sit amet egestas mi, eu suscipit erat. Donec vitae feugiat felis, nec consectetur risus. Praesent molestie laoreet lorem, ac ullamcorper orci accumsan at. Duis efficitur venenatis urna nec eleifend. Curabitur pharetra tortor at posuere lobortis. In urna mi, molestie nec mollis quis, fringilla id urna. Maecenas sodales, ante congue fringilla iaculis, mauris dui vulputate lectus, eget posuere velit leo et urna. Vivamus mattis orci id urna euismod aliquam. Sed pellentesque euismod hendrerit. Donec pellentesque vestibulum fermentum. Nullam eu vulputate orci, id tincidunt massa. Praesent tincidunt sapien nec iaculis viverra. Quisque porta urna eu pharetra tincidunt. Nunc non erat orci. Proin elementum pretium tellus, id blandit mauris gravida ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus gravida tristique orci, et scelerisque urna porta consequat. Vestibulum mattis lacinia purus. Vivamus sagittis turpis sit amet massa convallis, in dictum risus hendrerit. Vivamus ac neque at risus facilisis ornare. Etiam rhoncus nunc sapien, et tincidunt nisl dignissim vel. Sed ut tellus sed odio lacinia posuere sit amet ut est.</p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={6}>
                        <p className="BlogDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur nec velit et scelerisque. Fusce convallis auctor mi ut blandit. Sed vitae dapibus nisl. Fusce massa ipsum, iaculis sit amet egestas rhoncus, pharetra a urna. Phasellus euismod, orci eget tempor rhoncus, nibh elit aliquet risus, et dapibus arcu lorem vel leo. Ut quis facilisis nulla. Nam elementum non dui quis efficitur. Praesent sit amet egestas mi, eu suscipit erat. Donec vitae feugiat felis, nec consectetur risus. Praesent molestie laoreet lorem, ac ullamcorper orci accumsan at. Duis efficitur venenatis urna nec eleifend. Curabitur pharetra tortor at posuere lobortis. In urna mi, molestie nec mollis quis, fringilla id urna. Maecenas sodales, ante congue fringilla iaculis, mauris dui vulputate lectus, eget posuere velit leo et urna. Vivamus mattis orci id urna euismod aliquam. Sed pellentesque euismod hendrerit. Donec pellentesque vestibulum fermentum. Nullam eu vulputate orci, id tincidunt massa. Praesent tincidunt sapien nec iaculis viverra. Quisque porta urna eu pharetra tincidunt. Nunc non erat orci. Proin elementum pretium tellus, id blandit mauris gravida ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus gravida tristique orci, et scelerisque urna porta consequat. Vestibulum mattis lacinia purus. Vivamus sagittis turpis sit amet massa convallis, in dictum risus hendrerit. Vivamus ac neque at risus facilisis ornare. Etiam rhoncus nunc sapien, et tincidunt nisl dignissim vel. Sed ut tellus sed odio lacinia posuere sit amet ut est.</p>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Col className="d-flex justify-content-center" md={12}><h3>Title of The Blog Item</h3></Col>
                            <Row>
                                <Col className="d-flex justify-content-center" md={4}><h4>Publisher Name</h4></Col>
                                <Col className="d-flex justify-content-start" md={4}><h4>Date</h4></Col>
                                <Row className="mt-3">
                                    <img
                                        src={CarouselImg}
                                        height="400px"
                                        alt="Blog Img"
                                    />
                                </Row>
                            </Row>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={6}>
                        <Row>
                            <Col className="d-flex justify-content-center" md={12}><h3>Title of The Blog Item</h3></Col>
                            <Row>
                                <Col className="d-flex justify-content-center" md={4}><h4>Publisher Name</h4></Col>
                                <Col className="d-flex justify-content-start" md={4}><h4>Date</h4></Col>
                                <Row className="mt-3">
                                    <img
                                        src={CarouselImg}
                                        height="400px"
                                        alt="Blog Img"
                                    />
                                </Row>
                            </Row>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <p className="BlogDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur nec velit et scelerisque. Fusce convallis auctor mi ut blandit. Sed vitae dapibus nisl. Fusce massa ipsum, iaculis sit amet egestas rhoncus, pharetra a urna. Phasellus euismod, orci eget tempor rhoncus, nibh elit aliquet risus, et dapibus arcu lorem vel leo. Ut quis facilisis nulla. Nam elementum non dui quis efficitur. Praesent sit amet egestas mi, eu suscipit erat. Donec vitae feugiat felis, nec consectetur risus. Praesent molestie laoreet lorem, ac ullamcorper orci accumsan at. Duis efficitur venenatis urna nec eleifend. Curabitur pharetra tortor at posuere lobortis. In urna mi, molestie nec mollis quis, fringilla id urna. Maecenas sodales, ante congue fringilla iaculis, mauris dui vulputate lectus, eget posuere velit leo et urna. Vivamus mattis orci id urna euismod aliquam. Sed pellentesque euismod hendrerit. Donec pellentesque vestibulum fermentum. Nullam eu vulputate orci, id tincidunt massa. Praesent tincidunt sapien nec iaculis viverra. Quisque porta urna eu pharetra tincidunt. Nunc non erat orci. Proin elementum pretium tellus, id blandit mauris gravida ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus gravida tristique orci, et scelerisque urna porta consequat. Vestibulum mattis lacinia purus. Vivamus sagittis turpis sit amet massa convallis, in dictum risus hendrerit. Vivamus ac neque at risus facilisis ornare. Etiam rhoncus nunc sapien, et tincidunt nisl dignissim vel. Sed ut tellus sed odio lacinia posuere sit amet ut est.</p>
                    </Col>
                </Row>
            </Container> */}
        </div>
    )
}

export default ViewBlogItemsComponent