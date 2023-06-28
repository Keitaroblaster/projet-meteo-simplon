const apiKey = "f9d6e8137088016d70a2007dc8fd4d24";  // déclaration constante globale clé API 

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&lang=fr&units=metric"; // déclaration globale de l'url API qui servira à récupérer les données météo à distance

const iconMeteo = document.querySelector(".icons_meteo");   // déclaration constante global correspondant à la class icons_meteo sur la fichier HTML

var city = " "; // déclaration variable globale nulle 

async function chargerMeteo(){ 
            
    await fetch("./data/config.json") // méthode pour récupérer la valeur ville dans le fichier config.json
    .then (function (response){
     return response.json();    // retour de la valeur
     })
    .then (function (data) { 
    //console.log(data);  
    city= data.ville;   // nouvelle valeur de la variable city 
    //console.log(city);  
    })

    const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`); // méthode fetch pour aller chercher les données météo de la ville à distance
    var data = await response.json();   // attente réponse des données json
    //console.log(data);
    document.querySelector(".temperature").innerHTML = Number.parseFloat(data.main.temp).toFixed(1) + "°C"; // méthode querySelector de la class température, remplacement de la valeur nulle par la nouvelle avec une décimale et concaténation du symbole
    document.querySelector(".ville").innerHTML = data.name; // méthode querySelector de la classe ville, remplacement de la valeur nulle par la nouvelle
    document.querySelector(".humidite").innerHTML = Math.round(data.main.humidity) + "%"; // méthode querySelector de la class humidite remplacement de la valeur nulle à l'arrondie supérieur ou inférieur et concaténation du symbole
    document.querySelector(".ressenti").innerHTML = Number.parseFloat(data.main.feels_like).toFixed(1) + "°C"; // même méthode que pour la température

    if(data.weather[0].main == "Clear"){    // condition pour afficher l'icone météo correspondante 
        iconMeteo.src = "icons_meteo/sun_01d.png";
    }else if (data.weather[0].main == "Thunderstorm"){
        iconMeteo.src = "icons_meteo/storm_11d.png";
    }else if (data.weather[0].main == "Snow"){
        iconMeteo.src = "icons_meteo/snow_13d.png";
    }else if (data.weather[0].main == "Rain"){
        iconMeteo.src = "icons_meteo/rain_10d.png";
    }else if (data.weather[0].main == "Mist"){
        iconMeteo.src = "icons_meteo/mist_50d.png";
    }else if (data.weather[0].main == "Clouds"){
        iconMeteo.src = "icons_meteo/few_clouds_02d.png";
    }else if(data.weather[0].main == "Drizzle"){
        iconMeteo.src = "icons_meteo/drizzle.09d.png";
    }

}
chargerMeteo()  // on affiche une 1ère fois les données météo recueillies de la ville sélectionnée

var interval = setInterval(function(){  // rafraichissement des données météo de la ville concernée toutes les heures
chargerMeteo();
},3600000);
