import styles from "./HistoryTable.module.css"
import Container from "../../layout/Container"
import Button from "../../layout/Button"
import { useState, useEffect } from "react";
import DetailsTable from "./DetailsTable";

function HistoryTable() {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState([]);
    const [detail, setDetail] = useState([]);

    const getHistory = async () => {
        try {
            await fetch("http://localhost/8080?action=20")
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
        getHistory();
    }, [data])

    const setButton = async (cod) =>{
        setCode(cod);    
        console.log(cod)
        getDetails(cod);
    }

    const getDetails = async (code) => {
        try {
            let cod = {
                "order_code": code
            }
            const response = await fetch("http://localhost/8080?action=23", {
                method: "POST",
                body: JSON.stringify(cod)
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            const data = await response.text();
            const details =JSON.parse(data);
            setDetail(details.records);
            
        } catch (error) {
            console.error("Erro: " + error.message);
        }
    }

    useEffect(() => {
        setButton(code);
    }, [])

    return (
        <Container>
            <div>
                <table className={styles.tbl}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Total</th>
                            <th>Tax</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && Object.values(data).map((history) => (
                            <tr key={history.code_orders}>
                                <td>{history.code_orders}</td>
                                <td>{history.total}</td>
                                <td>{history.tax}</td>
                                <td>
                                    <Button
                                        onClick={(e) => {
                                            setButton(e.target.id)
                                            setOpen(true);
                                        }}
                                        
                                        buttonStyle="cancel"
                                        id={history.code_orders}
                                        value="View"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <DetailsTable 
                details={detail}
                code={code}
                isOpen={open}
                setOpen={setOpen}
            />
        </Container>
    )
}

export default HistoryTable