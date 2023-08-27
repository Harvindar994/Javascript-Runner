


function myname(first, mid, last) {
    console.log(`Your Name:
    first: ${first} <br>
    mid: ${mid} <br>
    last: ${last}`);
}


document.querySelector("#testing").addEventListener("click", (event) => {
    console.input(myname);
});