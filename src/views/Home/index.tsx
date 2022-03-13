import React, { useEffect, useState } from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import useBeacon from 'hooks/useBeacon';
import useTezrun from 'hooks/useTezrun';
import HorseOdds from './components/HorseOdds';
import RaceTimer from './components/RaceTimer';
import PlaceBet from './components/PlaceBet';
import BetTicketCard from './components/BetTicket';
import RacePanel from './components/RacePanel';
import Loader from 'components/Loader';

const unityContext = new UnityContext({
  loaderUrl: "Build/1.loader.js",
  dataUrl: "Build/1.data",
  frameworkUrl: "Build/1.framework.js",
  codeUrl: "Build/1.wasm",
});

const Home = () => {
  const [storage, setStorage] = useState<any>({});
  const {getStorage} = useTezrun();
  const {loading, address} = useBeacon();

  useEffect(() => {
    getStorage(setStorage);
  }, [getStorage, setStorage])

  return (
    <div className="container mx-auto">
      {loading && (
        <Loader />
      )}      
      <div className="px-4 mt-4 md:mt-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-2">
            <HorseOdds></HorseOdds>
          </div>
          <div id="race-footage" className="col-span-12 lg:col-start-3 lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl h-full">
              {/* <Unity className="w-full" unityContext={unityContext} /> */}
            </div>
          </div>
          <div id="race-state-card" className="col-span-12 lg:col-start-11 lg:col-span-2">
            <RaceTimer storage={storage}></RaceTimer>
            <RacePanel unityContext={unityContext}></RacePanel>
          </div>
        </div>
      </div>
      <div className="px-4 my-4 md:mt-8">
        <div className="grid grid-cols-12 gap-4">
          <div id="place-bet-card" className="col-span-12 md-col-span-6 lg:col-span-3">
            <PlaceBet></PlaceBet>
          </div>
          <div className="col-span-12 md-col-span-6 lg:col-start-4 lg:col-span-9">
            <BetTicketCard
              storage={storage}
              userAddress={address}
            ></BetTicketCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
