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
    await fetchGetReq();
    i++;
}
var i = 0;
function fetchPostReq() {
    // fetch('/', {
    //     method: 'POST',
    //     body : JSON.stringify({initial:initia,final:fina}),
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     })
    // }).then(function (res) {
    //     console.log('post');
    // });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {console.log('ga')}
    };
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("initial=" + initia + "&" + "final=" + fina);
    initia += 9;
    fina += 9;

    // $.post("/", function(data, status){
    //     alert("Data: " + data + "\nStatus: " + status);
    // });
}

function fetchGetReq() {
    fetch('https://stark-beyond-53579.herokuapp.com/abc')
        .then(function(res) {
            return res.json();
        }).then(function(data) {
            return data;
        }).then(function(val) {
            addingNews(val);
        }).then(function() {
    });
}

async function addingNews(data) {
    for(var i = 0; i < data.length; i++) {
        var miniNews    = document.createElement("div");
        var image       = document.createElement("img");
        var info        = document.createElement("p");

        miniNews.classList.add("miniNews");
        image.classList.add("image");
        info.classList.add("info");

        newsGrid.appendChild(miniNews);
        miniNews.appendChild(image);
        miniNews.appendChild(info);

        image.src = data[i].urlToImage;
        info.textContent = data[i].description;
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