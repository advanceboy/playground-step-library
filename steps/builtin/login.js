customSteps.login = function() {
	var steps = [
		{
			"step": "login",
			"username": "${username}",
			"password": "${password}"
		}
	];
	steps.landingPage ='/wp-admin/';
	return steps;
}
customSteps.login.description = "Login to the site";
customSteps.login.builtin = true;
customSteps.login.vars = [
	{
		"name": "username",
		"description": "Username",
		"required": true,
		"samples": [ "admin" ]
	},
	{
		"name": "password",
		"description": "Password",
		"required": true,
		"samples": [ "password" ]
	}
];
