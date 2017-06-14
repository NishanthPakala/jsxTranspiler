const Checkbox= ({timeFrameCheckboxClicked, name, text, state}) => {
  return(
    <div>
      <input type='checkbox' checked={ state === name} onClick={(e) => timeFrameCheckboxClicked(e, name)} />{text}
    </div>
  )
}
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DatepickerBundle extends React.Component {


  render() {
    let buttonclassName = this.props.state.applyDatesButtonDisabled ? 'button-disabled' : 'button-activated'
    return(
      <div className='row'>
      <div className='accordion-item col-sm-12 col-md-3 col-lg-3'>
      <div onClick={ this.props.toggle } id={'dates'}>{'Dates Ranges'}</div>
      {this.props.expandedState && <div>
      <Checkbox state={this.props.checked} name={'all'} text={'All Time'} timeFrameCheckboxClicked={this.props.timeFrameCheckboxClicked}/>
      <Checkbox state={this.props.checked} name={'today'} text={'Today'} timeFrameCheckboxClicked={this.props.timeFrameCheckboxClicked}/>
      <Checkbox state={this.props.checked} name={'oneWeek'} text={'Last (1) Week'} timeFrameCheckboxClicked={this.props.timeFrameCheckboxClicked}/>
      <Checkbox state={this.props.checked} name={'oneMonth'} text={'Last (1) Month'} timeFrameCheckboxClicked={this.props.timeFrameCheckboxClicked}/>
      <Checkbox state={this.props.checked} name={'threeMonths'} text={'Last (3) Months'} timeFrameCheckboxClicked={this.props.timeFrameCheckboxClicked}/>
      <Checkbox state={this.props.checked} name={'oneYear'} text={'Last (1) Year'} timeFrameCheckboxClicked={this.props.timeFrameCheckboxClicked}/>
        <div className='datepickers-holder'>
          <div>Select a date range from:</div>
            <DatePicker
                selected={this.props.state.startDateToDisplay}
                onChange={this.props.handleChangeStartDate}
                maxDate={this.props.state.endDateToDisplay || moment()}
                showYearDropdown
                scrollableYearDropdown
                dateFormat="MMMM DD, YYYY"
            />
          </div>
        <div>
          <div>Until:</div>
            <DatePicker
                selected={this.props.state.endDateToDisplay}
                onChange={this.props.handleChangeEndDate}
                minDate={this.props.state.startDateToDisplay}
                showYearDropdown
                scrollableYearDropdown
                maxDate={moment()}
                dateFormat="MMMM DD, YYYY"
            />
        </div>
        <button className={buttonclassName} disabled={this.props.state.applyDatesButtonDisabled} onClick={this.props.applyDatesButtonClick}>Apply Dates</button></div>}
      </div>
    </div>)
  }
}
export default DatepickerBundle;
