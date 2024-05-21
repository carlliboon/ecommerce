import { CardGroup } from "react-bootstrap";
import PreviewProduct from "./PreviewProduct";
import { useState, useEffect } from "react";

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4004/b4/products/active")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data:", data);

        if (data.product && data.product.length > 0) {
          const numbers = new Set();
          const featured = [];

          while (numbers.size < 5 && numbers.size < data.product.length) {
            const randomNum = Math.floor(Math.random() * data.product.length);
            numbers.add(randomNum);
          }

          numbers.forEach((num) => {
            featured.push(
              <PreviewProduct
                data={data.product[num]}
                key={data.product[num]._id}
                breakPoint={2}
              />
            );
          });

          setPreviews(featured);
        } else {
          console.warn("No active products found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  console.log("Product previews:", previews);

  return (
    <>
      <h2 className="text-center">Featured Products</h2>
      <CardGroup className="justify-content-center">{previews}</CardGroup>
    </>
  );
}
