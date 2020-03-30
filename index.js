//Require express framework
const express = require("express");
//Set express to app variable
const app = express();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
//Set express to app variable
const PORT = process.env.PORT || 3000;

//Listen on port 3000 for server
app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

//Tell app which folder to use to show static on local server
app.use(express.static("public"));

//Tell app which folder to use to show static on local server
app.use(express.static(path.join(__dirname, "public")));



//////////////////////////////////////////

const {cacheGet,cacheReset} = (function() {
  const dataFile = 'public/data.json';
  let data = false;
  async function getFreshData() {
    const api_url = `https://www.balldontlie.io/api/v1/teams/5`;
    const data = await (await fetch(api_url)).json();
    fs.writeFileSync(dataFile, JSON.stringify(data));
    return data;
  }
  function getOldData() {
    let oldData;
    try {
      oldData = JSON.parse(fs.readFileSync(dataFile).toString());
    } catch(e) {
      oldData = false;
    }
    return oldData;
  }
  async function cacheGet() {
    if (data) return data;
    const old = getOldData();
    if (old) {
      data = old;
      return data;
    }
    const fresh = await getFreshData();
    data = fresh;
    return data;
  };
  function cacheReset() {
    fs.unlinkSync(dataFile);
    data = false;
  }
  return {
    cacheGet,
    cacheReset,
    
  };

  
})();



setInterval(()=>(cacheGet()), 1000*60*5);

// exports.cacheGet = cacheGet


// const {cacheGet,cacheReset} = (function() {
//   const dataFile = './data.json';
//   let data = false;
//   async function getFreshData() {
//     const api_url = `https://www.balldontlie.io/api/v1/teams/5`;
//     const data = await (await fetch(api_url)).json();
//     fs.writeFileSync(dataFile, JSON.stringify(data));
//     return data;
//   }
//   function getOldData() {
//     let oldData;
//     try {
//       oldData = JSON.parse(fs.readFileSync(dataFile).toString());
//     } catch(e) {
//       oldData = false;
//     }
//     return oldData;
//   }
//   async function cacheGet() {
//     if (data) return data;
//     const old = getOldData();
//     if (old) {
//       data = old;
//       return data;
//     }
//     const fresh = await getFreshData();
//     data = fresh;
//     return data;
//   };
//   function cacheReset() {
//     fs.unlinkSync(dataFile);
//     data = false;
//   }
//   return {
//     cacheGet,
//     cacheReset,
    
//   };

  
// })();

// // (async function() {
// //   const start = Date.now();
// //   const json = await cacheGet();
// //   console.log(`1: fetched in ${Date.now()-start}ms`,json);
// // })();

// // setTimeout(async ()=>{
// //   const start = Date.now();
// //   const json = await cacheGet();
// //   console.log(`2: fetched in ${Date.now()-start}ms`,json);
// //   // wipe it out
// //   cacheReset();
// // }, 3000);

// // setTimeout(async ()=>{
// //   const start = Date.now();
// //   const json = await cacheGet();
// //   console.log(`3: fetched in ${Date.now()-start}ms`,json);
// // }, 4000);



// setInterval(()=>(cacheReset(),cacheGet()), 1000*60);

// // exports.cacheGet = cacheGet