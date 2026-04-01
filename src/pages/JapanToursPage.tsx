import CategoryToursPage from "./CategoryToursPage";
import { japanTours } from "@/data/tours";

const JapanToursPage = () => (
  <CategoryToursPage
    tours={japanTours}
    title={<>Туры по <span className="italic">Японии</span></>}
    subtitle="Откройте для себя страну восходящего солнца"
  />
);

export default JapanToursPage;
