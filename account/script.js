const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

async function checkAccount() {
	try {
		const loggedInUserId=localStorage.getItem('loggedInUserId');
		if(loggedInUserId){
			window.location.href = '../home';
		}
	} catch (error) {
	  window.location.href = '/error.html';
	}
  }

  window.onload = function() {
	checkAccount();
  };