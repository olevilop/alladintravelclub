import CategoryToursPage from "../CategoryToursPage";

const AntarcticaCruisesPage = () => (
  <CategoryToursPage
    tours={[]}
    title={<>Круизы в <span className="italic">Антарктиду</span></>}
    subtitle="К ледяному континенту"
    breadcrumbLabel="Антарктида"
  />
);

export default AntarcticaCruisesPage;
