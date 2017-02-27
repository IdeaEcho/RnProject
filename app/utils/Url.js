let Url = {
        getUrlParam: function (url, key) {
            var arr = undefined != url.split('?')[1] ? url.split('?')[1].split('&') : [];
            var request=[];
            var temp=[];

            for(var i = 0;i<arr.length;i++){
                temp = arr[i].split('=');
                request[temp[0]] = temp[1];
            }
            return request[key] || null;
         }
}

export default Url;
