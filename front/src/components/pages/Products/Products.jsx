import Container from "../../layout/Container"
import ProductsForm from "./ProductsForm"
import ProductsTable from "./ProductsTable"

function Products(){
    return (
        <Container>
            <ProductsForm />
            <ProductsTable />
        </Container>
    )
}

export default Products