import Container from "../../layout/Container"
import CategoriesForm from "./CategoriesForm"
import CategoriesTable from "./CategoriesTable"

function Categories(){
    return (
        <Container>
            <CategoriesForm />
            <CategoriesTable />
        </Container>
    )
}

export default Categories