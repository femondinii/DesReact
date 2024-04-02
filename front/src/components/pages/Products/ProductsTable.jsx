import styles from "./ProductsTable.module.css"
import { useEffect, useState } from "react"
import Button from "../../layout/Button";

function ProductsTable() {

    const [data, setData] = useState([]);

    const getProducts = async () => {
        try {
            await fetch("http://localhost/8080?action=6")
            .then(res => res.text())
            .then((response) => {
                const jsonResponse = JSON.parse(response);
                setData(jsonResponse.records);
            });
            
        } catch (error) {
            console.log("error" + error.message);
        }
    }

    useEffect(() =>{
        getProducts();
    },[data])

    const deleteProducts = async (code_prod) => {
        try {
            let cod = {
                "code_prod": code_prod
            }
        
            await fetch("http://localhost/8080?action=8",{
                method: "DELETE",
                body: JSON.stringify(cod)
            })
                .then(res => res.json())
                .then(cod => {
                    console.log(cod);
                });
        } catch (error) {
            console.log("error" + error.message);
        }
        getProducts();
    }

    return (
        <div>
            <table className={styles.custumers}>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Unit Price</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && Object.values(data).map(products => (
                            <tr key={products.code_prod}>
                                <td>{products.code_prod}</td>
                                <td>{products.name_prod}</td>
                                <td>{products.amount}</td>
                                <td>{products.price}</td>
                                <td>{products.name}</td>
                                <td>
                                <Button 
                                    onClick={() => deleteProducts(products.code_prod)}
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
    )
}

export default ProductsTable