//Creo mi constructor
function Filter(element,options){
  _.bindAll(this,"type_element");
  this.options = $.extend({}, Filter.DEFAULTS, options);
  this.element = element;
  this.$element = $(element);
  this._inputs = $(".m_filter_videos_content_box").find('label');
  this.content_add= $('.m_filter_keywords_box',this.$element);
  this.ivan = [];
  this.init();
  
}

//extiendo mis funciones en mi prototipo
$.extend(Filter.prototype,{
  init:function() {
    this._inputs.on('click',this.type_element);
  },
  type_element:function(e){
    // var element = $(e.target).attr('type');
    var element = $(e.target).closest('p').find('input').attr('type');
    if(element == "checkbox") {
      this.add_check(e.target);
    }
    else if (element == "radio") {
      console.log("es un radio");
    }
  },
  add_check:function(target) {
    $(target).clone().appendTo(this.content_add);
    var target_text = $(target).text();
    this.ivan.push(target_text);
    
    // this.ivan.push($(target).text());
    // console.log(this.ivan);
    // console.log(target);
    for (var i = this.ivan.length - 1; i >= 0; i--) {
      console.log(this.ivan[i]);
      console.log(target_text);
      if(this.ivan[i]==target_text) {
        console.log('lo tenemos');
      }else {
        console.log('no lo tenemos');
      }
      //this.ivan[i]
    }
    //this.ivan.push($(target).text());
    
    
    //var label = $(target).closest('p').find('label');
    //$(target).clone().appendTo(this.content_add);
  },
  remove_check:function(){
    console.log('remove_check');
  },
  clear_filter:function(){
    console.log('clear_filter');
  }
});


//propiedades de mi plugin por defecto
Filter.DEFAULTS = {
  
};



$.fn.filter = function(options){
  return $(this).each(function(){
    var self = $(this);
    if(!self.data("filter")){
      self.data("filter", new Filter(this, options));
    }
  });
};