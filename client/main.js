let baseUrl = 'http://localhost:3001'

$(document).ready(function () {
    auth()
    fetchNews()
});

function auth() {
    if (localStorage.acces_token) {
        $('#main-page').show()
        $('#login-page').hide()
    } else {
        $('#main-page').hide()
        $('#login-page').show()
    }
}

function login(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        url: '${baseUrl}/login',
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done(data => {
            localStorage.setItem('access_token', data.token)
            localStorage.setItem('city', data.city)
            auth()
        })
        .fail(err => {
            console.log(err.responeJSON, 'err')
        })
        .always(_ => {
            $('#login-email').val('')
            $('#login-password').val('')
        })
}

function register(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    let city = $('#city').val()
    $.ajax({
        url: `${baseUrl}/register`,
        method: 'post',
        data: {
            email,
            password,
            city
        }
    })
        .done(data => {
            auth()
        })
        .fail(err => {
            console.log(err.responeJSON, 'err')
        })
        .always(_ => {
            $('#register-email').val('')
            $('#register-password').val('')
        })
}

function toRegister(event) {
    event.preventDefault()
    $('#login-page').hide()
    $('#register-page').show()
}

function toLogin(event) {
    event.preventDefault()
    $('#login-page').show()
    $('#register-page').hide()
}

function logout() {
    localStorage.clear()
}

function fetchNews() {
    $.ajax({
        url: `${baseUrl}/news`,
        method: 'get',
        Headers: {
            access_token: localStorage.access_token
        }
    })
        .done(data => {
            console.log(data)
            data.articles.forEach(e => {
                console.log(e.urlToImage);
                console.log(e.title);
                console.log(e.description);
            });
        })
        .fail(err => {

        })
}

// function fixtures(){
//     $.ajax({
//         url: `${baseUrl}/football`,
//         method: 'get',
//     })
// }

 