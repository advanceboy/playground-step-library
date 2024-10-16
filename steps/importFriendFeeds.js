customSteps.importFriendFeeds = function( step ) {
	return [
		{
			"step": "runPHP",
			"code": `
<?php require_once 'wordpress/wp-load.php';
if ( class_exists('Friends\Import')) {
Friends\Import::opml("${step.vars.opml}");
do_action( 'cron_friends_refresh_feeds' );
}
	`
		}
	];
};
customSteps.importFriendFeeds.info = "Provide useful additional info.";
customSteps.importFriendFeeds.vars = [
	{
		"name": "opml",
		"description": "The OPML file",
		"type": "textarea",
		"required": true,
		"samples": [ "" ]
	}
];
