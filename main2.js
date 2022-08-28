const form = document.getElementById('form-control')
const amount = document.getElementById('amount')
const description = document.getElementById('desc')
const category = document.getElementById('category')
const submit = document.getElementById('submitbtn')
submit.addEventListener('click', onSubmit)

document.addEventListener('DOMContentLoaded', function () {
    axios.get('https://crudcrud.com/api/dbd7a1d99b564dbdbbc3f15517690600/expenses')
        .then((response) => {
            console.log('(response): ', response);
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i])
                appendList(response.data[i])
            }
        })
        .catch((err) => console.log(err))
})


function onSubmit(event) {
    event.preventDefault()


    myObj = {
        amt: amount.value,
        desc: description.value,
        cat: category.value
    }

    postFunction(myObj)

    appendList(myObj)
    amount.value = ''
    description.value = ''
    category.value = ''

}


function postFunction(myObj) {
    axios.post('https://crudcrud.com/api/dbd7a1d99b564dbdbbc3f15517690600/expenses', myObj)
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
}



//Main Function:
function appendList(myObj) {

    const allh4inFront = document.getElementsByClassName('desc-h4-class')
    for (let i = 0; i < allh4inFront.length; i++) {
        if (allh4inFront[i].innerHTML == myObj.desc) {
            const toBeDeleted = allh4inFront[i].parentElement
            toBeDeleted.remove()
        }
    }
    /////////////////----------------------duplicate front data displaying resolved------------>>>>>>>
    const innerDiv = document.createElement('div')
    innerDiv.classList.add('inner-div', "card-body","subheader", "bg-light")
    const amtContainerH4 = document.createElement('h4')
    const descContainerH4 = document.createElement('h4')
    const catContainerH4 = document.createElement('h4')
    descContainerH4.classList.add('desc-h4-class')

    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    editButton.classList.add('innerbtn', 'editbtn','btn', 'btn-outline-success')
    deleteButton.classList.add('innerbtn', 'dltbtn' ,'btn','btn-outline-danger')

    editButton.innerHTML = 'Edit'
    deleteButton.innerHTML = 'Delete'

    //---------------------------------------------------------------------------------
    deleteButton.addEventListener('click', deleteDivAndData)
    editButton.addEventListener('click', editFrontData)

    //Edit Button Function:
    function editFrontData() {
        const targetamt = editButton.previousSibling.previousSibling.previousSibling.innerHTML
        const targetdesc = editButton.previousSibling.previousSibling.innerHTML
        const targetCategory = editButton.previousSibling.innerHTML

        amount.value = targetamt;
        description.value = targetdesc;
        category.value = targetCategory

        editButton.parentElement.remove()
        deleteDivAndData()
    }


    function deleteDivAndData() {
        const descforremovingfromlocal = deleteButton.previousSibling.previousSibling.previousSibling.innerHTML
        console.log(descforremovingfromlocal)
        axios.get('https://crudcrud.com/api/dbd7a1d99b564dbdbbc3f15517690600/expenses')
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    console.log("ye wala", response.data[i].desc);
                    if (response.data[i].desc === descforremovingfromlocal) {
                        console.log("target to delete", response.data[i].desc);
                        let targetId = response.data[i]._id;
                        axios.delete(`https://crudcrud.com/api/dbd7a1d99b564dbdbbc3f15517690600/expenses/${targetId}`)
                            .then((response) => console.log('deleted this', response, "--", targetId))
                            .catch((err) => console.log(err))
                    }
                }
            })
        deleteButton.parentElement.remove()
    }

    amtContainerH4.innerHTML = myObj.amt
    descContainerH4.innerHTML = myObj.desc
    catContainerH4.innerHTML = myObj.cat

    innerDiv.appendChild(amtContainerH4)
    innerDiv.appendChild(descContainerH4)
    innerDiv.appendChild(catContainerH4)
    innerDiv.appendChild(editButton)
    innerDiv.appendChild(deleteButton)

    const parentDiv = document.getElementById('total-items')
    parentDiv.appendChild(innerDiv)

}
