import { recommendedEvents, popularEvents } from "@shared/mocks/events";
import { CardsList } from "@entities/event";

import * as Styles from "./styles";

export default function Home() {
  return (
    <main>
      <Styles.Section>
        <CardsList title={'Recommended for you'} events={recommendedEvents} />
      </Styles.Section>

      <Styles.Section>
        <CardsList title={'Popular events'} events={popularEvents} />
      </Styles.Section>
    </main>
  );
}
