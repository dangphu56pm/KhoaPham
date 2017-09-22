function getName(name){
  alert(name);
}

var KhoaPham = React.createClass({
  addStudent: function(){
    this.state.tongHocVien = parseInt(this.state.tongHocVien) + 1;
    this.setState(this.state);
  },
  layThongTin: function(){
    alert(this.props.children);
  },
  getInitialState(){
    return {
      tongHocVien:this.props.tongHocVien
    };
  },
  render: function(){
    return(
      <div>
        <h1 className="mauvang">{this.props.ten} - {this.props.giangvien}</h1>
        <div>So hoc vien: {this.state.tongHocVien}</div>
        <p>{this.props.children}</p>
        <button onClick={()=>{getName(this.props.ten)}}>Thong tin</button>
        <button onClick={this.addStudent}>Them hoc vien</button>
        <KhoaHoc/>
      </div>
    );
  }
});

var KhoaHoc = React.createClass({
  render: function(){
    return(
      <h3>Lap trinh Reactjs</h3>
    );
  }
});

var InputTag = React.createClass({
  show: function(){
    var text = this.refs.sl.value;
    alert(text);
  },
  render: function(){
    return(
      <div>
        <select ref="sl">
          <option value="a">AAA</option>
          <option value="b">BBB</option>
          <option value="c">CCC</option>
        </select>
        <input type="text" ref="txt"/>
        <button onClick={this.show}>Hien thi</button>
      </div>
    );
  }
});

var Album = React.createClass({
  next(){
    this.setState({hinh : this.state.hinh == 3? 3 : this.state.hinh + 1});
  },
  prev(){
    this.setState({hinh : this.state.hinh == 1? 1 : this.state.hinh - 1});
  },
  getInitialState(){
    return {
      hinh: 1
    };
  },
  render: function(){
    return(
      <div className="div-album">
        <img src={"images/" + this.state.hinh + ".jpg"} width="200px"/>
        <hr/>
        <button onClick={this.next}>Tiep theo</button>
        <button onClick={this.prev}>Quay lai</button>
      </div>
    );
  }
});

var Image = React.createClass({
  changeImage(){
    this.setState({hinh: (this.state.hinh % 3) + 1});
  },
  getInitialState(){
    return {
      hinh: 1
    };
  },
  render: function(){
    return(
      <div>
        <img src={"images/" + this.state.hinh + ".jpg"} width="200px"/>
      </div>
    );
  },
  componentDidMount(){
    setInterval(this.changeImage, 1000);
  }
});

var Note = React.createClass({
  render: function(){
    return (
      <div>
        <img src={this.props.src} width="200px"/>
        <p> {this.props.children}</p>
      </div>
    );
  }
});

var List = React.createClass({
  add(){
    this.state.mang.unshift({srcHinh:"images/3.jpg",noiDung:"Hello world"});
    this.setState(this.state);
  },
  getInitialState(){
    return {
      mang:[
        {srcHinh:"images/1.jpg",noiDung: "Hello"},
        {srcHinh:"images/2.jpg",noiDung: "Hello Vietnam"}
      ]
    };
  },
  render: function(){
    return(
      <div>
        <button onClick={this.add}>Them</button>
        {
          this.state.mang.map(function(note,index){
            return <Note key={index} src={note.srcHinh}>{note.noiDung}</Note>
          })
        }
      </div>
    );
  }
});
ReactDOM.render(
  <div>
    <List/>
    <InputTag/>
    <KhoaPham ten="Reactjs" giangvien="Mr.Khoa" tongHocVien="10">Mon hoc Reactjs</KhoaPham>
    <KhoaPham ten="Nodejs" giangvien="Mr.Phu" tongHocVien="20">Mon hoc Nodejs</KhoaPham>
    <Album/>
    <Image/>
  </div>
  ,document.getElementById("root")
);
