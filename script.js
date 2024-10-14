let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let discount =document.getElementById("discount");
let total =document.getElementById("total");
let count =document.getElementById("count");
let category =document.getElementById("category");
let submit =document.getElementById("submit");
let search =document.getElementById("search");

let mood = 'create';
let temp ;

// get total
function gettotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value) - +discount.value;

        total.innerHTML= result;
    }
}
// add prodouct

let proinfo2;
//save local storage
if(localStorage.product != null ){
    proinfo2 = JSON.parse(localStorage.product)
}else{
   proinfo2 = [];
}

submit.onclick = function(){

    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood === 'create'){
        if(newpro.count > 1){
            for(let i =0; i<newpro.count; i++){
                proinfo2.push(newpro);
            }
        }else{
            proinfo2.push(newpro);
        }
    }else{
        proinfo2[temp] = newpro;
        submit.innerHTML ='Add Product';
        mood = 'create';
        count.style.display = 'inline';

    }
    
    localStorage.setItem('product', JSON.stringify(proinfo2))
    ClearData()
    showData()
}


// clear input data

function ClearData(){

    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//Show the product in the web
function showData(){
    let table = '';
    for(let i = 0; i < proinfo2.length;i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${proinfo2[i].title}</td>
        <td>${proinfo2[i].price}</td>
        <td>${proinfo2[i].taxes}</td>
        <td>${proinfo2[i].discount}</td>
        <td>${proinfo2[i].total}</td>
        <td>${proinfo2[i].category}</td>
        <td><button onclick="updateData(${i})" id = "update">Update</button></td>
        <td><button onclick="deleteData(${i})" id = "delete">Delete</button></td>  
   </tr>   
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(proinfo2.length>0){
    btnDelete.innerHTML =  `<button onclick="deleteAll()" >Delete All</button> `}else{
        btnDelete.innerHTML = ``
    }

}


function deleteData(i){
    proinfo2.splice(i, 1);
    localStorage.product = JSON.stringify(proinfo2);
    showData()
}

function deleteAll(){
    localStorage.clear();
    proinfo2.splice(0);
    showData();

}

function updateData(i){
    title.value = proinfo2[i].title;
    price.value = proinfo2[i].price;
    taxes.value = proinfo2[i].taxes;
    discount.value = proinfo2[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = proinfo2[i].category;
    submit.innerHTML ='update';
    mood = 'update';
    temp = i;
}

function searchData(searchMood){
    let table = '';
    let key = search.value.toLowerCase();
    console.log(key);
    if(searchMood == "searchtitle"){
        
        for(let i = 0; i < proinfo2.length; i++){
            if(proinfo2[i].title == key){
                console.log(proinfo2[i]);
                table += `
        <tr>
        <td>${i}</td>
        <td>${proinfo2[i].title}</td>
        <td>${proinfo2[i].price}</td>
        <td>${proinfo2[i].taxes}</td>
        <td>${proinfo2[i].discount}</td>
        <td>${proinfo2[i].total}</td>
        <td>${proinfo2[i].category}</td>
        <td><button onclick="updateData(${i})" id = "update">Update</button></td>
        <td><button onclick="deleteData(${i})" id = "delete">Delete</button></td>  
   </tr>   
        `
        document.getElementById('tbody').innerHTML = table;
            }else{

                table;
                document.getElementById('tbody').innerHTML = table;
            }
        }

    }else if(searchMood = "searchcategory"){

        for(let i = 0; i<proinfo2.length; i++){
            if(proinfo2[i].category == key){
                table += `
        <tr>
        <td>${i}</td>
        <td>${proinfo2[i].title}</td>
        <td>${proinfo2[i].price}</td>
        <td>${proinfo2[i].taxes}</td>
        <td>${proinfo2[i].discount}</td>
        <td>${proinfo2[i].total}</td>
        <td>${proinfo2[i].category}</td>
        <td><button onclick="updateData(${i})" id = "update">Update</button></td>
        <td><button onclick="deleteData(${i})" id = "delete">Delete</button></td>  
   </tr>   
        `
        document.getElementById('tbody').innerHTML = table;
            }else{
                table;
                document.getElementById('tbody').innerHTML = table;
            }
        }


    }
   
}
showData()


