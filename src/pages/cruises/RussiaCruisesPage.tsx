import CategoryToursPage from "../CategoryToursPage";

const RussiaCruisesPage = () => (
  <CategoryToursPage
    tours={[]}
    title={<>Круизы по <span className="italic">России</span></>}
    subtitle="Речные и морские маршруты по России"
    breadcrumbLabel="Россия"
  />
);

export default RussiaCruisesPage;
