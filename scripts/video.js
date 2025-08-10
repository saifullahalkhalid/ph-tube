
// console.log("connected with HTML")

function convertTime(sec) {
  let days = Math.floor(sec / 86400);
  let hours = Math.floor((sec % 86400) / 3600);
  let minutes = Math.floor((sec % 3600) / 60);
  let seconds = sec % 60;

  let result = [];
  if (days) result.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours) result.push(`${hours}h`);
  if (minutes) result.push(`${minutes}m`);
  if (seconds) result.push(`${seconds}s`);

  return result.join(' ') + " ago";
}


const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
     for(const btn of buttons){
        btn.classList.remove('active');
     }
}

// Fetch, load and show categories on HTML.

// create loadCategories
 const loadCategories = () =>{
    //   fetch data
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(res =>res.json() )
.then(data => displayCategories(data.categories))
.catch(error => console.log(error));

 }

 // create loadVideos
 const loadVideos = () =>{
    //   fetch data
fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
.then(res =>res.json() )
.then(data =>displayVideos(data.videos))
.catch(error => console.log(error));

 }

 const loadCategoryVideos = id =>{
    // alert(id)


    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
.then(res =>res.json() )
.then(data =>{

// remove active class all

removeActiveClass();


// add active class

    const activeBtn = document.getElementById(`btn-${id}`)
    activeBtn.classList.add('active')
    displayVideos(data.category)
})
.catch(error => console.log(error));

 }


 /* 
 
 
 */

const displayVideos =(videos) =>{
 const videoContainer = document.getElementById('video');

 videoContainer.innerHTML=''

 if(videos.length == 0){
videoContainer.classList.remove('grid')

    videoContainer.innerHTML = `
    <div class="h-[50%] ">
    <div class=" py-15 flex flex-col justify-center items-center gap-5">
            <img src="./assets/Icon.png" alt="">
            
            <h2 class="text-3xl text-center font-bold">Oops!! Sorry, There is no <br> content here</h2>
            
            </div>
</div>

    `

    return;
 }
 else{
    videoContainer.classList.add('grid')
 }
   videos.forEach(video =>{

// console.log(video.authors[0].verified)
 const card = document.createElement("div")
card.classList = "card "

card.innerHTML = `
<figure class="h-[200px] relative">
    <img class="h-full w-full object-cover "
      src=${video.thumbnail} />

      ${
        video.others.posted_date?.length == 0? '':` <span class="absolute right-2 bottom-2 bg-black text-white text-xs px-2 py-[2px] rounded-lg">${convertTime(video.others.posted_date)}</span> `
      }
      
  </figure>
  <div class="py-2 flex gap-2">
   <div>
   <img class="h-10 w-10 object-cover rounded-full "  src="${video.authors[0].profile_picture} " />
   </div>
   <div class="space-y-3">
    <h2 class="text-xl font-bold">${video.title} </h2>
   <div class="flex items-center gap-2">
    <p class="text-gray-500">${video.authors[0].profile_name} </p>
    ${video.authors[0].verified === true? ` <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=HYBOklwPSqKD&format=png&color=000000" />`:'' }
   </div>
    <p class="text-gray-500">${video.others.views} </p>
    </div>



  </div>

`


videoContainer.append(card);
   });
}


// create displayCategories

const displayCategories = (categories) =>{

    const categoryContainer = document.getElementById('category')
categories.forEach(item => {
    // console.log(item.category)

    const buttonContainer = document.createElement('div');
  buttonContainer.innerHTML = `
  <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
  ${item.category}
  </button>
  
  `


    categoryContainer.append(buttonContainer);

});


}

loadVideos();