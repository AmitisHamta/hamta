"use strict"

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import {Header} from "../components/header/header.js";
import { Footer } from "../components/footer/footer.js";
import { Loader } from "../components/loader/loader.js";

window.customElements.define('site-header', Header);
window.customElements.define('site-footer', Footer);
window.customElements.define('site-loader', Loader);

const $ = document;
const container = $.getElementById('container');
const formContainer = $.getElementById('form-container');
const productsContainer = $.getElementById('products-container');
const submitBtn = $.getElementById('submit-btn');
const inputs = $.querySelectorAll('.input');
const taxCode = $.getElementById('taxcode')
const resultMessage = $.getElementById('message');

const supabase = createClient
('https://wbkeahghzxpcrxdbmdge.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India2VhaGdoenhwY3J4ZGJtZGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5OTU3MDQsImV4cCI6MjAyMTU3MTcwNH0.g0VDd1nt_JwDOKjItT6pWdtLjLqm9zs5k1toXLCHo5I')

const phoneRegex = /^(?:(?:\+|00)98|0)?9\d{9}$/;

const removeFilter = () => {
    container.style.filter = 'none';
}

const checkInputs = () => {
    let isDataEmpty = false;

    inputs.forEach(input => {
        if (!input.value) {
            isDataEmpty = true;
        }
    })

    if (isDataEmpty) {
        showErrorMsg('لطفا اطلاعات رو تکمیل کنید');
    }else {
        if (!phoneRegex.test(inputs[2].value)) {
            showErrorMsg('شماره موبایل وارد شده صحیح نمیباشد');
        }else {
            setInfo();
        }
    }
}

async function setInfo () {

    let taxCodeValue = 0;

    if (taxCode.value) {
        taxCodeValue = taxCode.value
    }
    
    const { data, error } = await supabase
    .from('pazirande')
    .insert({
        name: inputs[0].value,
        lastName: inputs[1].value,
        phoneNumber: inputs[2].value,
        staticNumber: inputs[3].value,
        birthday: inputs[4].value,
        idNumber: inputs[5].value,
        idCardNumber: inputs[6].value,
        fatherName: inputs[7].value,
        bankName: inputs[8].value,
        shebaNumber: inputs[9].value,
        cardNumber: inputs[10].value,
        industry: inputs[11].value,
        shopName: inputs[12].value,
        shopAddress: inputs[13].value,
        shopPostalCode: inputs[14].value,
        taxCode: taxCodeValue
    })

    if (error) {
        showErrorMsg('لطفا دوباره تلاش کنید');
    }else {
        showSuccessMsg('اطلاعات شما با موفقیت ثبت شد');
        resetInputs();
    }

}

const showErrorMsg = message => {
    resultMessage.innerHTML = message;
    resultMessage.classList.remove('success')
    resultMessage.classList.add('error')

    setTimeout(() => {
        resultMessage.classList.remove('error')
    }, 3000);
}

const showSuccessMsg = message => {
    resultMessage.innerHTML = message;
    resultMessage.classList.remove('error')
    resultMessage.classList.add('success')

    setTimeout(() => {
        resultMessage.classList.remove('success')
    }, 3000);
}

const resetInputs = () => {
    inputs.forEach(input => {
        input.value = '';
    })

    taxCode.value = '';
}

window.addEventListener('load', () => {
    removeFilter()
})

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    checkInputs();
})