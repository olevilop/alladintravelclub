import CategoryToursPage from "../CategoryToursPage";
import { tours } from "@/data/tours";

const AntarcticaCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => t.region === "Антарктида")}
    title={<>Круизы по <span className="italic">Антарктиде</span></>}
    subtitle="К ледяному континенту"
    breadcrumbLabel="Антарктида"
    hideSpecialOfferTag
  />
);

export default AntarcticaCruisesPage;
