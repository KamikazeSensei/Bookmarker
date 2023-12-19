var siteNameInput = document.getElementById("site_name_input")
var siteUrlInput = document.getElementById("site_url_input")

var tableContent = [];

if (localStorage.getItem("WebSite") != null) {
    tableContent = JSON.parse(localStorage.getItem("WebSite"))
    DisplayData(tableContent)
}


function AddData() {
    if (ValidateUrl() === true) {

        var tableItem = {
            name: siteNameInput.value,
            siteUrl: siteUrlInput.value
        }

        tableContent.push(tableItem);
        console.log(tableContent);
        DisplayData(tableContent);
        localStorage.setItem("WebSite", JSON.stringify(tableContent));
        clearForm();
    }
    else {
        alert('Please Enter a valid URL')
    }
}

function DisplayData(list) {
    var container = ''
    for (var i = 0; i < list.length; i++) {
        container += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td><button class="btn btn-success"><a href="${list[i].siteUrl}" target="_blank"><i class="fa fa-eye"></i> Visit</a></button></td>
        <td><button class="btn btn-danger" onclick="DeleteSite(${i})"><i class="fa fa-trash"></i> Delete</button></td>
    </tr>`
    }

    document.getElementById('table_content').innerHTML = container
}


function clearForm() {

    siteNameInput.value = ""
    siteUrlInput.value = ""
}

function DeleteSite(index) {

    tableContent.splice(index, 1)
    localStorage.setItem("WebSite", JSON.stringify(tableContent));
    DisplayData(tableContent);
}

function ValidateUrl() {

    var regex = /(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

    if (regex.test(siteUrlInput.value)) {
        return true
    } else {
        return false
    }
}