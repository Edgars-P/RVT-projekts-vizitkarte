

document.querySelector(".flipbtn").addEventListener("click", () => {
  const c = document.querySelector(".card")

  // sāk animāciju
  c.classList.add("flip")

  setTimeout(() => {

    // Tad kad kārts ir paslēpta 
    // nomaini pusi
    if(c.classList.contains("side1")) {
      c.classList.replace("side1", "side2")
    } else {
      c.classList.replace("side2", "side1")
    }

    // Sāc animāciju lai atklātu
    c.classList.remove("flip")
    
  }, 500);

})