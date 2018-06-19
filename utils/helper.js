let replaceAll = function(str,mapObj){
        var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
        str = str.replace(re, function(matched){
            return mapObj[matched.toLowerCase()];
        });

        return str;
    }

module.exports.replaceAll = replaceAll;