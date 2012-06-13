/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Question clas
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Question.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
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

			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
		},
		/**
		 * 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// title
			if(this.model.has('title')) {
				$(ns.slctr('title') + ' b', this.el).text(this.model.get('seq') + '. ' + this.model.get('title'));
			}
			// content
			if(this.model.has('content')) {
				$(ns.slctr('description') + ' p', this.el).text(this.model.get('content'));
			}
			// chioice
			if(this.model.has('kind')) {
				$container = $(ns.slctr('answer'), this.el)
				switch(this.model.get('kind').toUpperCase()){
					case 'RADIO':
						if(this.model.has('choices')) {
							var options  = this.model.get('choices');
							for(var i = 0; i < options.length; ++i) {
								var option = options[i];
								$('<input>')
									.attr('id',    this.model.cid + '-' + i.toString())
									.attr('name',  this.model.cid)
									.attr('type',  'radio')
									.attr('value', option.choice_id+'-'+option.content)
									.appendTo($container);
								$('<label>')
									.attr('for',   this.model.cid + '-' + i.toString())
									.text(option.content)
									.appendTo($container);
								$('<br>')
									.appendTo($container);
							}
						}
						break;
					case 'CHECKBOX':
						if(this.model.has('choices')) {
							var options  = this.model.get('choices');
							for(var i = 0; i < options.length; ++i) {
								var option = options[i];
								$('<input>')
					.attr('id',    this.model.cid + '-' + i.toString())
					.attr('name',  this.model.cid)
					.attr('type',  'checkbox')
					.attr('value', option.choice_id+'-'+option.content)
					.appendTo($container);
								$('<label>')
					.attr('for',   this.model.cid + '-' + i.toString())
					.text(option.content)
					.appendTo($container);
								$('<br>')
					.appendTo($container);
							}
						}
				break;
			case 'TEXT':
				$('<input>')
					.attr('id',    this.model.cid)
					.attr('name',  this.model.cid)
					.attr('type',  'text')
					.appendTo($container);
			break;
					case 'TEXTAREA':
			$('<input>')
				.attr('id',    this.model.cid)
				.attr('name',  this.model.cid)
				.attr('type',  'textarea')
				.attr('cols',  '50')
				.attr('rows',  '4')
				.attr('maxlength',  '255')
				.appendTo($container);
			break;
				}
			}
			
			return this;
		}
	});
})(mr.ui, mr.$);