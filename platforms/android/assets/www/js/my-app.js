// Initialize your app
var myApp = new Framework7({
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

function onBackKeyDown() { $$(".back").click(); } 
document.addEventListener("backbutton", onBackKeyDown, false);

$$('a').on('click', function (e) { //Close panel when you open a new page
    myApp.closePanel();
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
});

myApp.onPageInit('tab', function (page) {
});

myApp.onPageInit('list', function (page) {
    $$('.action1').on('click', function () {
  myApp.alert('Action 1');
});
$$('.action2').on('click', function () {
  myApp.alert('Action 2');
}); 
});

myApp.onPageInit('form', function (page) {
});

myApp.onPageInit('google-map', function (page) {
  var myLatlng = new google.maps.LatLng(48.852873, 2.343627);
  var map;
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
      var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
});

myApp.onPageInit('notifications', function (page) {
    $$('.notification-default').on('click', function () {
    myApp.addNotification({
        title: 'Copernic',
        message: 'This is a simple notification message with title and message'
    });
});
$$('.notification-full').on('click', function () {
    myApp.addNotification({
        title: 'Copernic',
        subtitle: 'Notification subtitle',
        message: 'This is a simple notification message with custom icon and subtitle',
        media: '<i class="fa fa-heart"></i>'
    });
});
$$('.notification-custom').on('click', function () {
    myApp.addNotification({
        title: 'Copernic',
        subtitle: 'New message from John Doe',
        message: 'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',
        media: '<img width="44" height="44" style="border-radius:100%" src="http://img4.wikia.nocookie.net/__cb20130920142351/simpsons/images/e/e9/Pic_1187696292_8.jpg">'
    });
});
$$('.notification-callback').on('click', function () {
    myApp.addNotification({
        title: 'My Awesome App',
        subtitle: 'New message from John Doe',
        message: 'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',
        media: '<img width="44" height="44" style="border-radius:100%" src="http://img4.wikia.nocookie.net/__cb20130920142351/simpsons/images/e/e9/Pic_1187696292_8.jpg">',
        onClose: function () {
            myApp.alert('Notification closed');
        }
    });
});      
});

myApp.onPageInit('calendar', function (page) {
    // Default
      var calendarDefault = myApp.calendar({
          input: '#calendar-default',
      });
      // With custom date format
      var calendarDateFormat = myApp.calendar({
          input: '#calendar-date-format',
          dateFormat: 'DD, MM dd, yyyy'
      });
      // With multiple values
      var calendarMultiple = myApp.calendar({
          input: '#calendar-multiple',
          dateFormat: 'M dd yyyy',
          multiple: true
      });
      // Inline with custom toolbar
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
      var calendarInline = myApp.calendar({
          container: '#calendar-inline-container',
          value: [new Date()],
          weekHeader: false,
          toolbarTemplate: 
              '<div class="toolbar calendar-custom-toolbar">' +
                  '<div class="toolbar-inner">' +
                      '<div class="left">' +
                          '<a href="#" class="link icon-only"><i class="fa fa-chevron-left"></i></a>' +
                      '</div>' +
                      '<div class="center"></div>' +
                      '<div class="right">' +
                          '<a href="#" class="link icon-only"><i class="fa fa-chevron-right"></i></a>' +
                      '</div>' +
                  '</div>' +
              '</div>',
          onOpen: function (p) {
              $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
              $$('.calendar-custom-toolbar .left .link').on('click', function () {
                  calendarInline.prevMonth();
              });
              $$('.calendar-custom-toolbar .right .link').on('click', function () {
                  calendarInline.nextMonth();
              });
          },
          onMonthYearChangeStart: function (p) {
              $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
          }
});
});

myApp.onPageInit('chat', function (page) {
    var conversationStarted = false;
 
// Init Messages
var myMessages = myApp.messages('.messages', {
  autoLayout:true
});
 
// Init Messagebar
var myMessagebar = myApp.messagebar('.messagebar');
 
// Handle message
$$('.messagebar .link').on('click', function () {
  // Message text
  var messageText = myMessagebar.value().trim();
  // Exit if empy message
  if (messageText.length === 0) return;
 
  // Empty messagebar
  myMessagebar.clear()
 
  // Random message type
  var messageType = (['sent', 'received'])[Math.round(Math.random())];
 
  // Avatar and name for received message
  var avatar, name;
  if(messageType === 'received') {
  }
  // Add message
  myMessages.addMessage({
    // Message text
    text: messageText,
    // Random message type
    type: messageType,
    // Avatar and name:
    // Day
    day: !conversationStarted ? 'Today' : false,
    time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  })
 
  // Update conversation flag
  conversationStarted = true;
});                
});

myApp.onPageInit('checkbox', function (page) {
});

myApp.onPageInit('radio', function (page) {
});

myApp.onPageInit('login-screen', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.button-round').on('click', function () {
    var username = pageContainer.find('input[name="username"]').val();
    var password = pageContainer.find('input[name="password"]').val();
    // Handle username and password
    myApp.alert('Username: ' + username + ', Password: ' + password, function () {
    });
  });
});   

