// fixed message on top when scroll
/*
  parameter: type: string (element id)
*/
var fix_message = function (ele) {
  window.onscroll = function () {
    const messageContainer = document.getElementById(ele);
    const scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollDistance > messageContainer.offsetTop) {
      messageContainer.classList.add('sticky-message');
    } else {
      messageContainer.classList.remove('sticky-message');
    }
  }
};

// validate form information before submit
var validate_form = function (ele) {
  var submit_btns = document.getElementsByClassName(ele);
  console.log(submit_btns.length);
  $(submit_btns).each(function () {
    $(this).on("click", function () {
      var contact_form = $(this).closest("form");
      var name = $(contact_form).find(".cs-name").val();
      var email = $(contact_form).find(".cs-email").val();
      var phone = $(contact_form).find(".cs-phone").val();
      var message = "";
      var alert_msg = "";
      var info = "";
      if (name == "") {
        alert_msg += "Name ";
      }
      if (email == "") {
        alert_msg += "Email ";
      }
      if (phone == "") {
        alert_msg += "Phone ";
      }
      if ($(contact_form).find(".cs-message").length > 0) {
        message = $(contact_form).find(".cs-message").val();
      } else {
        message = "";
      }
      if (alert_msg != "") {
        Swal.fire({
          title: 'Error!',
          text: alert_msg + "is required.",
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      } else {
        info = {
          "name": name,
          "email": email,
          "phone": phone,
          "message": message
        }
        console.log(info);
        // submit info to backend..
        // has message => go to contact us
        if ($(contact_form).find(".cs-message").length > 0) {
          send_to_api("https://us.admin.fydiglobal.com/api/userContactUs/add", info);
        }
        //no message => go to free quote
        else {
          send_to_api("https://us.admin.fydiglobal.com/api/freeQuote/add", info);
        }
      }
    });
  });
}
// POST front end data to api
/*
  parameter: url_: type: string (api url)
             data: type: json 
*/
var send_to_api = function (url_, data_) {
  $.ajax({
    url: url_,
    type: "POST",
    dataType: 'JSON',
    data: data_,
    success: function (res) {
      if (res.code == 0) {
        Swal.fire({
          title: 'Success',
          text: 'Your inquiry has been sent to us. Thanks!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          window.location.reload();
        });
      }
    },
    error: function(xhr, textStatus, errorThrown){
      Swal.fire({
        title: 'Error Occured',
        text: 'Oops, something went wrong, please try again later or call us. Sorry',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      });
    }
  });
}