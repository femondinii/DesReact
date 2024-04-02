import Container from "../../layout/Container"
import Forms from "../../layout/Forms"
import Inputs from "../../layout/Inputs"
import Select from "../../layout/Select"
import Button from "../../layout/Button"
import styles from "./HomeForm.module.css"
import { useState, useEffect } from "react"

function HomeForm() {

    const [options, setOptions] = useState([]);
    const [cart, setCart] = useState([]);

    const populateSelect = async (e) => {
        try {
            const response = await fetch("http://localhost/8080?action=11");
            const data = await response.json();

            const results = data.map(value => ({
                code: value.code_prod,
                name: value.name_prod
            }));

            setOptions([
                ...results
            ]);

        } catch (error) {
            console.log("error" + error);
        }
    }

    const valueInput = e => {
        const { name, value } = e.target;
        setCart({ ...cart, [name]: value });
    };

    const saveCart = async e => {
        try {
            e.preventDefault();
            console.log(cart)
            if (!cart.code || !cart.amount) {
                alert("Todos os campos devem ser preenchidos");
                return;
            }

            const response = await fetch("http://localhost/8080?action=9", {
                method: "POST",
                body: JSON.stringify(cart)
            })
            const data = await response.text();
            console.log(data)

        } catch (error) {
            console.log("error " + error.message);
        }
    }

    const completeInput = async (e) =>{
        try {
            const inputTax = document.querySelector("#htax");
            const inputPrice= document.querySelector("#hprice");
            var selectProd = document.querySelector("#hproduct").value;
            
            const data = await fetch("http://localhost/8080?action=10");
            const res = await data.json();
            console.log(res)
            for(let i = 0; i < res.data.length; i++){
                if(selectProd == res.data[i]['code_prod']){
                    inputTax.value = res.data[i]['tax'];
                    inputPrice.value = res.data[i]['price'];
                }
            }

            setCart({...cart, code: selectProd,tax: inputTax.value, price: inputPrice.value});

        } catch (error) {
            console.log("error" + error.message);
        }
    }

    useEffect(() => {
        populateSelect();
    }, []);

    return (
        <Container>
            <Forms>
                <Select 
                    id="hproduct"
                    nome="Produtos"
                    name="code"
                    options={options}
                    onClick={(e) => populateSelect(e)}
                    onChange={(e) => {
                        completeInput(e);
                        valueInput;
                    }}
                />
                <Inputs 
                    type="number"
                    id="hmount"
                    name="amount"
                    placeholder="Quantidade"
                    onChange={valueInput}
                />
                <Inputs 
                    type="number"
                    id="htax"
                    name="tax"
                    placeholder="Taxa"
                    onChange={valueInput}
                />
                <Inputs 
                    type="number"
                    id="hprice"
                    name="price"
                    placeholder="Preço"
                    onChange={valueInput}
                />
                <Button 
                    onClick={(e) => saveCart(e)}
                    className={styles.add}
                    id="add"
                    value="Adicionar"
                />
            </Forms>
        </Container>
    )
}

export default HomeForm