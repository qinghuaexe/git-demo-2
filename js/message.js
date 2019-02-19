var APP_ID = 'NnKqLgcd4oWfYA0Eplgv8OP1-gzGzoHsz';
var APP_KEY = 'CsR6HXQH59OfXY3HEQgd2ULF';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find().then(function (messages) {
    let array = messages.map((item)=>item.attributes)
    array.forEach((item)=>{
        let li = document.createElement('li')
        li.innerText =`${item.name}:${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
    })
}, function (error) {
    alert('提交失败请改天来留言')
});

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit',function(e){
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    var Message =AV.Object.extend('Message')
    var message = new Message();
    message.save({
        'name':name,
        'content':content
    }).then(function(object){
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}:${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = '';
        myForm.querySelector('input[name=name]').value = ''
    })
})

// console.log('运行')
// //创建一个textobject表
// var TestObject = AV.Object.extend('TestObject');
// //
// var testObject = new TestObject();
// testObject.save({
//     words: 'Hello World!'
// }).then(function (object) {
//     alert('LeanCloud Rocks!');
// })