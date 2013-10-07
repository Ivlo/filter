//Creo mi constructor
function Filter(element,options){
  _.bindAll(this,"type_element");
  this.options = $.extend({}, Filter.DEFAULTS, options);
  this.element = element;
  this.$element = $(element);
  this._inputs = $(".m_filter_videos_content_box").find('input');
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
    var element = $(e.target),
        type = element.attr('type');
    if(type == "checkbox") {
      if(element.is(":checked")){
        this.add_check(e.target);
      }else{
        console.log("borrame");
        this.remove_check(element);
      }
    }
    else if (type == "radio") {
      console.log("es un radio");
    }
  },
  add_check:function(target) {
    var element_add = $(target).closest('p').find('label');
    $(element_add).clone().appendTo(this.content_add);
  },
  remove_check:function(element){
    var borrar = element.attr('id');
    console.log(borrar);
    this.content_add.find('[for='+borrar+']').remove();
    
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