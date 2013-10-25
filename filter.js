//Creo mi constructor
function Filter(element,options){
  _.bindAll(this,"type_element","remove_radio");
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
    this.content_add.on('click','[data-radio]',this.remove_radio);
    
  },
  type_element:function(e){
    var element = $(e.target),
        type = element.attr('type');
    if(type == "checkbox") {
      if(element.is(":checked")){
        this.add_check(element);
        console.log("dentro")
      }else{
        this.remove_check(element);
        console.log('fuera');
      }
    }
    else if (type == "radio") {
     this.add_radio(element);
    }
  },
  add_check:function(element) {
    var element_add = $(element).closest('p').find('label');
    $(element_add).clone().appendTo(this.content_add);
  },
  remove_check:function(element){
    var element_remove = element.attr('id');
    this.content_add.find('[for='+element_remove+']').remove();
    
  },
  clear_filter:function(){
    console.log('clear_filter');
  },
  add_radio:function(element) {
    var attr_name = $(element).attr('name'),
        label_text = $(element).closest('p').find('label').text();
    this.content_add.find("[for="+attr_name+"]").remove();
    this.content_add.append("<label for="+attr_name+" data-radio>"+label_text+"</label>");
   
  },
  remove_radio:function(e){
    e.preventDefault();
    var filter_element = $(e.target).attr('for');
    console.log(this.element);
    this.$element.find("[name="+filter_element+"]").prop('checked',false);
    $(e.target).remove();
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