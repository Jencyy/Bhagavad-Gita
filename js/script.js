let chepter = document.getElementById('chepter');
let chshlok = document.getElementById('ch-shlok');

const myHeader = new Headers();
// book start
let currentPage = 1;

function toggleClass(e, toggleClassName) {
  if (e.className.includes(toggleClassName)) {
    e.className = e.className.replace(' ' + toggleClassName, '');
  } else {
    e.className += ' ' + toggleClassName;
  }
}

function movePage(e, page) {
  if (page == currentPage) {
    currentPage += 2;
    toggleClass(e, "left-side");
    toggleClass(e.nextElementSibling, "left-side");

  }
  else if (page = currentPage - 1) {
    currentPage -= 2;
    toggleClass(e, "left-side");
    toggleClass(e.previousElementSibling, "left-side");
  }
}

const getshlok = (chapterNumber, shlokNumber) => {
  fetch(`https://bhagavadgitaapi.in/slok/${chapterNumber}/${shlokNumber}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      chshlok.innerHTML = `<div class="shlok">${data.slok}</div>
                      <div class="tej mt-4">${data.tej.author}</div>
                          <div class="tej mt-1">${data.tej.ht}</div>
                          <div class="tej mt-4">${data.siva.author}</div>
                          <div class="tej mt-1">${data.siva.et}</div> 
                           <div class="tej mt-1">${data.siva.ec}</div>`;


    })
    .catch((err) => console.log(err));
} 

//book end4
const chept = async () => {
  await fetch('https://bhagavadgitaapi.in/chapters', {
    method: "GET",
    mode: 'cors',
    headers: myHeader
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((ele) => {
        chepter.innerHTML += `<div class="d-flex justify-content-between mt-4">
        <div class="des col-6" >
            <div class="ch-num">अध्याय : ${ele.chapter_number}</div>
            <div class="chepter-name">नाम :${ele.name}</div>
            <div class="ch-meaning">अध्यायार्थः : ${ele.meaning.hi}</div>
            <div class="ch-verse">श्लोक संख्या : ${ele.verses_count}</div>
        </div>
        <div class="col-4">
        <lable class="ms-auto">Enter shlok number</lable>
        <input type="number" class="shlok-number mybtn w-50px bg-transparent text-dark" data-initial-value="" onfocus="storeInitialValue(this)" onblur="resetToInitialValue(this)" oninput="getshlok(${ele.chapter_number}, this.value)"></div>
       
        
    </div>`

      });
    })
    .catch((err) => {
      console.log("err chet", err);
    });
}
function storeInitialValue(input) {
  input.dataset.initialValue = input.value;
}


function resetToInitialValue(input) {
  input.value = input.dataset.initialValue;
}

chept();
