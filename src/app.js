import { http } from './http'
import { ui } from './ui'

// Get Posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listener for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Listener for delete
document.querySelector('#posts').addEventListener('click', deletePost)

// Get Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value

  const data = {
    title,
    body
  }

  // Create Post
  http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post Added', 'alert alert-success text-center')
      ui.clearFields()
      getPosts()

    }).catch((err) => console.log(err));
}

// Delete Post
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then((result) => {
          ui.showAlert('Post Removed', 'alert alert-success')
          getPosts()

        }).catch(err => console.log(err));

    }

  }
  e.preventDefault()
}