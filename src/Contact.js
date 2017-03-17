import React, {Component} from 'react';
import ContactInfo from './ContactInfo';
import ContactDetail from './ContactDetail';
import Update from 'react-addons-update';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      selectKey: -1,
      keyword:'',
      contactData : [
        {
          name: "Abet",
          phone: "010-0000-00001"
        },
        {
          name: "Boxo",
          phone: "010-0000-00002"
        },
        {
          name: "Clnes",
          phone: "010-0000-00003"
        },
        {
          name: "Dyhore",
          phone: "010-0000-00004"
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

  }

  handleChange(e){
    this.setState({
      keyword : e.target.value
    });
  }
  handleClick(key){
    this.setState({
      selectKey : key
    });
    console.log(key, 'is selected');
  }

  handleCreate(contact){
    this.setState({
      contactData : Update(this.state.contactData, {$push:[contact]})
    });
  }
  handleRemove(){
    this.setState({
      contactData : Update(this.state.contactData, {$splice:[[this.state.selectKey,1]]}),
      selectKey : -1
    });
  }

  handleEdit(newName, newPhone){
    this.setState({
      contactDate : Update(this.state.contactDate, {
        [this.state.selectkey] : {
          name: {$set : newName},
          phone: {$set : newPhone}
        }
      })
    });
  }



  render(){
    const mapToComponents = (data) => {
      data.sort();
      data = data.filter(
        (contact) => {
          return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
        }
      );
      return data.map((contact, i) => {
        return (<ContactInfo
          cont={contact}
          key={i}
          onClick = {()=>this.handleClick(i)}
          />)
      });
    };
    return(
      <div>
        <h1>Contacts</h1>

        <input
          name="keyword"
          placeholder ="Search"
          value ={this.state.keyword}
          onChange={this.handleChange}
        />

        <div>
          {mapToComponents(this.state.contactData)}
        </div>

        <ContactDetail
          isSelected={this.state.selectKey !== -1}
          contact={this.state.contactData[this.state.selectKey]}
        />
      <ContactCreate onCreate={this.handleCreate}/>
      </div>
    );
  }
}
