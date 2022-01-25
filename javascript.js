// fetch("http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=6362937d262cd8b3ffed305bf38c075d")
// .then((api) => console.log(api))


async function theApi() {
  const riyadhFetch = await fetch("https://api.openweathermap.org/data/2.5/find?q=Riyadh&appid=6362937d262cd8b3ffed305bf38c075d&lang=ar&units=metric")
  const jeddahFetch = await fetch("https://api.openweathermap.org/data/2.5/find?q=Jeddah&appid=6362937d262cd8b3ffed305bf38c075d&lang=ar&units=metric")
  const riyadh = await riyadhFetch.json()
  const jeddah = await jeddahFetch.json()
  
  // console.log(jeddah)
  // console.log(riyadh)

  const jeddahDiscrp = jeddah.list[0].weather[0].description;
  const riyadhDiscrp = riyadh.list[0].weather[0].description;

  riyadhTemp = Math.round(riyadh.list[0].main.temp)
  jeddahTemp = Math.round(jeddah.list[0].main.temp)
  
  const body = document.querySelector("body")
  const temp = document.querySelector(".wether > p")
  const wetherText = document.querySelector(".wether h3")
  const wether = document.querySelector(".wether")
  const country = document.querySelectorAll(".changer li")
  const icon = document.querySelector(".wether img")
  const countryName = document.querySelector("h1")

  if (localStorage.getItem("active")) {
    if (localStorage.getItem("active") === "riyadh") {
      country.forEach((el) => el.classList.remove("active"))
      country[0].classList.add("active")
    }
    if (localStorage.getItem("active") === "jeddah") {
      country.forEach((el) => el.classList.remove("active"))
      country[1].classList.add("active")
    }
  }else {
    country[0].classList.add("active")
  }

  function checkCountry(count) {
  if (count.textContent == "الرياض") {
    if (riyadhTemp <= 20) {
      body.className = ""
      wether.classList.remove("wether-hot")
      wether.classList.add("wether-cold")
      body.classList.add("body-cold")
      icon.src = "./snowflake.png"

    } else {icon.src = "./snowflake.png"}
    temp.innerHTML = `${riyadhTemp}<span></span>`
    wetherText.textContent = `${riyadhDiscrp}`
    countryName.textContent = "الرياض"

    localStorage.setItem("active","riyadh")

  } else if (count.textContent == "جدة") {

    if (jeddahTemp <= 20) {
      body.className = ""
      wether.classList.remove("wether-hot")
      wether.classList.add("wether-cold")
      body.classList.add("body-cold")
      icon.src = "./snowflake.png"

    } else {

      body.className = ""
      wether.classList.remove("wether-cold")
      wether.classList.add("wether-hot")
      body.classList.add("body-hot")
      icon.src = "./sun.png"
    }

    temp.innerHTML = `${jeddahTemp}<span></span>`
    wetherText.textContent = `${jeddahDiscrp}`
    countryName.textContent = "جدة"
    localStorage.setItem("active","jeddah")

  }
  }
  country.forEach((el) => {
    if (el.classList.contains("active")) {
      checkCountry(el)
    }
    el.onclick = () => {
      country.forEach((el) => el.classList.remove("active"))
      el.classList.add("active")
      checkCountry(el)
    }
  })

}

theApi()

