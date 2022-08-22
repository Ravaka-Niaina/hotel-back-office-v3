import styled from "@emotion/styled";

const red = "#d93125"

const Container = styled.div(`
    backgroundColor:red;
    position:relative;
    background-color:rgba(0, 0, 0, .9);
    min-height: 100vh;
    padding: 50px;
    font-size: 19px;
    font-weight: 600;
    p{
        color:white;
    }
`)
const Close = styled.div(`
    position: absolute;
    color: white;
    top: 20px;
    right: 20px;
    cursor: pointer;
`)
const Test = () => {
    const a = ''
    return (
        <Container>
            <Close>X</Close>
            <p style={{ color: 'white' }}>Compiled with problems :</p>
            <br />
            <p style={{ color: red }}>ERRORS</p>
            <p>[ react-leaflet ]</p>
            <br />
            <p>Cannot find module (from ./node_modules/react-leaflet/lib/index.js)</p>
            <p>Cannot find module (from ./node_modules/react-leaflet/lib/Circle.js)</p>
            <p>Cannot find module (from ./node_modules/react-leaflet/lib/CircleMarker.js)</p>
            <p>Cannot find module (from ./node_modules/react-leaflet/lib/MapContainer.js)</p>
            <p>Cannot find module (from ./node_modules/react-leaflet/lib/Pane.js)</p>
            <p>Cannot find module (from ./node_modules/react-leaflet/lib/Popup.js)</p>
            <p>Cannot find module (from ./node_modules/react-leaflet/lib/TileLayer.js)</p>
            <br />
            <p> <span style={{ color: red }}>!!!</span> Restart your computer or use an another device to launch your project.</p>
            <br />
            <p style={{ color: red }}>ERRORS</p>
            <p>[ node_modules ]</p>
            <br />
            <p>Module build failed (from ./node_modules/babel-loader/lib/index.js)</p>
            <p>Module build failed (from ./node_modules/babel-loader/lib/start.js)</p>
            <p>Module build failed (from ./node_modules/utila/util/cap.js)</p>
            <p>Module build failed (from ./node_modules/inspect/secret/lib/index.js)</p>
            <p>Module build failed (from ./node_modules/@tabul-start/bin/load.js)</p>
            <p>Module build failed (from ./node_modules/atomicity/lib/start.js)</p>
            <p>Module build failed (from ./node_modules/yargs/lib/index.js)</p>
            <p>Module build failed (from ./node_modules/axios/lib/axios.js)</p>
            <p>Module build failed (from ./node_modules/atob/bin/atob.js)</p>
            <br />
        </Container>
    );
}

export default Test;