const accessKey="adMxbYrWiz1oswVXesd8bBaqnnMdLmPe4L3vDzfe5wM";

const searchBox=document.getElementById("search-box");
const searchForm=document.getElementById("search-form");
const searchRes=document.getElementById("search-result");
const showMoreBtn=document.getElementById("show-more-btn");
const before_search=document.getElementById("before-search");
let p=1;
beforeSearch();
async function beforeSearch(){
    const url=`https://api.unsplash.com/search/photos?page=${p}&query=${"cats"}&client_id=${accessKey}&per_page=12`;
    const response=await fetch(url);
    const data=await response.json();
    const results=data.results;
    results.map((result)=>{
              const image=document.createElement("img");
              image.src=result.urls.small;
              const imageLink=document.createElement("a");
              imageLink.href=result.links.html;
              imageLink.target="_blank";
              imageLink.appendChild(image);
              searchRes.appendChild(imageLink);
    })
    showMoreBtn.style.display="block";
}
let keyword="";
let page=1;
async function searchImages(){
        keyword=searchBox.value.trim();
        const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
        const response=await fetch(url);
        const data=await response.json();
        if(page==1){
            searchRes.innerHTML="";
        }
       const results=data.results;
       results.map((result)=>{
                 const image=document.createElement("img");
                 image.src=result.urls.small;
                 const imageLink=document.createElement("a");
                 imageLink.href=result.links.html;
                 imageLink.target="_blank";
                 imageLink.appendChild(image);
                 searchRes.appendChild(imageLink);
       })
       showMoreBtn.style.display="block";
}
searchForm.addEventListener("submit",(e)=>{
    if(searchBox.value==""){
        beforeSearch();
  }else{
e.preventDefault();
page=1;
before_search.style.display="none";
searchImages();
}})
showMoreBtn.addEventListener("click",()=>{
    if(searchBox.value==""){
        p++;
         searchRes.innerHTML="";
        beforeSearch();
    }
    page++;
    searchImages();
});
