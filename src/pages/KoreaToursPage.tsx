import CategoryToursPage from "./CategoryToursPage";
import { koreaTours } from "@/data/tours";

const KoreaToursPage = () => (
  <CategoryToursPage
    tours={koreaTours}
    title={<>Туры по <span className="italic">Южной Корее</span></>}
    subtitle="Страна утренней свежести"
    breadcrumbLabel="Туры по Южной Корее"
  />
);

export default KoreaToursPage;
