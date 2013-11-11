/**
* UMsimpleCharts jQuery.subclass
* Version: 1.0
* -
**** creates simple charts from a given array of values.
* -

* @param backgroundColor [hex]
* @param size [pixels]
* @param type [string]
* @param legend [boolean]
* @param values [array of _values_]
* @type _values_ [label[string], percentage[number], color[hex]]
* -
* (C) 2013, MikO (Michael Ochmann)
* http://jquery.mike-ochmann.de/UMsimpleCharts
* twitter: @miko007 || facebook: $/mike.ochmann
*/

var instanceCount = 0;

(function($) {
    $.fn.UMsimpleCharts = function(options) {

      var ctx;
      var $this = this;
      var currentAmount = 0.0;
      var settings = $.extend({
        backgroundColor: "#dddddd",
        size: "300",
        type: 'pie',
        legend: true,
        values: []
      }, options);

      var methods = {
        getRadians: function(percentage) {
          degrees = percentage * 360.0 + 90;
          return degrees * Math.PI / 180.0;
        },
        moveToCenter: function() {
          ctx.moveTo(settings.size/2, settings.size/2);
        },
        drawPieBackground: function() {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.beginPath();
          ctx.arc(settings.size/2, settings.size/2, settings.size/2 - 5, 0, methods.getRadians(1), false);
          ctx.closePath();
          ctx.fillStyle = settings.backgroundColor;
          ctx.fill();
        },
        drawBarsBackground: function() {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.beginPath();
          ctx.moveTo(1,0);
          ctx.lineTo(1,settings.size-1);
          ctx.lineTo(settings.size-1, settings.size-1);
          ctx.lineWidth=2;
          ctx.strokeStyle = 'black';
          ctx.stroke();
            for (var i = 0.0; i < 1 ; i += 0.1) {
              ctx.moveTo (2, Math.floor(settings.size*i) + 0.6);
              ctx.lineTo(settings.size - 1, Math.floor(settings.size*i) + 0.6);
            }

          ctx.lineWidth=1;
          ctx.strokeStyle = '#aaaaaa';
          ctx.stroke();
        },
        drawPie: function() {
          methods.drawPieBackground();
          for (var i = 0; i < settings.values.length; i++) {
          if (currentAmount < 1) {
            ctx.beginPath();
            methods.moveToCenter();
            ctx.arc(
                    settings.size/2,
                    settings.size/2,
                    settings.size/2-5,
                    methods.getRadians(currentAmount),
                    methods.getRadians((settings.values[i][1]/100)+currentAmount),
                    false
                    );
            ctx.fillStyle = settings.values[i][2];
            ctx.closePath();
            ctx.fill();
            currentAmount = currentAmount + settings.values[i][1]/100;
          } else {
                   $this.append("<p style='color: red; font-weight: bold;'>The sum of submitted values is greater than 100%!</p>");
                 }
          }
         },
        drawBars: function() {
            methods.drawBarsBackground();
              var barsWidth = settings.size / (settings.values.length + settings.values.length/3);
            for (var i = 0; i < settings.values.length; i++) {
              ctx.beginPath();
              ctx.rect(i*barsWidth+i*barsWidth/3 + 5,settings.size - settings.size * (settings.values[i][1]/100) -5, barsWidth, settings.size * (settings.values[i][1]/100));
              ctx.fillStyle = settings.values[i][2];
              ctx.closePath();
              ctx.fill();
            }
        },
        drawLegend: function() {
          $this.append("<br/>");
          for (var i = 0; i < settings.values.length; i++) {
             $this.append("<div style='float: left;font-size: small; margin: 30px 20px 0 0;'><span style='display: block; width: 10px; height: 10px; border: solid 1px black; float: left; vertical-align: middle; margin-right: 8px; margin-top: 2px; background: "+settings.values[i][2]+";'></span>"+settings.values[i][0]+"</div>");
          }
          $this.append("<div style='clear: both;'></div>");
        },
        init: function() {
          instanceCount = instanceCount + 1;
          $this.html("<canvas width='"+settings.size+"px' height='"+settings.size+"px' id='UMProgressView_"+instanceCount+"'></canvas>");
          canvasID = $this.children('canvas').attr('id');
          ctx = document.getElementById(canvasID).getContext("2d");
            if (settings.type == "pie") {
              methods.drawPie();
            }
            else if (settings.type == "bars") {
              methods.drawBars();
            }
          if (settings.legend == true) { methods.drawLegend();  }
       }
}
        methods.init();
      }

}(jQuery));