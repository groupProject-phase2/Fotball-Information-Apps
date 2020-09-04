let baseUrl = 'http://localhost:3001'

$(document).ready(function () {
    auth()
    fixtures()
    $('#news-page').show()
    $('#schedule-page').hide()
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

function toSchedule(event) {
    event.preventDefault()
    $('#news-page').hide()
    $('#schedule-page').show()
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
            $('#news-container').empty()
            data.articles.forEach(e => {
                $('#news-container').append(
                    `<ul><div class="card shadow border-0 mb-3">
                    <div class="card-body">
                        <img
                        src="${e.urlToImage}"
                            class="rounded float-left mr-4"
                            width="200px"
                        />
                        <h5 class=""card-title"">${e.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            
                        <p class="card-text">
                            ${e.description}
                        </p>
                    </div>
              </div></ul>`)
            });
        })
        .fail(err => {

        })
}


function fixtures() {
    $.ajax({
        url: `${baseUrl}/football/fixtures`,
        method: 'get',
        Headers: {
            access_token: localStorage.access_token
        }
    })
    .done(data => {
        console.log(data)
        data.data.forEach(e => {
            console.log(e.away_team_logo)
            
            $('#schedule-container').append(`
            <div class="card border-0 shadow mb-3">
            <div class="card-body">
              <h6 class="card-title text-center">${e.league_name}</h6>
              <div class="row align-items-center">
                <div class="col text-center">
                  <img
                    height="120px"
                    src="${e.home_team_logo}"
                    alt=""
                  />
                  <h6 class="font-weight-bold my-3">${e.event_home_team}</h6>
                </div>
                <div class="col-3 text-center">
                  <h1>vs</h1>
                  <ul
                    class="list-group border-0 text-center"
                    style="font-size: small"
                  >
                    <li class="card-text">
                      <i class="fa fa-calendar mr-2"></i>${e.event_date}
                    </li>
                    <li class="card-text">
                      <i class="fa fa-map-marker mr-2"></i>Gelora Bung Karno
                    </li>
                  </ul>
                </div>
                <div class="col text-center">
                  <img
                    height="120px"
                    src="${e.away_team_logo}"
                    alt=""
                  />
                  <h6 class="font-weight-bold my-3">${e.event_away_team}</h6>
                </div>
              </div>
            </div>
          </div>`)
        });
    })
    .fail(err => {

    })
}

