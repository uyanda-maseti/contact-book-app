document.getElementById('refresh').addEventListener('click', fetchContacts)

function fetchContacts(){
    fetch(rootPath + "controller/get-contacts/")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        displayOutput(data)
        // console.log(data)
    })
}

function displayOutput(data){
    output = '<table>'

    for(a in data){
        output += `
            <tr>
                <td><img src="${rootPath}controller/uploads/${data[a].avatar}" width="40"></td>
                <td><h5>${data[a].firstname}</h5></td>
                <td><h5>${data[a].lastname}</h5></td>
            </tr>
        `
    }
    output += '</table>'
    document.getElementById('table').innerHTML = output
}

function submitForm(e){
    e.preventDefault()

    const form = new FormData(document.querySelector('#editForm'))
    form.append('apiKey', apiKey)

    fetch(rootPath + 'controller/insert-contact', {
        method: 'POST',
        headers: {'Accept': 'application/json, *.*'},
        body: form
    })
    .then(function(response){
        return response.text()
    })
    .then(function(data){
        if(data === '1'){
            alert('Contact added.')
            homeLink()
        }else{
            alert(data)
            homeLink()
        }
    })
}

function homeLink(){
    window.open('index.html', '_self')
}