myApp.onPageInit('404', function (page) { 
});

myApp.onPageInit('userlist', function (page) { 
});

myApp.onPageInit('feed', function (page) { 
});

myApp.onPageInit('grid', function (page) { 
});

myApp.onPageInit('cards', function (page) { 
});

myApp.onPageInit('blog', function (page) {
$$('#stickySocial').find('#stickyBtn').each(function(){
  var $el = $$(this);
  var ssCount = $el.data("count");
  var ssClass = $el.attr("class").split(' ')[0];
  $$('.'+ssClass+' .count').html(ssCount);
});
});

myApp.onPageInit('article', function (page) {
$$('#stickySocial').find('#stickyBtn').each(function(){
  var $el = $$(this);
  var ssCount = $el.data("count");
  var ssClass = $el.attr("class").split(' ')[0];
  $$('.'+ssClass+' .count').html(ssCount);
});
});

myApp.onPageInit('gallery', function (page) {
  var mySwiper = new Swiper('.swiper-container', {
  preloadImages: false,
  lazyLoading: true,
  pagination: '.swiper-pagination'
})
});

myApp.onPageInit('video', function (page) {
});



myApp.onPageInit('typo', function (page) {
});

myApp.onPageInit('button', function (page) {
});

myApp.onPageInit('colors', function (page) {
});

myApp.onPageInit('feature', function (page) {
});

myApp.onPageInit('page', function (page) {
});

myApp.onPageInit('signup', function (page) {
	

    var $form = $('#signup-form');

      $form.find('.button-round').on('click', function (e) {
        // remove the error class
        $('.form-group').removeClass('has-error');
        $('.help-block').remove();

        // get the form data
        var formData = {
            'username' : $('input[name="form-username"]').val(),
            'password' : $('input[name="form-password"]').val(),
        };

        // process the form
        $.ajax({
            type : 'POST',
            url  : 'http://athena.ecs.csus.edu/~caraanmj/SUSD/www/signup.php',
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
			// handle errors
            if (!data.success) {
                if (data.errors.username) {
                    $('#username-field').addClass('has-error');
                    $('#username-field').find('.item-content').append('<span class="help-block">' + data.errors.username + '</span>');
                }

                if (data.errors.password) {
                    $('#password-field').addClass('has-error');
                    $('#password-field').find('.item-content').append('<span class="help-block">' + data.errors.password + '</span>');
                }
            } else {
                // display success message
                $form.html('<div class="content-block">' + data.message + '</div><p><a href="start.html" class="button button-round">Back</a></p>');
            }
        }).fail(function (data) {
            // for debug
            console.log(data)
        });

        e.preventDefault();
    });
  });
  
myApp.onPageInit('login', function (page) {
	

    var $form = $('#login-form');

      $form.find('.button-round').on('click', function (e) {
        // remove the error class
        $('.form-group').removeClass('has-error');
        $('.help-block').remove();

        // get the form data
        var formData = {
            'username' : $('input[name="login-username"]').val(),
            'password' : $('input[name="login-password"]').val(),
        };

        // process the form
        $.ajax({
            type : 'POST',
            url  : 'http://athena.ecs.csus.edu/~caraanmj/SUSD/www/login.php',
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
			// handle errors
            if (!data.success) {
                if (data.errors.username) {
                    $('#username-field-login').addClass('has-error');
                    $('#username-field-login').find('.item-content').append('<span class="help-block">' + data.errors.username + '</span>');
                }

                if (data.errors.password) {
                    $('#password-field-login').addClass('has-error');
                    $('#password-field-login').find('.item-content').append('<span class="help-block">' + data.errors.password + '</span>');
                }
            } else {
                // display success message
				localStorage.login="true";
				localStorage.username=data.message;
                window.location.href = "main.html";
				//alert("Login Successful");
            }
        }).fail(function (data) {
            // for debug
            console.log(data)
        });

        e.preventDefault();
    });
  });
  
