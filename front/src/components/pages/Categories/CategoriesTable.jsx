import { useState, useEffect } from "react"
import styles from "./CategoriesTable.module.css"
import Button from "../../layout/Button";

function CategoriesTable() {

    const [data, setData] = useState([]);

    const getCategory = async () => {
        try {
            await fetch("http://localhost/8080?action=2")
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
        getCategory();
    },[data])

    const deleteCategory = async (code) => {
        try {
            let cod = {
                "code": code
            }
        
            await fetch("http://localhost/8080?action=4",{
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
        getCategory();
    }

    return (
        <div>
            <table className={styles.tbl}>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Category</th>
                        <th>Tax</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && Object.values(data).map(category => (
                        <tr key={category.code}>
                            <td>{category.code}</td>
                            <td>{category.name}</td>
                            <td>{category.tax}</td>
                            <td>
                                <Button 
                                    onClick={() => deleteCategory(category.code)}
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

export default CategoriesTable
