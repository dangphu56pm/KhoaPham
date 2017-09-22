function addDiv(){
  ReactDOM.render(<InputDiv/>,document.getElementById("div-add"))
}
var Note = React.createClass({
  save(){
    var note = this;
    $.post('/update',{idEdit: this.props.id,content: this.refs.txt.value},function(data){
      list.setState({mang: data});
      note.setState({onEdit:false});
    });
  },
  cancel(){
    this.setState({onEdit:false});
  },
  edit(){
    this.setState({onEdit:true});
  },
  delete(){
    $.post("/delete",{idDel: this.props.id},function(data){
      list.setState({mang:data});
    })
  },
  getInitialState(){
    return {onEdit:false}
  },
  render: function(){
    if(this.state.onEdit){
      return(
        <div className="div-note">
          <input defaultValue={this.props.children} ref="txt"/>
          <button onClick={this.save}>Save</button>
          <button onClick={this.cancel}>Cancel</button>
        </div>
      )
    }else{
      return(
        <div className="div-note">
          <p>{this.props.children}</p>
          <button onClick={this.delete}>Delete</button>
          <button onClick={this.edit}>Edit</button>
        </div>
      );
    }
  }
});

var list;
var List = React.createClass({
  getInitialState(){
    list = this;
    return {
      mang: []
    }
  },
  render: function(){
    return(
      <div className="div-list">
        <button onClick={addDiv}>Add</button>
        <div id="div-add"></div>
        {
          this.state.mang.map(function(note,index){
            return (
              <Note key={index} id={index}>{note}</Note>
            );
          })
        }
      </div>
    );
  },
  componentDidMount(){
    var that = this;
    $.post("/getNotes",function(data){
      that.setState({mang: data});
    })
  }
});

var InputDiv = React.createClass({
  save(){
    $.post("/add",{note:this.refs.txt.value},function(data){
      list.setState({mang : data});
    });
    ReactDOM.unmountComponentAtNode(document.getElementById("div-add"));
  },
  render: function(){
    return (
      <div>
        <input type="text" ref="txt" placeholder="Enter your note"/>
        <button onClick={this.save}>Save</button>
      </div>
    );
  }
});

ReactDOM.render(
  <div>
    <List/>
  </div>
  ,document.getElementById("root")
);
