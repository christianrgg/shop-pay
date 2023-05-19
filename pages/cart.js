import { useDispatch, useSelector } from "react-redux";
import Empty from "../components/cart/empty";
import Header from "../components/cart/header/index";
import styles from "../styles/cart.module.scss"
import Product from "../components/cart/product";
import { updateCart } from "../store/cartSlice";
import CartHeader from "../components/cart/cartHeader";
import Checkout from "../components/cart/checkout";
import { useState } from "react";
import { useEffect } from "react";
import PaymentMethods from "../components/cart/paymentMethods";
import ProductsSwipper from '../components/productsSwipper';
import { women_swiper } from '../data/home';
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import { saveCart } from "../request/user";
import axios from "axios";

export default function Cart() {
  const Router = useRouter();
  const {data: session} = useSession();
  const [selected, setSelected] = useState([]);
  const {cart} = useSelector((state) => ({...state}));
  const dispach = useDispatch();
  //------
  const [shippingFee, setShippinFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  // useEffect(()=>{
  //   const update = async () => {
  //     const {data} = await axios.post("/api/updateCart", {
  //       products: cart.cartItems,
  //     });
  //     dispach(updateCart(data));
  //   }
  //   if(cart.cartItems.length>0){
  //     update();
  //   }
  // },[cart.cartItems, dispach]);
  useEffect(()=>{
    setShippinFee(selected.reduce((a,c)=> a + c.shipping, 0).toFixed(2));
    setSubtotal(selected.reduce((a,c)=> a + c.price*c.qty, 0).toFixed(2));
    setTotal((parseFloat(selected.reduce((a,c)=> a + c.price*c.qty, 0) + shippingFee).toFixed(2)));
  },[selected, shippingFee]);
  //------
  const saveCartToDbHandler = async () => {
    if(session) {
      const res = saveCart(selected, session.user.id);
      Router.push("/checkout");
    } else {
      signIn()
    }
  };
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
              subtotal={subtotal} 
              shippingFee={shippingFee} 
              total={total} 
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
              />
              <PaymentMethods/>
            </div> 
            ): ( 
                <Empty/>
                )}

          <ProductsSwipper products={women_swiper} />
        </div>
    </>
  );
}
