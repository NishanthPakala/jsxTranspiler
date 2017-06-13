const Checkbox= ({handleClick, name, text, state}) => {
  return(
    <div>
      <input type='checkbox' checked={ state === name} onClick={(e) => handleClick(e, name)} />{text}
    </div>
  )
}
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DatepickerBundle extends React.Component {
  state = { startDate: '', endDate: '', datesButtonDisbled: true }
  handleChangeStart = (startDate) => this.setState({ startDate, checked:'', datesButtonDisbled: false })
  handleChangeEnd = (endDate) => this.setState({ endDate, checked:'', datesButtonDisbled: false })
  handleClick = (e, name) => {this.setState({checked: name, startDate:'', endDate: '', datesButtonDisbled: true})}
  buttonClick = () => {this.setState({datesButtonDisbled: true})}

  render() {
    let buttonclassName = this.state.datesButtonDisbled ? 'button-disabled' : 'button-activated'
    return(
      <div>
      <Checkbox state={this.state.checked} name={'all'} text={'All Time'} handleClick={this.handleClick}/>
      <Checkbox state={this.state.checked} name={'today'} text={'Today'} handleClick={this.handleClick}/>
      <Checkbox state={this.state.checked} name={'oneWeek'} text={'Last (1) Week'} handleClick={this.handleClick}/>
      <Checkbox state={this.state.checked} name={'oneMonth'} text={'Last (1) Month'} handleClick={this.handleClick}/>
      <Checkbox state={this.state.checked} name={'threeMonths'} text={'Last (3) Months'} handleClick={this.handleClick}/>
      <Checkbox state={this.state.checked} name={'oneYear'} text={'Last (1) Year'} handleClick={this.handleClick}/>
        <div>
          <div>Select a date range from:</div>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChangeStart}
                showYearDropdown
                scrollableYearDropdown
                maxDate={moment()}
                dateFormat="MMMM DD YYYY"
            />
          </div>
        <div>
          <div>Until:</div>
            <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChangeEnd}
                minDate={this.state.startDate}
                showYearDropdown
                scrollableYearDropdown
                maxDate={moment()}
                dateFormat="MMMM DD YYYY"
            />
        </div>
        <button className={buttonclassName} disabled={this.state.datesButtonDisbled} onClick={this.buttonClick}>Apply Dates</button>
      </div>)
  }
}
export default DatepickerBundle;
