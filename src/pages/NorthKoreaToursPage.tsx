import CategoryToursPage from "./CategoryToursPage";
import { northKoreaTours } from "@/data/tours";

const NorthKoreaToursPage = () => (
  <CategoryToursPage
    tours={northKoreaTours}
    source="northKoreaTours"
    title={<>Туры по <span className="italic">Северной Корее</span></>}
    subtitle="Самая закрытая страна мира"
    breadcrumbLabel="Туры по Северной Корее"
  />
);

export default NorthKoreaToursPage;
