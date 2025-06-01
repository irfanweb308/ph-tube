const loadCategories = async () => {
    try {

        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCategory(data.categories);

    }
    catch (error) {
        console.log('Error:', error);

    }

}
const displayCategory = (categoriesData) => {
    const mainNav = document.getElementById('buttons');
    for (const categories of categoriesData) {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${categories.category_id}" onclick="loadButtonCategories(${categories.category_id})" class="btn category-btn">
                ${categories.category}
            </button>
        `


        mainNav.appendChild(buttonContainer);

    }
}
const removeActive = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    for(let button of buttons){
        button.classList.remove('active')
    }
    
     
}

const loadButtonCategories = async (id) => {
    try {

        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        const data = await res.json();
        removeActive();
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add('active')
        displayVideos(data.category);


    }
    catch (error) {
        console.log('Error:', error);

    }

}

document.getElementById('search-input').addEventListener("keyup",(key)=>{
    loadVideos(key.target.value);
    
})

const loadVideos = async (searchText = "") => {
    try {

        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const data = await res.json();
        displayVideos(data.videos);

    }
    catch (error) {
        console.log('Error:', error);

    }

}


const loadVideoDetails = async (videoId) => {
    try {

        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
        const data = await res.json();
        displayDescription(data.video);
         

    }
    catch (error) {
        console.log('Error:', error);

    }

}
const displayDescription = (des) =>{
    console.log(des);
    const modalContent = document.getElementById('modal-content');

     document.getElementById('my_modal_5').showModal();

    modalContent.innerHTML = `
        <img src="${des.thumbnail}" alt="">
        <p class="mt-4">${des.description}</p>
    `
}



const displayVideos = (videosData) => {
    const videoSection = document.getElementById('video-section');
    videoSection.innerHTML = "";
    if(videosData.length === 0){
        videoSection.classList.remove('grid')
        videoSection.innerHTML =`
            <div class=" flex flex-col text-center items-center justify-center">
                <img class="w-36 h-36" src="assets/Icon.png" alt="">
                <p class="font-bold text-4xl">Oops!! Sorry, There is no </br> content here</p>
             </div>
        `
        return;
    }
    else{
        videoSection.classList.add('grid')
    }
    videosData.forEach(video => {

        const card = document.createElement('div');
        card.classList = 'card'
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img
                src= ${video.thumbnail}
                class="w-full  object-cover"
                alt=" " />
                ${video.others.posted_date?.length === 0 ? "" : `<span class="absolute right-2 bottom-2 w-56 text-[10px] bg-black text-white p-1.5 rounded-lg">${calculation(video.others.posted_date)}</span>`
            }
                
            </figure>
            <div class="px-o py-2 flex gap-2">
                <div>
                    <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
                </div>
                <div>
                    <h2 class="font-bold">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p class="text-gray-400">${video.authors[0].profile_name}</p>
                         ${video.authors[0].verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt=""></img>' : ''}
                    </div>
                    <p class="text-gray-400 text-[14px]">${video.others.views} views</p>
                   
                </div>
                <div class="ml-10">
                    <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-secondary">Details</button>
                </div>
            </div>
        `
        videoSection.appendChild(card);

    });

}

loadCategories();
loadVideos();