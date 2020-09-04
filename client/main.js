let baseUrl = 'http://localhost:3001'

$(document).ready(function () {
    auth()
    // fixtures()
});

function auth() {
    if (localStorage.access_token) {
        $('#main-page').show()
        fetchNews()
        $('#login-page').hide()
        $('#schedule-page').hide()
        $('#register-page').hide()
        $('#player-page').hide()
        $('#navbar').show()
    } else {
        $('#main-page').hide()
        $('#login-page').show()
        $('#schedule-page').hide()
        $('#navbar').hide()
        $('#player-page').hide()
        $('#register-page').hide()

    }
}

function login(event) {
    event.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-password').val()
    console.log(email, password)
    $.ajax({
        url: 'http://localhost:3001/login',
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done(data => {
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
            $('#register-city').val('')
        })
}

function toSchedule(event) {
    event.preventDefault()
    $('#main-page').hide()
    $('#schedule-page').show()
    fixtures()
}

function toHome(event) {
    event.preventDefault()
    auth()
    $('#search-category').val('')
    fetchNews()
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
        headers: {
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

// function player() {
//     $.ajax({
//         url: 'https://allsportsapi.com/api/football/?&met=Players&playerName=Ronaldo Cristiano&APIkey=a8d998e705f70e81aa5bec929e7e9248ad796c2cfb8783a254ac944e6995ac19',
//         method: 'get',

//     })
//         .done(data => {
//             console.log(data)
//         })
//         .fail(err => {

//         })
// }

function toPlayer() {
    $('#main-page').hide()
    $('#player-page').show()
    let name = $('#search-category').val()
    $.ajax({
        url: `https://allsportsapi.com/api/football/?&met=Players&playerName=${name}&APIkey=a8d998e705f70e81aa5bec929e7e9248ad796c2cfb8783a254ac944e6995ac19`,
        method: 'get',

    })
        .done(data => {
            console.log(data)
            $('#player-container').empty()
            data.result.forEach(element => {
                console.log(element.player_age)
                $('#player-container').append(`<div class="card" style="width: 35rem;">
                <div class="card-body">
                  <h5 class="card-title">${element.player_name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">TEAM NAME :${element.team_name}</h6>
                  <h6 class="card-subtitle mb-2 text-muted">POSITION :${element.player_type}</h6>
                  <h6 class="card-subtitle mb-2 text-muted">GOAL : ${element.player_goals}</h6>
                  <h6 class="card-subtitle mb-2 text-muted">MATCH : ${element.player_match_played}</h6>
                  <h6 class="card-subtitle mb-2 text-muted">NUMBER : ${element.player_number}</h6>
                </div>
              </div><br>`)
            });
        })
        .fail(err => {

        })
        always(_ => {
            $('#search-category').val('')
        })
}


function fixtures() {
    $.ajax({
        url: `http://localhost:3001/football/fixtures`,
        method: 'get',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(data => {
            console.log(data)
            data.data.forEach(e => {
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

