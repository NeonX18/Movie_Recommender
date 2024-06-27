import React ,{useEffect} from 'react';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';
import {Button} from "flowbite-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import {useNavigate} from "react-router-dom";
// import './VideoPlayer.css';

const backButton = ({className}) => {
  return (
    <Button className={className}/>
  )
}

const VideoPlayer = ({id}) => {
  const navigate = useNavigate();
  useEffect(() => {
    async function init() {
      // const manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
      // const manifestUri = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
      // const manifestUri = 'https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd';
    const manifestUri = 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd';
    // const manifestUri = Videoo;


      try {
        const video = document.getElementById('video');
        const ui = video['ui'];
        const controls = ui.getControls();
        const player = controls.getPlayer();

        window.player = player;
        window.ui = ui;

        player.addEventListener('error', onPlayerErrorEvent);
        controls.addEventListener('error', onUIErrorEvent);

        await player.load(manifestUri);
        console.log('The video has now been loaded!');
      } catch (error) {
        onPlayerError(error);
      }
    }

    function onPlayerErrorEvent(errorEvent) {
      onPlayerError(errorEvent.detail);
    }

    function onUIErrorEvent(errorEvent) {
      onPlayerError(errorEvent.detail);
    }

    function onPlayerError(error) {
      console.error('Error code', error.code, 'object', error);
    }


    function initFailed(errorEvent) {
      console.error('Unable to load the UI library!');
    }

    document.addEventListener('shaka-ui-loaded', init);
    document.addEventListener('shaka-ui-load-failed', initFailed);

    return () => {
      document.removeEventListener('shaka-ui-loaded', init);
      document.removeEventListener('shaka-ui-load-failed', initFailed);
    };
  }, []);

return (
    <div className='bg-black w-full h-full mx-auto'>
      <div className='Video-container w-full h-full mx-auto'>
        <button className="absolute w-[5%] h-[10%] z-50 ml-6 mt-2" onClick={() => navigate("/")}>
          <IoMdArrowRoundBack size={32}/>
        </button>
        <ShakaPlayer
          src="https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd"
               // src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
            // src="https://dash.akamaized.net/dash264/TestCasesHD/2b/qualcomm/1/MultiResMPEG2.mpd"
          // src="https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd"
          // src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mpd"
            autoPlay
            id="video"
           className= "w-full h-full"
            castAndroidReceiverCompatible={true}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;








  //   const manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
  //   const manifestUri = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
  //   const manifestUri = 'https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd';
    // const manifestUri = 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mpd';
    // src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
            // src="https://dash.akamaized.net/dash264/TestCasesHD/2b/qualcomm/1/MultiResMPEG2.mpd"
        //   src="https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd"
        // src="https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd"
        // src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.mpd"
