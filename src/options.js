function get_profiles()
{
	var profiles = localStorage["SwitcherProfiles"];
	if (profiles)
		return JSON.parse(profiles);
	else
		return [];
}

/// <summary>
/// Loads the current options from localStorage
/// </summary>
function load_options() {

	var profiles = get_profiles();

	var t = $.template('<tr><td rowspan="2">${name}</td><td>Live:</td><td>${live}</td><td rowspan="2"><button type="button" class="btnDeleteProfile" data-index="${index}">Del</button></td></tr><tr><td>Dev:</td><td>${dev}</td></tr>');
	for (var i in profiles)
	{
		var profile = profiles[i];
		profile.index = i;
		$('#profilesrows').append(t, profile);
	}
}

function deleteProfile(index)
{
	var profiles = get_profiles();
	if (profiles.length > index)
	{
		profiles.splice(index, 1);
		localStorage["SwitcherProfiles"] = JSON.stringify(profiles);
	}

	document.location.reload();
}

function addProfile()
{
	if (!$("#profileform").valid())
		return;

	var profiles = get_profiles();

	var newprofile = {
		name: document.getElementById("newprofilename").value,
		live: document.getElementById("newliveserver").value,
		dev: document.getElementById("newdevserver").value
	};

	if (!profiles)
		profiles = [newprofile];
	else
		profiles.push(newprofile);

	localStorage["SwitcherProfiles"] = JSON.stringify(profiles);

	document.location.reload();
}

$(document).ready(function(){
	load_options();
	
	$("#btnAddProfile").click(addProfile);
	index = 0;
	$(".btnDeleteProfile").click(function(ev) {
		// find the index of the item to delete and delete it
		index = $(ev.target).data("index");
		deleteProfile(index);
	});

	$("#profileform").validate();
});
