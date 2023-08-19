const accessKey= "DecL0UGWNAYDwhaIar3DSlY3oxyp4WubK51azPCi0uQ"; //from unsplash website API key

// get all the elements from the html file
const formEl = document.querySelector("form"); //to store the form section
const inputEl= document.getElementById("search-input"); //store input section
const searchResults =document.querySelector(".search-results"); //store the images in the containers
const showMore= document.getElementById("show-more-button"); //to store the value of the show more button

let inputData = ""; // this will store all the key words that the user will enter in the search input field

let page =1; // by default the page number will be 1

//for fetch and response we use async function
 async function searchImages(){  

    inputData = inputEl.value; // holds values from the input section
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;//dynamic url based on the input data

 
 
    const response = await fetch(url); //fetch images based on the query
    const data = await response.json() ;//after fetching all the query we are converting that response into json format and all the json format data will be stored in the data variable 

    const results= data.results ;//and from that data we have to get results and the results will be stored in the results variable
    if(page==1){
        searchResults.innerHTML="";
    }
results.map((result)=> { // we are mapping those results and then pushing them into the following variables

    const imageWrapper= document.createElement("div");
    imageWrapper.classList.add("Search-result");
    const image =document.createElement("img");
    image.src = result.urls.small;
    image.alt =result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href =result.links.html;
   imageLink.target= "_blank";
   imageLink.textContent= result.alt_description;


imageWrapper.appendChild(image);
imageWrapper.appendChild(imageLink);
searchResults.appendChild(imageWrapper);

});
page++ ;
if(page>1){
showMore.style.display="block";

}

}
formEl.addEventListener("submit",(event)=>{
event.preventDefault();
page=1;
searchImages();

});
 showMore.addEventListener("click",()=>{
   
    searchImages();
    
    });