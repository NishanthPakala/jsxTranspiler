const Checkbox= ({checkboxClicked, name, text, state}) => {
  return(
    <div>
      <input type='checkbox' checked={ state === name} onClick={(e) => checkboxClicked(e, name)} />{text}
    </div>
  )
}
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DatepickerBundle extends React.Component {
  state = { startDateToDisplay: '', endDateToDisplay: '', datesButtonDisbled: true }
  handleChangeStartDate = (startDateToDisplay) => this.setState({ startDateToDisplay, checked:'', datesButtonDisbled: false })
  handleChangeEndDate = (endDateToDisplay) => this.setState({ endDateToDisplay, checked:'', datesButtonDisbled: false })
  buttonClick = () => {this.setState({datesButtonDisbled: true})}
  checkboxClicked = (e, name) => {
    switch (name){
    case 'today':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), datesButtonDisbled: true})
    break;
    case 'oneWeek':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().subtract(7,'d').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), datesButtonDisbled: true})
    break;
    case 'oneMonth':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().subtract(1,'months').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), datesButtonDisbled: true})
    break;
    case 'threeMonths':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().subtract(3,'months').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), datesButtonDisbled: true})
    break;
    case 'oneYear':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().subtract(1,'years').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), datesButtonDisbled: true})
    break;
    case 'all':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:'', endDate: '', datesButtonDisbled: true})
    break;
  }
  }

  render() {
    let buttonclassName = this.state.datesButtonDisbled ? 'button-disabled' : 'button-activated'
    return(
      <div className='row'>
      <div className='accordion-item col-sm-12 col-md-3 col-lg-3'>
      <div onClick={ this.props.toggle } id={'dates'}>{'Dates Ranges'}</div>
      {this.props.expandedState && <div>
      <Checkbox state={this.state.checked} name={'all'} text={'All Time'} checkboxClicked={this.checkboxClicked}/>
      <Checkbox state={this.state.checked} name={'today'} text={'Today'} checkboxClicked={this.checkboxClicked}/>
      <Checkbox state={this.state.checked} name={'oneWeek'} text={'Last (1) Week'} checkboxClicked={this.checkboxClicked}/>
      <Checkbox state={this.state.checked} name={'oneMonth'} text={'Last (1) Month'} checkboxClicked={this.checkboxClicked}/>
      <Checkbox state={this.state.checked} name={'threeMonths'} text={'Last (3) Months'} checkboxClicked={this.checkboxClicked}/>
      <Checkbox state={this.state.checked} name={'oneYear'} text={'Last (1) Year'} checkboxClicked={this.checkboxClicked}/>
        <div className='datepickers-holder'>
          <div>Select a date range from:</div>
            <DatePicker
                selected={this.state.startDateToDisplay}
                onChange={this.handleChangeStartDate}
                maxDate={this.state.endDateToDisplay || moment()}
                showYearDropdown
                scrollableYearDropdown
                dateFormat="MMMM DD, YYYY"
            />
          </div>
        <div>
          <div>Until:</div>
            <DatePicker
                selected={this.state.endDateToDisplay}
                onChange={this.handleChangeEndDate}
                minDate={this.state.startDateToDisplay}
                showYearDropdown
                scrollableYearDropdown
                maxDate={moment()}
                dateFormat="MMMM DD, YYYY"
            />
        </div>
        <button className={buttonclassName} disabled={this.state.datesButtonDisbled} onClick={this.buttonClick}>Apply Dates</button></div>}
      </div>
    </div>)
  }
}
export default DatepickerBundle;
