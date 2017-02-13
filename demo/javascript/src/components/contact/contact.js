var React = require("react");
var Item = require('./contactItem');
var $ = require('jquery');

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {
            src: 'demo/images/group_user.png'
        };
    },

    componentDidUpdate: function () {
        this.refs.contactContainer.scrollTop = Demo.chatState[Demo.selectedCate].scroll;
    },

    update: function (id) {
        this.props.updateNode(id);
    },

    onscroll: function () {
        var scrollTop = this.refs.contactContainer.scrollTop;
        // var scollTopNum = scrollTop / 60;
        // Demo.scroll[Demo.selectedCate] = scrollTop;
        Demo.chatState[Demo.selectedCate].scroll = scrollTop;
        if ((scrollTop / 60 + 10) == this.props[Demo.selectedCate].length) {
            this.props.getChatroom();
        }
    },

    getBrief: function (id) {
      if(Demo.chatRecord[id] && Demo.chatRecord[id].brief){
          return Demo.chatRecord[id].brief;
      }
    }, 
    render: function () {
        console.log(33333333333);
        var f = [],
            g = [],
            s = [],
            c = [];
        for (var i = 0; i < this.props.friends.length; i++) {
            if (this.props.friends[i].name in this.props.blacklist) {
                continue;
            }
            f.push(<Item id={this.props.friends[i].name} cate='friends' key={this.props.friends[i].name} username={this.props.friends[i].name}
                         update={this.update} cur={this.props.curNode} brief={this.getBrief(this.props.friends[i].name)}/>);
        }
       /* var g_doc={
        "张医生":[{"name":"小明","address":"北京","roomId":"5498539671554"},{"name":"小亮","address":"北京","roomId":"5498099269633"}],
        "王医生":[{"name":"小红","address":"山东","roomId":"5498217758721"}]
            };*/
    //名称转化
    var g_doc={}; 
     if(WebIM.config.isLinglan){  

          this.props.groups.forEach((m, n) => {
                g_doc[m.doctorId]||(g_doc[m.doctorId]=[])

                // console.log(JSON.stringify(g_doc));
                // console.log(JSON.stringify(Demo.mapName));
               $.each(Demo.mapName,function(k,l){
                    if(k==m.doctorId){
                        m["doctorName"]=l;
                    }
                    if(k==m.patientId){
                        m["patientName"]=l;
                    }
                 }); 
                 g_doc[m.doctorId].push(m);
            })  

          

            for(var k in g_doc){ 
                var g_g=[];
               for (var i = 0; i < g_doc[k].length; i++) { 
                    g_g.push(<Item id={g_doc[k][i].roomId} cate='groups' key={g_doc[k][i].roomId} username={g_doc[k][i].patientName}
                                 update={this.update} cur={this.props.curNode} src={this.state.src} brief={this.getBrief(g_doc[k][i].roomId)}/>);
                } 
                g.push(<div key={k}><h3 className="groupsTitle">{k}</h3>{g_g}</div>)
            } 

        }else{
             for (var i = 0; i < this.props.groups.length; i++) {
                g.push(<Item id={this.props.groups[i].roomId} cate='groups' key={this.props.groups[i].roomId} username={this.props.groups[i].name}
                             update={this.update} cur={this.props.curNode} src={this.state.src} brief={this.getBrief(this.props.groups[i].roomId)}/>);
            
             }
        }
       
        for (var i = 0; i < this.props.chatrooms.length; i++) {
            c.push(<Item id={this.props.chatrooms[i].id} cate='chatrooms' key={this.props.chatrooms[i].id}
                         username={this.props.chatrooms[i].name} update={this.update} cur={this.props.curNode}
                         src={this.state.src} brief={this.getBrief(this.props.chatrooms[i].id)}/>);
        }

        for (var i = 0; i < this.props.strangers.length; i++) {
            s.push(<Item id={this.props.strangers[i].name} cate='strangers' key={this.props.strangers[i].name}
                         username={this.props.strangers[i].name} update={this.update} cur={this.props.curNode}
                            brief={this.getBrief(this.props.strangers[i].name)}/>);
        }

        return (
            <div ref='contactContainer' className='webim-contact-wrapper' onScroll={this.onscroll}>
                <div className={this.props.cur === 'friend' ? '' : ' hide'}>{f}</div>
                <div className={this.props.cur === 'group' ? '' : ' hide'}>{g}</div>
                <div className={this.props.cur === 'chatroom' ? '' : ' hide'}>{c}</div>
                <div className={this.props.cur === 'stranger' ? '' : ' hide'}>{s}</div>
                <div ref='loading' className={'webim-contact-loading ' + (this.props.loading ? '' : 'hide')}>
                    <img src='demo/images/loading.gif'/>
                </div>
            </div>
        );
    }
});
