import CategoryToursPage from "../CategoryToursPage";

const AsiaCruisesPage = () => (
  <CategoryToursPage
    tours={[]}
    title={<>Круизы по <span className="italic">Азии</span></>}
    subtitle="От Японии до Юго-Восточной Азии"
    breadcrumbLabel="Азия"
  />
);

export default AsiaCruisesPage;
