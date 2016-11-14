$(document).ready(function(){

	var user_name = $.trim($('#user_email').text()),
		group_name = $.trim($("#group-name").text()),
		member = $.trim($(".member").text()) == "Member",
		admin = $.trim($(".admin").text()) == "Admin",
		mod = $.trim($(".mod").text()) == "Mod",
		btn_edit_group_info = $("#btn-edit-group-info"),
		btn_edit_settings = $("#btn-edit-settings"),
		btn_add_members = $("#btn-add-members"),
		btn_subscribe_group = $("#btn-subscribe-group"),
		btn_unsubscribe_group = $("#btn-unsubscribe-group"),
		btn_delete_members = $("#btn-del-members"),
		btn_set_admin = $("#btn-set-admin"),
		btn_set_mod = $("#btn-set-mod"),
		btn_add_list = $('#btn-add-list'),
		action_select = $('#actionSelect'),
		btn_delete_group = $("#btn-delete-group");

	var admin_buttons = [btn_add_members, btn_edit_group_info, btn_set_admin, btn_set_mod, 
						btn_delete_members, btn_add_list, action_select, btn_delete_group];

	var btn_mute_member = $("#btn-mute-member");
	var btn_unmute_member = $("#btn-unmute-member");
	var btn_follow_member = $("#btn-follow-member");
	var btn_unfollow_member = $("#btn-unfollow-member");

	if (admin) {
		var members_table = $('#members-table').dataTable({
			"aoColumns": [ { 'bSortable': false}, null, null, null, null, null]
		}),
			lists_table = $('#lists-table').dataTable({
			"aoColumns": [ { 'bSortable': false}, null, null, null, null]
		});

	} else {
		var members_table = $('#members-table').dataTable({}),
			lists_table = $('#lists-table').dataTable({});
	}

	delete_group =
	    function(params) {
	    	warningMessage = "Are you sure? This will delete the group including all emails ever sent within this group in the archive."
	        var confirmation = confirm(warningMessage);
	        if (confirmation) {
	        	$.post('/delete_group', params,
	        		function(res){
	        			notify(res,true);
	        			setTimeout(function(){
	        				window.location = '/';
	        			},400);
	        		});
	        }
	    }
		
	// activating and deactivating does nothing

	// activate_group = 
	// 	function(params){
	// 		$.post('/activate_group', params, 
	// 			function(res){
	// 				if (res.status) {
	// 					$(".group_active").text('True');
	// 					group_active = true;
	// 					fix_visibility();
	// 				}
	// 				notify(res, true);
	// 			}
	// 		);	
	// 	};
		
	
	// deactivate_group = 
	// 	function(params){
	// 		$.post('/deactivate_group', params, 
	// 			function(res){
	// 				if (res.status) {
	// 					$(".group_active").text('False');
	// 					group_active = false;
	// 					fix_visibility();
	// 				}
	// 				notify(res, true);
	// 			}
	// 		);	
	// 	};	

	var post_edit_members = function(params) {
		$.post('/edit_members', params, function(res){
			notify(res,true);
			setTimeout(function(){
				window.location.reload();
			}, 400);
		});
	};

	var edit_lists_adjust_can_post = function(selected, can_post) {
		var params = {'group_name' : group_name, 'lists' : selected, 'can_post' : can_post};
		$.post('/adjust_list_can_post', params, function(res){
			notify(res, true);
			setTimeout(function(){
				window.location.reload();
			}, 400);
		});
	}

	var edit_lists_adjust_can_receive = function(selected, can_receive) {
		var params = {'group_name' : group_name, 'lists' : selected, 'can_receive' : can_receive};
		$.post('/adjust_list_can_receive', params, function(res){
			notify(res, true);
			setTimeout(function(){
				window.location.reload();
			}, 400);
		});
	}		
		
	var edit_lists_delete = function(selected) {
		var params = {'group_name' : group_name, 'lists' : selected};
		$.post('/delete_list', params, function(res){
			notify(res, true);
			setTimeout(function(){
				window.location.reload();
			}, 400);
		});
	}

	var toFollow = "";
	follow_member = 
		function(params){
			$('.checkbox').each(function() {
				if (this.checked == true)
					toFollow += (this.id) + ",";
			});
			params['following_emails'] = toFollow
			$.post('/follow_member', params,
				function(res){
					notify(res,true);
					setTimeout(function(){
						window.location.reload();
					},400);
				});
			toFollow = "";
		};

	var toUnfollow = "";
	unfollow_member = 
		function(params){
			$('.checkbox').each(function() {
				if (this.checked == true)
					toUnfollow += (this.id) + ",";
			});
			params['unfollowing_emails'] = toUnfollow
			$.post('/unfollow_member', params,
				function(res){
					notify(res,true);
					setTimeout(function(){
						window.location.reload();
					},400);
				});
			toUnfollow = "";
		}
	
	var toMute = "";
	mute_member = 
		function(params){
			$('.checkbox').each(function() {
				if (this.checked == true)
					toMute += (this.id) + ",";
			});
			params['muting_emails'] = toMute
			$.post('/mute_member', params,
				function(res){
					notify(res,true);
					setTimeout(function(){
						window.location.reload();
					},400);
				});
			toMute = "";
		};

	var toUnmute = "";
	unmute_member = 
		function(params){
			$('.checkbox').each(function() {
				if (this.checked == true)
					toUnmute += (this.id) + ",";
			});
			params['unmuting_emails'] = toUnmute
			$.post('/unmute_member', params,
				function(res){
					notify(res,true);
					setTimeout(function(){
						window.location.reload();
					},400);
				});
			toUnmute = "";
		}

	// attach handlers to buttons 
	btn_add_members.click(function() {
		go_to('add_members');
	});
	
	btn_edit_settings.click(function() {
		go_to('edit_my_settings');
	});

	btn_edit_group_info.click(function() {
		go_to('edit_group_info');
	});

	btn_add_list.click(function() {
		go_to('add_list');
	});


function bind(fnc, val ) {
	return function () {
		return fnc(val);
	};
}

	btn_mute_member.click(function() {
		mute_member({'group_name': group_name});
	});

	btn_unmute_member.click(function() {
		unmute_member({'group_name': group_name});
	});

	btn_follow_member.click(function() {
		follow_member({'group_name': group_name});
	});

	btn_unfollow_member.click(function() {
		unfollow_member({'group_name': group_name});
	});

	function post_edit_members(params) {
		$.post('/edit_members', params,
			function(res){
				notify(res,true);
				setTimeout(function(){
					window.location.reload();
				},400);
			}
		);
	}	

	btn_subscribe_group.click(function(){
		var params = {'group_name' : group_name};
		$.post('/subscribe_group', params, function(res){
			if (res.status) {
				member = true;
				fix_visibility();
				$(".member").text('Member');
				$(".member").show();
				var row_info = members_table.fnAddData([user_name, new Date().toLocaleString(), admin, mod,]);
					row = members_table.fnSettings().aoData[ row_info[0] ].nTr;
				row.className = "my_row";
			}
			if (res.redirect) window.location.href = res.url;
			notify(res, true);
		});
	});

	btn_unsubscribe_group.click(function(){
		var params = {'group_name' : group_name};
		$.post('/unsubscribe_group', params, function(res){
			if (res.status) {
				member = false;
				fix_visibility();
				$(".member").hide();
				var aPos = members_table.fnGetPosition($(".my_row").get(0)); 
				members_table.fnDeleteRow(aPos);
			}
			notify(res, true);
		});
	});

	btn_delete_group.click(function(){
		delete_group({'group_name' : group_name});
	});


	btn_delete_members.click(function(){		
		if (confirm("Are you sure you want to delete the selected users?")) {
			var params = {'group_name' : group_name, 
							'toAdmin' : '',
							'toMod' : '',
							'toDelete' : get_selected('user').join(',')
						};
			post_edit_members(params);
		}
	});

	btn_set_mod.click(function(){
		var params = {'group_name' : group_name, 
						'toAdmin' : '',
						'toMod' : get_selected('user').join(','),
						'toDelete' : ''
					};
		post_edit_members(params);
	});

	btn_set_admin.click(function(){
		var params = {'group_name' : group_name, 
						'toAdmin' : get_selected('user').join(','),
						'toMod' : '',
						'toDelete' : ''
					};
		post_edit_members(params);
	});

	action_select.change(function(){
		var selected = get_selected('list');

		if (selected.length == 0) {
			alert("You must select one or more lists to perform this action on");
			$(this).val('label');
			return;
		}
		selected = selected.join(',');
		var value = $(this).val();
		if (value == 'deleteList'){
			if (confirm("Are you sure you want to delete the selected lists?")) {
				edit_lists_delete(selected);
			} else {
				$(this).setVal("label");
			}
		} else if (value == 'addPost'){
			edit_lists_adjust_can_post(selected, true);
		} else if (value == 'addReceive'){
			edit_lists_adjust_can_receive(selected, true);
		} else if (value =='removePost'){
			edit_lists_adjust_can_post(selected, false);
		} else if (value == 'removeReceive'){
			edit_lists_adjust_can_receive(selected, false);
		}
	});


	// etc
	function fix_visibility() {
		if (admin) {
			admin_buttons.forEach(function(b){
				b.show();
			});
		} else {
			admin_buttons.forEach(function(b){
				b.hide();
			});
		}		
		if (member) {
			btn_unsubscribe_group.show();
			btn_subscribe_group.hide();
		} else {
			btn_unsubscribe_group.hide();
			btn_subscribe_group.show();
		}
	}

	function get_selected(typeString) {
		var className = '.checkbox-' + typeString;
		var lists = [];
		$(className).each(function() {
			if (this.checked) lists.push(this.id);	
		});
		return lists;
	}

	function go_to(page) {
		window.location ='/groups/' + group_name + '/' + page;
	}

});

function notify(res, on_success){
	if (!res.status) {
		noty({text: "Error: " + res.code, dismissQueue: true, timeout:2000, force: true, type: 'error', layout: 'topRight'});
	} else {
		if (on_success) {
			noty({text: "Success!", dismissQueue: true, timeout:2000, force: true, type:'success', layout: 'topRight'});
		}
	}
}