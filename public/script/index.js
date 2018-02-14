window.onscroll = scrollFunction;
var newsGrid = document.querySelector(".newsGrid");
var prevPos = 0;
var raise = 1100;
insideScroll();

async function scrollFunction() {
    if(prevPos <= document.body.scrollTop) {
        var contentHeight = newsGrid.offsetHeight;
        var yOffset       = window.pageYOffset;
        var y             = yOffset + window.innerHeight;

        if(y >= contentHeight) {
            await insideScroll();
        }
        raise += 1100;
        prevPos = document.body.scrollTop;
    }
}

async function insideScroll() {
    await fetchPostReq();
    await fetchGetReq();
}

function fetchPostReq() {
    // fetch('/', {
    //     method: 'POST'
    // }).then(function (res) {
    //     console.log('post');
    // })

    $.post("/", function(data, status){
        // console.log("Data: " + data + "\nStatus: " + status);
    });
}

function fetchGetReq() {
    fetch('http://localhost:3000/abc')
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