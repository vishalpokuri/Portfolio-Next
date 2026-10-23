import Home from "../views/Home";
import Container from "../components/cards/Container";

export default function HomePage() {
  return (
    <div className="min-h-screen py-8">
      <Container>
        <Home />
      </Container>
    </div>
  );
}
