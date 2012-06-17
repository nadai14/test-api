/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Content class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Content.js 228 2012-06-15 14:13:17Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-15 23:13:17 +0900 (金, 15 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
  ns.Content = ns.Base.extend({
    /**
     * typeName of this class
     */
    typeName:   ns.typeName('Content'), 
    /**
     * 
     */
    tagName:    'div',
    /**
     * 
     */
    className:  ns.cls('content'),
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
      
      // keep the references
      var _self = this;
      
      if('undefined' !== typeof(this.current)) {
        // if something is shown, fadeOut current, and fadeIn new.
        var _$target = $(this.el);
        _$target.fadeOut('fast', function(){ 
          _self._render();
          _$target.fadeIn('slow');
        });
      }else{
        // when current nothing, simply to render 
        _self._render();
      }
      
      // return this
      return this;
    },
    
    /**
     * 
     */
    _render: function(){
      ns.trace(this.typeName + '#_render()');// clear
      
      var _self = this;
      
      // show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// hide current
    	if('undefined' !== typeof(this.current)) {
    		this.current.hide();
    	}
      
      if(this.model.has('sorry')) {
      	
      	// complete
      	this.current = this.sorry  = new ns.Sorry({
	     		model:       this.model.get('sorry'),
	        el:          $(ns.slctr('sorry'), this.el)
	      }).on('click:next', function(){
	      	
				}, this).render();
				
      } else if(this.model.has('thankyou')) {
      	
      	// complete
      	this.current = this.thankyou  = new ns.Thankyou({
	     		model:      this.model.get('thankyou'),
	        el:         $(ns.slctr('thankyou'), this.el)
	      }).on('click:next', function(){
	      	
				}, this).render();
				
	    }else if(this.model.has('complete')) {
      	
      	// complete
      	this.current = this.complete  = new ns.Complete({
	     		model:      this.model.get('complete'),
	     		el:         $(ns.slctr('complete'), this.el)
	      }).on('click:next', function(){
	      	var _thankyou = (function(){
	      		// move next page
		      	_self.model.set({
		      		"thankyou":     new Backbone.Model({
		      			"point":      _self.model.get('campaign').get('point'),
		      			"message":    _self.model.get('campaign').get('message'),
		      			"conversion": _self.model.get('campaign').get('conversion_tag'),
		      			"client_url": _self.model.get('campaign').get('client_url')
		      		})
		      	});
	      	});
					_thankyou();
				}, this).render();
	      
      }else if(this.model.has('page')) {
      	// remove previous 
      	if(this.page) {
      		this.page.remove();
      	}
      	// create 
	     	this.current = this.page = new ns.Page({
	     		model:       this.model.get('page'),
	        el:          $(ns.slctr('page') + ns.slctr('template'), this.el).clone().appendTo($(this.el)) 
	      }).on('click:next', function(){
	      	// move next page
	      	this.model.updatePageToNext(this.page.getValues());
	      	
				}, this).render();
				
      }else if(this.model.has('campaign')) {
      	// l;a
      	this.current = this.landing  = new ns.Landing({
	     		model:      this.model.get('campaign'),
	        el:         $(ns.slctr('landing'), this.el)
	      }).render();
      } 
      
      return this;
    },
  });
})(mr.ui, mr.$);