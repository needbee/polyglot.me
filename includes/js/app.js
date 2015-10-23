/**
 * app.js - main code for the application
 * Copyright (c) 2013-2014 NeedBee
 *
 * Released under the MIT License. See the file LICENSE
 */
var cheatsheet = cheatsheet || {};
requirejs.config({
	baseUrl: 'node_modules',
    paths:{
        'jquery':'jquery/dist/jquery.min',
        'underscore':'underscore/underscore-min',
        'backbone':'backbone/backbone-min',
		'google-code-prettify': '../includes/js/google-code-prettify/prettify',
		'zeroclipboard': '../includes/js/zeroclipboard/ZeroClipboard-min',
		'bootstrap': '../includes/js/bootstrap-min',
		'bootstrap-table-fixed-header': '../includes/js/bootstrap-table-fixed-header/bootstrap-table-fixed-header',
		'utils': '../includes/js/utils'
    },
    shim: {
        'backbone': {
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
        	deps: ['jquery']
        },
        'bootstrap-table-fixed-header': {
        	deps: ['jquery']
        },
        'zeroclipboard': {
        	exports: 'ZeroClipboard'
        },
        'underscore': {
            exports: '_'
        }
    }
});
requirejs([
	'jquery',
	'backbone',
	'google-code-prettify',
	'bootstrap',
	'bootstrap-table-fixed-header',
	'utils'
	// "zeroclipboard" // loaded normally
],function(){
	cheatsheet.baseWebUrl = '/';
	cheatsheet.baseUrl = cheatsheet.baseWebUrl+'data/';

	cheatsheet.bustCache = function() {
		return '?bustcache='+(new Date()).getTime();
	};

	cheatsheet.addTool = function(newToolId) {
		var path = _.union( cheatsheet.tools.pluck('id'), [newToolId] ).join('+');
		cheatsheet.router.navigate( path, {trigger:true} );
	};

	cheatsheet.removeTool = function(removeToolId) {
		var path = _.without( cheatsheet.tools.pluck('id'), removeToolId ).join('+');
		cheatsheet.router.navigate( path, {trigger:true} );
	};

	cheatsheet.FeatureSet = Backbone.Model.extend({
	});

	cheatsheet.FeatureSetCollection = Backbone.Collection.extend({
		model: cheatsheet.FeatureSet,
		url: cheatsheet.baseUrl+'featuresets.json'+cheatsheet.bustCache(),
		initialize: function() {
			this.fetch({reset:true});
		},
		parse: function(response) {
			this.fullFeatureSets = response.featuresets;
			return this.fullFeatureSets;
		},
		filterBy: function(query) {
			var terms = query.toLowerCase().split(/\W+/);
			var filteredFeatureSets = $.extend( true, [], this.fullFeatureSets ); // copy

			// filter out features
			_.each( filteredFeatureSets, function(featureSet) {
				featureSet.features = _.filter( featureSet.features, function(feature) {
					return _.every( terms, function(term) {
						return (-1 != feature.name.toLowerCase().indexOf(term))
							|| (-1 != feature.description.toLowerCase().indexOf(term));
					});
				});
			});

			// filter out empty feature sets
			filteredFeatureSets = _.filter( filteredFeatureSets, function(featureSet) {
				return 0 != featureSet.features.length;
			});

			this.reset(filteredFeatureSets);
		}
	});

	cheatsheet.Tool = Backbone.Model.extend({
		initialize: function(id) {
			this.url = cheatsheet.baseUrl+'tools/'+id+'.json'+cheatsheet.bustCache();
			this.fetch({reset:true});
		}
	});

	cheatsheet.ToolCollection = Backbone.Collection.extend({
		model: cheatsheet.Tool
	});

	cheatsheet.ToolsView = Backbone.View.extend({
		el: $('#tools'),
		template: $('#tools-tmpl').html(),
		initialize: function(allToolIds,usedToolObjs) {
			this.allToolIds = allToolIds;
			this.usedToolObjs = usedToolObjs;
			this.render();

			this.usedToolObjs.on('add remove', this.render, this);
		},
		render: function() {
			// console.log('render tools');

			var toolsToUse = this.usedToolObjs.pluck('id');
			var toolsRemaining = _.difference( this.allToolIds, toolsToUse );

            var template = _.template( this.template );
			this.$el.html( template({
				toolsToUse: toolsToUse,
				toolsRemaining: toolsRemaining
			}));
		},
		events: {
			'click a.add-tool': function(e) {
				e.preventDefault();
				var id = $(e.target).text();
				// console.log('add tool '+id);
				cheatsheet.addTool(id);
				return;
			}
		}
	});

	cheatsheet.SearchView = Backbone.View.extend({
		el: $('#search'),
		template: $('#search-tmpl').html(),
		initialize: function(featureSets) {
			this.featureSets = featureSets;
			this.render();
		},
		render: function() {
			// console.log('render search');
            var template = _.template( this.template );
            this.$el.html( template({}) );
		},
		events: {
			"keyup": function(e){
				var query = $('input.search').val();
				// console.log(query);
				this.featureSets.filterBy(query);
			}
		}
	});

	cheatsheet.TableView = Backbone.View.extend({
		el: $('#table'),
		template: $('#table-tmpl').html(),
		featureTemplate: $('#feature-tmpl').html(),
		codeSnippetTemplate: $('#code-snippet-tmpl').html(),
		initialize: function(featureSets,tools,allToolIds) {
			this.featureSets = featureSets;
			this.tools = tools;
			this.allToolIds = allToolIds;
			this.render();
			this.tools.on('add remove', this.render, this);
		},
		render: function() {
			// console.log('render table');

			var toolsToUse = this.tools.pluck('id');
			var toolsRemaining = _.difference( this.allToolIds, toolsToUse );

			var toolsInOrder = []
			_.each( cheatsheet.params.tools, function(id) {
				var tool;
				if( tool = this.tools.get(id) ) {
					toolsInOrder.push(tool.toJSON());
				}
			}, this );

            var template = _.template( this.template );
            this.$el.html( template({
				featureSets: this.featureSets.toJSON(),
				tools: toolsInOrder,
				allToolIds: this.allToolIds,
				toolsToUse: toolsToUse,
				toolsRemaining: toolsRemaining,
				featureTemplate: this.featureTemplate,
				codeSnippetTemplate: this.codeSnippetTemplate
			}));

			// set up now that content there
			// $('.table-fixed-header').fixedHeader();
			prettyPrint();
			cheatsheet.clip = new ZeroClipboard($(".copy"));
			cheatsheet.clip.on( 'dataRequested', function (client, args) {
				var code = $(this).parents('td').find('div.orig').text();
				client.setText(code);
			});
		},
		events: {
			'click a.add-tool': function(e) {
				e.preventDefault();
				var id = $(e.target).text();
				// console.log('add tool '+id);
				cheatsheet.addTool(id);
				return;
			},
			'click a.remove-tool': function(e) {
				e.preventDefault();
				var id = e.target.id.substring('remove-tool-'.length);
				// console.log('remove tool '+id);
				cheatsheet.removeTool(id);
			}
		}
	});

	cheatsheet.Router = Backbone.Router.extend({

	  routes: {
	    "": "tools",
	    ":tools": "tools",
	  },

	  tools: function(tools) {
	    if( typeof tools === 'undefined' || null == tools ) {
	    	tools = '';
	    }
	    cheatsheet.params.tools = tools.split('+');

		var toolsToUse = _.intersection( cheatsheet.params.tools, cheatsheet.allTools );
		var currentTools = cheatsheet.tools.pluck('id');
		var toolsToRemove = _.difference( currentTools, toolsToUse );
		var toolsToLoad = _.difference( toolsToUse, currentTools );

		_.each( toolsToRemove, function(id) {
			cheatsheet.tools.remove(cheatsheet.tools.get(id));
		});
		_.each( toolsToLoad, function(id) {
			tool = new cheatsheet.Tool(id);
			tool.on('change', function() {
				cheatsheet.tools.add(this);
			});
		});
	  },

	});

	cheatsheet.params = {};
	cheatsheet.router = new cheatsheet.Router();

	cheatsheet.featureSets = new cheatsheet.FeatureSetCollection();
	cheatsheet.searchView = new cheatsheet.SearchView(cheatsheet.featureSets);
	cheatsheet.firstFeatureSetLoad = true; // TODO do this cleaner
	cheatsheet.featureSets.on('reset', function() {
		if( !cheatsheet.firstFeatureSetLoad ) {
			cheatsheet.tableView.render(); // update columns
			return;
		}

		cheatsheet.firstFeatureSetLoad = false;
		$.ajax(cheatsheet.baseUrl+'tools/list.json'+cheatsheet.bustCache(), {
			type: 'GET',
			dataType: 'json',
			success: function(response) {
				cheatsheet.allTools = response.tools;

				// console.log(['response',response]);

				var id;
				var tool;
				cheatsheet.tools = new cheatsheet.ToolCollection(); //[];
				cheatsheet.toolsView = new cheatsheet.ToolsView(cheatsheet.allTools,cheatsheet.tools);
				cheatsheet.tableView = new cheatsheet.TableView(
					cheatsheet.featureSets, cheatsheet.tools, cheatsheet.allTools
				);

				Backbone.history.start({
					pushState: true,
					root: cheatsheet.baseWebUrl
				});
			}
		});
	});

	ZeroClipboard.setDefaults( { moviePath: 'includes/js/zeroclipboard/ZeroClipboard.swf' } );
});
