import CategoryToursPage from "../CategoryToursPage";

const ArcticCruisesPage = () => (
  <CategoryToursPage
    tours={[]}
    title={<>Круизы в <span className="italic">Арктику</span></>}
    subtitle="Путешествия к вершине мира"
    breadcrumbLabel="Арктика"
  />
);

export default ArcticCruisesPage;
