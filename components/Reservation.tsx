import FormCard from "./FormCard";
import Rail from "./Rail";

/** Reservation section (Spec §Page Structure 5). Form card + "why join" rail. */
export default function Reservation() {
  return (
    <section className="reserve block" id="reservar" aria-labelledby="reservar-title">
      <h2 id="reservar-title" className="sr-only">
        Reserve seu lugar na coleção de estreia
      </h2>
      <div className="wrap">
        <div className="formGrid">
          <FormCard />
          <Rail />
        </div>
      </div>
    </section>
  );
}
