window.onscroll = scrollFunction;
var newsGrid = document.querySelector(".newsGrid");
var prevPos = 0;
var initia = 0;
var fina = 9;
insideScroll();

async function scrollFunction() {
    if(prevPos <= document.body.scrollTop) {
        var contentHeight = newsGrid.offsetHeight;
        var yOffset       = window.pageYOffset;
        var y             = yOffset + window.innerHeight;

        if(y >= contentHeight) {
            await insideScroll();
        }
        prevPos = document.body.scrollTop;
    }
}

async function insideScroll() {
    await fetchPostReq();
    // await fetchGetReq();
}

function fetchPostReq() {
    //===============================
        //Fetch Post request
    //===============================
    fetch('/', {
        method: 'POST',
        // body : JSON.stringify({initial:initia,final:fina}),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        return data;
    }).then(function(val) {
        console.log(val);
        if(val[0] === null) {
            console.log('database empty');
            return;
        }
        addingNews(val);
    }).then(function() {
        "use strict";

    });

    //===============================
        //XML http request
    //===============================
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {console.log('ga')}
    // };
    // xhttp.open("POST", "/", true);
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // console.log(initia + " " + fina);
    // xhttp.send("initial=" + initia + "&" + "final=" + fina);
    // initia += 9;
    // fina += 9;

    //===============================
        //jQuery Post request
    //===============================
    // $.post("/", function(data, status){
    //     console.log(data);
    // });

}

//dont need this now
function fetchGetReq() {
    var url = 'https://stark-beyond-53579.herokuapp.com/abc';
    var url1 = 'http://localhost:3000/abc';
    fetch(url1)
        .then(function(res) {
            return res.json();
        }).then(function(data) {
            return data;
        }).then(function(val) {
            console.log(val);
            addingNews(val);
        }).then(function() {
    });
}

async function addingNews(data) {
    for(var i = 0; i < data.length; i++) {

        var miniNews    = document.createElement("div");
        var image       = document.createElement("img");
        var heading       = document.createElement("div");
        var info        = document.createElement("h1");

        miniNews.classList.add("miniNews");
        image.classList.add("image");
        heading.classList.add("heading");
        info.classList.add("info");

        newsGrid.appendChild(miniNews);
        miniNews.appendChild(image);
        miniNews.appendChild(heading);
        heading.appendChild(info);

        image.src = data[i].urlToImage;
        info.textContent = data[i].title;
        await addingListener(miniNews, data[i]);
    }
}

function addingListener(miniNews, news) {
    miniNews.addEventListener('click', function() {
        fetch('/news/' + news._id)
            .then(function(res) {
            })
            .then(function () {
                var url = '/news/' + news._id;
                window.open(url, '_blank');
            });
    });
};