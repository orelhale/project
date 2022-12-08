import "./MainApp.css"
import { readFile} from "./allFunction"
import { useEffect, useState, useRef } from "react"
import LogoWaitingToServer from "./logoWaitingToServer/LogoWaitingToServer"
import BasicTable from "./BasicTable";

function MainApp() {

    let [allCity, setAllCity] = useState(null);
	let [showLogo, setShowLogo] = useState(false);
	let ref = useRef();

    useEffect(()=>{
        if(allCity){
            console.log("allCity = ",allCity);
            setShowLogo(false);
        }
    },[allCity])


    return(
        <div>
            <input ref={ref} type="file" id="e" accept=".csv" onChange={(e)=>{readFile(e, setAllCity); setShowLogo(true);}}/>
            <br />
            <button onClick={() => {ref.current.click()}}>fdfzdfc</button>

            {showLogo && <LogoWaitingToServer/>}
            {allCity && <BasicTable allCity={allCity}/>}
        </div>
    )
}

export default MainApp;