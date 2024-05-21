import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewProduct(props) {
  const { breakPoint, data } = props;
  const { _id, productName, productDescription, price, imageUrl } = data;

  return (
    <Col xs={12} md={breakPoint}>
      <Card className="cardHighlight">
        {imageUrl && (
          <Card.Img
            variant="top"
            src={`http://localhost:4004/${imageUrl}`}
            alt={productName}
          />
        )}
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/products/${_id}`}>{productName}</Link>
          </Card.Title>
          {/* Uncomment the following line if you want to show product description */}
          {/* <Card.Text>{productDescription}</Card.Text> */}
        </Card.Body>
        <Card.Footer>
          <h5 className="text-center">{price}</h5>
          <Link className="btn btn-primary d-block" to={`/products/${_id}`}>
            Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}
