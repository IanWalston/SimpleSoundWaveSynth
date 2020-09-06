import React from "react";
import SimpleSoundWaveSynthesizer from "./components/SimpleSoundWaveSynthesizer";

const App = () => {
    return (<>
      <SimpleSoundWaveSynthesizer 
        minFreq={40}
        maxFreq={4000}
        defaultFreq={440}
      />
    </>
    );

}

export default App;
