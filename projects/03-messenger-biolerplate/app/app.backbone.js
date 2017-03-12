/**
* SETUP
**/
var app = app || {};


/**
* MODELS
**/
app.Message = Backbone.Model.extend({
    url: function() {
         return 'ws://wot.city/object/jollenroom/viewer';
    },
    defaults: {
        message: []
    }
});

/*
app.SubmitMessage = Backbone.Model.extend({
    // data source
    url: function() {
        return 'http://phone-karate.codio.io:3000/send/' + this.get('message');
    },
    defaults: {
        message: ''
    }
});
*/

/**
* VIEWS
**/
app.MessageView = Backbone.View.extend({
    el: '#chat',
    // constructor
    initialize: function() {
        this.model = new app.Message();
        this.model.bind('change', this.render, this);       // ViewModel
        
        this.template = _.template($('#tmpl-message').html());

        //this.render();
        this.createWebSocket();
        
        //this.model.fetch();
    },
    // Backbone delegation
    render: function() {
        var data = this.model.get('message');
        //var fromNow = moment('' + data.timestamp).fromNow();
        
        //this.model.set('fromNow', fromNow);

        var htmlCodes = this.template(this.model.attributes);
        this.$el.find('#message').html(htmlCodes);
    },
    createWebSocket: function() {
        var div = this.$el.find('#message');
        var self = this;
        
        function onWsMessage(message) {
            var data = JSON.parse( message.data );
            var history = self.model.get('message');

            history.push(data);
            console.log(history);
            self.model.set('message', history);      // model state is changed
        }
        
         // Let us open a web socket
         ws = new WebSocket("ws://wot.city/object/jollenroom/viewer");
         ws.onopen = function()
         {
             div.append("<h2>Done</h2>");
         };

         ws.onmessage = onWsMessage;

         ws.onclose = function()
         { 
            div.append("<h2>Closed</h2>");
         };
         ws.onerror = function()
         { 
            div.html("<h1>error</h1>");
         };  
    }
});


app.ActionView = Backbone.View.extend({
    el: '#action',
    events: {
        'click #btn-message-save':  'save'
    },
    initialize: function() {
        this.model = new app.SubmitMessage();
    },
    save: function() {
        var text = this.$el.find('#text').val();
        
        this.model.set('message', text);
        this.model.save();
    }    
});


// Source: https://github.com/jollen/nodejs-chat-stub
// 
// 等候 HTML 文件完成載入
$(document).ready(function(){
    app.messageView = new app.MessageView();
    //app.actionView = new app.ActionView();
});
