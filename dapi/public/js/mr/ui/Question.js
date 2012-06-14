/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Question clas
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Question.js 167 2012-06-13 01:58:51Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-13 10:58:51 +0900 (水, 13 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Question = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Question'), 
		/**
		 * 
		 */
		tagName:  'div',
		/**
		 * 
		 */
		className: ns.cls('question'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// bind this
			_.bindAll(this, "getIsQuiz", "getIsResultShown");
			
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
		},
		/**
		 * 
		 */
		render:     function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// title
			if(this.model.has('title')) {
				$(ns.slctr('title') + ' b', this.el).text(this.model.get('seq') + '. ' + this.model.get('title'));
			}else{
				$(ns.slctr('title'), this.el).hide();
			}
			
			// required
			if(this.model.has('required')) {
				if(this.model.get('required')) {
					$(ns.slctr('required'), this.el).text('*');	
				}
			}
			
			// content
			if(this.model.has('content')) {
				$(ns.slctr('description') + ' p', this.el).text(this.model.get('content'));
			}else{
				$(ns.slctr('description'), this.el).hide();
			}
			
			// chioice
			if(this.model.has('kind')) {
				$container = $(ns.slctr('answer'), this.el)
				switch(this.model.get('kind').toUpperCase()){
					case 'RADIO':
						//this.addSelect($container,this.model);
						this.addRadio($container,this.model);
						break;
					case 'CHECKBOX':
						this.addCheckbox($container,this.model);
						break;
					case 'SELECT':
						this.addSelect($container,this.model);
						break;
					case 'TEXT':
						$('<input>')
							.attr('id',    this.model.cid)
							.attr('name',  this.model.cid)
							.attr('type',  'text')
							.appendTo($container);
						break;
					case 'NUMERIC':
						$('<input>')
							.attr('id',    this.model.cid)
							.attr('name',  this.model.cid)
							.attr('type',  'text')
							.appendTo($container)
							
						break;
					case 'TEXTAREA':
						$('<textarea>')
							.attr('id',    this.model.cid)
							.attr('name',  this.model.cid)
							.attr('cols',  '35')
							.attr('rows',  '4')
							.attr('maxlength',  '255')
							.appendTo($container);
						break;
				}
			}
			
			return this;
		},
		/**
		 * validate method
		 */
		validate:	function(textValue){
			ns.trace(this.typeName + '#validate()');
			
			var _results = new Array(); 
			var _values  = this.getValues();
			for(var i = 0; i < _values.length; ++i) {
				var _value = _values[i];
				if(this.model.get('kind').toUpperCase() === 'NUMERIC'){
					if(isNaN(_value) || _value === '') {
						_results.push('入力した値は数値ではありません 。');
					}
				}
			}
			return _results;
		},
		/**
		 * 
		 */
		addLabel:	function(container,model,content,i){
			ns.trace(this.typeName + '#addLabel()');
			
			var answerJson = model.has('answer')?model.get('answer').content:'';
			if(content == answerJson){
				$('<label>')
					.addClass('mr-ui-result')
					.addClass('mr-ui-correct')
					.attr('for',   model.cid + '-' + i.toString())
					.text('○')
					.appendTo(container);
			}else{
				if(answerJson != ''){
					$('<label>')
						.addClass('mr-ui-result')
						.addClass('mr-ui-wrong')
						.attr('for',   model.cid + '-' + i.toString())
						.text('×')
						.appendTo(container);
					}
			}
		},
		/**
		 * addRadio
		 */
		addRadio:	function(container,model){
			ns.trace(this.typeName + '#addRadio()');
			
			if(model.has('choices')) {
				var options  = model.get('choices');
				for(var i = 0; i < options.length; ++i) {
					var option = options[i];
					
					$('<input>')
						.attr('id',    model.cid + '-' + i.toString())
						.attr('name',  model.cid)
						.attr('type',  'radio')
						.attr('value', option.uuid+'-'+option.content)
						.appendTo($container);
					$('<label>')
						.attr('for',   model.cid + '-' + i.toString())
						.text(option.content)
						.appendTo($container);
						
					this.addLabel($container,model,option.content,i);
					
					$('<br>')
						.appendTo($container);
				}
			}
		},
		/**
		 * addCheckbox
		 */
		addCheckbox:	function(container,model){
			ns.trace(this.typeName + '#addCheckbox()');
			
			if(model.has('choices')) {
				var options  = model.get('choices');
				for(var i = 0; i < options.length; ++i) {
					var option = options[i];
					
					$('<input>')
						.attr('id',    model.cid + '-' + i.toString())
						.attr('name',  model.cid)
						.attr('type',  'checkbox')
						.attr('value', option.uuid+'-'+option.content)
						.appendTo($container);
					$('<label>')
						.attr('for',   model.cid + '-' + i.toString())
						.text(option.content)
						.appendTo($container);
						
					this.addLabel($container,model,option.content,i);
					
					$('<br>')
						.appendTo($container);
				}
			}
		},
		
		/**
		 * addSelect
		 */
		addSelect:	function(container,model){
			ns.trace(this.typeName + '#addSelect()');
			
			if(model.has('choices')) {
				var options  = model.get('choices');				
                var option = "";
                for(var i=0; i< options.length; ++i)
                {
                    option += "<option value='" + options[i].uuid + "'>" + options[i].content + "</option>";
                }
				$('<select>')
					.attr('id',    model.cid)
					.attr('name',  model.cid)
					.html(option)
					.appendTo($container);
			}
		},
		/**
		 * 
		 */
		getValues:	function(){
			ns.trace(this.typeName + '#getValues()');
			
			var answerUser = new Array();
			switch(this.model.get('kind').toUpperCase()){
				case 'RADIO':
					var radio = $(ns.slctr('answer') + ' :radio:checked');
					if(radio.length>0){
						answerUser[0] = radio[0].value.substring(radio[0].value.indexOf('-')+1);
					}
					break;
				case 'CHECKBOX':
					var checkbox = $(ns.slctr('answer') + ' :checkbox:checked');
					var arrayI = 0;
					if(checkbox.length>0){
						for(var i=0; i<checkbox.length; ++i){
							answerUser[arrayI] = checkbox[i].value.substring(checkbox[i].value.indexOf('-')+1);
							++arrayI;
						}
					}
					break;
				case 'SELECT':
					answerUser[0] = $(ns.slctr('answer') + ' select option:selected').text();
					break;
				case 'TEXT':
					if($(ns.slctr('answer') + ' :text').val().replace(/\s+/g,"")!='')
						answerUser[0] = $(ns.slctr('answer') + ' :text').val().replace(/\s+/g,"");
					break;
				case 'NUMERIC':
					answerUser[0] = $('input', this.el).val();
					break;
				case 'TEXTAREA':
					if($(ns.slctr('answer') + ' textarea').val().replace(/\s+/g,"")!='')
						answerUser[0] = $(ns.slctr('answer') + ' textarea').val().replace(/\s+/g,"");
					break;
			}
			
			return answerUser;
		},
		/**
		 * 
		 */
		showResult:	function(){
			ns.trace(this.typeName + '#showResult()');
			
			if($(ns.slctr('answer'), this.el).hasClass(ns.cls('result-hide'))){
				$(ns.slctr('answer'), this.el).removeClass(ns.cls('result-hide'));
			}
			
			switch(this.model.get('kind').toUpperCase()){
				case 'RADIO':
					$(ns.slctr('answer') + ' :radio').attr('disabled','disabled');
					//$(ns.slctr('answer') + ' :radio:checked').next('label').addClass('mr-ui-select');
					break;
				case 'CHECKBOX':
					$(ns.slctr('answer') + ' :checkbox').attr('disabled','disabled');
					break;
				case 'SELECT':
					$(ns.slctr('answer') + ' select').attr('disabled','disabled');
					break;
				case 'TEXT':
					$(ns.slctr('answer') + ' :text').attr('disabled','disabled');
					break;
				case 'NUMERIC':
					$(ns.slctr('answer') + ' :text').attr('disabled','disabled');
					break;
				case 'TEXTAREA':
					$(ns.slctr('answer') + ' textarea').attr('disabled','disabled');
					break;
			}
		},
		/**
		 * getIsQuiz 
		 */
		getIsQuiz: function() {
			ns.trace(this.typeName + '#getIsQuiz()');
			
			return this.model.getIsQuiz();
		},
		/**
		 * getIsQuiz 
		 */
		getIsResultShown: function() {
			ns.trace(this.typeName + '#getIsResultShown()');
			
			return !$(ns.slctr('answer'), this.el).hasClass(ns.cls('result-hide'));
		}
	});
})(mr.ui, mr.$);