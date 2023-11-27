// import 'stylesheets/all.scss';
// import 'bootstrap/dist/js/bootstrap.min.js';

let data= [] ;//先將data 用成陣列

let list = document.querySelector('.cardListArea');
let searchBar = document.querySelector('.seacherNum');

const nameText =document.querySelector('.inputName');
const inputImgUrl =document.querySelector('.inputImgUrl');
const inputLocation =document.querySelector('.inputLocation');
const priceForSet =document.querySelector('.priceForSet');
const numberForSet =document.querySelector('.numberForSet');
const startForSet =document.querySelector('.startForSet');
const descriptForSet =document.querySelector('.descriptForSet');


const btnAdd = document.querySelector('.btnAdd'); 
btnAdd.addEventListener('click',function(e){   
    
  let obj ={};
    obj.id=data.length;
    obj.name=nameText.value;
    obj.imgUrl=inputImgUrl.value;
    obj.area=inputLocation.value;
    obj.description=descriptForSet.value;
    obj.group=Number(numberForSet.value);
    obj.price=Number(priceForSet.value);
    obj.rate= Number(startForSet.value);//轉換成數字型態
    //console.log(data);//這邊為什麼是物件型態，但我在一開始明明設定為 Data
    //console.log(obj);
    data.push(obj); //推不進去
    console.log(data);
    //console.log(obj);
    nameText.value='';
    inputImgUrl.value='';
    inputLocation.value='';
    priceForSet.value='';
    numberForSet.value='';
    startForSet.value='';
    descriptForSet.value='';
    //console.log(data);
    // data.push(obj);
    renderC3(data);
    render(data);
  } 
);


function renderC3(){
  let areaObj = {};
  //console.log(data);
  //let newAreadata = data.data;//取 data裡面的 data值  因為在init的data
  //console.log(newAreadata);
  data.forEach(function(item,index){
    if(areaObj[item.area]==undefined){
      areaObj[item.area] = 1;
    }else{
      areaObj[item.area] +=1;
    }
  })
  //console.log(areaObj); areaObj是物件，需要轉換成陣列

  //轉換資料型態
    let newData = [];
    let area = Object.keys(areaObj); //取area的名稱
  //console.log(area);
    area.forEach(function(item){
      let ary =[];
      ary.push(item);
      ary.push(areaObj[item]);
      //console.log(areaObj);
    newData.push(ary);
  });

  //生成圓餅圖
  let chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type : 'donut',
    },
    donut: {
      title: "套票地區比重"
    }
  });
}

function render(data){
      let str="";
      let searchNum=0;
      console.log(data)
      data.forEach(function(item){
        //console.log(item);
          //searchNum利用 forEach 特性，每跑一次就要新增一次～每次重跑就重新 render一次畫面
          searchNum++;
          str+=`
            <li class="tickCard col-4 mb-4" >
                  <div class="card h-100">
                    <div class="position-relative">
                      <div class="bg-softblue text-light fs-5 position-absolute rounded-end px-3 py-2 areaTag">${item.area}</div>
                      <div class="bg-primary text-light position-absolute rounded-end px-3 py-2 areaStarts">${item.rate}</div>
                      <img src="${item.imgUrl}" alt="${item.name}" class="card-img-top cardImgUrl">
                    </div>

                    <div class="card-body pt-4 d-flex flex-column justify-content-between">
                      
                      <div>
                        <h3 class="hs-5 text-primary mb-0 cardTitle border-bottom border-2 border-primary lh-base">
                            <a href="#">${item.name}</a>
                        </h3>
                        <p class="card-text text-graymedia pt-3 lh-base">
                            ${item.description}
                        </p>
                      </div>
                      
                      <p class="ticketNumber d-flex justify-content-between text-primary mb-0">
                        <span class="d-flex align-items-center fs-6">
                          <span class="material-symbols-outlined text-primary">
                            error
                          </span>
                          剩下最後${item.group}組
                        </span>
                        <span class="d-flex align-items-center">
                          <span class="pe-1">TWD</span>
                          <span class="priceStyle fs-2">$${item.price}</span>
                        </span>
                      </p>

                    </div>
                  </div>
                </li>`;
      }
    )
      list.innerHTML=str;
      searchBar.innerHTML =`本次搜尋共 ${searchNum} 筆資料`
};

// function renderSearchNum(){
//   let search = data.data;
//   searchTxt+=`本次搜尋共${search.length}筆資料`
//   searchBar.innerHTML+=searchTxt;
//   console.log(search);
//   //console.log(data);
//   //console.log(search.length,`送出後資料`);
  
// }

