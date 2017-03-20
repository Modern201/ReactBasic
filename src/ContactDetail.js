import React, {Component} from 'react';

export default class ContactDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isEdit : false,
      name :'',
      phone:''
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleToggle(){

    if(!this.state.isEdit){
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
      });
    }else{
      this.handleEdit();
    }


    if(this.props.contact.name == '') return;

    this.setState({
        isEdit : !this.state.isEdit
    },() =>{this.props.onEditing(this.state.isEdit)});


  }
  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);

  }

  handleEdit(){
    this.props.onEdit(this.state.name, this.state.phone);
  }

  handleRemove(){
    this.setState({
      isEdit : !this.state.isEdit
    });
    this.props.onRemove();
  }

  handleKeyPress(e){
    if(e.charCode === 13){
      this.handleToggle();
    }
  }

  render(){

    const details =(
      <div>
        <p>{this.props.contact.name} </p>
        <p>{this.props.contact.phone}</p>
      </div>
    );


    const view = this.state.isEdit? (<div>
                                      <p><input type="text" name="name" placeholder='name' value={this.state.name} onChange = {this.handleChange}/></p>
                                      <p><input type="text" name="phone" placeholder='phone' value={this.state.phone} onChange = {this.handleChange} onKeyPress={this.handleKeyPress}/></p>
                                    </div>) : details;

    const blank =(<div>Not Selected</div>)
    return(
      <div>
        <h2>Details</h2>
        {this.props.isSelected? view : blank}
        <p>
          <button onClick={this.handleToggle}>{this.state.isEdit? 'OK': 'Eidt'}</button>
          <button onClick={this.handleRemove}>Remove</button>
        </p>
      </div>
    );
  }
}

ContactDetail.defaultProps = {
  contact : {
    name: '',
    phone:''
  },

  onRemove: () => {console.error('onRemove not defined');},

  onEdit: () => {console.error('onRemove not defined');}

};

ContactDetail.propTypes = {
  contact : React.PropTypes.object,
  onRemove : React.PropTypes.func,
  onEdit : React.PropTypes.func
};
