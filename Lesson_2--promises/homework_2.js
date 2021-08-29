// 1
// Сделайте промис, внутри которого будет setTimeout в 3 секунды, после которой промис должен зарезолвится (то есть выполнится успешно).
let promise = new Promise((resolve) => {
    setTimeout(() => resolve('Прошло 3 сек'), 3000)
})

promise.then(value => console.log(value))

// 2
// Сделайте промис, внутри которого будет setTimeout в 3 секунды, после которой промис должен зареджектится (то есть выполнится с ошибкой).
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('АААААшибка Прошло 3 сек')), 3000)
})

promise1.catch(err => console.log(err))

// 3
// Сделайте 3 промиса, в каждом из которых расположена функция setTimeout со случайной задержкой от 1 до 5 секунд. Пусть каждый промис своим результатом возвращает эту задержку. С помощью Promise.all получите массив результатов, найдите его сумму, выведите на экран.
function getRandomNumber(){
    return Math.ceil(Math.random() * 5)
}

let promise1 = new Promise(resolve => {
    let randomNum = getRandomNumber()
    setTimeout(() => resolve(randomNum), randomNum * 1000)
})


let promise2 = new Promise(resolve => {
    let randomNum = getRandomNumber()
    setTimeout(() => resolve(randomNum), randomNum * 1000)
})


let promise3 = new Promise(resolve => {
    let randomNum = getRandomNumber()
    setTimeout(() => resolve(randomNum), randomNum * 1000)
})


Promise.all([promise1, promise2, promise3])
    .then(arr => arr.reduce((acc, current) => {
        return acc + current}), 0)
    .then(res => alert(res))   

// 4
// Сделать запрос при помощи fetch на адрес https://jsonplaceholder.typicode.com/users, Отфильтровать массив пользователей, чтобы остались только пользователи с четными id.
let promise = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(value => {
        return value.filter(item => item.id % 2 === 0)
    })

// 5
// Сделать запрос при помощи fetch на адрес https://jsonplaceholder.typicode.com/users, вывести список карточек пользователей, отобразить имя, телефон и остальную информацию каждого пользователя. Вывести в html внутри div с id = 1
let container1 = document.getElementById('1')

function createElement(tag, classNames){
    let element = document.createElement(tag)
    element.className = classNames
    return element
}

function createCard(data){
    data.forEach(el => {
        let card = createElement('div', 'card')
        let userName = createElement('h2', 'name')
        let userInfo = createElement('p', 'info')
        let {address: {city},email, name, phone, username, website} = el
        userName.innerHTML = name
        userInfo.innerHTML = `Username: ${username},  email: ${email},  city: ${city},  phone: ${phone},  website: ${website}`
        card.append(userName)
        card.append(userInfo)
        container1.append(card)
    })
}

let users = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(value => {
        console.log(value)
        return value
    })
    .then(value => createCard(value)) 

// 6
// Сделать запрос при помощи fetch на адрес https://jsonplaceholder.typicode.com/users/${userId}/todos, userId получить при помощи prompt. Вывести todo list пользователя, отобразить текст тудушки и индикатор выполнена она или нет (чекбокс). Вывести в html внутри div с id = 2
let container2 = document.getElementById('2')

function getUserId(){
    let userId = prompt('Укажите UserId')
    if(isNaN(userId) || userId === '' ){
        return alert('Это не ID')
    }else {
        return userId
    }
}

function createElement(tag, classNames, text = ''){
    let element = document.createElement(tag)
    element.className = classNames
    element.innerText = text
    return element
}

function createToDO(data){
    data.forEach(el => {
        let {completed, title} = el
        let todo = createElement('div', 'todo')
        let complete = createElement('input', 'todo')
        complete.type = 'checkbox'
        if(completed === true){
            complete.setAttribute('checked', 'checked')    
        }
        let todoTitle = createElement('h2', 'title', title)
        todo.append(complete)
        todo.append(todoTitle)
        container2.append(todo)
    });
}

function getToDo(){
    let userId = getUserId()
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then(response => response.json())
        .then(todos => createToDO(todos)) 
}

document.addEventListener('DOMContentLoaded', getToDo())        

// 7
// Сделать запрос при помощи fetch на адрес https://jsonplaceholder.typicode.com/albums/1/photos, вывести фотографии, используя тег img. В качестве src для img использовать поле url в объекте фото

// {
//   "albumId": 1,
//   "id": 4,
//   "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
//   "url": "https://via.placeholder.com/600/d32776",
//   "thumbnailUrl": "https://via.placeholder.com/150/d32776"
// },
// Дополнительно сделать, чтобы по нажатию на картинку картинка увеличивалась в размерах, повторное нажатие вернет картинку к исходному размеру. Вывести в html внутри div с id = 3
let container3 = document.getElementById('3')

function createImg(url){
    let img = document.createElement('img')
    img.className = 'img'
    img.src = url
    container3.append(img)
}

function getImg(){
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            createImg(element.thumbnailUrl)
        });
        container3.addEventListener('click', (e) => {
            let {target} = e 
            if(target.classList.contains('img')){
                target.classList.toggle('zoom')
            }
        })
    })
}
       
getImg()