import Container from "../../layout/Container"
import HomeForm from "./HomeForm"
import HomeTable from "./HomeTable"

function Home(){
    return (
        <Container>
            <HomeForm />
            <HomeTable />
        </Container>
    )
}

export default Home

