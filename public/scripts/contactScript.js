/*
Filename: contactScript.js
Student name: Audrey Bernier Larose
Student Id: 301166198
Date: October 18, 2021
*/

"use strict";

/* Global Variables */
var formValidity = true;

/*Validating Phone Number*/
function validatePhone()
{
    var phoneInput = document.getElementById("phone");
    var errorDiv = document.getElementById("eErrorPhone");
    var phoneCheck = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    try
    {
        //Test if phone is valid
        if(phoneCheck.test(phoneInput.value) === false)
            throw "Please provide a valid phone number";
        
        phoneInput.style.background = "";
        errorDiv.innerHTML = "";
        errorDiv.style.display = "none";
    }
    catch(msg)
    {
       errorDiv.innerHTML = msg;
       errorDiv.style.display = "block";
       phoneInput.style.background = "rgb(255,233,233)";
       formValidity = false;
    }
}

/*Validating Email*/
function validateEmail() 
{
    var emailInput = document.getElementById("email");
    var errorDiv = document.getElementById("eErrorMessage");
    var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;

    try 
    {
        //Tests if email contains @ and .
       if (emailCheck.test(emailInput.value) === false) 
          throw "Please provide a valid email address; it must contain @ and an extension such as .com";

       emailInput.style.background = "";
       errorDiv.innerHTML = "";
       errorDiv.style.display = "none";
    }
    catch(msg) 
    {
       errorDiv.innerHTML = msg;
       errorDiv.style.display = "block";
       emailInput.style.background = "rgb(255,233,233)";
       formValidity = false;
    }
}
 
/*Checks for Empty Fields*/
function validateFields(fieldsetId) 
{
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.getElementById("errorMessage");
    var elementCount = inputElements.length;
    var currentElement;
    
    try 
    {
        for (var i = 0; i < elementCount; i++) 
        {
           currentElement = inputElements[i];
           if (currentElement.value === "") 
            {
              currentElement.style.background = "rgb(255,233,233)";
              fieldsetValidity = false;
            }
            else 
              currentElement.style.background = "white";
        }
    }
        catch(msg) 
        {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
        }
}

/*Validating the Form*/
function validateForm(evt)
{
    if(evt.preventDefault)
        evt.preventDefault();
    else
        evt.returnValue = false;

    formValidity = true;
    
    validateFields("information");
    validateEmail();
    validatePhone();

    if(formValidity === true)
    {
        document.getElementById("errorMessage").innerHTML = "";
        document.getElementById("errorMessage").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
        window.alert("Thank you, your message was sent successfully.");
        location.href = "/";
    }
    else
    {
        document.getElementById("errorMessage").innerHTML = "Please fix the indicated fields and resubmit your form.";
        document.getElementById("errorMessage").style.display = "block";
        scroll(0,0);
    }  
}

/*Event Listeners*/
function createEventListeners()
{
    var submit = document.getElementById("submitBtn");
    var reset = document.getElementById("resetBtn");
    
    if(submit.addEventListener)
        {
            submit.addEventListener("click", validateForm, false);
            reset.addEventListener("click", resetPage, false);
        }
    else if (submit.attachEvent)
        {
            submit.attachEvent("onclick", validateForm);
            reset.attachEvent("onclick", resetPage);
        }    
}

/*Resetting the Page*/
function resetPage()
{
    location.reload();
}

 /*Run Initial Form Configuration Functions*/
function setUpPage()
{
    createEventListeners();
}

 /*Run Setup Functions When Page Finishes Loading */
if(window.addEventListener)
    window.addEventListener("load", setUpPage, false)
else if (window.attachEvent)
    window.attachEvent("onload", setUpPage);
 