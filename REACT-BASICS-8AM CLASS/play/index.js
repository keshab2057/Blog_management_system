// const registerForm = ()=>{
// const result = await fetch(url);
// const data = await result.json();
// console.log(data);
// };

// const sendDataByUsingFetch = async() =>{
//     try{
//         const form = document.getElementById("register");
//         const formData = new formData(form);
//         const url = "http://localhost:8000/api/v1/users/register";
//         const data = {};
//         formData.forEach((value,key)=>(data[key]=value));
//         const options={
//             method:"POST",
//             headers:{
//                 "content-Type":"application/json",
//             },
//         };
//           const result = await fetch(url,options);
//           const datas = await result.json();
//           console.log({datas});  
      
//     }catch(e){
//         console.log(e);
//     }
// };

// const sendDataByUsingAxios = async () =>{
//     try{
//         const form = document.getElementById("registerForm");
//         const formData = new formData(form);
//         const url = "http://localhost:8000/api/v1/users/register";
//         //send the data to be
//         const {data} = await axios.post(url,formData,{
//             headers:{
//                 "Content-Type":"application/json",
//             },
//         });
//         console.log(data);
//     }catch(e){
//         console.log(e);
//     }
// };

const getFormData = ()=>{
    const form = document.getElementById("registerForm");
    const formData = new formData(form);
    console.log([...formData.entries()]);
};