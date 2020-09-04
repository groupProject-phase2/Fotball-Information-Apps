let baseUrl = 'http://localhost:3001'

$(document).ready(function () {
    auth()
    fetchNews()
});

function auth() {
    if (localStorage.access_token) {
        $('#main-page').show()
        $('#login-page').hide()
        $('#register-page').hide()
    } else {
        $('#main-page').hide()
        $('#login-page').show()
        $('#register-page').hide()
    }
}


function login(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        url: `${baseUrl}/login`,
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done(data => {
            console.log('berhasil login')
            localStorage.setItem('access_token', data.access_token)
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
    let email = $('#register-email').val()
    let password = $('#register-password').val()
    let city = $('#register-city').val()
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
    auth()
}