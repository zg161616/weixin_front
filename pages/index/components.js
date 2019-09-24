// ponent/liu/liu.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ajaxdata:{
      type:"String",
      value:"",
      observer:function(new_val,old_val,path){
        console.log("值变化了...")
      }
    },
    liu_value: {
      type:"String",
      value: "lhf",
      observer:function(news,olds){
        console.log(news,olds)
        this.setData({
          
        })
      }
    },
    flow:{
      type:"String",
      value:"",
      observer:function(news,olds,path){
        console.log(news,olds)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ctext:"试试把我的值传到page页面"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  ready:function(){
    console.log("liuliu组件中的数据:" ,this.data)
  }
})