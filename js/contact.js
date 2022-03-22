window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above
  var form = document.getElementById("my-form");
  // var button = document.getElementById("my-form-button");
  var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
    status.classList.add("success");
  }

  function error() {
    status.classList.add("error");
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

const btnSend = document.querySelector(".btn-send");
const btnLoading = document.querySelector(".btn-loading");

/* ========== TOAST ALERT =========== */
const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  if (btnSend.style.display === "") {
    btnSend.style.display = "none";
    btnLoading.style.display = "";
  } else {
    return false;
  }
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      btnSend.style.display = "";
      btnLoading.style.display = "none";
      /* ========== TOAST =========== */
      success(
        Toast.fire({
          icon: "success",
          title: "Your message has been sent!",
          text: "Thanks for contacting me.",
        })
      );
    } else {
      error(
        /* ========== TOAST =========== */
        Toast.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong!",
        })
      );
    }
  };
  xhr.send(data);
}
