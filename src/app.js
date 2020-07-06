import { http } from './http'
import { ui } from './ui'

// Get Posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listener for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Listener for delete
document.querySelector('#posts').addEventListener('click', deletePost)

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)

// Get Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').value

  // Validate input
  if (title === '' || body === '') {
    ui.showAlert('Preencha todos os campos', 'alert alert-danger text-center');
  } else {
    const data = {
      title,
      body
    }

    if (id === '') {
      // Create Post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Texto Adicionado', 'alert alert-success text-center')
          ui.clearFields()
          getPosts()

        }).catch((err) => console.log(err));

    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Texto Editado', 'alert alert-success text-center')
          ui.changeFormState('add')
          getPosts()

        }).catch((err) => console.log(err));
    }



  }

}

// Delete Post
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Tem certeza que deseja apagar?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then((result) => {
          ui.showAlert('Texto Removido', 'alert text-center alert-success')
          getPosts()

        }).catch(err => console.log(err));

    }

  }
  e.preventDefault()
}

// Enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;

    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }
    // Fill form with current post
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Cancel edit state 
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add')
  }

  e.preventDefault;
}