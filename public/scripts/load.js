const button_post = document.querySelector('.post_button')
const title = document.querySelector('#title')
const genre = document.querySelector('#genre')
const year = document.querySelector('#year')
const artist = document.querySelector('#artist')


button_post.addEventListener("click", () => {
if(title.value===''){
  console.log(err)
}else{
  fetch('/newalbum', {
        method: 'POST',
        body: JSON.stringify({
          title:title.value,
  artist:artist.value,
  genre:genre.value,
  year:year.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        // Проверяем успешность запроса и выкидываем ошибку
        if (!response.ok) {
          throw new Error('Error occurred!')
        }
    
        return response.json()
      })
      // Теперь попадём сюда, т.к выбросили ошибку
      .catch((err) => {
        console.log(err)
      }) // Error: Error occurred!  
    }         
})