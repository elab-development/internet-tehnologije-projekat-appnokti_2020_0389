import React, {useEffect} from 'react';
import Naslov from "../components/Naslov";
import {Card, ListGroup, Row} from "react-bootstrap";

const Products = () => {

    //url https://makeup-api.herokuapp.com/api/v1/products.json?product_type=nail_polish

    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        fetch("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=nail_polish")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <Naslov title="Preporuceni Proizvodi" subtitle=""/>
            <Row>

                {
                    products && products.map((product) => {

                        let price = product.price + " ";
                        let price_sign = product.price_sign ? product.price_sign : "$";
                        let currency = product.currency ? " (" + product.currency + ")" : " (USD)";
                        let price_label = price + price_sign + currency;

                        let description = product.description && product.description.length > 150 ? product.description.substring(0, 150) + "..." : product.description;

                        return (
                            <Card className="m-3" style={
                                {
                                    width: '18rem',
                                }
                            }>
                                <Card.Img variant="top" className="img img-thumbnail" src={"https:"+product.api_featured_image}/>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        {description}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{price_label}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link style={
                                        {
                                            textDecoration: "none",
                                            color: "#b13477",
                                        }
                                    } href={product.product_link}>Link ka proizvodu</Card.Link>
                                    <Card.Link style={
                                        {
                                            textDecoration: "none",
                                            color: "#b13477",
                                        }
                                    }  href={product.website_link}>Link ka sajtu</Card.Link>
                                </Card.Body>
                            </Card>
                        )
                    })
                }



            </Row>
        </>
    );
};

export default Products;