//-------地區搜尋篩選 ---參考學習同學的
const regionSearch = document.querySelector('.regionSearch');
regionSearch.addEventListener('change',function(e){
  //因為是切換所以要使用 'change'
  let newData = [];
  //console.log(e.target.value); 看顯示的 value
  if(e.target.value == ''){
    newData=data;//全部
  }else if(e.target.value === '台北'){
    data.forEach(function(item){
      if(item.area === '台北'){
        newData.push(item);
        //console.log(newData);
      }
    });
  }else if(e.target.value === '台中'){
    data.forEach(function(item){
      if(item.area === '台中'){
        newData.push(item);
        //console.log(newData);
      }
    });
  }else if(e.target.value === '高雄'){
    data.forEach(function(item){
      if(item.area === '高雄'){
        newData.push(item);
        //console.log(newData);
      }
    });
  }
  render(newData);
  renderC3(newData);
});


//-------畫面初始化--重置
  function init(){
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
      .then(function (response) {
        //console.log(response);
        data=response.data.data;//這編寫成 data.data
        console.log(data)

        renderC3(data);//要寫出要render的 data
        render(data);
      })
      .catch(function(err){
        console.log(err);
      })
  }

  init();


  //data=[[],[],[]]

// let data = [
//     {
//       "id": 0,
//       "name": "肥宅心碎賞櫻3日",
//       "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//       "area": "高雄",
//       "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//       "group": 87,
//       "price": 1400,
//       "rate": 10
//     },
//     {
//       "id": 1,
//       "name": "貓空纜車雙程票",
//       "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//       "area": "台北",
//       "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//       "group": 99,
//       "price": 240,
//       "rate": 2
//     },
//     {
//       "id": 2,
//       "name": "台中谷關溫泉會1日",
//       "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//       "area": "台中",
//       "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//       "group": 20,
//       "price": 1765,
//       "rate": 7
//     }
//   ];

//  data.forEach (function(item){
//    str+=`
//         <li class="tickCard col-4" >
//               <div class="card h-100">
//                 <div class="position-relative">
//                   <div class="bg-softblue text-light fs-5 position-absolute rounded-end px-3 py-2 areaTag">${item.area}</div>
//                   <div class="bg-primary text-light position-absolute rounded-end px-3 py-2 areaStarts">${item.rate}</div>
//                   <img src="${item.imgUrl}" alt="${item.name}" class="card-img-top cardImgUrl">
//                 </div>

//                 <div class="card-body pt-4 d-flex flex-column justify-content-between">
                  
//                   <div>
//                     <h3 class="hs-5 text-primary mb-0 cardTitle border-bottom border-2 border-primary lh-base">
//                         <a href="#">${item.name}</a>
//                     </h3>
//                     <p class="card-text text-graymedia pt-3 lh-base">
//                         ${item.description}
//                     </p>
//                   </div>
                  
//                   <p class="ticketNumber d-flex justify-content-between text-primary mb-0">
//                     <span class="d-flex align-items-center fs-6">
//                       <span class="material-symbols-outlined text-primary">
//                         error
//                       </span>
//                       剩下最後${item.group}組
//                     </span>
//                     <span class="d-flex align-items-center">
//                       <span class="pe-1">TWD</span>
//                       <span class="priceStyle fs-2">$${item.price}</span>
//                     </span>
//                   </p>

//                 </div>
//               </div>
//             </li>`
//  });
//    list.innerHTML=str;
//    console.log('hello world');


// 
    // inputImgUrl.value == "";
    // inputLocation.value == "";
    // priceForSet.value == "";
    // numberForSet.value == "";
    // startForSet.value == "";
    // descriptForSet.value == "";
    
    //參考同學 -- 可能不能使用這種寫法
    /*
    let obj = {
        id: 0,
        name: nameText,
        imgUrl: `{inputImgUrl}`,
        area: inputLocation,
        description: descriptForSet,
        group: numberForSet,
        price: priceForSet,
        rate: startForSet
      };

      //let newData = [];
      //data = {[{},{},{}]}
      let newData = data.data;

      newData.push(obj);
      //console.log(newData);

      renderC3();
      render();
      renderSearchNum(); 
       */


      //欄位空白判斷
      // if(nameText.value == ""){
      //   alert('請填寫套票名稱');
      //   return;
      // }else{
      //   nameText.value == "";
      // }
      // if(inputImgUrl.value == ""){
      //   alert('請輸入圖片連結');
      //   return;
      // }
      // if(inputLocation.value == ""){
      //   alert('請選擇地區');
      //   return;
      // }
      // if(priceForSet.value == ""){
      //   alert('請輸入金額');
      //   return;
      // }
      // if(numberForSet.value == ""){
      //   alert('請輸入套票組數');
      //   return;
      // }
      // if(startForSet.value == ""){
      //   alert('請輸入星星數');
      //   return;
      // }
      // if(descriptForSet.value == "" && descriptForSet.length <= 20){
      //   alert('請輸入描述');
      //   return;
      // }