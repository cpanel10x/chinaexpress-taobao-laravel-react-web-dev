import React from "react";

function OrderITemRow({ currency, item }) {
    return (
        <tr>
            <td>
                <img
                    src={item.image}
                    style={{
                        width: "100px"
                    }}
                    alt=""
                />
            </td>
            <td> {item.name} </td>
            <td> {item.quantity}</td>
            <td> {`${currency} ${item.product_value}`}</td>
            <td> {`${currency} ${item.first_payment}`}</td>
            <td> {`${currency} ${item.due_payment}`}</td>
        </tr>
    );
}

export default OrderITemRow;
