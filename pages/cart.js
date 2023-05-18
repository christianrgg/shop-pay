import { useDispatch, useSelector } from "react-redux";
import Empty from "../components/cart/empty";
import Header from "../components/cart/header/index";
import styles from "../styles/cart.module.scss"
import Product from "../components/cart/product";
import CartHeader from "../components/cart/cartHeader";
import Checkout from "../components/cart/checkout";
import { useState } from "react";
import { useEffect } from "react";

export default function Cart() {
  const [selected, setSelected] = useState([]);
  const {cart} = useSelector((state) => ({...state}));
  const dispach = useDispatch();
  useEffect(()=>{
    //dispach
  },[]);
  console.log("Selected->",selected);
    return (
    <>
        <Header/>
        <div className={styles.cart}>
            {cart.cartItems.length > 0 ? (
            <div className={styles.cart__container}>
              <CartHeader 
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
              />
              <div className={styles.cart__products}>
                {
                  cart.cartItems.map((product)=>(
                    <Product 
                    product={product} 
                    key={product._uid}
                    selected={selected}
                    setSelected={setSelected}
                    /> 
                  ))
                }
              </div>
              <Checkout 
              subtotal="5458" 
              shippingFee="0" 
              total="5458" 
              selected={[]}/>
            </div> 
            ): ( 
                <Empty/>
                )}
        </div>
    </>
  );
}
