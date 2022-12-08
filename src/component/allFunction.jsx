export function downloadNewCsvFile(array) {
    let allKay = [];
    for(let data in array[0]){
        allKay.push(data)
    }
    
    console.log("allKay = ", allKay);

    let arrayToFile = array.map((item, i)=>{
        let arr = [];
        for(let data in item){
            arr.push(item[data])
        }
        return arr;
    })

    arrayToFile.splice(0,0,allKay)
    console.log("arrayToFile = ", arrayToFile);
    
    let csvContent = "data:text/csv;charset=utf-8,";

    arrayToFile.forEach((rowArray)=> {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    console.log("csvContent = ", csvContent);
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); 
    link.click();
}



export function readFile(e, setAllCity) {
    const input = e.target.files[0];
    console.log(input);
    const reader = new FileReader();

    reader.onload = async  function (input) {
        const text = input.target.result;
        let arrayRow = getRow(text);
        let arrayValue = getArrayDataAsObject(arrayRow);
        getWeather(arrayValue, setAllCity)
    };
  reader.readAsText(input);
}




function getArrayDataAsObject(array) {
    let arr = [];

    for (let i = 0; i < array.length; i++) {
        arr[i] = [];
        let string = array[i];
        let start = 0;
        let end = 0;
        let value;

        while (end != -1) {
            console.log(string);
            end = string.indexOf(",", start);

            if(end != -1){
                value = string.substring(start, end);
            }else{
                value = string.substring(start);
            }

            arr[i].push(value);
            start = (end + 1);
        }
    }

    let arrOfObject = []
    for (let i = 1; i < arr.length; i++) {
        let object ={};
        for (let j = 0; j < arr[0].length; j++) {
            // console.log(arr[0][j]);
            object[arr[0][j]] = arr[i][j]
        }
        arrOfObject.push(object)
    }
    return arrOfObject;
}


function getRow(string) {
    let array = [];
    let start = 0;
    let end = 0;
    let value = "";

    while (end != -1) {
        end = string.indexOf("\n", start)

        if(end == -1){
            value = string.substring(start, string.length)
        }else{
            value = string.substring(start, end)
            let remove = value.indexOf("\r")
            value = value.substring(0, remove)
        }

        array.push(value);
        start = (end + 1);
    }
    return array;
}


async function getWeather(arrayValue, setAllCity) {
    let copyarrayValue = [...arrayValue]
    let data;
    for(let i = 0; i < copyarrayValue.length; i++){
        if(copyarrayValue[i].city && copyarrayValue[i].country){
            data = await weatherCityAndCountry(copyarrayValue[i].city, copyarrayValue[i].country);
        }
        else if(copyarrayValue[i].city){
            data = await weatherCity(copyarrayValue[i].city);
        }
        else if(copyarrayValue[i]["zip code"]){
            data = await weatherZipeCode(copyarrayValue[i]["zip code"]);
        } 
        copyarrayValue[i].temp = data.main.temp;
        copyarrayValue[i].wind_speed = data.wind.speed;
        copyarrayValue[i].clouds = data.clouds.all + "%";
    }
    setAllCity(copyarrayValue);
}


function weatherCity(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b9e36b1027bc27260d2bc59873e4678b`)
    .then(data=>{return data.json()})
    .then(data=>{
        return data;
    })
}

function weatherZipeCode(zip) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=metric&appid=b9e36b1027bc27260d2bc59873e4678b`)
    .then(data=>{return data.json()})
    .then(data=>{
        return data;
    })
}

function weatherCityAndCountry(city, country) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=b9e36b1027bc27260d2bc59873e4678b`)
    .then(data=>{return data.json()})
    .then(data=>{
        return data;
    })
}
