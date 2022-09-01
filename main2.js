const form = document.getElementById('form-control')
const amount = document.getElementById('amount')
const description = document.getElementById('desc')
const category = document.getElementById('category')
const submit = document.getElementById('submitbtn')
submit.addEventListener('click', onSubmit)

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await axios.get('https://crudcrud.com/api/41b7c2c9f84548b784394aaeb2303e3b/expenses')
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    console.log(response.data[i])
                    appendList(response.data[i])
                }
            })
    } catch (error) {
        console.log(error)
    }
})


async function onSubmit(event) {
    event.preventDefault()

    if (!(amount.value == '' || description.value == '' || category.value == '')) {
        myObj = {
            amt: amount.value,
            desc: description.value,
            cat: category.value
        }
        amount.value = ''
        description.value = ''
        category.value = ''

        try {
            await axios.get('https://crudcrud.com/api/41b7c2c9f84548b784394aaeb2303e3b/expenses')
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (myObj.desc == response.data[i].desc) {
                            let id = response.data[i]._id
                            try {
                                axios.delete(`https://crudcrud.com/api/41b7c2c9f84548b784394aaeb2303e3b/expenses/${id}`)
                            } catch (error) {
                                console.log(error)
                            }

                        }
                    }
                })
            try {
                axios.post('https://crudcrud.com/api/41b7c2c9f84548b784394aaeb2303e3b/expenses', myObj)
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
        appendList(myObj)
    } else {
        alert('Enter all values!')
    }


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

    const innerDiv = document.createElement('div')
    innerDiv.classList.add('inner-div', "card-body", "subheader", "bg-light")
    const amtContainerH4 = document.createElement('h4')
    amtContainerH4.classList.add('amt-h4-class')
    const descContainerH4 = document.createElement('h4')
    const catContainerH4 = document.createElement('h4')
    catContainerH4.classList.add('cat-h4-class')
    descContainerH4.classList.add('desc-h4-class')

    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    editButton.classList.add('innerbtn', 'editbtn', 'btn', 'btn-outline-success')
    deleteButton.classList.add('innerbtn', 'dltbtn', 'btn', 'btn-outline-danger')

    editButton.innerHTML = 'Edit'
    deleteButton.innerHTML = 'Delete'
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

        deleteDivAndData()

        let updatedObj = {
            amt: amount.value,
            desc: description.value,
            cat: category.value
        }

        // console.log(updatedObj)
        appendList(updatedObj)
    }


    async function deleteDivAndData() {
        const descforremovingfromlocal = deleteButton.previousSibling.previousSibling.previousSibling.innerHTML
        try {
            await axios.get('https://crudcrud.com/api/41b7c2c9f84548b784394aaeb2303e3b/expenses')
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].desc == descforremovingfromlocal) {
                            let id = response.data[i]._id
                            try {
                                axios.delete(`https://crudcrud.com/api/41b7c2c9f84548b784394aaeb2303e3b/expenses/${id}`)
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                })
        } catch (error) {
            console.log(error);
        }
        deleteButton.parentElement.remove()
    }
}