myApp.onPageInit('main', function (page) {
	

	
});

function getSchool(){
		
		var formData = {
			'school' : $('#school-select').find('select[name="school-selected"]').val(),
		};
		
		
		$.ajax({
            type : 'POST',
            url  : 'http://athena.ecs.csus.edu/~caraanmj/SUSD/www/school_select.php',
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
			// handle errors
            if (!data.success) {
                // YEE
				alert('not data success');
            } else {
                // display success message
				
				$('#list').html('<li class="card" id="id"><div class="card-header" id="name"><b>'+data.message['SCHOOL_NAME']+'</b></div><div class="card-content"><div class="card-content-inner" id="school_type">'+data.message['SCHOOL_TYPE']+'</div></div><div class="card-footer"><a href="#" class="confirm-ok" id="phone_no" on>'+data.message['PHONE_NO']+'</a></div><div class="card-footer" id="address"><u>'+data.message['ADDRESS']+'</u></div></li>');
            }
        }).fail(function (data) {
            // for debug
            //console.log(data);
			alert('Fail');
        });
	}
	
myApp.onPageInit('schoolDirectory', function(page){
	
	
	
	$.ajax({
		type : 'POST',
		url  : 'http://athena.ecs.csus.edu/~caraanmj/SUSD/www/school_init.php',
		dataType : 'json',
		encode : true
	}).done(function (data) {
		// handle errors
		if (!data.success) {
			// YEE
		} else {
			// display success message
			$('#school-selected').append(data.message);
			$('#first-item').append(data.first_school);
			$('#school-selected').val(data.first_school);
			getSchool();
		}
	}).fail(function (data) {
		// for debug
		//console.log(data);
		alert(data);
	});
	
	
	
});

myApp.onPageInit('corporateDirectory', function(page){
	
	var first_name;        //get first name
	var last_name;         //get last name
	var department;		 //get department		
	var location;
	var email;		 	 //get email		
	var phone_no;		     //get phone number	
	var row_count;
	
	$.ajax({                                      
      url: 'http://athena.ecs.csus.edu/~otkidycm/Stockton-Unified/www/susd_get_dir.php',                  //the script to call to get data          
      data: "",                        //you can insert url argumnets here to pass to api.php
                                       //for example "id=5&parent=6"
      dataType: 'json',                //data format      
      success: function(data)          //on recieve of reply
      {
        
		row_count = Object.keys(data).length;	// number of rows in mysql database
	
		
		for(var i = 0; i < row_count; i++){
		
			
			first_name = data[i]["FIRST_NAME"];        //get first name
			last_name = data[i]["LAST_NAME"];         //get last name
			department = data[i]["DEPARTMENT"];		 //get department		
			location = data[i]["LOCATION"];
			email = data[i]["EMAIL"];		 	 //get email		
			phone_no = data[i]["PHONE_NO"];		     //get phone number	
			
			// Create our dynamic html elements

			$('#list').append('<li class="card" id="id"><div class="card-header" id="name"><b>'+first_name+' '+last_name+'</b></div><div class="card-content"><div class="card-content-inner" id="department">'+department+'</div></div><div class="card-footer item-link" id="phone_number"><a href="#" class="confirm-ok" id="phone_no">'+phone_no+'</a></div><div class="card-footer item-link" id="email"><u>'+email+'</u></div></li>');			
		}
		
		
		

      }
	  

      
    });
	
	// User can dial a phone number just by clicking on the link
	$('#list').on('click', '#phone_no', function(){

		
		var phone_num = $(this).text();
	  
		myApp.confirm('Call  ' + phone_num, function () {
			
			window.open('tel:' + phone_num, '_system');
		});	
	   
    });
	
	// User clicks on email link which launches the default mail app
	$('#list').on('click', '#email', function(){
		
		var email_address = $(this).text();
	   
	   
		window.open('mailto:' + email_address, '_system');
    	
	   
    });
   
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});


