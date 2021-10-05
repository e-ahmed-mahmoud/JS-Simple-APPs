const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('passwordVerify');

function showError(item , errMsg){
    const parent = item.parentElement;
    parent.className = 'form-control error';
    const small = parent.querySelector('small');
    small.className = 'form-control.small'; 
    small.innerText = getFieldName(item.id) +" " + errMsg;
}
function showSuccess (item ){
    const parent = item.parentElement;
    parent.className = 'form-control success';
}

function validateItem(items){
    items.forEach(cur => {
        cur.value ==="" ? showError(cur, 'required field') : showSuccess(cur);
    });
}

function getFieldName(item){
    return `${item.charAt(0).toUpperCase()}${item.slice(1)}`
}

function validateOnItemlength(item,minLen ,maxLen){
    if (item.value.trim().length < minLen || item.value.trim().length > maxLen ) {
        showError(item," length not valid");
    }
}

function validateOnEmail(emailArgu){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(emailArgu.value.trim())) {
        return showSuccess(emailArgu);
    }
    else{
        return showError(emailArgu , 'invalid email');
    }
}

function validatePasswords(password,passwordVerify){
    if (password.value === passwordVerify.value) {
        showSuccess(password);
        showSuccess(passwordVerify);
    }
    else{
        showError(passwordVerify, 'Not identical');
    }
}

form.addEventListener('submit',function( e ){
    e.preventDefault();

    validateItem([userName,email,password,password2]);
    validateOnItemlength(userName,5 , 25);
    validateOnItemlength(password, 8 , 16);
    validateOnItemlength(password2, 8 , 16);
    validateOnEmail(email);
    validatePasswords(password , password2);

});