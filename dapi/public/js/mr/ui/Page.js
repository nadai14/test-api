/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Page clas
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Page.js 196 2012-06-14 14:33:08Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-14 23:33:08 +0900 (木, 14 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Page = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:  ns.typeName('Page'), 
		/**
		 * element tag name
		 */
		tagName:   'div',
		/**
		 * css class name 
		 */
		className:  ns.cls('page'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// questions
			this.questions = new ns.Questions({ 
				collection:  this.model.get('questions'),
				el:          $(ns.slctr('questions'), this.el).exists() ? $(ns.slctr('questions'), this.el).get(0) : null 
			});
      
			// countdown
			this.next      = new ns.Next({ 
				model:       new ns.root.model.Next({
				              title:     this.questions.containsQuiz() ? '回答' : '次へ',
				             	countdown: (ns.face === 'SP') ?
				             		null :
				             		new ns.root.model.CountDown({
				             			count: this.model.get('wait_until')
				             		})
				             }),
				el:          $(ns.slctr('next'), this.el)
			});
			
			// process next
			this.next.on('click', function(){
				// check required
				if(this.questions.containsRequired()) {
					var _required = this.questions.getRequired();
					for(var i = 0; i < _required.length; ++i) {
						if(!this.questions.hasValue(_required[i])){
							ns.dialog('この設問は回答必須です。');
							// return false;
							return false;
						}
					}
				}
				// check quiz
				if(this.questions.containsQuiz() && !this.questions.getIsResultShown()) {
					//  update nextbutton
					$(this.next.el).text('次へ');
					// show result;
					this.questions.showResult();
					// return false;
					return false;
				}
				// trigger next
				this.trigger('click:next');
			}, this);
			
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
			
		},
		/**
		 * render method
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// render 
			$(ns.slctr('title') + ' b', this.el).text(this.model.get('description'));
			this.questions.render();
			this.next.render().startCountDown();
			
			// return
			return this;
		},
    /**
		 * 
		 */
		getValues:	function(){
			ns.trace(this.typeName + '#getValues()');
			
			return this.questions.getValues();
		}
	});
})(mr.ui, mr.$, mr.ua);