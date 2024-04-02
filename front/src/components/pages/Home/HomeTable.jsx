import styles from "./HomeTable.module.css"
import { useState, useEffect } from "react";
import Button from "../../layout/Button";
import Container from "../../layout/Container";
import Inputs from "../../layout/Inputs";

function HomeTable() {

    const [data, setData] = useState([]);

    const getCart = async () => {
        try {
            await fetch("http://localhost/8080?action=12")
                .then(res => res.text())
                .then((response) => {
                    const jsonResponse = JSON.parse(response);
                    setData(jsonResponse.records);
                });

        } catch (error) {
            console.log("error" + error.message);
        }
    }

    useEffect(() => {
        getCart();
    }, [data])

    const deleteCart = async (id) => {
        try {
            let cod = {
                "id": id
            }

            await fetch("http://localhost/8080?action=13", {
                method: "DELETE",
                body: JSON.stringify(cod)
            })
                .then(res => res.text())
                .then(cod => {
                    console.log(cod);
                });
        } catch (error) {
            console.log("error" + error.message);
        }
        getCart();
    }

    const calculateTotal = () => {
        let total = 0;
        for (const cartId in data) {
          if (data.hasOwnProperty(cartId)) {
            total += parseFloat(data[cartId].total);
          }
        }
        return total.toFixed(2);
    };

    
    const calculateTaxa = () => {
        let ttaxa = 0;
        for (const cartId in data) {
          if (data.hasOwnProperty(cartId)) {
            ttaxa += parseFloat(data[cartId].total_taxa);
          }
        }
        return ttaxa.toFixed(2);
    };

    const deleteAllCart = async () => {
        try {
            await fetch("http://localhost/8080?action=18",{
                method: "GET"
            })
                then(res => res.json())
                .then(cod => {
                    console.log(cod);
                });
        } catch (error) {
            console.log("error" + error.message);
        }
        getCart();
    }

    const setHistory = async () => {
        try {
            await fetch("http://localhost/8080?action=19",{
                method: "GET"
            })
                then(res => res.json())
                .then(cod => {
                    console.log(cod);
                });
        } catch (error) {
            console.log("error" + error.message);
        }
        deleteAllCart();
    }

    const removeStock = async () => {
        try {
            await fetch("http://localhost/8080?action=15",{
                method: "GET"
            })
                then(res => res.json())
                .then(cod => {
                    console.log(cod);
                });
        } catch (error) {
            console.log("error" + error.message);
        }
    }

    const setDetails = async () => {
        try {
            await fetch("http://localhost/8080?action=22",{
                method: "GET"
            })
                then(res => res.json())
                .then(cod => {
                    console.log(cod);
                });
        } catch (error) {
            console.log("error" + error.message);
        }
        deleteAllCart();
    }

    return (
        <Container>
            <div>
                <table className={styles.tbl}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && Object.values(data).map(cart => (
                            <tr key={cart.id}>
                                <td>{cart.name_prod}</td>
                                <td>{cart.price}</td>
                                <td>{cart.amount_temp}</td>
                                <td>{cart.total}</td>
                                <td>
                                    <Button
                                        onClick={() => deleteCart(cart.id)}
                                        buttonStyle="cancel"
                                        id="delete"
                                        value="Deletar"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.buttons}>
            <label>Tax:</label>
                <Inputs 
                    id="ttaxa"
                    inputStyle="home"
                    disabled={true}
                    value={calculateTaxa()}
                />
                <label>Total:</label>
                <Inputs 
                    id="ttotal"
                    inputStyle="home" 
                    disabled={true} 
                    value={calculateTotal()}
                />
                <div className={styles.buttons}>
                <Button 
                    buttonStyle="cancel"
                    id="cancel"
                    value="Cancelar"
                    onClick={deleteAllCart}
                />
                <Button 
                    buttonStyle="finish"
                    id="finish"
                    value="Finalizar"
                    onClick={() => {
                        setHistory();
                        removeStock();
                        setDetails();
                    }}
                />
            </div>
            </div>
        </Container>

    )
}

export default HomeTable