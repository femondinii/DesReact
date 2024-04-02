import Container from "../../layout/Container";
import styles from "./DetailsTable.module.css"
import { useState, useEffect } from "react";

function DetailsTable({ isOpen, setOpen, details, code }) {

    useEffect(()=>{
        console.log(details)
        console.log(details[1])
    },[details]);

    if (isOpen) {
        return (
            <Container>
                <div className={styles.modal} id="modal">
                    <div className={styles.modal_content}>
                        <span onClick={() => setOpen(false)}>&times;</span>
                        <table className={styles.tbl}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Unit price</th>
                                    <th>Amount</th>
                                    <th>Tax</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details[code] && Object.values(details[code]).map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.name_prod}</td>
                                        <td>{record.price}</td>
                                        <td>{record.amount}</td>
                                        <td>{record.tax}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        )
    } else {
        return null;
    }
}

export default DetailsTable