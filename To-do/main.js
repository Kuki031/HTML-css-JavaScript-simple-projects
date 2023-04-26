window.addEventListener("DOMContentLoaded" , () => {

    const submitForm = document.querySelector('#form').addEventListener("submit" , (e) => {
        e.preventDefault();
    })
    const submitBtn = document.querySelector("#submit");
    const addedDiv = document.querySelector(".added-item");
    let createdP;

    function addFunction() {
        let inputToDo = document.querySelector("#enter-todo");
        if(!inputToDo.value) {
            alert("Input blank.");
            return addFunction;
        }
        else {
           createdP = document.createElement('p');
           createdP.textContent = inputToDo.value;
           addedDiv.append(createdP);
           inputToDo.value = '';
        }

        let allP = addedDiv.querySelectorAll('p');
            allP.forEach(para => {
                para.addEventListener('click' , () => {
                    para.style.textDecoration = 'line-through';
                    para.style.color = 'green';
                })

                para.addEventListener('dblclick' , () => {
                    addedDiv.removeChild(para);
        })
    })
}
    submitBtn.addEventListener("click" , addFunction);
})