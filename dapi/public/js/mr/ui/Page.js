/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Page clas
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Page.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
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
				              title:     '次へ',
				             	countdown: new ns.root.model.CountDown({
				             		count: this.model.get('wait_until')
				             	})
				             }),
				el:          $(ns.slctr('next'), this.el)
      });
			
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
			this.next.on('click', function(){
				if(this.model.containsRequired()) {
					// this quesion rquires anwer
					this.trigger('click:next');	
				}else if(this.model.containsQuiz()) {
					// this is QUIZ
					
				}else{
					this.trigger('click:next');	
				}
			}, this);
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
			this.next.render().model.startCountDown();
			
			// return
			return this;
		}
	});
	
})(mr.ui, mr.$);