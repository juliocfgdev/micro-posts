class UI {
    constructor() {
        this.post = document.querySelector('#posts')
        this.titleInput = document.querySelector('#title')
        this.bodyInput = document.querySelector('#body')
        this.idInput = document.querySelector('#id')
        this.postSubmit = document.querySelector('.post-submit')
        this.forState = 'add'
    }

    showPosts(posts) {
        let output = ''

        posts.forEach(post => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="delete card-link" data-id="${post.id}"><i class="fas fa-trash"></i></a>
                </div>
            </div>
          `
        });

        this.post.innerHTML = output
    }
    showAlert(message, className) {
        this.clearAlert()

        // Create div
        const div = document.createElement('div')
        // Add classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message))
        // Get parent
        const container = document.querySelector('.postsContainer')
        // Get posts
        const posts = document.querySelector('#posts')
        // Insert alert div
        container.insertBefore(div, posts)

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert')
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title
        this.bodyInput.value = data.body
        this.idInput.value = data.id

        this.changeFormState('edit')
    }

    // Clear id input
    clearIDInput() {
        this.idInput.value = ''
    }
    changeFormState(type) {
        if (type === 'edit') {
            this.postSubmit.textContent = 'Editar Texto'
            this.postSubmit.className = 'post-submit btn btn-warning btn block'

            // Create cancel button
            const button = document.createElement('button')
            button.className = 'post-cancel mt-1 btn btn-dark btn-block'
            button.appendChild(document.createTextNode('Cancelar'))

            // Get parent
            const cardForm = document.querySelector('.card-form');
            // Get element to insert before
            const formEnd = document.querySelector('.form-end');
            // Insert Cancel Button
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent = 'Salvar'
            this.postSubmit.className = 'post-submit btn btn-primary btn block'

            // Remove cancel button
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();

            }

            // Clear ID from hidden field
            this.clearIDInput();
            this.clearFields()
        }
    }

}



export const ui = new UI();