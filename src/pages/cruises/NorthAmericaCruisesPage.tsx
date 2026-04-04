import CategoryToursPage from "../CategoryToursPage";

const NorthAmericaCruisesPage = () => (
  <CategoryToursPage
    tours={[]}
    title={<>Круизы в <span className="italic">Северную Америку</span></>}
    subtitle="От Аляски до Карибских островов"
    breadcrumbLabel="Северная Америка"
  />
);

export default NorthAmericaCruisesPage;
