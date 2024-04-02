import Container from "../../layout/Container"
import Forms from "../../layout/Forms"
import Inputs from "../../layout/Inputs"
import Button from "../../layout/Button"
import { useState } from "react"

function CategoriesForm() {

    const [category, setCategory] = useState([])

    const valueInput = e => setCategory({...category, [e.target.id]: e.target.value});

    const saveCategory = async e =>{ 
        try {  
            e.preventDefault();
            if(!category.name || !category.tax){
                alert("Todos os campos devem ser preenchidos");
                return;
            }
            await fetch("http://localhost/8080?action=1", {
                method: "POST",
                body: JSON.stringify(category)
            })
                .then(res => {
                    return res.json() 
                })
                .then(data => {
                    console.log(data);
                });
        } catch (error) {
            console.log("error " + error.message);
        }
    }

    return (
        <Container>
            <Forms>
                <Inputs 
                    type="text"
                    id="name"
                    placeholder="Nome da Categoria"
                    onChange={valueInput}
                />
                <Inputs 
                    type="number"
                    id="tax"
                    placeholder="Taxa"
                    onChange={valueInput}
                />
                <Button 
                    onClick={(e) => saveCategory(e)}
                    id="add"
                    value="Adicionar"
                />
            </Forms>
        </Container>
    )
}

export default CategoriesForm

