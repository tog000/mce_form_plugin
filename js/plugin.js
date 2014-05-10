tinymce.PluginManager.add('example', function(editor, url) {
	// Add a button that opens a window
	editor.addButton('example', {
		text: 'Question',
		icon: 'bullist',
		onclick: function() {
			// Open window
			openWindow(editor);
		}
	});

	// Adds a menu item to the tools menu
	editor.addMenuItem('example', {
		text: 'Example plugin',
		context: 'tools',
		onclick: function() {
			// Open window with a specific url
			editor.windowManager.open({
				title: 'TinyMCE site',
				url: 'http://www.tinymce.com',
				width: 800,
				height: 600,
				buttons: [{
					text: 'Close',
					onclick: 'close'
				}]
			});
		}
	});
});

function openWindow(editor){

	editor.windowManager.open({
		title: 'Example plugin',
		body: [
		{type: 'textbox', name: 'title', label: 'Title', value:'Test'}
		],
		onsubmit: function(e) {
				var target = editor.dom.select("#q1");
				console.log("Target:"+target)
				if(target.length==0){
					
					editor.dom.add(tinyMCE.activeEditor.getBody(), 'div', {contentEditable:'false', id : 'q1', 'class':"question mceNonEditable"}, e.data.title);
					editor.dom.add(tinyMCE.activeEditor.getBody(), 'br', {}, "");
					
					editor.dom.bind(tinymce.activeEditor.dom.select("#q1"), "click", function(){
						openWindow(editor)
					}, this);
				}else{
					console.log(target[0].innerHTML)
					target[0].innerHTML = e.data.title;
					console.log(target[0].innerHTML)
				}				
			}
		});
}
