answers = 9;

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

	var target 		= editor.dom.select("#q1");
	var answerArray = ['answer1','answer2','answer3','answer4'];
	var question;
	//var answers,data,question;
	// Preallocate :P
	answers			= new Array(10);

	if(target.length>0){
		console.log(target[0])
		data = jQuery(target[0]).data('data-question');
		answers = data['answers'];
		question = data['question'];
	}

	editor.windowManager.open({
		title: 'Create Question',
		body: tinymce.ui.Factory.create({
			type: 'form',
			items: [
				{type: 'textbox', multiline: true, name: 'question', minHeight: 100, label: 'Question', value:(question?question:'Sample very very verbose and explanatory question that requires multiple lines...?')},
				{type: 'textbox', name: 'answer1', label: 'Answer', value:(answers[0]?answers[0].answer:'Sample Answer One')},
				{type: 'radio', name: 'right_answer1', label: 'Correct answer?', value:'0'},
				{type: 'textbox', name: 'answer2', label: 'Answer', value:(answers[1]?answers[1].answer:'Sample Answer Two')},
				{type: 'radio', checked:true, name: 'right_answer2', label: 'Correct answer?', value:'1'},
				{type: 'textbox', name: 'answer3', label: 'Answer', value:(answers[2]?answers[2].answer:'Sample Answer Three')},
				{type: 'radio', name: 'right_answer3', label: 'Correct answer?', value:'2'},
				{type: 'textbox', name: 'answer4', label: 'Answer', value:(answers[3]?answers[3].answer:'Sample Answer Four')},
				{type: 'radio', name: 'right_answer4', label: 'Correct answer?', value:'3'},
			]
		}),
		onsubmit: function(e) {
				if(target.length>0){
					while (target[0].firstChild) {
						target[0].removeChild(target[0].firstChild);
					}
					editor.dom.remove(target[0])
					editor.dom.remove("#q1br");
					editor.dom.remove(editor.dom.select("#q1br"));
				}

				editor.dom.add(editor.getBody(), 'question', {contentEditable:'false', id : 'q1', 'class':"question mceNonEditable"}, e.data.question);
				editor.dom.add(editor.getBody(), 'br', { id : 'q1br' }, "");
				
				element = editor.dom.select("#q1");

				var questionObject = {};
				questionObject['question'] = e.data.question
				questionObject['answers'] = [];

				for (var i = 0, len = answerArray.length; i < len; i++) {
					name = answerArray[i];
					if(e.data[name]){
						if(e.data["right_"+name] && e.data["right_"+name]==true){
							editor.dom.add(element, 'answer', {correct:true, class:'correct',contentEditable:'false'}, e.data[name]);
							questionObject['answers'].push({'answer':e.data[name],'correct':true});
						}else{
							editor.dom.add(element, 'answer', {correct:false, contentEditable:'false'}, e.data[name]);
							questionObject['answers'].push({'answer':e.data[name],'correct':false});
						}							
					}
				}

				/**/
				if(window.JSON){
					var json = JSON.stringify(questionObject)
					jQuery(element).data('data-question',questionObject);
					//element.setAttribute('data-question',json);
				}else{
					alert("Super old browser?")
					return false;
				}
				/**/
				
				editor.dom.bind(element, "click", function(){
					openWindow(editor)
				}, this);		
			}
		});
}
