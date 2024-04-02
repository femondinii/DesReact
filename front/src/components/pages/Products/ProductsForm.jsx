import Container from "../../layout/Container"
import Forms from "../../layout/Forms"
import Inputs from "../../layout/Inputs"
import Select from "../../layout/Select"
import Button from "../../layout/Button"
import { useEffect, useState } from "react";

function ProductsForm() {

    const [options, setOptions] = useState([]);

    const populateSelect = async (e) => {
        try {
            const response = await fetch("http://localhost/8080?action=7");
            const data = await response.json();

            const results = data.map(value => ({
                code: value.code,
                name: value.name
            }));

            setOptions([
                ...results
            ]);

        } catch (error) {
            console.log("error" + error);
        }
    }

    const [products, setProducts] = useState([])

    const valueInput = e => setProducts({ ...products, [e.target.name]: e.target.value });

    const saveProducts = async e => {
        try {
            e.preventDefault();
            console.log(products)
            if (!products.ccode || !products.name || !products.amount || !products.price) {
                alert("Todos os campos devem ser preenchidos");
                return;
            }
            const response = await fetch("http://localhost/8080?action=5", {
                method: "POST",
                body: JSON.stringify(products)
            })

            if (!response.ok) {
                const message = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${message}`);
            }
            const data = await response.json();
            console.log(data)

        } catch (error) {
            console.log("error " + error.message);
        }
    }

    useEffect(() => {
        populateSelect();
    }, []);


    return (
        <Container>
            <Forms>
                <Select
                    id="pcategory"
                    nome="Categorias"
                    name="ccode"
                    options={options}
                    onClick={(e) => populateSelect(e)}
                    onChange={valueInput}
                />
                <Inputs
                    type="text"
                    id="pname"
                    name="name"
                    placeholder="Nome do produto"
                    onChange={valueInput}
                />
                <Inputs
                    type="number"
                    id="pamount"
                    name="amount"
                    placeholder="Quantidade"
                    onChange={valueInput}
                />
                <Inputs
                    type="text"
                    id="pprice"
                    name="price"
                    placeholder="Preço"
                    onChange={valueInput}
                />
                <Button
                    onClick={(e) => saveProducts(e)}
                    id="add"
                    value="Adicionar"
                />
            </Forms>
        </Container>
    )
}

export default ProductsForm