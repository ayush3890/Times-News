console.log('Currency');
// var app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope) {
//     $scope.fullName = function() {
//         return t + $scope.code22;
//     };
// });

var code1 = null;
var code2 = null;

var myBtn1 = document.getElementsByClassName('btn1');

//add event listener
myBtn1[0].addEventListener('click', function(event) {
    document.getElementById("myDropdown").classList.toggle("show");

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var lis = dropdowns[0].children;
    for(var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function(){
            code1 = this.attributes.value.value;
        });
    }
});

var myBtn2 = document.getElementsByClassName('btn2');

//add event listener
myBtn2[0].addEventListener('click', function(event) {
    document.getElementById("ddid2").classList.toggle("show");

    var dropdowns = document.getElementsByClassName("ddc2");
    var lis = dropdowns[0].children;
    for(var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function(){
            code2 = this.attributes.value.value;
        });
    }
});

document.getElementById("myDropdown").addEventListener('click', function (event) {
    this.classList.remove("show");
});

document.getElementById("ddid2").addEventListener('click', function (event) {
    this.classList.remove("show");
});

document.querySelector('html').addEventListener('click', function (event) {
    // if() {
    //     document.getElementById("myDropdown").classList.remove("show");
    // }
});

setInterval(abc, 500);
function abc() {
    console.log('aa');
    var cone = code1;
    var ctwo = code2;
    if(code1 !== null && code2 !== null) {
        fetch('https://api.fixer.io/latest?symbols=' + cone + ',' + ctwo)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                var t = data.rates;
                var inp1 = document.getElementById('inp1');
                var inp2 = document.getElementById('inp2');
                var text1 = inp1.value;

                var val1 = t[cone];
                var val2 = t[ctwo];

                val2 = Math.round((val2/val1) * 100) / 100;
                val1 = 1;

                if(text1 === '') {
                    inp1.value = val1;
                    inp2.value = val2;
                } else {
                    inp1.value = val1*text1;
                    inp2.value = Math.round((val2*text1) * 100) / 100;
                }

                document.getElementById('type1').textContent = cone;
                document.getElementById('type2').textContent = ctwo;
        });
        code1 = null;
        code2 = null;
    }
}

function fetchreq(cone, ctwo) {
    fetch('https://api.fixer.io/latest')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
    });
}

var refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', function (e) {
    console.log('a');
});