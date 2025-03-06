import "./assets/styles/reset.css";
import "@mantine/core/styles.css";
import "./assets/styles/global.css";

import { MantineProvider } from "@mantine/core";
import Faq from "./pages/faq/Faq";
function App() {
  return (
    <MantineProvider>
      <Faq />
    </MantineProvider>
  );
}

export default App;
