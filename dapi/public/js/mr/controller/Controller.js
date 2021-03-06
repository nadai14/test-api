/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Controller Base Class
 * 
 * JavaScript (ECMAScript)
 *
 * @author			 Li Minghua
 * @author			 George Lu
 * @author			 Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version			$Id: Controller.js 392 2012-07-02 07:04:48Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-07-02 16:04:48 +0900 (月, 02 7 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
	/**
	 * timeout defualt value in mili sec
	 * @see http://redmine.sunbi.co.jp/issues/2025
	 */
	var _TIMEOUT_DEFUALT = 1000 * 20;
	/**
	 * 
	 */
	ns.Controller = Backbone.Router.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Controller'), 
		/**
		 * Routing rules
		 */
		routes: {	
			"":                      "start",
			"campaign/:id":          "campaign"
		},
		/**
		 * initialize
		 *
		 * @see http://backbonejs.org/#Collection-constructor 
		 */
		initialize: function(options) {
			ns.trace(this.typeName + '#initialize()');
			// setup model 
			var _self = this;
			// bind this
			_.bindAll(this, 
				"ajaxError", 
				"fetchCampaign",
				"fetchPage",  
				"requestThankyouPage",
				"getDefaultCss",
				"getIsAlready",
				"getAdCurrentTime", 
				"setAdCurrentTime", 
				"onAdCurrentTimeChanged", 
				"getIsAdPlaying", 
				"setIsAdPlaying", 
				"onIsAdPlayingChanged",
				"requestThankyouPage",
				"onIsAdEndedChanged",
				"getIsAdPaused", 
				"setIsAdPaused", 
				"onIsAdPausedChanged",
				"getAdDuration", 
				"setAdDuration", 
				"onAdDurationChanged",
				"getDefaultWatchTimeout",
				"startWatchTimeout",
				"updateWatchTimeout",
				"onTimeout",
				"getTimeoutTimerId", 
				"setTimeoutTimerId", 
				"onTimeoutTimerIdChanged"
			);
			
			// 
			this.models = {
				parameter: new ns.root.model.Parameter(),
				link:      new ns.root.ui.model.Link(),
				ad:        new ns.root.ui.model.Ad(),
				nav:       new ns.root.ui.model.Nav(),
				theme:     new ns.root.ui.model.Theme(),
				landing:   new ns.root.ui.model.Landing(),
				content:   new ns.root.ui.model.Content(),
				next:      new ns.root.ui.model.Next()
			}; 
			
			// set default values
			this.isAdEnded      = false;
			this.isAdPlaying    = false;
			this.isTimePassed   = false;
			this.isAlready      = false;
			this.isPaused       = false;
			this.adCurrentTime  = 0;
			this.adDuration     = 0;
			this.timeoutTimerId = null;
			
			// event handler
			this.on('change:isAdPlaying',    this.onIsAdPlayingChanged,    this);
			this.on('change:isAdEnded',      this.onIsAdEndedChanged,      this);	
			this.on('change:adCurrentTime',  this.onAdCurrentTimeChanged,  this);
			this.on('change:isTimePassed',   this.onIsTimePassedChanged,   this);
			this.on('change:isAdPaused',     this.onIsAdPausedChanged,     this);
			this.on('change:adDuration',     this.onAdDurationChanged,     this);
			this.on('change:timeoutTimerId', this.onTimeoutTimerIdChanged, this);
			
			var _cookies = document.cookie.split(';');
			var _parsed = {};
			for(var i = 0; i < _cookies.length; ++i){
				var _cookie = _cookies[i].split('=');
				_parsed[_cookie[0]] = (1 < _cookie.length) ? _cookie[1] : null;
			}
			if('undefined' === typeof(_parsed['MRID'])){
				this.session_id = ns.guid();
				document.cookie = 'MRID=' + this.session_id;
			}else{
				this.session_id = _parsed['MRID'];
			}
			// start history
			
			// this.start();
		},
		/**
		 * start
		 */
		start: function() { 
			ns.trace(this.typeName + '#start()');
			// uid auto add
			if(this.models.parameter.has('debug')) {
				if(!this.models.parameter.has('uid')) {
			 		location.href = location.href + '&uid=' + (((1+Math.random())*0x10000000)|0).toString(16).substring(1);
			 	}
			 	if(this.models.parameter.has('mid')) {
			 		var _mid = '';
			 		switch(this.models.parameter.get('mid')) {
			 			case 'plus1':      _mid = 'PlusOneCampaignID';    break;
			 			case 'lgmx':       _mid = 'LegMagicXCampaignID';  break;
			 			case 'nagatanien': _mid = 'NagataniEnCampaignID'; break;
			 		}
			 		if(0 < _mid.length) {
			 			var _url = location.href;
			 			_url = _url.replace(/mid=(.+)/, 'mid=' + _mid);
			 			location.href = _url; 
			 		}
			 	}
			}
			
			// check mid
			if(!this.models.parameter.has('mid')) {
				this.sorry('該当するキャン―ペーンはございません。');
				return;
			}else{
				if(this.models.parameter.get('mid') === ''){
					this.sorry('該当するキャン―ペーンはございません。');
					return;
				}
			}
			// check uid
			if(!this.models.parameter.has('uid')) {
				this.sorry('不正なリクエストです。');
				return;
			}else{
				if(this.models.parameter.get('uid') === ''){
					this.sorry('不正なリクエストです。');
					return;
				}
			}
			// switch
			if(this.models.parameter.get('already') === 1) {
				this.already(this.models.parameter.get('mid'));
			}else{
				this.campaign(this.models.parameter.get('mid'));
			}
		},
		/**
		 * campaign route
		 */
		campaign: function(id) {
			ns.trace(this.typeName + '#campaign("' + id + '")');
			// 
			var _self = this;
			// fetch
			this.fetchCampaign(id, function(campaign){
				_self._campaign   = campaign;
				// update view models
				// theme
				_self.models.theme.set({
					 "css":       (campaign.has('css') ? campaign.get('css') : null)
				});
				// link
				_self.models.link.set({ 
					"title":       campaign.has('page_button_text') ? campaign.get('page_button_text') : 'CMのサイトを見る', // http://redmine.sunbi.co.jp/issues/2045
 					"client_url":  campaign.has('client_url') ? campaign.get('client_url') : ''
				});
				// ad
				_self.models.ad.set({ 
					"poster":     (campaign.has('thumbnail') ? campaign.get('thumbnail') : null),
					"movies":     (campaign.has('movies') ? campaign.get('movies') : null),
					"movie":      (campaign.has('movie') ? campaign.get('movie') : null)
				});
				// 
				if(!_self.isAlready) {
					// landing
					_self.models.landing.set({ 
						"title":       campaign.get('title'),
						"description": campaign.has('description') ? campaign.get('description') : '',
						"remarks":     '動画視聴完了後、' + Math.floor(_self.getDefaultWatchTimeout() / 1000) + ' 秒以内にアンケート回答をスタートしないとポイントをもらえません。'
					});
					// content
					_self.models.content.set({ 
						"view":        ns.root.ui.Landing,
						"model":       _self.models.landing,
						"selector":    ns.root.ui.slctr('landing')
					});
				}else{
					// @see http://redmine.sunbi.co.jp/issues/1955
					// @see http://redmine.sunbi.co.jp/issues/2038
					_self.models.nav.set({
						// "html":        '動画視聴&アンケートは完了しています。'
						"html":        'CM視聴は完了しています。'
					});
					// already
					var _model = new ns.root.ui.model.Already({
						// "title":       'アンケートは終了です。ありがとうございました。',
					        // @see http://redmine.sunbi.co.jp/issues/2038
						"title":          'CM視聴ありがとうございました。',
						"social":         campaign.has('message')             ? campaign.get('message')              : '',
						"client_url":     campaign.has('client_url')          ? campaign.get('client_url')           : '',
						// @see http://redmine.sunbi.co.jp/issues/2045
						"button_title":   campaign.has('already_button_text') ? campaign.get('already_button_text') : 'CMのサイトを見る'
					});
					// @see  http://redmine.sunbi.co.jp/issues/1955
					// <レッグマジック・永谷園>
					// → CMのサイトから購入でさらにmixiポイントをプレゼント
					// <プラスワン>
					// → CMのサイトから見積依頼でさらにmixiポイントをプレゼント
					/**
					 * @SEE http://redmine.sunbi.co.jp/issues/2038
					 */
					/*
					switch(_self.models.parameter.get('mid').toLowerCase()){
						case 'legmagicxcampaignid':
						case 'lgmx':
						case 'nagataniencampaignid':
						case 'nagatanien':
							_model.set('title', 'CMのサイトから購入でさらにmixiポイントをプレゼント。');
							break;
						case 'plusonecampaignid':
						case 'plus1':
							_model.set('title', 'CMのサイトから見積依頼でさらにmixiポイントをプレゼント。');
							break;
					}
					*/
					// content
					_self.models.content.set({ 
						"view":        ns.root.ui.Already,
						"model":       _model,
						"selector":    ns.root.ui.slctr('already')
					});
				}
			});
		},
		/**
		 * already 
		 */
		already:   function(id) {
			ns.trace(this.typeName + '#already("' + id + '")');
			// 
			this.isAlready = true;
			// same as campaign
			this.campaign(id, true);
		},
		/**
		 * sorry
		 */
		sorry:   function(message) {
			ns.trace(this.typeName + '#sorry("' + message + '")');
			// keep reference
			var _self = this;
			// update theme
			if(!_self.models.theme.has('css')) {
				// @see http://redmine.sunbi.co.jp/issues/1979
				_self.models.theme.set({
					"css":       this.getDefaultCss()
				});	
			}
			// update nav
			_self.models.nav.set({
				html:          'エラー'
			});
			// content
			_self.models.content.set({ 
				"view":        ns.root.ui.Sorry,
				"model":       new ns.root.ui.model.Sorry({
				               	"title":       '申し訳ございません。',
				               	"description": message,
				               	"back":        'javascript:location.reload();'
				               }),
				"selector":    ns.root.ui.slctr('sorry')
			});
			// return
			return this;
		},
		/**
		 * timeout
		 * @see http://redmine.sunbi.co.jp/issues/2025
		 */
		timeout:   function() {
			ns.trace(this.typeName + '#timeout()');
			// keep reference
			var _self = this;
			// update nav
			_self.models.nav.set({
				// html:          'タイムアウト', 
				"html":        'もう一度CMをみて下さい' // http://redmine.sunbi.co.jp/issues/2043
			});
			// update ad
			_self.models.ad.set({
				"timeout":     true
			});
			// content
			_self.models.content.set({ 
				"view":        ns.root.ui.Timeout,
				"model":       new ns.root.ui.model.Timeout({
					             	"description": 'もう一度CMをみて' + Math.floor(_self.getDefaultWatchTimeout() / 1000) + '秒以内にアンケートをスタートして下さい。' 
				               }),
				"selector":    ns.root.ui.slctr('timeout')
			});
			// return
			return this;
		},
   	/**
   	 * 
   	 */
   	ajaxError: function(xhr, textStatus) {
   		ns.trace(this.typeName + '#ajaxError("' + xhr.status + '", "' + textStatus + '")');
   		var _self = this;
   		var _message = 'データ通信時にエラーが発生しました';
			switch(xhr.status) {
				case 0:
				case 400:	
				case 401:
					// 認可されていない UnauthorizedException 401
				case 403:
					// 状態が入稿前 ForbiddenException 403
					// 状態が終了 ForbiddenException 403
				case 404:
					// アンケートIDが存在しない NotFoundException 404
					// ページIDが存在しない NotFoundException 404
					// アンケートIDとページIDが矛盾している NotFoundException 404
					// アンケートページと回答の設問番号が矛盾している NotFoundException 404
					var _data    = { message:   _message };
					try { _data = $.parseJSON(xhr.responseText); }catch(ex){}
					try { _message = ('undefined' !== typeof(_data)) ? _data.message : _message; }catch(ex){}
					var _handler = (ns.handleError || ns.root.handleError || function(message) {  
						_self.sorry(message); 
					});
					_handler(_message);
					return this;
					break;
			}
			// return 
			return this;
   	},
   	/**
     * fetchCampaign()
     */
    fetchCampaign: function(id, success) {
    	ns.trace(this.typeName + '#fetchCampaign("' + id + '")');
    	//
    	var _self = this;
    	// create model
    	var _campaign = new ns.root.model.Campaign({ uuid: id }); 
    	// fetch data
			_campaign.fetch({
				/**
				 * success
				 */
				success: function(campaign, response) {
					ns.trace(_self.typeName + '#fetchCampaign()#success');
					ns.trace(ns.stringify(campaign));
					// set this
					_self.wait_until = campaign.has('wait_until') ? campaign.get('wait_until') : -1;
					// @see http://redmine.sunbi.co.jp/issues/1991 
					if(campaign.has('duration')) {
						_self.setAdDuration(campaign.get('duration'));
					}
					// callback
					success(campaign);
				},
				/**
	       * 
	 			 * @param {Object} xhr
	 			 * @param {Object} textStatus
	 			 * 
	 			 * @see http://redmine.sunbi.co.jp/issues/1770
	       */
	      complete:  function(xhr, textStatus){
	      	ns.trace(_self.typeName + '#fetchCampaign()#complete');
	      	_self.ajaxError(xhr, textStatus);
				}
			});
    },
    /**
     * fetchCampaign()
     */
    fetchPage: function(enq_id, id, success) {
    	ns.trace(this.typeName + '#fetchPage("' + id + '")');
    	// 
    	var _self = this;
    	// create model
    	var _page = new ns.root.model.Page({ 
    		enq_id:         enq_id,
				uuid:           id
			}); 
    	// fetch data
			_page.fetch({
				/**
				 * success
				 */
				success: function(page, response) {
					ns.trace(_self.typeName + '#fetchPage()#success/' + ns.stringify(page));
					// set this
					_self.wait_until = page.has('wait_until') ? page.get('wait_until') : -1;
					// callback
					success(page);
				},
				error:  function(xhr, textStatus){
	      	ns.trace(ns.typeName + '#fetchPage()#error');
	      	_self.ajaxError(xhr, textStatus);
				},
	      complete:  function(xhr, textStatus){
	      	ns.trace(ns.typeName + '#fetchPage()#complete');
	      	_self.ajaxError(xhr, textStatus);
				}
			});
    },
    /**
     * 
     */
    sendAnswer: function(answer, success) {
    	ns.trace(this.typeName + '#sendAnswer("' + ns.stringify(answer.data) + '")');
    	// 
    	var _self = this;
    	// send answer
			$.ajax({
				type:       "POST",
				url:        answer.url(),
				data:       answer.data,
				beforeSend: function(xhr, settings) {
					ns.trace(_self.typeName + '#sendAnswer()#beforeSend:' + settings.type + "\t" + settings.url);
					xhr.setRequestHeader("X-Requested-By","poncan-moviereward");
      	},
				success: function(data, status) {
					ns.trace(_self.typeName + '#sendAnswer()#success');
					success();
				},
				complete:  function(xhr, textStatus){
					ns.trace(_self.typeName + '#sendAnswer()#complete');
					_self.ajaxError(xhr, textStatus);
				}
			});
    },
    /**
     * getDefaultCss
     */
   	getDefaultCss:    function() {
   		ns.trace(this.typeName + '#getDefaultCss()');
   		return 'css/pc/themes/default-1/style.css?v=20120623';
   	},
    /**
     * getIsAlready
     */
    getIsAlready:     function() {
    	ns.trace(this.typeName + '#getIsAlready()');
    	return this.isAlready;
    },
   	/**
     * 
     */
    getAdCurrentTime: function() {
    	ns.trace(this.typeName + '#getAdCurrentTime()');
    	return this.adCurrentTime;
    },
   	/**
     * 
     */
    setAdCurrentTime: function(currentTime) {
    	ns.trace(this.typeName + '#setAdCurrentTime(' + currentTime + ')');
    	if(this.adCurrentTime !== currentTime) {
    		this.adCurrentTime = currentTime;
    		this.trigger('change:adCurrentTime');	
    	}
    	return this;
    },
    /**
     * isAdPlayingChanged 
     */
    onAdCurrentTimeChanged: function() {
    	ns.trace(this.typeName + '#onAdCurrentTimeChanged()' + this.wait_until);
    	var _self             = this;
    	var _currentTimeInSec =  Math.floor(this.adCurrentTime);
    	var _isTimePassed     = false;
    	if(_self.getIsAdEnded()) {
    		_isTimePassed = true;
				_self.models.nav.set('html', '動画の視聴は完了しています。');
    	}else if(_self.adCurrentTime === 0 ) {
    		_self.models.nav.set('html', '再生ボタンをクリックしてください。');
    	}else if(0 < _self.wait_until){
    		var _left = _self.wait_until - _currentTimeInSec;
				if(0 < _left) {
					_self.models.next.set({
						"title":   '残り：' + _left + ' 秒',
						"enabled": false
					});
    			_self.models.nav.set('html',   '次の設問まで 残り：' + _left + ' 秒');
				}else{
					_self.models.next.set({
						"title":   '次へ',
						"enabled": true
					});
					if(_self._page) {
						_self.models.nav.set('html',  _self._campaign.get('question_cnt') + ' 問中  ' + _self._page.get('questions').at(0).get('num') + ' 問目');
					}
					_isTimePassed = true;
				}
    	}else{
    		_isTimePassed = true;
    	}
    	// next
    	_self.setIsTimePassed(_isTimePassed);
    },
    /**
     * 
     */
    getIsTimePassed: function() {
    	ns.trace(this.typeName + '#getIsTimePassed()');
    	return this.isTimePassed;
    },
   	/**
     * 
     */
    setIsTimePassed: function(timePassed) {
    	ns.trace(this.typeName + '#setIsTimePassed(' + timePassed + ')');
    	if(this.isTimePassed !== timePassed) {
    		this.isTimePassed = timePassed;
    		this.trigger('change:isTimePassed');	
    	}
    	return this;
    },
    /**
     * onIsTimePassedChanged() 
     */
    onIsTimePassedChanged: function() {
    	ns.trace(this.typeName + '#onIsTimePassedChanged()');
    	if(!this._page) {
    		this.requestNextPage();
    	}
    },
    /**
     * requestNextPage()
     */
    requestNextPage: function(callback) {
    	ns.trace(this.typeName + '#requestNextPage()');
    	// 
    	var _self     = this;
    	// validation
    	if('undefined' !== typeof(this.canMoveNext)) {
    		if(!this.canMoveNext()) {
    			return this;
    		}
    	}
    	// cancel timeout watching
			_self.cancelWatchTimeout();
    	// 
    	if(!_self._requestNextPageProcess) {
    		
    		_self._requestNextPageProcess = function(callback) {
    			var _fetchPage = function(_enq_id, _id) {
    				_self.fetchPage(_enq_id, _id, function(page){
							_self._page   = page;
							/// navi
							_self.models.nav.set({
		    				"html": _self._campaign.get('question_cnt') + ' 問中  ' + _self._page.get('questions').at(0).get('num') + ' 問目'
		    			});
							// content
							_self.models.content.set({ 
								"view":        ns.root.ui.Page,
								"model":       page,
								"selector":    ns.root.ui.slctr('page') + ns.root.ui.slctr('template'),
								"clone":       true,
							});
							//
							_self.models.next.set({
								"title":       page.containsQuiz() ? '回答' : '次へ'
							});
							// callback
							callback();
						});
					};
					if(_self._page) {
						var _page       = _self._page; 
						// send answer
						var _answer     = new ns.root.model.Answer({
						                  	enq_id:      _page.get('enq_id'),
						                  	enq_page_id: _page.get('uuid'),
						                  	campaign_id: _self.models.parameter.get('mid'),
						                  	session_id:  this.session_id,
						                  	uid:         _self.models.parameter.get('uid'),
						                  	key:         _self._campaign.get('platform') + '_uid',
						                  });
						// build answer
						var _data = {
							session_id:   _answer.get('session_id'),
							uid:          _answer.get('uid'),
							key:          _answer.get('key')
						};
						var values        = _page.getValues();
						
						var _questions    = _page.get('questions');
						for(var i = 0; i < _questions.length; ++i ){
							var _question   = _questions.at(i);
							var _num        = _question.get('num'); 
							var _value      = values[_num];
							if(_value) {
								var _name     = 'answer_' + _num + '[]';
								_data[_name]  = _value.values;
								// _answer.set(_name, (_values.length === 1) ? _values[0] : _values);
							}
						}
						_answer.data  = _data;
						
						// send
						_self.sendAnswer(_answer, function(){
							var _page     = _self._page;
							var _enq_id   = _page.get('enq_id');
							var _id       = _page.findNextPageId(values);
							if(_id) {
								_fetchPage(_enq_id, _id);	
							}else{
								var _model = new ns.root.ui.model.Complete({
									"conversion_tag": _self._campaign.has('conversion_tag') ? _self._campaign.get('conversion_tag') : null,
									"client_url":     _self._campaign.has('client_url') ? _self._campaign.get('client_url') : null,
									// http://redmine.sunbi.co.jp/issues/2041
									// http://redmine.sunbi.co.jp/issues/2045
									"button_title":   _self._campaign.has('complete_button_text') ? _self._campaign.get('complete_button_text') : null
								});
								// complete
								_self.models.content.set({ 
									"view":        ns.root.ui.Complete,
									"model":       _model,
									"selector":    ns.root.ui.slctr('complete')
								});
							}
						});
						
					}else{
						// content
						var _campaign   = _self._campaign;
						var _enq_id     = _campaign.get('enq_id');
						var _id         = _campaign.get('first_page_id');
						_fetchPage(_enq_id, _id);
					}
				};
				_self._requestNextPageProcess(function(){
					_self._requestNextPageProcess = null;
					if('undefined' !== typeof(callback)) {
						callback();
					}
				});
    	}else{
    		_self._requestNextPageProcess(function(){
					_self._requestNextPageProcess = null;
					if('undefined' !== typeof(callback)) {
						callback();
					}
				});
    	}
			return this;
    },
    /**
     * requestThankyouPage()
     */
    requestThankyouPage: function() {
    	ns.trace(this.typeName + '#requestThankyouPage()');
    	// 
    	var _self     = this;
    	// thankyou
			_self.models.nav.set({
				"html": 'おめでとうございます！'
			});
			_self.models.content.set({ 
				"view":        ns.root.ui.Thankyou,
				"model":       new ns.root.ui.model.Thankyou({
				               	"title":         'おめでとうございます！',
				               	// http://redmine.sunbi.co.jp/issues/1948
				               	// http://redmine.sunbi.co.jp/issues/1974
				               	"description":   'mixiポイントをプレゼント',
				               	"social":        _self._campaign.get('message'),
				               	"client_url":    _self._campaign.get('client_url'),
						// http://redmine.sunbi.co.jp/issues/2045
						"button_title":  _self._campaign.has('thanks_button_text') ? _self._campaign.get('thanks_button_text') : 'CMのサイトを見る'
				               }),
				"selector":    ns.root.ui.slctr('thankyou')
			});
			// creative if exists
			if(_self._campaign.has('second_picture')) {
				// @see http://redmine.sunbi.co.jp/issues/1982
				var _$creative = $('<p>');
				if(_self._campaign.has('client_url')) {
					// <a>
					var _$a = $('<a>')
					          	.attr('target', '_blank')
					          	.attr('href',   _self._campaign.get('client_url'));
					// <img>
					$('<img>')
						.attr('src', _self._campaign.get('second_picture'))
						.appendTo(_$a);
					// append
					_$a.appendTo(_$creative);
				}else{
					$('<img>')
						.attr('src', _self._campaign.get('second_picture'))
						.appendTo(_$creative);
				}
				// scond
				_self.models.ad.set({ 
					"creative":    _$creative.html()
				});
			}
    },
   	/**
     * getIsAdPlaying()
     */
    getIsAdPlaying: function() {
    	ns.trace(this.typeName + '#getIsPlaying()');
    	return this.isAdPlaying;
    },
   	/**
     * setIsAdPlaying()
     */
    setIsAdPlaying: function(playing) {
    	ns.trace(this.typeName + '#setIsAdPlaying(' + playing + ')');
    	if(this.isAdPlaying !== playing) {
    		this.isAdPlaying = playing;
    		this.trigger('change:isAdPlaying');
    	}
    	return this;
    },
    /**
     * onIsAdPlayingChanged() 
     */
    onIsAdPlayingChanged: function() {
    	ns.trace(this.typeName + '#onIsAdPlayingChanged()');
    	
    },
    /**
     * getIsAdEnded()
     */
    getIsAdEnded: function() {
    	ns.trace(this.typeName + '#getIsAdEnded()');
    	return this.isAdEnded;
    },
   	/**
     * setIsAdEnded()
     */
    setIsAdEnded: function(ended) {
    	ns.trace(this.typeName + '#setIsAdEnded(' + ended + ')');
    	if(this.isAdEnded !== ended) {
    		this.isAdEnded = ended;	
    		this.trigger('change:isAdEnded');
    	}
    	return this;
    },
    /**
     * onIsAdEndedChanged() 
     */
    onIsAdEndedChanged: function() {
    	ns.trace(this.typeName + '#onIsAdEndedChanged()');
    },
    /**
     * getIsAdPaused()
     */
    getIsAdPaused: function() {
    	ns.trace(this.typeName + '#getIsAdPaused()');
    	return this.isAdPaused;
    },
   	/**
     * setIsAdPaused()
     */
    setIsAdPaused: function(paused) {
    	ns.trace(this.typeName + '#setIsAdPaused(' + paused + ')');
    	if(this.isAdPaused !== paused) {
    		this.isAdPaused = paused;	
    		this.trigger('change:isAdPaused');
    	}
    	return this;
    },
    /**
     * onIsAdEndedChanged() 
     */
    onIsAdPausedChanged: function() {
    	ns.trace(this.typeName + '#onIsAdPausedChanged()');
    	// nothing to do
    },
    /**
     * getAdDuration()
     */
    getAdDuration: function() {
    	ns.trace(this.typeName + '#getAdDuration()');
    	return this.adDuration;
    },
   	/**
     * setIsAdPaused()
     */
    setAdDuration: function(duration) {
    	ns.trace(this.typeName + '#setAdDuration(' + duration + ')');
    	if(this.adDuration !== duration) {
    		this.adDuration = duration;	
    		this.trigger('change:adDuration');
    	}
    	return this;
    },
    /**
     * onIsAdEndedChanged() 
     */
    onAdDurationChanged:    function() {
    	ns.trace(this.typeName + '#onAdDurationChanged()');
    	// nothing to do
    },
    /**
     * getDefaultWatchTimeout
     */
    getDefaultWatchTimeout: function() {
    	ns.trace(this.typeName + '#getDefaultWatchTimeout()');
    	return _TIMEOUT_DEFUALT;
    },
    /**
     * startWatchTimeout
     */
    startWatchTimeout:      function(){
    	ns.trace(this.typeName + '#startWatchTimeout()');
    	// keep the reference
    	var _self = this;
    	// update
    	_self.updateWatchTimeout(_self.getDefaultWatchTimeout());
    	// return
    	return this;
    },
    /**
     * 
     */
    updateWatchTimeout:  function(timeout){
    	ns.trace(this.typeName + '#updateWatchTimeout(' + timeout + ')');
    	// keep the reference
    	var _self = this;
    	// update nav
			_self.models.nav.set({
				"html": Math.floor(timeout / 1000)  + ' 秒以内にスタートしてください。'
			});
    	// set timeout
    	var timeoutTimerId = setTimeout(function(){
    		var _left = timeout - 1000; 
    		if(_left < 1) {
    			_self.onTimeout();	
    		}else{
    			_self.updateWatchTimeout(_left);
    		}
    	}, 1000);
    	// update id
    	this.setTimeoutTimerId(timeoutTimerId);
    	// return
    	return this;
    },
    /**
     * 
     */
    cancelWatchTimeout:  function(){
    	ns.trace(this.typeName + '#cancelWatchTimeout()');
    	// keep the reference
    	var _self = this;
    	//
    	var _timeoutTimerId = _self.getTimeoutTimerId(); 
    	if(_timeoutTimerId) {
    		clearTimeout(_timeoutTimerId);
    		_self.setTimeoutTimerId(null);	
    	}
    	return this;
    },
    /**
     * 
     */
    onTimeout:           function(){
    	ns.trace(this.typeName + '#onTimeout()');
    	this.setTimeoutTimerId(null);
    	return this;
    },
    /**
     * getAdDuration()
     */
    getTimeoutTimerId:   function() {
    	ns.trace(this.typeName + '#getTimeoutTimerId()');
    	return this.timeoutTimerId;
    },
   	/**
     * setIsAdPaused()
     */
    setTimeoutTimerId:   function(timeoutTimerId) {
    	ns.trace(this.typeName + '#setTimeoutTimerId(' + timeoutTimerId + ')');
    	if(this.timeoutTimerId !== timeoutTimerId) {
    		this.timeoutTimerId = timeoutTimerId;	
    		this.trigger('change:timeoutTimerId');
    	}
    	return this;
    },
    /**
     * onIsAdEndedChanged() 
     */
    onTimeoutTimerIdChanged: function() {
    	ns.trace(this.typeName + '#onTimeoutTimerIdChanged()');
    	// nothing to do
			return this;
    }
	}); 
})(mr.controller);