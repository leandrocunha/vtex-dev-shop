import React, {findDOMNode} from 'react'

export default class Selectize extends React.Component {

  componentDidMount() {
    this._setup(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._setup(nextProps);
  }

  shouldComponentUpdate() {
    return true;
  }

  _setup(props) {
    const {items, onChange} = props;
    console.log(props);
    console.log(this._selectize);

    if(!this._selectize){
      this._selectize = $(findDOMNode(this)).selectize({
            create: false,
            valueField: 'login',
            onChange: onChange && this._change.bind(this),
            options: items,
            render: {
              item: function(item, escape) {
                return '<div>' +
                  '<span class="name">' + escape(item.login) + '</span>' +
                '</div>';
              },
              option: function(item, escape) {

                return '<div>' +
                  '<span class="avatar">' +
                    '<img src="' + item.avatar_url + '" />' +
                  '</span>' +
                  '<span class="info">' + 
                    '<span class="username">' + escape(item.login) + '</span>' +
                  '</span>' +
                '</div>';
              }
            }
          });
    }else{
      this._selectize.setValue(items, true);
    }
  }

  _change(val) {
    this.props.onChange(val);
  }

  render() {

    const {placeholder, className} = this.props;

    return (
      <select id="select-to"
              className={className}
              placeholder={placeholder}></select>
    );
  }
}
