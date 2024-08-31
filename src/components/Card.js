import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let options = props.options;
    let priceOptions = Object.keys(options);
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    let finalPrice = qty * parseInt(options[size]);
    return (
        <div>
            <div>
                <div class="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} class="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div class="card-body">
                        <h5 class="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100'></div>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return <option key={i + 1} value={i + 1}>{i + 1}</option>
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((i) => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </select>
                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
