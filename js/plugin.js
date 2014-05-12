tinymce.PluginManager.add('question', function(editor, url) {
	// Add a button that opens a window
	editor.addButton('question', {
		text: 'Question',
		icon: 'bullist',
		onclick: function() {
			openWindow(editor);
		}
	});
});

function openWindow(editor){

	editor.windowManager.open({
		title: 'question plugin',
		body: [
			{type: 'textbox', name: 'title1', label: 'Title', value:'Test'},
			{type: 'radio', name: 'title', label: 'Title', value:'Test'},
			{type: 'textbox', name: 'title2', label: 'Title', value:'Test'},
			{type: 'checkbox', name: 'c', label: 'Title', value:'Test'},
			{type: 'textbox', name: 'title3', label: 'Title', value:'Test'},
			{type: 'checkbox', name: 'c', label: 'Title', value:'Test'},
		],
		onsubmit: function(e) {
				var target = editor.dom.select("#q1");
				console.log("Target:"+target)
				if(target.length==0){
					
					editor.dom.add(tinyMCE.activeEditor.getBody(), 'question', {contentEditable:'false', id : 'q1', 'class':"question mceNonEditable"}, e.data.title);
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
