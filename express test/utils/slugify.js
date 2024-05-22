const slug = require("slugify");


const generateSlug = (sentence)=>{
  return slug(sentence, {
        replacement: '-',  
        lower: true,      
      });
};

module.exports = {generateSlug};