import CategoryToursPage from "./CategoryToursPage";
import { eventTours } from "@/data/tours";

const EventToursPage = () => (
  <CategoryToursPage
    tours={eventTours}
    title={<>Событийные <span className="italic">туры</span></>}
    subtitle="Карнавалы, фестивали и главные события мира"
    breadcrumbLabel="Событийные туры"
  />
);

export default EventToursPage;
