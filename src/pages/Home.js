import Banner from "../components/Layout/Banner";
import FeaturedProducts from "../components/Product/FeaturedProducts";
import AddProduct from "../components/Product/AddProduct";

export default function Home() {
  // const data = {
  //   title: "Title",
  //   content: "Content",
  //   destination: "/products",
  //   label: "label",
  // };

  return (
    <>
      <Banner />
      <FeaturedProducts />
      {/* <AddProduct /> */}
    </>
  );
}
