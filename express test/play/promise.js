const data = [
    {name:"rakim"},
    {name:"keshab"},
    {name:"balkrishna"},
    {name:"sujata"},
    {name:"suraj"},
    {name:"sunil"},
];

const page = 1;
const limit = 2;
//write a function that handles pagination(offset pagination)
//page:1[{rakim},{keshab}]

const pagination = (data,page,limit)=>{
    
const startIndex = (page-1)*limit;
const endIndex = startIndex+limit;
return data.slice(startIndex,endIndex);
};
console.log(pagination(data,page,limit));

