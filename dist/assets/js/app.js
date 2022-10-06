// Calc age and career
const career = document.querySelector(".career");
const age = document.querySelector(".age");
const careerStart = 2012;
const currentYear = new Date().getFullYear();
age.innerText = getAge("1993/03/09");
career.innerText = currentYear - careerStart;

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
    age--;
  }

  return age;
} // Typing effect


let i = 0;
const txt = "Marcus Vinicius";
const speed = 100;

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".typing").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();